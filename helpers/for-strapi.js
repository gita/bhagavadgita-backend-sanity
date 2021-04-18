const fs = require("fs");
const jq = require("node-jq");
const lodash = require("lodash");
const uuid = require("uuid");

function verses() {
  const inputFilepath = "./data/json/verses.json";
  const outputFilepath = "./data/json-transformed-for-strapi/verses.json";
  const file = fs.readFileSync(inputFilepath, "utf-8");
  const data = JSON.parse(file);
  const response = data.map((verse) => {
    verse.verse_number = parseInt(verse.verse_number);
    verse.externalId = verse.id;
    delete verse.id;
    return verse;
  });
  fs.writeFileSync(outputFilepath, JSON.stringify(response, null, 2));
}

function chapters() {
  const inputFilepath = "./data/json/chapters.json";
  const outputFilepath = "./data/json-transformed-for-strapi/chapters.json";
  const file = fs.readFileSync(inputFilepath, "utf-8");
  const data = JSON.parse(file);
  let response = data.map((chapter) => {
    chapter.title = `Chapter ${chapter.id}`;
    chapter.chapter_number = parseInt(chapter.chapter_number);
    chapter.externalId = chapter.id;
    delete chapter.id;
    return chapter;
  });
  response = lodash.sortBy(response, [(o) => parseInt(o._id)]);
  fs.writeFileSync(outputFilepath, JSON.stringify(response, null, 2));
}

chapters();
verses();
