#!/usr/bin/env node

// To fake some front end related objects
global.localStorage = {};
global.sessionStorage = {};

require('../../../../node_modules/servicejs/dist/servicejs');
require('../js/servedjs');
require('./main');
