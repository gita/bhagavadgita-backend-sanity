const getLanguages = require('./get-all-languages');
const getVerses = require('./get-all-verses');
const client = require('./client');
const authors = require('./get-all-authors');
const getCommentary = require('./get-all-commentaries');
const getAuthors = require('./get-all-authors');



function getCommentaryObject(chain,authors,authorMap2)
{   
    authors.forEach(author=>{
        let ids = authorMap2.get(author.name);
        let commentaryObjectArray = []
        if(ids!= undefined)
        {

            ids.forEach(id=>{
                commentaryObjectArray.push(
                    {
                        _ref:id,
                        _type:"reference",
                        _weak:false
                    }
                )
            })
        }
        
    chain = chain.patch(author._id,p=>p.set(
        {   
            commentaries:commentaryObjectArray
        }  
    ))    

    })
    return chain;

}



async function run(){

    const commentaries = await getCommentary();
    const authors = await getAuthors();
    const languageMap = await getLanguages();
    const verses = await getVerses();      
    const transaction = client.transaction();
    let chain = transaction
    var authorMap = new Map();

    const verseMap = new Map();
    verses.forEach(verse=>{
        verseMap.set(verse.verse_order,verse._id);
    })
    authors.forEach(author => {
        authorMap.set(author.name,author._id);
        
    });
    let authorMap2 = new Map()

    // const commentaryMap = new Map();
    commentaries.forEach(commentary=>{
        

        if(authorMap2.get(commentary.authorName)!=undefined){
            
            let ids  = authorMap2.get(commentary.authorName);
            console.log(typeof(ids));
            ids.push(commentary._id);
            authorMap2.set(commentary.authorName,ids)

        }
          
        else if(authorMap2.get(commentary.authorName)==undefined)
        {
            let ids = [];
            ids.push(commentary._id);
            authorMap2.set(commentary.authorName,ids);

        }
        
        

        
    })
    getCommentaryObject(chain,authors,authorMap2)
    addCommentriesToAuthor(chain,authorMap2,commentaries);
    const response = await chain.commit();
    console.log(response);
}
run();