import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

import { dataset, projectId } from '../env';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

export const urlForImage = (source: Image) => {
  return imageBuilder
    ?.image(source)
    .auto('format')
    .fit('max')
    .width(1200)
    .url();
};

export const urlForSmallerImage = (source: Image) => {
  return imageBuilder?.image(source).auto('format').fit('max').width(300).url();
};
