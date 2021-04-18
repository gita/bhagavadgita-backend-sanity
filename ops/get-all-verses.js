
const client = require("./client");

const query = '*[_type == "gita_verse"] {_id, title, verse_order, chapter, chapter_number} | order(verse_order asc)'
const params = {}

async function getVerses(){
    const verses = await client.fetch(query, params)
    return verses;
}
module.exports = getVerses;

if (require.main === module) {
    console.log('called directly');
    getVerses().then(console.log);
} else {
    console.log('required as a module');
}

