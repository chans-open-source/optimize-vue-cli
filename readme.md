# optimize-vue-cli 脚手架
* This is a multi-page project tool based on @vue/cli 3.0. Can quickly create projects, modules (pages), components. Modules (pages) created using this tool are accessible without additional configuration.
* The development tool will receive long-term maintenance and is expected to be updated to 3.0 by vue. Js.

* 这是一个基于@vue/cli 3.0构建的多页面项目工具。可快速创建项目、模块（页面）、组件。使用该工具创建的模块（页面）无需额外配置即可访问。
* 该开发工具将获得长期维护，预期至vue.js更新至3.0。

![NPM version](https://img.shields.io/npm/v/optimize-vue-cli.svg)
![NPM download](https://img.shields.io/npm/dm/optimize-vue-cli.svg)
![NPM download](https://img.shields.io/npm/dw/optimize-vue-cli.svg)
![npm](https://img.shields.io/npm/l/optimize-vue-cli.svg)


![GitHub watchers](https://img.shields.io/github/watchers/ChangedenCZD/optimize-vue-cli.svg)
![GitHub stars](https://img.shields.io/github/stars/ChangedenCZD/optimize-vue-cli.svg)
![GitHub forks](https://img.shields.io/github/forks/ChangedenCZD/optimize-vue-cli.svg)
![GitHub issues](https://img.shields.io/github/issues/ChangedenCZD/optimize-vue-cli.svg)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/ChangedenCZD/optimize-vue-cli.svg)

## Template 模板源码
[Source Code](https://github.com/ChangedenCZD/optimize-vue)

## Install 安装脚手架
* Run in command line.
* 请在命令行中运行。
```
// Install vue-cli-3.0 at first.
npm i -g @vue/cli

// Install yarn.
npm i -g yarn

// Install cli
npm i -g optimize-vue-cli
```

## Create Project 创建项目
* Run in the project's parent folder.
* 请在项目的父目录中运行。
```
vues create <project-name>
// eg: vues create demo
```

## Init Project 初始化项目
* Run in the project's root folder.
* 请在项目的根目录中运行。
```
// Open project folder if your not in the project's root folder.
cd <project-path>

// Init
yarn install 
```

## Add Module 添加模块（页面）
* Run in the project's root folder.
* 请在项目的根目录中运行。
```
vues add -m <module-title> -p <module-path>
// eg: vues add -m module1 -p /mobile/page/index
// Html-Title: module1
// Html-Url: localhost:port/mobile/page/index
```

## Add Component 添加组件
* Run in the project's root folder.
* 请在项目的根目录中运行。
```
vues add -c <component-path>
// eg: vues add -c /home/index
```

## Add multiple modules at a time 单次添加多个模块（页面）
* Run in the project's root folder.
* 请在项目的根目录中运行。
```
vues add -a -m <module-path-array>
// eg: vues add -a -m /page/a,/page/b
// Html-Title: Page Title
// Html-Url-0: localhost:port/page/a
// Html-Url-1: localhost:port/page/b
```

## Add multiple components at a time 单次添加多个组件
* Run in the project's root folder.
* 请在项目的根目录中运行。
```
vues add -a -c <component-path-array>
// eg: vues add -a -c /home/index,/home/personal
```

## About 关于
* [github](https://github.com/ChangedenCZD/optimize-vue-cli)
* [issues](https://github.com/ChangedenCZD/optimize-vue-cli/issues)
* [e-mail: changeden520@gmail.com](mailto://changeden520@gmail.com)
