import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';
import Corpus from './Corpus.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tweetsPath = path.join(__dirname, '..', 'data', 'tweets.txt')
const fileContent = fs.readFileSync(tweetsPath, { encoding: 'utf-8'}).toString()

const corpus = new Corpus(fileContent)

console.log('Term frequency')
console.log(corpus.getTermFrequency('Bolsonaro'))

console.log('frequência inversa')
console.log(corpus.inverseDocumentFrequency('bolsonaro'))

console.log('tf-idf')
console.log(corpus.getTfIdf('bolsonaro'))

