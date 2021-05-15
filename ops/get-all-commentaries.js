
const client = require("./client");

const query = '*[_type == "gita_commentary"] {_id, description, authorName,author,lang,gita_language,verseNumber,verse}'
const params = {}

async function getCommentary(){
    const commentaries = await client.fetch(query, params)
    return commentaries;
}
module.exports = getCommentary;


// let authorMap = new Map()

if (require.main === module) {
    console.log('called directly');
    getCommentary().then(commentaries => {
        
        commentaries.forEach(commentary => {
            // authorMap.set(JSON.stringify(author.name),JSON.stringify(author._id));
            console.log(JSON.stringify(commentary))
        })
        // console.log(authorMap);
    });
} else {
    console.log('required as a module');
}