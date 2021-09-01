const conf = require('gh-config');

const setupController = require('./bin/setup');

conf.connect(__dirname, './config/config.json');

module.exports = {
    setup() {setupController()},
    connect() {}

}