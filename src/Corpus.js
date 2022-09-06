export default class Corpus {
    fileContent = ''
    fileContentLength = 0
    
    constructor(fileContent) {
        this.fileContent = fileContent
        this.fileContentLength = fileContent.length
        this._cleanListOfWords()
    }

    getTermFrequency(word) {
        let occurrences = 0 

        this.terms.forEach((wordOnFile) => {
            if (wordOnFile === word) {
                occurrences++
            }
        })

        return occurrences / this.fileContentLength
    }

    getTfIdf(word) {
        const termFrequency = this.getTermFrequency(word)
        const idf = this.inverseDocumentFrequency(word)

        return termFrequency * idf
    }

    getTermsFrequency() {
        const array =  Object.values(this.terms.reduce((acc, word) => {
            const el = word.toLowerCase()
            const qtde = acc[el] ? acc[el].qtde + 1 : 1
            acc[el] = { palavra: el, qtde }
            return acc
        }, {}))

        return this._sortByQuantity(array)
    }

    _sortByQuantity(array) {
        return array.sort((a, b) => b.qtde - a.qtde) 
    }

    inverseDocumentFrequency(word) {
        const dictionary = this.createDictionary()
        let dataFrame 
        try {
            dataFrame = dictionary[word] + 1
        } catch(e) {
            dataFrame = 1
        }

        return this._getBaseLog(this.fileContentLength, dataFrame)
    }

    _getBaseLog(x, y) {
        return Math.log(y) / Math.log(x);
    }      

    createDictionary() {
        let output = {}

        this.terms.forEach((word) => {
            const wordSanitized = word.toLowerCase()
            if( output[wordSanitized]) {
                output[wordSanitized] += 1
            } else {
                output[wordSanitized] = 1
            }
        })
        return output
    }
    
    _cleanListOfWords() {
        this.terms = this.fileContent.split(' ').filter((word) => !Number(word)).filter((word) => word.length >= 4)
    }
}