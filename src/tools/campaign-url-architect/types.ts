
// Interface for custom parameters
export interface CustomParam {
  id: string;
  key: string;
  value: string;
}

export interface UTMParameters {
  websiteUrl: string;
  campaignId: string;
  campaignSource: string;
  campaignMedium: string;
  campaignName: string;
  campaignTerm: string;
  campaignContent: string;
  customParams: CustomParam[];
}

export interface SavedLink extends UTMParameters {
  id: string;
  fullUrl: string;
  createdAt: number;
}

/**
 * Interface representing a UTM parameter suggestion from Gemini AI.
 */
export interface AISuggestion {
  campaignSource: string;
  campaignMedium: string;
  campaignName: string;
  reasoning: string;
}
