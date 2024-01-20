module.exports = {
  apps: [
    {
      name: 'ocr',
      instances: 1,
      script: './dist/src/main.js',
      max_memory_restart: '888M',
      exp_backoff_restart_delay: 100,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
    },
  ],
};
