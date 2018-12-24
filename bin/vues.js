#!/usr/bin/env node

// Check node version before requiring/doing anything else
// The user may be on a very old node version

// 基于 https://github.com/lin-xin/blog/issues/27

const Version = require('../package').version;
const program = require('commander');
const chalk = require('chalk');

const cwd = process.cwd();
program
.version(Version, '-v, --version')
.usage('<command> [options]');

program
.command('create <app-name>')
.action(name => {
  require('../libs/create')(cwd, name);
});

program
.command('add')
.option('-m,--module <moduleTitle>', `Must append -p option. (eg: vues add -m Index -p /index)`)
.option('-p,--path <modulePath>', 'Only work in -m option. (eg: vues add -m Index -p /index)')
.option('-c,--component <componentPath>', 'eg: vues add -c /home/index')
// .option('-cp,--component-path <componentPath>', '')
.action(name => {
  require('../libs/add')(cwd, {
    module: name.module,
    component: name.component,
    path: name.path
  });
});

program
.arguments('<command>')
.action((cmd) => {
  program.outputHelp();
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.log();
});

program.on('--help', () => {
  console.log();
  console.log(`  Run ${chalk.cyan(`vues <command> --help`)} for detailed usage of given command.`);
  console.log();
});

program.commands.forEach(c => c.on('--help', () => console.log()));

program.parse(process.argv);
