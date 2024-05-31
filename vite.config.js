import config from 'lowcoder-cli/config/vite.config';
/* eslint-env node */
export default {
  ...config,
  server: {
    open: true,
    port: 9000,
  },
};
