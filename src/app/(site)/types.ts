export interface ProjectProps {
  _id: string;
  title: string;
  subtitle: string | null;
  year: string | null;
  items: Array<ProjectImage | ProjectTextBlock>;
}

export type ProjectImage = {
  _type: 'image';
  _key: string;
  asset: {
    _ref: string;
    _type: 'reference';
    metadata: {
      lqip: string;
      dimensions: {
        aspectRatio: number;
      }
    };
  };
  caption?: string;
};

export type ProjectTextBlock = {
  _type: 'textblock';
  _key: string;
  text: string;
};
