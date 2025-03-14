const { exec } = require('child_process');
const { logger } = require('../utils/logger');

async function deploy() {
  try {
    logger.info('Starting deployment...');
    
    // Run database migrations
    await executeCommand('node src/scripts/setupDatabase.js');
    
    // Start the application
    await executeCommand('pm2 start ecosystem.config.js');
    
    logger.info('Deployment completed successfully');
  } catch (error) {
    logger.error('Deployment failed:', error);
    process.exit(1);
  }
}

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
}

deploy();
