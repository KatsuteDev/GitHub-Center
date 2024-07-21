const puppeteer = require("puppeteer");

const URL = "https://github.com/KatsuteDev/GitHub-Center";

const selectors = [
    // `.AppHeader > div`, // requires login
    `body:not(.project-page) .application-main:not(:has(> div > projects-v2, > div > .feed-background),:has(> main > react-app[app-name="marketplace-react"]))`,
    `#repository-container-header`,
    `#js-repo-pjax-container:not(:has(> projects-v2))`,
    `body:not(.project-page) #repo-content-turbo-frame > div`,

    `#repository-container-header > div`,
    `#repo-content-pjax-container > div`,
    // `body:not(.project-page) #repo-content-turbo-frame > div:not(#repo-content-pjax-container)`, // uses turbo test case

    // `#repository-container-header > div:last-child > div:last-child` // requires login
    // `#notification-shelf > div` // requires notification
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

    {
        const s = `body:not(.project-page) #repo-content-turbo-frame > div:not(#repo-content-pjax-container)`;
        try{ // test for turbo frame
            await page.click(`#issues-tab`);
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