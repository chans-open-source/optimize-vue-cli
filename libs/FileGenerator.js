const FileUtils = require('../utils/FileUtils');

const SRC = '/src/';
const ASSETS_SCSS_BASE = 'assets/scss/base';

const genConfigFile = (configFilePath, fixPath, moduleTitle) => {
  FileUtils.write(configFilePath, `// 模块（页面）的配置信息
module.exports = {path: '/${fixPath}',title: '${moduleTitle}'};`);
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
    ${isComponent?`
    // Vue.props
    this.setProps([]);
    `:''}
    // Vue.components
    this.setComponent({});
    // Vue.methods
    this.setMethod({
      // Vuex.mapActions
      ...${key}.mapActions([]),
      /**
       * onCreate中调用了super方法，则会默认调用该方法
       * */
      init () {}
    });
    // Vue.computed
    this.setCompute({
      // Vuex.mapGetters
      ...${key}.mapGetters({})
    });
    // Vue.watch
    this.setWatch({});
  }

  /**
  * Vue.data = {
  *   return {};
  * }
  */
  getData () {
    return {};
  }

  // Vue.created
  onCreate () {
    // 建议保留该方法，否则不会调用methods中的init方法
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
  FileUtils.write(`${dir}module.vue`, `<template>
  <section class="module-layout ${className}">
  </section>
</template>

<script>import m from './module.js';export default m;</script>
<style lang="scss">@import "${scssFile}";</style>
`);
};

const genModuleFiles = (dir, className, fixPath, title, srcDir) => {
  const configFilePath = `${dir}module.config.js`;
  genConfigFile(configFilePath, fixPath, title);
  genScssFile(dir, className, srcDir);
  genModuleVueFile(dir, className);
  genJsFile(dir, className, false);
};

const genIndexFile = (dir) => {
  FileUtils.write(`${dir}index.js`, `// 组件入口
module.exports = require('./component.vue');`);
};

const genComponentVueFile = (dir, className) => {
  const scssFile = './component.scss';
  FileUtils.write(`${dir}component.vue`, `<template>
  <section class="component-layout ${className}">
  </section>
</template>

<script>import c from './component.js';export default c;</script>
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
