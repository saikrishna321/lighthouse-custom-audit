const {
  openBrowser,
  goto,
  currentURL,
  closeBrowser,
  client,
} = require('taiko');
import lighthouse from 'lighthouse';
const ReportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
const fs = require('fs');
(async () => {
  const config = {
    extends: 'lighthouse:default',
    passes: [
      {
        passName: 'defaultPass',
        gatherers: ['hero-gatherer'],
      },
    ],

    audits: ['hero-audit'],

    categories: {
      mysite: {
        title: 'Test Project Hero Image',
        description: 'Hero Imaged Loaded!!',
        auditRefs: [{ id: 'testProject-heroimage-audit', weight: 10 }],
      },
    },
  };

  try {
    await openBrowser({ headless: true });
    await goto('http://127.0.0.1:5500/lh.html');
    let url = await currentURL();
    let port = await client()
      .webSocketUrl.split('/devtools/')[0]
      .replace('ws://', '')
      .split(':')[1];
    let lhr = await lighthouse(
      url,
      {
        port,
        output: 'html',
        logLevel: 'error',
      },
      config
    );
    console.log(lhr.lhr)
    const report = ReportGenerator.generateReport(lhr.lhr, 'html');
    fs.writeFile('audit.html', report, (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.error(error);
  } finally {
    await closeBrowser();
  }
})();
