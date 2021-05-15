const getLanguages = require('./get-all-languages');
const getVerses = require('./get-all-verses');
const client = require('./client');
const authors = require('./get-all-authors');
const getCommentary = require('./get-all-commentaries');
const getAuthors = require('./get-all-authors');


// commentaryObjectArray looks like this 
// [
//     {
//       _ref: '554c92dd-df03-4de1-baff-d3c1bf5c5df6',
//       _type: 'reference',
//       _weak: false
//     },
//     {
//       _ref: 'drafts.qwTh4Z3WS4K2LsDnti0nJX',       
//       _type: 'reference',
//       _weak: false
//     }
//   ]



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

    
// I tried to make a map with keys as authorNames and values as a list of 
// all the _ids of commentaries , employing which we use the map to make the object array 
// that array is the list of references to be added to instance of author
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