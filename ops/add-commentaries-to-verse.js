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

function addCommentaryToverse(chain,verseMap2,verses){
    verses.forEach(verse=>{
        let ids = verseMap2.get(verse.verse_order);

        let commentaryObjectArray = []
        if(ids != undefined )
        {
            ids.forEach(id=>{
                commentaryObjectArray.push(
                    {
                        _ref:id,
                        _type:"reference",
                        _weak:false
                    }   
                )
                console.log(commentaryObjectArray)

            })
        }
        chain = chain.patch(verse._id,p=>p.set(
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
    let verseMap2 = new Map()



// I tried to make a map with keys as verse numbers and values as a list of 
// all the _ids of commentaries , employing which we use the map to make the object array 
// that array is the list of references to be added to instance of verse
    commentaries.forEach(commentary=>{
        

        if(verseMap2.get(parseInt(commentary.verseNumber))!=undefined){
            
            let ids  = verseMap2.get(parseInt(commentary.verseNumber));
            // console.log(typeof(ids));
            ids.push(commentary._id);
            verseMap2.set(commentary.verseNumber,ids)

        }
          
        else if(verseMap2.get(parseInt(commentary.verseNumber))==undefined)
        {
            let ids = [];
            ids.push(commentary._id);
            verseMap2.set(parseInt(commentary.verseNumber),ids);
        }
        
        

        
    })
    console.log(verseMap2.get("1"));

    addCommentaryToverse(chain,verseMap2,verses)
    const response = await chain.commit();
    // console.log(response);
}
run();