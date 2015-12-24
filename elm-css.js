#!/usr/bin/env node

var elmCss = require('./');
var program = require('commander');
var chalk = require('chalk');
var pkg = require('./package.json');

program
  .version(pkg.version)
  .option('-s, --source [sourcePath]', 'path to the source file for your stylesheets module')
  .option('-o, --output [outputDir]', '(optional) directory in which to write CSS file', process.cwd())
  .option('-m, --module [moduleName]', '(optional) name of stylesheets module in your project', null, 'Stylesheets')
  .option('-p, --port [portName]', '(optional) name of the port from which to read CSS results', null, 'files')
  .option('-r, --root [projectDir]', '(optional) root directory of the project', process.cwd())
  .parse(process.argv);

var requiredArgNames = [
  'source'
];

requiredArgNames.forEach(function (argName) {
  if(!program.hasOwnProperty(argName)) {
    console.log(chalk.red('required argument --' + argName + ' not found'));
    program.help();
    process.exit(1);
  }
})

elmCss(
  program.root,
  program.source,
  program.output,
  program.module,
  program.port
).then(function (results) {
  console.log(chalk.green('Successfully generated output! The following css files were created: '));
  results.forEach(function (result) {
    console.log(chalk.blue('- ' + result.filename));
  });
}).catch(function (error) {
  console.log(chalk.red(error));
  process.exit(1);
});