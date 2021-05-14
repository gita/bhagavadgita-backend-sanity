export default {
  name: "commentary",
  title: "Commentary",
  type: "document",
  fields: [
    {
      name: 'description',
      type: 'string',
      title: 'Description',
      // of: [
      //   {
      //     type: 'block'
      //   },
      //   {
      //     type: 'image'
      //   },
      // ]
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    },
    // {
    //   name: "language",
    //   title: "Language",
    //   type: "string",
    //   // of: [
    //   //   {
    //   //     type: "string"
    //   //   }
    //   // ]
    // },
    {
      name: "language",
      title: "Language",
      type: "reference",
      to: { type: "language" },
    },

    {
      name: "verse",
      title: "Verse",
      type: "reference",
      to: { type: "gita_verse" },
    },

  ],

};