const getTweets = require('./utils/getTweets');
const keywords = require('./keywords.json');
const fs = require('fs');

async function sleep(milliseconds) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, milliseconds);
    });
}

async function addToCsv(tweets) {
    return new Promise(async (resolve, reject) => {
        try {
            let text = tweets.map(tweet => {
                return `${tweet.replaceAll('\n', " ")}\n`;
            });
            await fs.appendFileSync('../data/tweets.txt', text.join(''));
            resolve();
        } catch (err) {
            reject(err);
        }
    });
}

async function startScraping() {
    while (true) {
        for(let index in keywords.candidatos) {
            try {
                const tweets = await getTweets(keywords.candidatos[index]);
                await addToCsv(tweets);
            } catch (err) {
                console.error(err);
            }
        }
        await sleep(300000);
    }
}

startScraping();