const FileUtils = require('../utils/FileUtils');

const SRC = '/src/';
const ASSETS_SCSS_BASE = 'assets/scss/base';

const genConfigFile = (configFilePath, fixPath, moduleTitle) => {
  FileUtils.write(configFilePath, `{"path": "/${fixPath}","title": "${moduleTitle}"}`);
};

const genJsFile = (dir, className, isComponent = false) => {
  const key = isComponent ? 'Component' : 'Module';
  const baseClass = `Vue${key}`;
  const src = dir.substr(0, dir.indexOf(SRC) + SRC.length);
  const relativePath = `${FileUtils.relativePath(dir, `${src}libs`)}${baseClass}`;
  FileUtils.write(`${dir}${key.toLowerCase()}.js`, `import ${baseClass} from '${relativePath}';

class ${key} extends ${baseClass} {
  constructor () {
    super();
    this.setModuleName('${key.toLowerCase()}-${className}');
    this.setProps([]);
    this.setComponent({});
    this.setMethod({
      ...${key}.mapActions([]),
      init () {}
    });
    this.setCompute({
      ...${key}.mapGetters({})
    });
    this.setWatch({});
  }

  getData () {
    return {};
  }

  onCreate () {
    super.onCreate();
  }
}

export default new ${key}();
`);
};

const genScssFile = (dir, className, srcDir) => {
  FileUtils.write(`${dir}module.scss`, `@import "${FileUtils.relativePath(dir, srcDir)}${ASSETS_SCSS_BASE}";
.module-layout.${className} {}`);
};

const genModuleVueFile = (dir, className) => {
  const scssFile = './module.scss';
  FileUtils.write(`${dir}module.vue`, `<template><section class="module-layout ${className}"></section></template>

<script>module.exports = require('./module.js');</script>
<style lang="scss">@import "${scssFile}";</style>
`);
};

const genModuleFiles = (dir, className, fixPath, title, srcDir) => {
  const configFilePath = `${dir}module.config.json`;
  genConfigFile(configFilePath, fixPath, title);
  genScssFile(dir, className, srcDir);
  genModuleVueFile(dir, className);
  genJsFile(dir, className, false);
};

const genIndexFile = (dir) => {
  FileUtils.write(`${dir}index.js`, `module.exports = require('./component.vue');`);
};

const genComponentVueFile = (dir, className) => {
  const scssFile = './component.scss';
  FileUtils.write(`${dir}component.vue`, `<template><section class="component-layout ${className}"></section></template>

<script>module.exports = require('./component.js');</script>
<style lang="scss" scoped="true">@import "${scssFile}";</style>
`);
};

const genComponentScssFile = (dir, className, srcDir) => {
  FileUtils.write(`${dir}component.scss`, `@import "${FileUtils.relativePath(dir, srcDir)}${ASSETS_SCSS_BASE}";
.component-layout.${className} {}`);
};

const genComponentFiles = (dir, className, srcDir) => {
  genIndexFile(dir);
  genComponentVueFile(dir, className);
  genComponentScssFile(dir, className, srcDir);
  genJsFile(dir, className, true);
};

module.exports = {
  module: {
    vue: genModuleVueFile,
    gen: genModuleFiles
  },
  component: {
    vue: genComponentVueFile,
    gen: genComponentFiles
  }
};
