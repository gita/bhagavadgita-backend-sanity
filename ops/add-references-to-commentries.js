const getLanguages = require('./get-all-languages');
const getVerses = require('./get-all-verses');
const client = require('./client');
const authors = require('./get-all-authors');
const getCommentary = require('./get-all-commentaries');
const getAuthors = require('./get-all-authors');

// {
//     "_type": "gita_commentary",
//     "description": "1.1 धर्मक्षेत्रे on the holy plain? कुरुक्षेत्रे in Kurukshetra? समवेताः assembled together? युयुत्सवः desirous to fight? मामकाः my people? पाण्डवाः the sons of Pandu? च and? एव also? किम् what? अकुर्वत did do? सञ्जय O Sanjaya.Commentary Dharmakshetra -- that place which protects Dharma is Dharmakshetra. Because it was in the land of the Kurus? it was called Kurukshetra.Sanjaya is one who has conered likes and dislikes and who is impartial.",
//     "authorName":"Swami Sivananda",
//     "lang":"english",
//     "verseNumber":"1"
       
// }

function addAuthorRefToCommentary(chain,commentaries,authorMap,languageMap,verseMap){

    commentaries.forEach(commentary=>{
       
        // console.log( verseMap.get(parseInt(commentary.verseNumber)));
        // console.log(verseMap.get(commentary.verseNumber));
        chain = chain.patch(commentary._id,p=>p.set({
            author : {
                _ref : authorMap.get(commentary.authorName),
                _type : 'reference',
                _weak:false
            },
            language:{
                _ref:languageMap.get(commentary.lang),
                _type:'reference',
                _weak:false
            },
            verse:{
                _ref: verseMap.get(parseInt(commentary.verseNumber)),
                _type:'reference',
                _weak:false

            }
        }))
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

    // console.log()
    addAuthorRefToCommentary(chain,commentaries,authorMap,languageMap,verseMap);
    const response = await chain.commit();
    console.log(response);
}
run();