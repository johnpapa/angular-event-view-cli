import './polyfills';

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';


var testing = require('@angular/core/testing');
var testingBrowser = require('@angular/platform-browser-dynamic/testing');

testing.getTestBed().initTestEnvironment(
  testingBrowser.BrowserDynamicTestingModule,
  testingBrowser.platformBrowserDynamicTesting());
