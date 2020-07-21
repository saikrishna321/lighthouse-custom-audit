'use strict';

const Audit = require('lighthouse').Audit;

const MAX_LOAD_TIME = 100;

class LoadAudit extends Audit {
  static get meta() {
    return {
      id: 'testProject-heroimage-audit',
      title: 'Hero Image of TestProject',
      failureTitle: 'Hero image is slow to load',
      scoreDisplayMode: Audit.SCORING_MODES.NUMERIC,
      description: 'Loaded TestProject Hero Image....',
      requiredArtifacts: ['TestProjectHeroImage'],
    };
  }

  static audit(artifacts) {
    const loadMetrics = artifacts.TestProjectHeroImage;

    const belowThreshold = loadMetrics <= MAX_LOAD_TIME;

    return {
      rawValue: loadMetrics,
      score: Number(belowThreshold),
    };
  }
}
module.exports = LoadAudit;
