const puppeteer = require("puppeteer");

const URL = "https://github.com/KatsuteDev/GitHub-Center";

const selectors = [
    // `.AppHeader > div`, // requires login
    `#repository-container-header`,
    `body:not(.project-page, .full-width) #repo-content-turbo-frame > div:not(:has(> react-app[app-name="react-code-view"]))`,
    // `#repository-container-header > .container-xl`, // requires login
    `#repo-content-turbo-frame .container-xl`,
    // `#repository-container-header > .container-xl > .border-bottom`, // requires login
];

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);

    let failed = false;
    for(const s of selectors){
        try{
            await page.waitForSelector(s, { timeout: 5000 });
            console.info('✅', s);
        }catch(e){
            console.error('❌', s);
            failed = true;
        }
    }

    await browser.close();

    failed && process.exit(1);
})();