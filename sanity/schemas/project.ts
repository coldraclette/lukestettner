export const project = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the project. This will be shown under the project row and as the title in the modal.',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Subtitle of the project. This will be shown under the project row.'
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'Year of the project',
    },
    {
      name: 'items',
      title: 'Items',
      description: 'Add an image, a video or a textblock',
      type: 'array',
      of: [
        {
          name: 'textblock',
          type: 'object',
          title: 'Text block',
          fields: [
            {
              type: 'text',
              name: 'text',
              title: 'Text block',
            },
          ],
        },
        {
          name: 'image',
          type: 'image',
          fields: [{ name: 'caption', type: 'string', title: 'Caption' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      year: 'year',
      media: 'items',
    },
    prepare({ title, subtitle, year, media }: any) {
      return {
        title,
        subtitle: subtitle ? `${subtitle}, ${year}` : year,
        media: media ? media[0] : null,
      };
    },
  },
};
