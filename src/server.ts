import app from './app';
import config from './config';

async function main() {
  try {
    const server = app.listen(config.port, () => {
      console.log(`Application is running on port ${config.port}`);
    });
    server.timeout = 250000;
  } catch (error) {
    console.log('Fail to connect to Database');
  }
}

main();
