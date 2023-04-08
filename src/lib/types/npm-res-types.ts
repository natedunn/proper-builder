export type NPMResult = {
  package?: Package;
  score?: Score;
  searchScore?: number;
  highlight?: string;
  flags?: Flags;
};

export type Flags = {
  unstable?: boolean;
};

export type Package = {
  name: string;
  scope?: Scope;
  version?: string;
  description?: string;
  keywords?: string[];
  date?: Date;
  links?: Links;
  author?: Author;
  publisher?: Publisher;
  maintainers?: Publisher[];
};

export type Author = {
  name?: string;
  email?: string;
  username?: string;
  url?: string;
};

export type Links = {
  npm?: string;
  homepage?: string;
  repository?: string;
  bugs?: string;
};

export type Publisher = {
  username?: string;
  email?: string;
};

export type Scope = "unscoped" | "node-rs";

export type Score = {
  final?: number;
  detail?: Detail;
};

export type Detail = {
  quality?: number;
  popularity?: number;
  maintenance?: number;
};
