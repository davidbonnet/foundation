# Foundation

> 🏛 Base repository for building apps or libraries.

### Features

* Pure modern JavaScript (no ES proposals, CSS modules, JSX, TypeScript, etc…)
* Super fast builds in development and production modes with [Parcel](https://parceljs.org)
* Incremental test updates with [AVA](https://github.com/avajs/ava)
* Preloaded with a React example app and a Sublime Text project setup

## Usage

1. Clone this repository and rename it
2. `nvm install 8`
3. `npm install`
4. Use scripts described below

### Scripts

#### Development

* `npm start [-- --port]`
* `npm test [-- --watch]`
* `npm run coverage:html`
* `npm run coverage`

#### Production

* `npm run build`
* `npm run server [--host] [--port]`

#### Publication

* `npm run build:lib`

## IDE

### Sublime Text

* [SublimeLinter](http://www.sublimelinter.com) with [SublimeLinter-eslint](https://github.com/roadhump/SublimeLinter-eslint)
* [JsPrettier](https://github.com/jonlabelle/SublimeJsPrettier)
