const shell = require('shelljs');

shell.exec('node ../bin/vues.js create test-project', (code, stdout, stderr) => {
  if (stderr) {
    console.error(stderr);
  }
  if (stdout) {
    console.log(stdout);
  }
});
