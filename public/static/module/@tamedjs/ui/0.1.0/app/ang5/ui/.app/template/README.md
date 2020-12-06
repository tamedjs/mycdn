# {title}

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 5.2.0. It was built for the [Pokedex](https://github.com/ronbravo/pokedex) micro app repo but in theory can be used as a boilerplate for any [qiankun](https://qiankun.umijs.org/) or [single-spa](https://single-spa.js.org/) compatible project.

## Commands

These are the npm or yarn commands available for the project:

* `npm run app` or `yarn app` - Use to run the development version of the app
* `npm run app:build` or `yarn app:build` - Build out the application to the `/dist` folder.
* `npm run app:build:prod` or `yarn app:build:prod` - Build out a production version of the application to the `/dist` folder.
* `npm run app:serve` or `yarn app:serve` - Run the dev server found in `.app/server.js`.
* `npm run app:setup` or `yarn app:setup` - Copy over template boilerplate files for a brand new project. Should only **run once** for the life of a project. After it is run the script will remove it from the `package.json` file.
* `npm run app:extra` or `yarn app:extra` - Install additional testing tools like Jest, Jsdom, and Cypress.
* `npm run app:watch` or `yarn app:watch` - Build the project and watch for changes to the files.

## Qiankun and Single Spa Framework

* **ZoneJs**
  * Angular has a dependency on the ZoneJs library. Since the library mounts itself to the global window space, it is recommended that you exclude it in the webpack build and load it into the host / master app.
    * [Multiple versions of Zone JS and Angular for different child applications](https://github.com/single-spa/single-spa-angular/issues/4)
    * [Sample Single Spa Index File](https://github.com/single-spa/single-spa-angular/blob/60b88f90d90a6bcbe7e1d1e751c521c48e39f705/README.md#check-if-it-works)

### Setup Base App

**IMPORTANT:** Run the steps below before installing any packages.

The [Base Angular App](https://github.com/ronbravo/pokedex/tree/boilerplate/pkd-app-base-ang5) is provide as a boilerplate with the bare minimal setup to create a new project and (hopefully) most of the kinks with configuration worked out. If you run into a problem please [create an issue](https://github.com/ronbravo/pokedex/issues) ticket.

* Modify the `.app/config.json5` file. Change things like the org name, project name, port, etc.
* Run the command `npm run app:setup` or `yarn app:setup`. This will copy over the needed files and update the project name.

### Install Normal and Extra Modules

Once the project has been configured to work as a micro app, then just run `npm install` or `yarn`. This will just kick off the normal package install process for the base app.

#### Extra

If desired the project can install extra item packages for making the dev testing experience a little better. Run the command `npm run app:extra` or `yarn app:extra` to add the following packages:

* [Jest](https://jestjs.io/) - For unit testing and code coverage.
* [Jsdom](https://www.npmjs.com/package/jsdom) - Mimic a browser environment for frontend unit tests in Jest.
* [Cypress](https://www.cypress.io/) - For automated E2E testing.

**NOTE:** The project can install cypress.io for E2E testing but does not do it by default since everyone's testing needs are different.

### Setup Files

Qiankun uses the Single SPA Framework and so it requires a few files to be updated. Also included in this list are files to be modified to allow for a better development experience.

* `src/index.html` - Add a reference to load [zone.js](https://cdnjs.com/libraries/zone.js/0.9.1) in the head tag. Also update the mounting tag to use something specific to the app. For example: `<pkd-app-base-ang5></pkd-app-base-ang5>`
* `src/app/empty-route/` - Add this for Single SPA.
* `src/app/single-spa/` - Helps with asset routing and system props sharing.
* `src/app-routing.module.ts` - Add the [APP_BASE_HREF](https://single-spa.js.org/docs/ecosystem-angular/#routing) setup to prevent micro app routing errors.
* `src/app.module.ts` - Include the `EmptyRouteComponent` as a declaration.
* `src/app.component.ts` - Update the tag selector for the component mount point to something specific to the app. For example `pkd-app-base-ang5`.
* `src/main.ts` - Update to include the Single SPA classes for booting up the app. Update the tag selector for the component mount point to something specific to the app. For example `pkd-app-base-ang5`.
* `extra-webpack.config.js` - NOT Avaiable in Angular 5. Use the `ng eject` and the `webpack.config.js` file. **NOTE:** This project should come with that as part of the setup.
* `angular.json` - Update to include the custom webpack build settings.
* `package.json` - Update to npm scripts for adding a `dev` and modifying `build`.
* `.app/server.js` - A dev server intended to run on the built `/dist` file of the project and is an alternative to the webpack dev server Angular runs.

### TODO:

* Update the `.app/server.js` to be able to use webpack dev-server [proxy format](https://webpack.js.org/configuration/dev-server/#devserverproxy).

```
{
  "/user-api": {
    "target": "http://localhost:12345",
    "secure": false,
    "changeOrigin": true,
    "pathRewrite": {
      "^/user-api": "/v1"
    }
  },
  ...
}
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
