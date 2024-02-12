import { landingPage } from './schemas/landingPage';
import { type SchemaTypeDefinition } from 'sanity';

import { project } from './schemas/project';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [landingPage, project],
};
