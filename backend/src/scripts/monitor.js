const { logger } = require('../utils/logger');
const os = require('os');

function monitorSystem() {
  setInterval(() => {
    const memoryUsage = process.memoryUsage();
    const cpuUsage = os.loadavg();
    
    logger.info('System Status', {
      memory: {
        heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024) + 'MB',
        heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024) + 'MB',
      },
      cpu: {
        loadAverage: cpuUsage[0].toFixed(2),
      }
    });
  }, 60000); // Monitor every minute
}

module.exports = { monitorSystem };
