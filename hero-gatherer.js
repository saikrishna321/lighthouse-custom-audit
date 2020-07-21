'use strict';
const { Gatherer } = require('lighthouse');

class TestProjectHeroImage extends Gatherer {
  afterPass(options) {
    const driver = options.driver;
    return driver.evaluateAsync('window.testProjectMetric');
  }
}

module.exports = TestProjectHeroImage;
