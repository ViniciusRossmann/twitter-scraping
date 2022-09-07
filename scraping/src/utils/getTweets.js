const {Builder, By} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless())
    .build();

async function getTweets(keyword) {
    return new Promise(async (resolve, reject) => {
        try {
            let posts = [];
            await driver.manage().setTimeouts({ implicit: 10000 });

            //pesquisa pelo termo, dasabilitando respostas a tweets
            await driver.get(`https://twitter.com/search?q=${keyword} -filter:replies&f=live`);

            const tweets = await driver.findElements(By.xpath('//div[@data-testid="tweetText" and @lang="pt"]'));
            await Promise.all(tweets.map(async (tweet) => {
                let text = await tweet.getText();
                posts.push(text);
            }));
            resolve(posts);
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = getTweets;