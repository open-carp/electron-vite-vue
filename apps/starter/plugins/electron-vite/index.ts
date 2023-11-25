import { Plugin, ViteDevServer, build, ResolvedConfig } from 'vite';
import { AddressInfo } from 'net';
import electron from 'electron';
import { spawn } from 'child_process';
import { resolve } from 'path';
import { builtinModules } from 'module';
async function buildElectron() {
  await build({
    root: resolve(__dirname, '../..', 'dist'), // 指向主进程目录
    build: {
      outDir: resolve(__dirname, '../..', 'dist', 'electron'),
      lib: {
        entry: [
          resolve(__dirname, '../..', 'electron', 'main.ts'),
          resolve(__dirname, '../..', 'electron', 'preload.ts'),
        ], // Electron 目前只支持 CommonJs 格式
        formats: ['cjs'],
        fileName: () => '[name].cjs',
      },
      rollupOptions: {
        external: [
          // 告诉 Rollup 不要打包内建 API
          'electron',
          ...builtinModules,
        ],
      },
    },
  });
}
export default (): Plugin => {
  return {
    name: 'vite-plugin-electron',
    async buildStart(){
      await buildElectron();
    },
    async configureServer(server: ViteDevServer) {
      return ()=>{
        server.httpServer?.once('listening', () => {
          const addressInfo = server.httpServer?.address() as AddressInfo;
          const address = `http://localhost:${addressInfo.port}`;
          const electronProcess = spawn(
              electron.toString(),
              ['./dist/electron/main.cjs', address],
              {
                cwd: process.cwd(),
                stdio: 'inherit',
              },
          );
          electronProcess.on('close', () => {
            electronProcess.kill();
            server.close();
            process.exit();
          });
        });
      }
    },
  };
};
