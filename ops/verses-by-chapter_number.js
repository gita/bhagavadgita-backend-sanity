module.exports = function (verses){
    console.log(verses);
    return verses.reduce((acc, curr) => {
        return {
            ...acc,
            [curr.chapter_number] : ([...(acc[curr.chapter_number] || []), curr])
        }
    },{})
}