export type MASResponse = {
  resultCount?: number;
  results?: MASResult[];
};

export type MASResult = {
  supportedDevices?: string[];
  advisories?: string[];
  features?: string[];
  isGameCenterEnabled?: boolean;
  screenshotUrls?: string[];
  ipadScreenshotUrls?: string[];
  appletvScreenshotUrls?: any[];
  artworkUrl60?: string;
  artworkUrl512?: string;
  artworkUrl100?: string;
  artistViewUrl?: string;
  kind?: string;
  currency?: string;
  releaseNotes?: string;
  artistId?: number;
  artistName?: string;
  genres?: string[];
  price?: number;
  description?: string;
  genreIds?: string[];
  bundleId?: string;
  trackId?: number;
  trackName?: string;
  primaryGenreName?: string;
  primaryGenreId?: number;
  releaseDate?: Date;
  sellerName?: string;
  currentVersionReleaseDate?: Date;
  minimumOsVersion?: string;
  trackCensoredName?: string;
  languageCodesISO2A?: string[];
  fileSizeBytes?: string;
  formattedPrice?: string;
  contentAdvisoryRating?: string;
  averageUserRatingForCurrentVersion?: number;
  userRatingCountForCurrentVersion?: number;
  averageUserRating?: number;
  trackViewUrl?: string;
  trackContentRating?: string;
  isVppDeviceBasedLicensingEnabled?: boolean;
  version?: string;
  wrapperType?: string;
  userRatingCount?: number;
  sellerUrl?: string;
};
