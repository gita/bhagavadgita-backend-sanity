export default {
  name: 'gita_verse',
  title: 'Gita Verse',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: doc => `chapter-${doc.verse_number}-${doc.title}`,
        maxLength: 100,
      },
    },
    {
      title: 'Chapter',
      name: 'chapter',
      type: 'reference',
      weak: true,
      to: [{
        type: 'gita_chapter'
      }],
      options: {
        filter: ({ document }) => {
          return {
            filter: 'chapter_number == $chapter_number',
            params: {
              chapter_number: document.chapter_number
            }
          }
        }
      }
    },
    {
      name: 'chapter_number',
      title: 'Chapter Number',
      type: 'number',
    },
    {
      name: 'verse_order',
      title: 'Verse Order',
      type: 'number',
    },
    {
      name: 'verse_number',
      title: 'Verse Number',
      type: 'number',
    },
    {
      name: 'overview',
      title: 'Overview',
      type: 'blockContent',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'string',
    },
    {
      name: 'transliteration',
      title: 'Transliteration',
      type: 'string',
    },
    {
      name: 'word_meanings',
      title: 'Word Meanings',
      type: 'string',
    },
    {
      name: "externalId",
      title: "ExternalId",
      type: "number",
    },
    {
      name: 'meaning',
      title: 'Meaning',
      type: 'string',
    },
    {
      name: "commentaries",
      title: "Commentaries",
      type: "array",
      of: [
        {
          type: "reference",
          weak: true,
          to: [
            {
              type: "gita_commentary",
            },
          ],
        },
      ],
    },
  ],
  orderings: [
    {
      title: 'Verse Order',
      name: 'verse_order_asc',
      by: [
        { field: 'verse_order', direction: 'asc' }
      ]
    }
  ]
}