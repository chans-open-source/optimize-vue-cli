const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const fixPath = (filePath, isDir = true) => filePath.replace(/\\/g, '/') + (isDir ? '/' : '');
const read = (file) => (fs.readFileSync(file, 'utf8') || '');
const write = (file, content) => {
  fs.writeFileSync(file, content, 'utf8');
};
const mkdir = (filePath) => {
  shell.mkdir('-p', filePath);
};
const rm = (filePath) => {
  shell.rm('-rf', filePath);
  console.log(filePath);
};
const isExist = (filePath) => fs.existsSync(filePath);
const absolutePath = (dir0, dir1) => fixPath(path.resolve(dir0, dir1));
const relativePath = (dir0, dir1) => fixPath(path.relative(dir0, dir1));
module.exports = {
  fixPath,
  read,
  write,
  mkdir,
  rm,
  isExist,
  absolutePath,
  relativePath
};
