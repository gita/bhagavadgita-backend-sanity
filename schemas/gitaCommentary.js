export default {
  name: "gita_commentary",
  title: "Commentary",
  type: "document",
  fields: [
    {
      name: 'description',
      type: 'string',
      title: 'Description',
      
    },
    {
      name: "authorName",
      title: "Author Name",
      type: "string",
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "gita_author" },
    },
    {
      name: "lang",
      title: "Lang",
      type: "string",
    },
    {
      name: "language",
      title: "Language",
      type: "reference",
      to: { type: "gita_language" },
    },

    {
      name: "verseNumber",
      title: "VerseNumber",
      type: "string",
    },


    {
      name: "verse",
      title: "Verse",
      type: "reference",
      to: { type: "gita_verse" },
    },

  ],

};