import path from 'path';
import { build } from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';

build({
  platform: 'node' as const,
  target: 'esnext' as const,
  bundle: true,
  minify: true,
  sourcemap: false,
  nodePaths: [path.join(__dirname, './src')],
  entryPoints: [path.join(__dirname, './src/index')],
  external: ['react'],
  plugins: [nodeExternalsPlugin()],
  format: 'esm',
  outdir: path.join(__dirname, './dist'),
})
  .then((res) => {
    console.log('build sucessful', res);
  })
  .catch((error) => {
    console.log(error);
  });
