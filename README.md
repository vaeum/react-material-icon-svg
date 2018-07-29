<h1 align="center">
  React material icon svg
</h1>

<h3 align="center">
  Material icon React SVG version
</h3>

<p align="center">
  <a href="https://github.com/vaeum/react-material-icon-svg">
    <img src="https://github.com/vaeum/react-material-icon-svg/blob/master/cover.png?raw=true">
  </a>
</p>

<p align="center">
  <a href="https://nodei.co/npm/react-material-icon-svg/">
    <img src="https://nodei.co/npm/react-material-icon-svg.png?downloads=true&downloadRank=true&stars=true">
  </a>
</p>

<p align="center">
  <a href="https://travis-ci.org/vaeum/react-material-icon-svg/">
    <img src="https://travis-ci.org/vaeum/react-material-icon-svg.svg?branch=master">
  </a>
  <a href="https://www.npmjs.com/package/react-material-icon-svg">
    <img src="https://img.shields.io/npm/v/react-material-icon-svg.svg">
  </a>
  <a href="https://www.npmjs.com/package/react-material-icon-svg">
    <img src="https://img.shields.io/npm/dm/react-material-icon-svg.svg">
  </a>
  <a href="http://prose.io/#vaeum/react-material-icon-svg">
    <img src="https://img.shields.io/badge/edit-prose.io-blue.svg">
  </a>
  <a href="https://unpkg.com/react-material-icon-svg/">
    <img src="https://img.shields.io/badge/unpkg-com-green.svg">
  </a>  
  <a href="https://github.com/vaeum/react-material-icon-svg/issues">
    <img src="https://img.shields.io/github/issues/vaeum/react-material-icon-svg.svg">
  </a>
</p>

React SVG port [MaterialDesign](https://github.com/Templarian/MaterialDesign/)

Select icon or check name [Materialdesignicons.com](https://materialdesignicons.com/)

## Install

[![Greenkeeper badge](https://badges.greenkeeper.io/vaeum/react-material-icon-svg.svg)](https://greenkeeper.io/)

```
npm install --save react-material-icon-svg
```

## Usage

```javascript
import CheckboxMarkedIcon from 'react-material-icon-svg/dist/CheckboxMarkedIcon';
<CheckboxMarkedIcon />
```

## Usage with babel-plugin-transform-imports

[babel-plugin-transform-imports link](https://www.npmjs.com/package/babel-plugin-transform-imports)

.babelrc file

```javascript
{
	...
    "plugins": [
        ["transform-imports", {
            "react-material-icon-svg": {
                "transform": "react-material-icon-svg/dist/${member}",
                "preventFullImport": true
            }
        }]
    ]
    ...
}
```

index.jsx file

```javascript
import { SettingsIcon, PlusIcon, WindowCloseIcon } from 'react-material-icon-svg';
```
