const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 100,
        defaultViewport: null,
        args: ['--start-maximized'],
        devtools: true
    });
    const page = await browser.newPage();
    await page.goto('http://github.com/team');

    //await browser.close();
})();