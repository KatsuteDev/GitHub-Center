const assert = require("assert");
const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://github.com/KatsuteDev/GitHub-Center");

    const selectorExists = async (selector) => {
        try{
            await page.waitForSelector(selector, { timeout: 5000 });
            return true;
        }catch(e){
            return false;
        }
    }

    // tests

    const tests = [
        `.AppHeader > div`,
        `#repository-container-header`,
        `body:not(.project-page, .full-width) #repo-content-turbo-frame > div:not(:has(> react-app[app-name="react-code-view"]))`,
        `#repository-container-header > .container-xl`,
        `#repo-content-turbo-frame .container-xl`,
        `#repository-container-header > .container-xl > .border-bottom`,
    ];

    // test run

    let failed = false;
    for(const s of tests){
        try{
            assert(await selectorExists(s));
            console.info('✅', s);
        }catch(e){
            console.error('❌', s);
            failed = true;
        }
    };

    await browser.close();

    failed && process.exit(1);
})();