// LocalStorage helpers
export const loadJSON = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const saveJSON = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data, null, 2));
};

// Assessment helpers


import { ASSESSMENTS_KEY, CRITERIA_KEY } from '../data/types';

// Start a new assessment
function startAssessment(athleteId : string, notesWentWell = '', notesFocus = '') {
  const assessments = loadJSON(ASSESSMENTS_KEY);
  const criteria = loadJSON(CRITERIA_KEY);

  const assessmentId = `assessment-${Date.now()}`;
  const results = criteria.map((c: any) => ({
    criteria_id: c.id,
    athlete_score: null,
    coach_score: null,
    athlete_comment: "",
    coach_comment: ""
  }));

  const assessment = {
    id: assessmentId,
    athlete_id: athleteId,
    date: new Date().toISOString().split('T')[0], // yyyy-mm-dd
    notes_went_well: notesWentWell,
    notes_focus: notesFocus,
    results
  };

  assessments.push(assessment);
  saveJSON(ASSESSMENTS_KEY, assessments);
  return assessmentId;
}
// List assessments, optionally filtered by athleteId
function listAssessments(athleteId = null) {
  const assessments = loadJSON(ASSESSMENTS_KEY);
  return athleteId ? assessments.filter((a: any) => a.athlete_id === athleteId) : assessments;
}
// Update assessment result
// athleteScore and coachScore can be null to skip updating
function updateAssessmentResult(assessmentId: string, criteriaId : string, athleteScore = null, coachScore = null, athleteComment = '', coachComment = '') {
  const assessments = loadJSON(ASSESSMENTS_KEY);
  const assessment = assessments.find((a: any) => a.id === assessmentId);
  if (!assessment) return false;

  const result = assessment.results.find((r: any) => r.criteria_id === criteriaId);
  if (!result) return false;

  if (athleteScore !== null) result.athlete_score = athleteScore;
  if (coachScore !== null) result.coach_score = coachScore;
  result.athlete_comment = athleteComment;
  result.coach_comment = coachComment;

  saveJSON(ASSESSMENTS_KEY, assessments);
  return true;
}
export { startAssessment, listAssessments, updateAssessmentResult };