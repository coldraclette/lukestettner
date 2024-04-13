export const settings = {
  title: 'Settings',
  name: 'settings',
  type: 'document',
  fields: [
    {
      name: 'googleFontName',
      title: 'Google Font Name',
      type: 'string',
      description:
        'Enter the exact name of the Google Font to use, e.g., "Roboto" "Old Standard TT".',
    },
    {
      name: 'fontColor',
      title: 'Font Color',
      type: 'color',
      description: 'The color of the font.',
    },
  ],
};
