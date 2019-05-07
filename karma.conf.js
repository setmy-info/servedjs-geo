module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'src/test/js/**/*Spec.js'
        ],
        exclude: [
        ],
        preprocessors: {
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: [/*'Chrome',*/ /*'Firefox'*/ 'FirefoxHeadless'],
        customLaunchers: {
            'FirefoxHeadless': {
                base: 'Firefox',
                flags: [
                    '-headless'
                ]
            }
        },
        singleRun: false,
        concurrency: Infinity
    });
};
