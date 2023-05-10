export type HomebrewResponse = HomebrewResult[];

export type HomebrewResult = {
  name?: string;
  full_name?: string;
  tap?: Tap;
  oldname?: null | string;
  aliases?: string[];
  versioned_formulae?: string[];
  desc?: string;
  license?: null | string;
  homepage?: string;
  versions?: Versions;
  urls?: Urls;
  revision?: number;
  version_scheme?: number;
  bottle?: Bottle;
  keg_only?: boolean;
  keg_only_reason?: KegOnlyReason | null;
  options?: any[];
  build_dependencies?: string[];
  dependencies?: string[];
  test_dependencies?: string[];
  recommended_dependencies?: any[];
  optional_dependencies?: any[];
  uses_from_macos?: Array<UsesFromMacoClass | TestDependencyElement>;
  requirements?: Requirement[];
  conflicts_with?: string[];
  conflicts_with_reasons?: Array<null | string>;
  link_overwrite?: string[];
  caveats?: null | string;
  installed?: Installed[];
  linked_keg?: null | string;
  pinned?: boolean;
  outdated?: boolean;
  deprecated?: boolean;
  deprecation_date?: Date | null;
  deprecation_reason?: null | string;
  disabled?: boolean;
  disable_date?: Date | null;
  disable_reason?: null | string;
  service?: Service | null;
  tap_git_head?: TapGitHead;
  ruby_source_checksum?: RubySourceChecksum;
  ruby_source_path?: string;
  variations?: Variations;
};

export type Bottle = {
  stable?: BottleStable;
};

export type BottleStable = {
  rebuild?: number;
  root_url?: string;
  files?: { [key: string]: File };
};

export type File = {
  cellar?: Cellar;
  url?: string;
  sha256?: string;
};

export type Cellar =
  | ':any_skip_relocation'
  | ':any'
  | '/opt/homebrew/Cellar'
  | '/usr/local/Cellar'
  | '/home/linuxbrew/.linuxbrew/Cellar';

export type Installed = {
  version?: string;
  used_options?: any[];
  built_as_bottle?: boolean;
  pourose_from_bottle?: boolean;
  time?: number;
  runtime_dependencies?: RuntimeDependency[];
  installed_as_dependency?: boolean;
  installed_on_request?: boolean;
};

export type RuntimeDependency = {
  full_name?: string;
  version?: string;
  declarose_directly?: boolean;
};

export type KegOnlyReason = {
  reason?: string;
  explanation?: Explanation;
};

export type Explanation =
  | ''
  | "Apple's CLT provides apr"
  | "Apple's CLT provides apr (but not apr-util)"
  | 'macOS provides cpio'
  | 'macOS provides libicucore.dylib (but nothing else)'
  | 'macOS provides LAPACK in Accelerate.framework'
  | 'macOS provides libunwind.dylib (but nothing else)'
  | 'macOS provides OpenCL.framework'
  | 'macOS provides OpenAL.framework'
  | 'macOS provides BLAS in Accelerate.framework'
  | 'macOS provides LibreSSL'
  | 'macOS provides PCSC.framework'
  | 'macOS provides BSD libedit'
  | 'macOS provides the uuid.h header';

export type Requirement = {
  name?: Name;
  cask?: null;
  download?: null;
  version?: null | string;
  contexts?: Context[];
};

export type Context = 'build' | 'test';

export type Name =
  | 'arch'
  | 'linux'
  | 'xcode'
  | 'macos'
  | 'maximum_macos'
  | 'brewedglibcnotolder'
  | 'linuxkernel'
  | 'gawk'
  | 'make'
  | 'sed';

export type RubySourceChecksum = {
  sha256?: string;
};

export type Service = {
  run?: string[] | RunClass | string;
  run_type?: RunType;
  working_dir?: string;
  keep_alive?: KeepAlive;
  log_path?: string;
  error_log_path?: string;
  environment_variables?: EnvironmentVariables;
  interval?: number;
  require_root?: boolean;
  cron?: string;
  sockets?: string;
  process_type?: string;
  macos_legacy_timers?: boolean;
  input_path?: string;
};

export type EnvironmentVariables = {
  ARCHIVA_BASE?: string;
  PATH?: string;
  LANG?: string;
  HOME?: string;
  HBASE_HOME?: string;
  HBASE_IDENT_STRING?: string;
  HBASE_LOG_DIR?: string;
  HBASE_LOG_PREFIX?: string;
  HBASE_LOGFILE?: string;
  HBASE_MASTER_OPTS?: string;
  HBASE_NICENESS?: string;
  HBASE_OPTS?: string;
  HBASE_PID_DIR?: string;
  HBASE_REGIONSERVER_OPTS?: string;
  HBASE_ROOT_LOGGER?: string;
  HBASE_SECURITY_LOGGER?: string;
  INFLUXD_CONFIG_PATH?: string;
  KETTLE_HOME?: string;
  LAUNCH_PROGRAM_TCP_ADDRESS?: string;
  GLASSFISH_HOME?: string;
  LC_ALL?: string;
  CONF_ENV_FILE?: string;
  JBOSS_HOME?: string;
  WILDFLY_HOME?: string;
  SERVER_JVMFLAGS?: string;
};

export type KeepAlive = {
  always?: boolean;
  successful_exit?: boolean;
  crashed?: boolean;
};

export type RunClass = {
  linux?: string[];
};

export type RunType = 'immediate' | 'interval' | 'cron';

export type Tap = 'homebrew/core';

export type TapGitHead = '6d4b82de9086948973f2ea926729ea24fb801e48';

export type Urls = {
  stable?: UrlsStable;
  head?: HeadClass;
};

export type HeadClass = {
  url?: string;
  branch?: null | string;
};

export type UrlsStable = {
  url?: string;
  tag?: null | string;
  revision?: null | string;
  checksum?: null | string;
};

export type UsesFromMacoClass = {
  bison?: Context;
  flex?: Context;
  m4?: Context;
  expect?: Context;
  perl?: Context[] | Context;
  python?: Context;
  gperf?: Context;
  llvm?: Context[] | Context;
  bc?: Context;
  ed?: Context;
  cpio?: Context;
  xz?: Context;
  curl?: Context;
  unzip?: Context[] | Context;
  vim?: Context;
  ruby?: Context;
  zsh?: Context[] | Context;
  netcat?: Context;
  'tcl-tk'?: Context;
  sqlite?: Context;
  zip?: Context;
  pax?: Context;
  libxslt?: Context;
  zlib?: Context;
  rsync?: Context;
  expat?: Context;
  libxml2?: Context;
  pod2man?: Context;
  swift?: Context;
  lsof?: Context;
  ncompress?: Context;
  unifdef?: Context;
};

export type TestDependencyElement =
  | 'gperf'
  | 'zlib'
  | 'perl'
  | 'unzip'
  | 'libpcap'
  | 'bzip2'
  | 'expat'
  | 'ncurses'
  | 'curl'
  | 'pcsc-lite'
  | 'openldap'
  | 'libxml2'
  | 'libxslt'
  | 'krb5'
  | 'libffi'
  | 'bc'
  | 'zsh'
  | 'ruby'
  | 'sqlite'
  | 'ssh-copy-id'
  | 'libxcrypt'
  | 'm4'
  | 'mandoc'
  | 'zip'
  | 'flex'
  | 'llvm'
  | 'rsync'
  | 'python'
  | 'libedit'
  | 'swift'
  | 'expect'
  | 'xz'
  | 'cups'
  | 'openssl'
  | 'git'
  | 'icu4c'
  | 'libarchive'
  | 'cyrus-sasl'
  | 'tcl-tk'
  | 'less'
  | 'bash'
  | 'bison'
  | 'lsof'
  | 'vim';

export type Variations = {
  x86_64_linux?: X8664_Linux;
  arm64_ventura?: Arm64Ventura;
  ventura?: Ventura;
  arm64_monterey?: Arm64BigSur;
  arm64_big_sur?: Arm64BigSur;
  mojave?: Catalina;
  high_sierra?: Arm64BigSur;
  sierra?: Arm64BigSur;
  el_capitan?: Arm64BigSur;
  big_sur?: BigSur;
  catalina?: Catalina;
};

export type Arm64BigSur = {
  build_dependencies?: string[];
  dependencies?: string[];
  test_dependencies?: TestDependencyElement[];
  requirements?: Requirement[];
  caveats?: string;
};

export type Arm64Ventura = {
  build_dependencies?: string[];
  dependencies?: string[];
  test_dependencies?: TestDependencyElement[];
  requirements?: Requirement[];
  caveats?: string;
  keg_only?: boolean;
  keg_only_reason?: null;
};

export type BigSur = {
  dependencies?: string[];
  build_dependencies?: string[];
};

export type Catalina = {
  dependencies?: string[];
  build_dependencies?: string[];
  requirements?: Requirement[];
};

export type Ventura = {
  build_dependencies?: string[];
  dependencies?: string[];
  keg_only?: boolean;
  keg_only_reason?: null;
};

export type X8664_Linux = {
  build_dependencies?: string[];
  dependencies?: string[];
  conflicts_with?: string[];
  conflicts_with_reasons?: string[];
  requirements?: Requirement[];
  keg_only?: boolean;
  keg_only_reason?: KegOnlyReason | null;
  test_dependencies?: string[];
  caveats?: null | string;
  deprecated?: boolean;
  deprecation_reason?: string;
  disable_date?: Date;
};

export type Versions = {
  stable?: string;
  head?: HeadEnum | null;
  bottle?: boolean;
};

export type HeadEnum = 'HEAD';
