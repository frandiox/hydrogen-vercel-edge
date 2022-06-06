import {defineConfig} from 'vite';
import hydrogen from '@shopify/hydrogen/plugin';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {include: ['@headlessui/react']},
  plugins: [hydrogen(), readableStreamWorkaround()],
});

function readableStreamWorkaround() {
  let config;
  return {
    name: 'readable-stream-workaround',
    configResolved(_config) {
      config = _config;
    },
    transform(code, id) {
      if (config.command === 'build' && id.includes('streaming.server.js')) {
        return code.replace('let cachedStreamingSupport', '$& = false');
      }
    },
  };
}
