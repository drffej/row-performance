import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/react';
import { useParams } from 'react-router';

import { Athlete, Assessment, ATHLETES_KEY, ASSESSMENTS_KEY } from '../data/types';
import { loadJSON, saveJSON } from '../components/helpers';
import { add } from 'ionicons/icons';



const AthleteAssessments: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  useEffect(() => {
    const athletes = loadJSON(ATHLETES_KEY);
    const allAssessments = loadJSON(ASSESSMENTS_KEY);

    setAthlete(athletes.find((a: Athlete) => a.id === id));
    setAssessments(
      allAssessments
        .filter((a: Assessment) => a.athlete_id === id)
        .sort((a: Assessment, b: Assessment) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        )
    );
  }, [id]);

  if (!athlete) return null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/athletes" />
          </IonButtons>
          <IonTitle>{athlete.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton href={`/athlete/${id}/new`}>
              + Assessment
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent color="tertiary">
        <IonList>
          {assessments.map(assessment => (
            <IonItem
              key={assessment.id}
              button
              detail
              lines="full"
              href={`/assessment/${assessment.id}`}
            >
              <IonLabel>
                <h2>{assessment.date}</h2>
                {assessment.notes_went_well && (
                  <p>Went well: {assessment.notes_went_well}</p>
                )}
                {assessment.notes_focus && (
                  <p>Focus: {assessment.notes_focus}</p>
                )}
              </IonLabel>
            </IonItem>
          ))}

          {assessments.length === 0 && (
            <IonItem>
              <IonLabel>No assessments yet. Please add one.</IonLabel>
            </IonItem>
          )}
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton  href={`/athlete/${id}/new`}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default AthleteAssessments;
