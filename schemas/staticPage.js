export default {
    name: "staticPage",
    title: "staticPage",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "subtitle",
            title: "Subtitle",
            type: "string",

        },
        {
            name: 'content',
            type: 'array',
            title: 'Content',
            of: [
                {
                    type: 'block'
                },
                {
                    type: 'image'
                },
            ]
        },
    ],

};