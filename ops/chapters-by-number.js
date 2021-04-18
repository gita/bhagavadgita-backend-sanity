module.exports = function (chapters){
    console.log(chapters);
    return chapters.reduce((acc, curr) => {
        return {
            ...acc,
            [curr.chapter_number] : curr
        }
    },{})
}