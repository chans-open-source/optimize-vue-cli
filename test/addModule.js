const shell = require('shelljs');

shell.exec('node ../bin/vues.js add -m PageTitle -p /a/b', (code, stdout, stderr) => {
  if (stderr) {
    console.error(stderr);
  }
  if (stdout) {
    console.log(stdout);
  }
});
