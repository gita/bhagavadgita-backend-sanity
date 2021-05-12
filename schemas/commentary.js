export default {
    name: "commentary",
    title: "Commentary",
    type: "document",
    fields: [
        {
            name: 'description',
            type: 'array',
            title: 'Description',
            of: [
                {
                    type: 'block'
                },
                {
                    type: 'image'
                },
            ]
        },
        {
            name: "author",
            title: "Author",
            type: "reference",
            to: { type: "author" },
        },
        {
            name: "verse",
            title: "Verse",
            type: "reference",
            to: { type: "gita_verse" },
        },
        {
            name: "tags",
            title: "Tags",
            type: "array",
            of: [
              {
                type: "reference",
                weak: true,
                to: [
                  {
                    type: "gita_tag",
                  },
                ],
                
              },
            ],
          },
    ],

};
