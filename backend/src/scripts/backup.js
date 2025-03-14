const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const backup = async () => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(__dirname, '../backups', timestamp);

  try {
    // Create backup directory
    fs.mkdirSync(backupDir, { recursive: true });

    // Backup database
    console.log('Backing up database...');
    await execCommand(`pg_dump $DATABASE_URL > ${path.join(backupDir, 'database.sql')}`);

    // Backup uploads
    console.log('Backing up uploads...');
    await execCommand(`cp -r ${path.join(__dirname, '../uploads')} ${backupDir}`);

    console.log(`Backup completed successfully! Location: ${backupDir}`);
  } catch (error) {
    console.error('Backup failed:', error);
    process.exit(1);
  }
};

function execCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        reject(error);
        return;
      }
      console.log(stdout);
      resolve();
    });
  });
}

backup();
