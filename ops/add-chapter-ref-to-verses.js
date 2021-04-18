const getChapters = require('./get-all-chapters');
const getChaptersByNumber = require('./chapters-by-number');
const getVerses = require('./get-all-verses');
const client = require('./client');
const getVersesByChapterNumber = require('./verses-by-chapter_number');

/**
 * VERSE
 * chapter: {
    _ref: '3c4f2336-3108-4d55-8985-dd30c139321f',
    _type: 'reference',
    _weak: true
}
 * CHAPTER
 * [{"_key":"ba881cb9a0b5","_ref":"0c81612b-2bcc-4aca-bc48-29f9417f807a","_type":"reference","_weak":true},{"_key":"7b7dd8fb14a6","_ref":"4738fccd-0bc8-427c-8f65-ad99e98a15c0","_type":"reference","_weak":true},{"_key":"04f4bf6968e9","_ref":"e98e830e-a511-4963-9640-78cb8e3b7e68","_type":"reference","_weak":true},{"_key":"742cc41bdc7a","_ref":"1c2afc69-84e1-4813-9fde-10b0e6319653","_type":"reference","_weak":true},{"_key":"b758d8e5f53b","_ref":"0c451aaa-82d3-4b2c-9591-03a1c4d20b77","_type":"reference","_weak":true}]
 */

function addChapterRefToVerse({chain, chaptersByNumber, verses}){
    verses.forEach(verse => {
        chain = chain.patch(verse._id, p => p.set({
            chapter : {
                _ref : chaptersByNumber[verse.chapter_number]._id,
                _type: 'reference',
                _weak: true
            }
        }))
    })
    return chain;
}
function addVersesRefToChapter({chain, versesByChapterNumber, chapters}){
    chapters.forEach(chapter => {
        const versesInChapter = versesByChapterNumber[chapter.chapter_number]
        const versesAsRefs = versesInChapter.map(verse => ({
            _ref: verse._id,
            _type: 'reference',
            _weak: true
        }))
        chain = chain.patch(chapter._id, p => p.set({
            verses : versesAsRefs
        }))
    })
    return chain;
}

async function run(){
    const chapters = await getChapters();
    const chaptersByNumber = getChaptersByNumber(chapters);
    const verses = await getVerses();      
    const versesByChapterNumber = getVersesByChapterNumber(verses);
    const transaction = client.transaction();
    let chain = transaction   
    addChapterRefToVerse({chain, chaptersByNumber, verses})
    addVersesRefToChapter({chain, versesByChapterNumber, chapters})
    const response = await chain.commit();
    console.log(response);
}

run();