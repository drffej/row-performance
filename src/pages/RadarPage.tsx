import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList
} from '@ionic/react';
import { useAssessment } from '../state/AssessmentContext';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts';

import { ATTRIBUTES } from '../data/attributes';
import '..//theme/global.css';


const RadarPage: React.FC = () => {
  const { athleteScores, coachScores } = useAssessment();
  const data = ATTRIBUTES.map(attr => ({
    attribute: attr.shortLabel,
    athlete: athleteScores[attr.id] ?? 0,
    coach: coachScores[attr.id] ?? 0
  }));
const deltas = ATTRIBUTES.map(attr => {
    const athlete = athleteScores[attr.id] ?? 0;
    const coach = coachScores[attr.id] ?? 0;
    return {  
      ...attr,
      delta: athlete - coach
    };
  });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Performance Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="radar-page">
          <div className="radar-container">
          
          

      <RadarChart data={data} style={{ width: '100%', maxWidth: '1600px', maxHeight: '180vh', aspectRatio: 1.618 }}
      responsive>
                <PolarGrid />
                <PolarAngleAxis dataKey="attribute" />
                <PolarRadiusAxis domain={[0, 10]} />

                <Radar
                  name="Athlete"
                  dataKey="athlete"
                  stroke="var(--ion-color-primary)"
                  fill="var(--ion-color-primary)"
                  fillOpacity={0.35}
                />

                <Radar
                  name="Coach"
                  dataKey="coach"
                  stroke="var(--ion-color-warning)"
                  fill="none"
                  strokeWidth={2}
                />

                <Legend />
              </RadarChart>
          </div>
        </div>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Delta Insights</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonList>
              {deltas.map(d => (
                <IonItem key={d.id}>
                  <IonLabel>
                    <strong>{d.label}</strong>
                    <p>
                      Athlete vs Coach difference
                    </p>
                  </IonLabel>
                  <IonBadge
                    color={d.delta > 0 ? 'success' : d.delta < 0 ? 'danger' : 'medium'}
                  >
                    {d.delta > 0 ? '+' : ''}{d.delta}
                  </IonBadge>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
 export default RadarPage;