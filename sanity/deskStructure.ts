import { DocumentIcon } from '@sanity/icons';

export const structure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Landing Page')
        .icon(DocumentIcon)
        .child(
          S.document()
            .schemaType('landingPage')
            .documentId('landingPage')
            .title('Landing Page')
        ),
      S.divider(),
      S.listItem()
        .title('Projects')
        .icon(DocumentIcon)
        .child(
          S.documentList()
            .title('Projects')
            .filter('_type == "project"')
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
        ),
      S.divider(),
      S.listItem()
        .title('Settings')
        .icon(DocumentIcon)
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
            .title('Settings')
        ),
    ]);
