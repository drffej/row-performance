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
const CoachAssessmentPage: React.FC = () => {
  const { coachScores, updateCoachScore } = useAssessment();
  const sorted = [...ATTRIBUTES].sort((a, b) => a.order - b.order);
  const attributes = [...ATTRIBUTES].sort((a, b) => a.order - b.order);

  const completedCount = attributes.filter(
    a => coachScores[a.id] !== undefined
  ).length;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Coach Assessment ({completedCount} / {attributes.length} completed)</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {sorted.map(attr => (
          <AttributeSlider
            key={attr.id}
            attribute={attr}
            value={coachScores[attr.id]}
            onChange={value => updateCoachScore(attr.id, value)}
          />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default CoachAssessmentPage;