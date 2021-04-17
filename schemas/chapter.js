export default {
  name: "chapter",
  title: "Chapter",
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
      name: "verses",
      title: "Verses",
      type: "array",
      of: [{ type: "verse" }],
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
  ],
};
