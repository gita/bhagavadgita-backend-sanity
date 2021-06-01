
const client = require("./client");

const query = '*[_type == "gita_translation"] {_id, description, authorName,author,lang,gita_language,verseNumber,verse}'
const params = {}

async function getTranslation(){
    const commentaries = await client.fetch(query, params)
    return commentaries;
}
module.exports = getTranslation;


// let authorMap = new Map()

if (require.main === module) {
    console.log('called directly');
    getTranslation().then(Translations => {
        
        Translations.forEach(translation => {
            // authorMap.set(JSON.stringify(author.name),JSON.stringify(author._id));
            console.log(JSON.stringify(translation))
        })
        // console.log(authorMap);
    });
} else {
    console.log('required as a module');
}