export default {
  name: "gita_chapter",
  title: "Gita Chapter",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc) => `chapter-${doc.chapter_number}-${doc.name}`,
        maxLength: 100,
      },
    },
    {
      name: "name",
      title: "name",
      type: "string",
    },
    {
      name: "name_transliterated",
      title: "name transliterated",
      type: "string",
    },
    {
      name: "name_translation",
      title: "name translation",
      type: "string",
    },
    {
      name: "verses_count",
      title: "verses count",
      type: "number",
    },
    {
      name: "chapter_number",
      title: "chapter number",
      type: "number",
    },
    {
      name: "externalId",
      title: "ExternalId",
      type: "number",
    },
    {
      name: "name_meaning",
      title: "name meaning",
      type: "string",
    },
    {
      name: "image_name",
      title: "image name",
      type: "string",
    },
    {
      name: "chapter_summary",
      title: "chapter summary",
      type: "string",
    },
    {
      name: "verses",
      title: "Verses",
      type: "array",
      of: [
        {
          type: "reference",
          weak: true,
          to: [
            {
              type: "gita_verse",
            },
          ],
          options: {
            filter: ({document}) => {
              return {
                filter: 'chapter_number == $chapter_number',
                params: {
                  chapter_number: document.chapter_number
                }
              }
            }
          }
        },
      ],
    },
  ],
  orderings: [
    {
      title: 'Chapter Number',
      name: 'chapter_number_asc',
      by: [
        {field: 'chapter_number', direction: 'asc'}
      ]
    }
  ]
};
