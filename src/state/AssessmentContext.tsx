// src/state/AssessmentContext.tsx
import React, { createContext, useContext, useState } from 'react';

export type Scores = Record<string, number>;

interface AssessmentContextValue {
  athleteScores: Scores;
  coachScores: Scores;
  updateAthleteScore: (id: string, value: number) => void;
  updateCoachScore: (id: string, value: number) => void;
}

const AssessmentContext = createContext<AssessmentContextValue | undefined>(
  undefined
);

export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [athleteScores, setAthleteScores] = useState<Scores>({});
  const [coachScores, setCoachScores] = useState<Scores>({});

  const updateAthleteScore = (id: string, value: number) =>
    setAthleteScores(prev => ({ ...prev, [id]: value }));

  const updateCoachScore = (id: string, value: number) =>
    setCoachScores(prev => ({ ...prev, [id]: value }));

  return (
    <AssessmentContext.Provider
      value={{
        athleteScores,
        coachScores,
        updateAthleteScore,
        updateCoachScore
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const ctx = useContext(AssessmentContext);
  if (!ctx) {
    throw new Error('useAssessment must be used within AssessmentProvider');
  }
  return ctx;
};