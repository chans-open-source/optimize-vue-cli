const shell = require('shelljs');

shell.exec('node ../bin/vues.js add -c /a/b/c', (code, stdout, stderr) => {
  if (stderr) {
    console.error(stderr);
  }
  if (stdout) {
    console.log(stdout);
  }
});
