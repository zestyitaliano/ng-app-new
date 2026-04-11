export type { ExtractedImage } from "../../types";

export enum ExtractionStatus {
  IDLE = "IDLE",
  FETCHING_SOURCE = "FETCHING_SOURCE",
  EXTRACTING_REGEX = "EXTRACTING_REGEX",
  VALIDATING = "VALIDATING",
  COMPLETED = "COMPLETED",
  ERROR = "ERROR",
}
