
const client = require("./client");

const query = '*[_type == "gita_author"] {_id, name, slug, gita_commentary}'
const params = {}

async function getAuthors(){
    const authors = await client.fetch(query, params)
    return authors;
}
module.exports = getAuthors;


let authorMap = new Map()

if (require.main === module) {
    console.log('called directly');
    getAuthors().then(authors => {
        
        authors.forEach(author => {
            authorMap.set(JSON.stringify(author.name),JSON.stringify(author._id));
            // console.log(JSON.stringify(author))
        })
        // console.log(authorMap);
    });
} else {
    console.log('required as a module');
}