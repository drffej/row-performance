// src/pages/AssessmentPage.tsx
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItemDivider,
  IonIcon,
  IonItemGroup,
  IonLabel,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import { fitnessOutline, constructOutline, trophyOutline } from 'ionicons/icons';

import { ATTRIBUTES } from '../data/attributes';
import { AttributeSlider } from '../components/AttributeSlider';
import { useAssessment } from '../state/AssessmentContext';

const domainIcons: Record<string, string> = {
  physiology: fitnessOutline,
  technique: constructOutline,
  performance: trophyOutline
};

const AssessmentPage: React.FC = () => {
  const { athleteScores, updateAthleteScore } = useAssessment();

  // Sort attributes by order
  const sorted = [...ATTRIBUTES].sort((a, b) => a.order - b.order);

  // Group attributes by domain
  const grouped: Record<string, typeof sorted> = sorted.reduce((acc, attr) => {
    if (!acc[attr.domain]) acc[attr.domain] = [];
    acc[attr.domain].push(attr);
    return acc;
  }, {} as Record<string, typeof sorted>);

  const completedCount = sorted.filter(a => athleteScores[a.id] !== undefined).length;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/athlete-list" />
          </IonButtons>
          <IonTitle>
            Athlete Assessment ({completedCount}/{sorted.length} completed)
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent color="tertiary">
        {Object.entries(grouped).map(([domain, attrs]) => (
          <IonItemGroup key={domain}>
          
            <IonItemDivider
              sticky
              style={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: 'bold',
                fontSize: '1.1em'
              }}
              color="tertiary"
            >
              <IonIcon icon={domainIcons[domain]} slot="start" />
              {domain.charAt(0).toUpperCase() + domain.slice(1)}
            </IonItemDivider>

            {attrs.map(attr => (
              <AttributeSlider
                key={attr.id}
                attribute={attr}
                value={athleteScores[attr.id]}
                onChange={value => updateAthleteScore(attr.id, value)}
              />
            ))}
          
          </IonItemGroup>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default AssessmentPage;
