export default {
    name: 'verse',
    title: 'Verse',
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
            name: 'meaning',
            title: 'Meaning',
            type: 'string',
          },
    ]
}    