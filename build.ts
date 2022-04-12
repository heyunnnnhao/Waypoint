import path from 'path';
import { build } from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';

const baseConfig = {
  platform: 'node' as const,
  target: 'esnext' as const,
  bundle: true,
  minify: true,
  sourcemap: false,
  nodePaths: [path.join(__dirname, './src')],
  entryPoints: [path.join(__dirname, './src/index')],
  external: ['react'],
  plugins: [nodeExternalsPlugin()],
};

(async () => {
  await build({
    ...baseConfig,
    format: 'esm',
    outdir: path.join(__dirname, './dist'),
  });
})();
