export type CaskResponse = CaskResult[];

export type CaskResult = {
  token?: string;
  full_token?: string;
  tap?: Tap;
  name?: string[];
  desc?: null | string;
  homepage?: string;
  url?: string;
  url_specs?: CaskResponseURLSpecs;
  appcast?: null;
  version?: string;
  installed?: null;
  outdated?: boolean;
  sha256?: string;
  artifacts?: CaskResponseArtifact[];
  caveats?: null | string;
  depends_on?: CaskResponseDependsOn;
  conflicts_with?: ConflictsWith | null;
  container?: Container | null;
  auto_updates?: boolean | null;
  tap_git_head?: TapGitHead;
  languages?: string[];
  ruby_source_path?: string;
  ruby_source_checksum?: RubySourceChecksum;
  variations?: Variations;
};

export type CaskResponseArtifact = {
  app?: Array<AppClass | string>;
  zap?: UninstallElement[];
  uninstall?: PurpleUninstall[];
  pkg?: Array<PkgClass | string>;
  binary?: Array<AppClass | string>;
  preflight?: null;
  installer?: PurpleInstaller[];
  uninstall_preflight?: null;
  uninstall_postflight?: null;
  screen_saver?: string[];
  manpage?: string[];
  suite?: Array<AppClass | string>;
  postflight?: null;
  artifact?: Array<AppClass | string>;
  prefpane?: string[];
  qlplugin?: string[];
  colorpicker?: string[];
  dictionary?: string[];
  mdimporter?: Array<AppClass | string>;
  keyboard_layout?: string[];
  input_method?: string[];
  audio_unit_plugin?: string[];
  service?: string[];
  vst_plugin?: string[];
  vst3_plugin?: string[];
  stage_only?: boolean[];
  internet_plugin?: string[];
};

export type AppClass = {
  target?: string;
};

export type PurpleInstaller = {
  script?: EarlyScriptClass;
  manual?: string;
};

export type EarlyScriptClass = {
  executable?: string;
  args?: string[];
  sudo?: boolean;
  print_stderr?: boolean;
  input?: Array<InputEnum | number> | string;
  must_succeed?: boolean;
};

export type InputEnum = 'y' | 'Y\n' | 'Yes';

export type PkgClass = {
  choices?: Choice[];
};

export type Choice = {
  choiceIdentifier?: string;
  choiceAttribute?: ChoiceAttribute;
  attributeSetting?: number;
};

export type ChoiceAttribute = 'selected';

export type PurpleUninstall = {
  quit?: string[] | string;
  pkgutil?: string[] | string;
  delete?: string[] | string;
  launchctl?: string[] | string;
  rmdir?: string[] | string;
  script?: ScriptElement[] | EarlyScriptClass | string;
  early_script?: EarlyScriptClass;
  signal?: Array<string[] | string>;
  kext?: string[] | string;
  login_item?: string;
  trash?: string[] | string;
};

export type ScriptElement = {
  executable?: string;
  sudo?: boolean;
  args?: string[];
};

export type UninstallElement = {
  trash?: string[] | string;
  rmdir?: string[] | string;
  delete?: string[] | string;
  launchctl?: string[] | string;
  pkgutil?: string[] | string;
  login_item?: string;
  script?: ScriptElement;
  kext?: string[];
  quit?: string;
  signal?: string[];
};

export type ConflictsWith = {
  cask?: string[];
  formula?: string[];
};

export type Container = {
  type?: ContainerType;
  nested?: string;
};

export type ContainerType = 'naked';

export type CaskResponseDependsOn = {
  macos?: PurpleMacos;
  cask?: string[];
  arch?: Arch[];
  formula?: string[];
};

export type Arch = {
  type?: ArchType;
  bits?: number;
};

export type ArchType = 'arm' | 'intel';

export type PurpleMacos = {
  '>='?: string[];
  '<='?: string[];
  '=='?: string[];
};

export type RubySourceChecksum = {
  sha256?: string;
};

export type Tap = 'homebrew/cask';

export type TapGitHead = 'a6e3bc78ed123fc7e814df0e03ccdfc2177f1c67';

export type CaskResponseURLSpecs = {
  verified?: string;
  user_agent?: UserAgent;
  cookies?: Cookies;
  referer?: string;
  using?: string;
  data?: Data;
};

export type Cookies = {
  MM_TRIALS?: string;
  CrushAuth?: string;
  oraclelicense?: string;
};

export type Data = {
  accept_license_agreement?: string;
  non_emb_ctr?: string;
  submit?: string;
};

export type UserAgent = ':fake';

export type Variations = {
  arm64_ventura?: Arm64;
  arm64_monterey?: Arm64Monterey;
  arm64_big_sur?: Arm64;
  el_capitan?: ElCapitan;
  high_sierra?: Sierra;
  sierra?: Sierra;
  catalina?: Catalina;
  mojave?: Mojave;
  big_sur?: BigSur;
  ventura?: Ventura;
};

export type Arm64 = {
  url?: string;
  sha256?: string;
  artifacts?: Arm64BigSurArtifact[];
  version?: string;
  depends_on?: Arm64BigSurDependsOn;
  url_specs?: Arm64BigSurURLSpecs;
};

export type Arm64BigSurArtifact = {
  uninstall?: UninstallElement[];
  installer?: FluffyInstaller[];
  postflight?: null;
  zap?: PurpleZap[];
  pkg?: string[];
  uninstall_postflight?: null;
  app?: string[];
  binary?: Array<AppClass | string>;
  manpage?: string[];
  artifact?: Array<AppClass | string>;
  preflight?: null;
  uninstall_preflight?: null;
};

export type FluffyInstaller = {
  script?: ScriptElement;
};

export type PurpleZap = {
  trash?: string[] | string;
  rmdir?: string[];
  script?: PurpleScript;
};

export type PurpleScript = {
  executable?: string;
  args?: string[];
};

export type Arm64BigSurDependsOn = {
  macos?: FluffyMacos;
  formula?: string[];
};

export type FluffyMacos = {
  '=='?: string[];
  '>='?: string[];
};

export type Arm64BigSurURLSpecs = {
  verified?: Verified;
  using?: string;
};

export type Verified =
  | 'ds9.si.edu/download/'
  | 'bitbucket.org/objective-see/'
  | 'downloads.atlassian.com/software/sourcetree/';

export type Arm64Monterey = {
  url?: string;
  sha256?: string;
  artifacts?: Arm64BigSurArtifact[];
  version?: string;
  depends_on?: Arm64MontereyDependsOn;
};

export type Arm64MontereyDependsOn = {
  formula?: string[];
};

export type BigSur = {
  url?: string;
  version?: string;
  sha256?: string;
  artifacts?: BigSurArtifact[];
  depends_on?: BigSurDependsOn;
  url_specs?: Arm64BigSurURLSpecs;
};

export type BigSurArtifact = {
  app?: string[];
  binary?: Array<AppClass | string>;
  zap?: FluffyZap[];
  uninstall?: FluffyUninstall[];
  artifact?: Array<AppClass | string>;
  uninstall_preflight?: null;
  pkg?: string[];
  postflight?: null;
};

export type FluffyUninstall = {
  quit?: string;
  delete?: string;
  pkgutil?: string;
  launchctl?: string[];
};

export type FluffyZap = {
  trash?: string[];
};

export type BigSurDependsOn = {
  macos?: FluffyMacos;
};

export type Catalina = {
  url?: null | string;
  version?: string;
  sha256?: null | string;
  artifacts?: CatalinaArtifact[];
  depends_on?: BigSurDependsOn;
  caveats?: string;
  url_specs?: Arm64BigSurURLSpecs | null;
};

export type CatalinaArtifact = {
  app?: string[];
  binary?: Array<AppClass | string>;
  zap?: FluffyZap[];
  preflight?: null;
  uninstall?: TentacledUninstall[];
  pkg?: Array<PkgClass | string>;
  artifact?: Array<AppClass | string>;
  uninstall_preflight?: null;
  postflight?: null;
  installer?: TentacledInstaller[];
};

export type TentacledInstaller = {
  manual?: string;
};

export type TentacledUninstall = {
  pkgutil?: string[] | string;
  launchctl?: string[] | LaunchctlEnum;
  quit?: string;
  delete?: string[] | string;
  signal?: string[];
};

export type LaunchctlEnum = 'com.microsoft.office.licensingV2.helper';

export type ElCapitan = {
  url?: null | string;
  url_specs?: Arm64BigSurURLSpecs | null;
  version?: null | string;
  sha256?: null | string;
  artifacts?: ElCapitanArtifact[];
  depends_on?: BigSurDependsOn;
  caveats?: string;
};

export type ElCapitanArtifact = {
  app?: string[];
  binary?: Array<AppClass | string>;
  zap?: TentacledZap[];
  uninstall?: StickyUninstall[];
  installer?: FluffyInstaller[];
  prefpane?: string[];
  preflight?: null;
  pkg?: Array<PkgClass | string>;
  artifact?: Array<AppClass | string>;
  manpage?: string[];
  uninstall_preflight?: null;
  postflight?: null;
};

export type StickyUninstall = {
  script?: ScriptElement;
  pkgutil?: string[] | string;
  quit?: string[] | string;
  launchctl?: string[] | LaunchctlEnum;
  delete?: string[] | string;
  kext?: string;
  signal?: Array<SignalEnum[] | string>;
  login_item?: string;
};

export type SignalEnum =
  | 'TERM'
  | 'org.pqrs.Karabiner-Menu'
  | 'org.pqrs.Karabiner-NotificationWindow';

export type TentacledZap = {
  trash?: string[] | string;
  rmdir?: string[] | string;
};

export type Sierra = {
  url?: null | string;
  sha256?: null | string;
  url_specs?: Arm64BigSurURLSpecs | null;
  version?: null | string;
  artifacts?: HighSierraArtifact[];
  depends_on?: BigSurDependsOn;
  caveats?: string;
};

export type HighSierraArtifact = {
  app?: string[];
  binary?: Array<AppClass | string>;
  zap?: StickyZap[];
  uninstall?: StickyUninstall[];
  installer?: FluffyInstaller[];
  prefpane?: string[];
  preflight?: null;
  pkg?: Array<PkgClass | string>;
  artifact?: Array<AppClass | string>;
  manpage?: string[];
  uninstall_preflight?: null;
  postflight?: null;
};

export type StickyZap = {
  trash?: string[] | string;
  rmdir?: string;
};

export type Mojave = {
  url?: null | string;
  version?: null | string;
  sha256?: null | string;
  artifacts?: MojaveArtifact[];
  url_specs?: Arm64BigSurURLSpecs | null;
  depends_on?: BigSurDependsOn;
  caveats?: string;
};

export type MojaveArtifact = {
  app?: string[];
  binary?: Array<AppClass | string>;
  zap?: StickyZap[];
  uninstall?: StickyUninstall[];
  installer?: FluffyInstaller[];
  preflight?: null;
  pkg?: Array<PkgClass | string>;
  artifact?: Array<AppClass | string>;
  manpage?: string[];
  uninstall_preflight?: null;
  postflight?: null;
};

export type Ventura = {
  version?: string;
  sha256?: string;
  depends_on?: BigSurDependsOn;
  url?: string;
  artifacts?: BigSurArtifact[];
};
