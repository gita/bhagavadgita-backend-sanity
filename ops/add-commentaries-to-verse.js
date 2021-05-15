const getLanguages = require('./get-all-languages');
const getVerses = require('./get-all-verses');
const client = require('./client');
const authors = require('./get-all-authors');
const getCommentary = require('./get-all-commentaries');
const getAuthors = require('./get-all-authors');





function addCommentaryToverse(chain,verseMap2,verses){

    verses.forEach(verse=>{
        let ids = verseMap2.get(verse.verseNumber);
        let commentaryObjectArray = []
        if(ids != undefined )
        {
            ids.forEach(id=>{
                commentaryObjectArray.push({
                    _ref:id,
                    _type:"reference",
                    _weak:false
                })
            })
        }
        console.log(commentaryObjectArray);
        chain = chain.patch(verse._id,p=>p.set(
            {
                commentaries:commentaryObjectArray
            }
        ))
        // console.log(commentaryObjectArray);
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
    let verseMap2 = new Map()

    commentaries.forEach(commentary=>{
        

        if(verseMap2.get(commentary.verseNumber)!=undefined){
            
            let ids  = verseMap2.get(commentary.verseNumber);
            // console.log(typeof(ids));
            ids.push(commentary._id);
            verseMap2.set(commentary.verseNumber,ids)

        }
          
        else if(verseMap2.get(commentary.verseNumber)==undefined)
        {
            let ids = [];
            ids.push(commentary._id);
            verseMap2.set(commentary.verseNumber,ids);
        }
        
        

        
    })
    // console.log(verseMap2);

    addCommentaryToverse(chain,verseMap2,verses)
    // const response = await chain.commit();
    // console.log(response);
}
run();