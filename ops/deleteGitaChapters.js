// import client from 'part:@sanity/base/client'
const client = require("./client");

client
  .delete({query: '*[_type == "chapter"][0...999]'})
  .then(console.log)
  .catch(console.error)