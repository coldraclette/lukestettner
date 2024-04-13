import { type SchemaTypeDefinition } from 'sanity';

import { landingPage } from './schemas/landingPage';
import { project } from './schemas/project';
import { settings } from './schemas/settings';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [landingPage, project, settings],
};
