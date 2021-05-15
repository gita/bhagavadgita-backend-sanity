const sanityClient = require('@sanity/client')
console.log(process.env);

const client = sanityClient({
  projectId: "08ar7hpl",
  dataset: 'production',
  apiVersion: '2021-04-18', // use current UTC date - see "specifying API version"!
  token: "sk0OAruHtrjLdkieBt1HSNpZc8MnYTEM4rN2PN2dFKR34VX3UeK2SwZKhXZsunIKNWXScPJ8heYWspT6M", // or leave blank for unauthenticated usage
  // token: process.env.SANITY_TOKEN, // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
})

module.exports = client;


