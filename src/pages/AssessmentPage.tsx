// src/pages/AssessmentPage.tsx
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/react';

import { ATTRIBUTES } from '../data/attributes';

import { AttributeSlider } from '../components/AttributeSlider';
import { useAssessment } from '../state/AssessmentContext';
const AssessmentPage: React.FC = () => {
  const { athleteScores, updateAthleteScore } = useAssessment();
  const sorted = [...ATTRIBUTES].sort((a, b) => a.order - b.order);
  const attributes = [...ATTRIBUTES].sort((a, b) => a.order - b.order);

  const completedCount = attributes.filter(
    a => athleteScores[a.id] !== undefined
  ).length;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Self Assessment ({completedCount} / {attributes.length} completed)</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {sorted.map(attr => (
          <AttributeSlider
            key={attr.id}
            attribute={attr}
            value={athleteScores[attr.id]}
            onChange={value => updateAthleteScore(attr.id, value)}
          />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default AssessmentPage;