const fs = require('fs');
const jq = require('node-jq');
const lodash = require('lodash')

function verses(){
    const inputFilepath  = './data/json/verses.json'
const outputFilepath = './data/json-transformed/verses.json'
const file = fs.readFileSync(inputFilepath, 'utf-8');
const data = JSON.parse(file)
const response = data.map(verse => {
    verse._type = 'verse'
    verse._id = `${verse.id}`    
    verse.title = `Verse ${verse.id}`
    verse.verse_number = parseInt(verse.verse_number)
    delete verse.id    
    return verse;
})
fs.writeFileSync(outputFilepath, JSON.stringify(response, null, 2))
}

function chapters(){
    const inputFilepath  = './data/json/chapters.json'
const outputFilepath = './data/json-transformed/chapters.json'
const file = fs.readFileSync(inputFilepath, 'utf-8');
const data = JSON.parse(file)
let response = data.map(chapter => {
    chapter._type = 'chapter'
    //chapter._id = `${chapter.id}`    
    chapter.title = `chapter ${chapter.id}`
    chapter.chapter_number = parseInt(chapter.chapter_number)
    delete chapter.id    
    return chapter;
})
response = lodash.sortBy(response, [o => parseInt(o._id)]);
console.log(response.map(r => r._id).join(","));
fs.writeFileSync(outputFilepath, JSON.stringify(response, null, 2))
}

chapters();
verses();