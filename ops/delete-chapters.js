const getVerses = require('./get-all-verses');
const client = require('./client');
const authors = require('./get-all-authors');
const getChapters = require('./get-all-chapters');



function deleteChapters(chain,chapters){

    chapters.forEach(chapter=>{
        chain =  chain.delete(chapter._id);        
    })
    return chain;

}

function deleteVerses(chain,verses){
    verses.forEach(verse=>{
        chain = chain.delete(verse._id);
    })
    return chain;
}





async function run(){

    const verses = await getVerses();      
    const transaction = client.transaction();
    let chain = transaction
    const chapters = await getChapters();


    deleteChapters(chain,chapters);
    // deleteVerses(chain,verses);
    const response = await chain.commit();
    console.log(response);
}
run();