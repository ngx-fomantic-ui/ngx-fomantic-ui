<!-- Logo -->
<p align="center">
  <a href="https://ngx-fomantic-ui.github.io/ngx-fomantic-ui/">
    <img height="128" width="238" src="https://raw.githubusercontent.com/ngx-fomantic-ui/ngx-fomantic-ui/master/projects/ngx-fomantic-ui-docs/src/assets/logo.png">
  </a>
</p>

<!-- Name -->
<h1 align="center">
  <a href="https://ngx-fomantic-ui.github.io/ngx-fomantic-ui">ngx-fomantic-ui</a>
</h1>

<!-- Badges -->
<p align="center">
  <a href="https://gitter.im/ngx-fomantic-ui/development">
    <img alt="Gitter" src="https://img.shields.io/gitter/room/ng2-semantic-ui/Lobby.js.svg?style=flat-square" />
  </a>
  <a href="https://www.npmjs.com/package/ngx-fomantic-ui">
    <img alt="npm" src="https://img.shields.io/npm/v/ngx-fomantic-ui.svg?style=flat-square" />
  </a>
  <a href="https://www.npmjs.com/package/ngx-fomantic-ui">
    <img alt="monthly downloads" src="https://img.shields.io/npm/dm/ngx-fomantic-ui.svg?style=flat-square" />
  </a>
</p>

Fomantic UI Angular Integrations, written in pure Angular - **no JQuery required**.

## Introduction

[![Greenkeeper badge](https://badges.greenkeeper.io/ngx-fomantic-ui/ngx-fomantic-ui.svg)](https://greenkeeper.io/)

Angular and jQuery don't go together - this is the fundamental principal of this library. It provides Angular component versions of the Fomantic UI modules, so that you don't need to add jQuery to your app.

Note that only Fomantic UI elements that use jQuery are recreated here - those written purely in CSS aren't included as they can be used in Angular apps already.

**This is a fork of [edcarroll](https://github.com/edcarroll)'s [ng2-semantic-ui](https://github.com/edcarroll/ng2-semantic-ui), updated to Angular 7 and Fomantic UI.**

## Installation & Usage

See the [Documentation](https://ngx-fomantic-ui.github.io/ngx-fomantic-ui) for installation instructions and extensive examples.

## Dependencies

* [Angular](https://angular.io) (^7.0.0)
* [Fomantic UI CSS](http://fomantic-ui.com/) (^2.7.4) (jQuery is **not** required)

## Component Support

|           Icon          |                                      Description                                    |
|-------------------------|-------------------------------------------------------------------------------------|
| :white_check_mark:      | Component supported by ngx-fomantic-ui.                                             |
| :rocket:                | Fomantic UI plugin supported by ngx-fomantic-ui (not in Fomantic UI Core).          |
| :ballot_box_with_check: | Component supported natively by [Fomantic UI](https://fomantic-ui.com/) (CSS only). |
| :x:                     | Component currently unavailable.                                                    |
| :no_entry_sign:         | Component not applicable to Angular.                                                |

|              Elements              |            Collections             |                   Views                  |              Modules              |              Behaviors              |
|------------------------------------|------------------------------------|------------------------------------------|-----------------------------------|-------------------------------------|
| :ballot_box_with_check: Button     | :ballot_box_with_check: Breadcrumb | :ballot_box_with_check: Advertisment     | :white_check_mark: Accordion      | :no_entry_sign: API                 |
| :ballot_box_with_check: Container  | :ballot_box_with_check: Form       | :ballot_box_with_check: Card             | :white_check_mark: Checkbox       | :no_entry_sign: Form Validation     |
| :ballot_box_with_check: Divider    | :ballot_box_with_check: Grid       | :ballot_box_with_check: Comment          | :rocket: Collapse                 | :rocket: Localization               |
| :ballot_box_with_check: Flag       | :ballot_box_with_check: Menu       | :ballot_box_with_check: Feed             | :rocket: Datepicker               | :x: Visibiltiy                      |
| :ballot_box_with_check: Header     | :white_check_mark: Message         | :ballot_box_with_check: Item             | :white_check_mark: Dimmer         |                                     |
| :ballot_box_with_check: Icon       | :rocket: Pagination                | :ballot_box_with_check: Statistic        | :white_check_mark: Dropdown       |                                     |
| :ballot_box_with_check: Image      | :ballot_box_with_check: Table      |                                          | :x: Embed                         |                                     |
| :ballot_box_with_check: Input      |                                    |                                          | :white_check_mark: Modal          |                                     |
| :ballot_box_with_check: Label      |                                    |                                          | :white_check_mark: Popup          |                                     |
| :ballot_box_with_check: List       |                                    |                                          | :white_check_mark: Progress       |                                     |
| :ballot_box_with_check: Loader     |                                    |                                          | :white_check_mark: Rating         |                                     |
| :ballot_box_with_check: Rail       |                                    |                                          | :white_check_mark: Search         |                                     |
| :ballot_box_with_check: Reveal     |                                    |                                          | :x: Shape                         |                                     |
| :ballot_box_with_check: Segment    |                                    |                                          | :white_check_mark: Sidebar        |                                     |
| :ballot_box_with_check: Step       |                                    |                                          | :x: Sticky                        |                                     |
|                                    |                                    |                                          | :white_check_mark: Tab            |                                     |
|                                    |                                    |                                          | :white_check_mark: Toast          |                                     |
|                                    |                                    |                                          | :white_check_mark: Transition     |                                     |

## Development

To generate all library files:

```bash
$ npm run lib:compile
# use lib:compile:w to watch for changes
```

To run the demo app:
```bash
$ npm run demo:serve
```

## Testing

To run the unit tests suite:
```bash
$ npm run test
```

## Credits and License

* MIT © [Edward Carroll](https://github.com/edcarroll)
