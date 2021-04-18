
const client = require("./client");

const query = '*[_type == "gita_chapter"] {_id, title, chapter_number, verses} | order(chapter_number asc)'
const params = {}

async function getChapters(){
    const chapters = await client.fetch(query, params)
    return chapters;
}
module.exports = getChapters;

if (require.main === module) {
    console.log('called directly');
    getChapters().then(chapters => {
        chapters.forEach(chapter => {
            console.log(JSON.stringify(chapter.verses))
        })
    });
} else {
    console.log('required as a module');
}