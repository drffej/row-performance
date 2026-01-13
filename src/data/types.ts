
export interface Athlete {
  id: string;
  name: string;
  email: string;
  status?: string;
}

export interface AssessmentResult {
  criteria_id: string;

  athlete_score: number | null;
  coach_score: number | null;

  athlete_comment?: string;
  coach_comment?: string;
}

export interface Assessment {
  id: string;
  athlete_id: string;

  /** ISO date: yyyy-mm-dd */
  date: string;

  notes_went_well?: string;
  notes_focus?: string;

  results: AssessmentResult[];
}

// Keys
export const ATHLETES_KEY = 'rowing:athletes';
export const CRITERIA_KEY = 'rowing:criteria';
export const ASSESSMENTS_KEY = 'rowing:assessments';
export const CPD_KEY = 'rowing:cpd';
