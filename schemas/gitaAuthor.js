import UserIcon from 'part:@sanity/base/user-icon'

export default {
    name: 'gita_author',
    title: 'Gita Author',
    type: 'document',
    icon: UserIcon,
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',

        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 100,
            },
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


          {
            name: "translations",
            title: "Translations",
            type: "array",
            of: [
              {
                type: "reference",
                weak: true,
                to: [
                  {
                    type: "gita_translation",
                  },
                ],
              },
            ],
          },



   
    ],
    
}
