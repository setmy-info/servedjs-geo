#!/usr/bin/env node

// To fake some front end related objects
global.localStorage = {};
global.sessionStorage = {};

require('../../../../node_modules/servicejs/dist/servicejs');
require('../../../../node_modules/servedjs/dist/servedjs');
require('./main');
