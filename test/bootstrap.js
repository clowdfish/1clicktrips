var tests = [];

for (var file in window.__karma__.files) {

    if (window.__karma__.files.hasOwnProperty(file)) {
        // find all files that match *.spec.js
        if (/.spec.js/.test(file)) {
            //console.log('Test file found: ' + file); // DEBUGGING
            tests.push(file);
        }
    }
}

require.config({
    // Karma serves files from '/base'
    baseUrl: 'http://localhost:9876/base',

    /*// to avoid problems with browser caching we generate random url args
     urlArgs: 'cb=' + Math.random(),*/

    // the paths must be given based on the basePath in the Karma config file
    paths: {
        underscore: 'app/lib/underscore',
        server: 'server'
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});