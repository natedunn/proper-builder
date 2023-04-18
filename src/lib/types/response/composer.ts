export type ComposerResponse = {
  results?: ComposerResult[];
  total?: number;
  next?: string;
};

export type ComposerResult = {
  name?: string;
  description?: string;
  url?: string;
  repository?: string;
  downloads?: number;
  favers?: number;
  abandoned?: boolean | string;
};
