// as language schema holds only a string of lanugage to be used as reference,
// instead of JSON, we are returning a Map of (_languauge and _ID ) of language schema 
const client = require("./client");

const query = '*[_type == "gita_language"] {_id, language}'
const params = {}

async function getLanguages() {
    let languageMap = new Map()
    const languages = await client.fetch(query, params)
    languages.forEach(language => {
        languageMap.set(language.language, language._id)
    })
    return languageMap;
}
module.exports = getLanguages;


// let authorMap = new Map()

if (require.main === module) {
    console.log('called directly');

    getLanguages().then(languages => {

        console.log(languages)
        // let languageMap = new Map()

        // languages.forEach(language => {

        //     languageMap.set(JSON.stringify(language.language), JSON.stringify(language._id))

        // })
        // console.log(languageMap)

        // // console.log(authorMap);
    });
} else {
    console.log('required as a module');
}