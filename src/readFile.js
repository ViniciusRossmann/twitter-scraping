const path = require('path')
const fs = require('fs')

const tweetsPath = path.join(__dirname, '..', 'data', 'tweets.txt')

const presidents = [
    { presidente: 'bolsonaro', vezes: 0},
    { presidente: 'lula', vezes: 0},
    { presidente: 'ciro', vezes: 0},
    { presidente: 'simone', vezes: 0},
]

let wordsSanitezed = []

function readFile(path) {
    return new Promise((resolve, reject) => {
        try {
            const fileContent = fs.readFileSync(path, { encoding: 'utf-8'}).toString()
            mutateWordsSanitezed(fileContent)
            handleTimes()
        } catch(e) {
            reject(e)
        }
    })
}

function mutateWordsSanitezed(fileContent) {
    const wordsArray = fileContent.split(' ')
    wordsSanitezed = wordsArray.filter((word) => word.length >= 4)
}

function handleTimes() {
    presidents.forEach(({ presidente }) => {
        countTimes(presidente)
    })
}

function countTimes(president) {
    wordsSanitezed.map((word) => word.match(president) ? presidents.find((item) => item.presidente === president).vezes++ : null)
}

function writeOnFile() {
    let text = ''
    presidents.forEach((president) => {
         text += `
            presidente: ${president.presidente},
            quantidade de vezes citado: ${president.vezes}
        `
    })
    return text
}

readFile(tweetsPath)
fs.writeFile('./data/vetorização.txt', writeOnFile(), 'utf-8', function (err) {
    console.log(err);
});
console.log(presidents)

