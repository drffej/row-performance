import { useState } from 'react';

export type Scores = Record<string, number>;

export function useAssessment(attributeIds: string[]) {
  const initial: Scores = {};
  attributeIds.forEach(id => (initial[id] = 0));

  const [scores, setScores] = useState<Scores>(initial);

  const updateScore = (id: string, value: number) => {
    setScores(prev => ({ ...prev, [id]: value }));
  };

  return { scores, updateScore };
}
