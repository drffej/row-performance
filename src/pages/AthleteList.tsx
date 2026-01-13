import React, { useEffect, useState } from 'react';
import {
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonAlert,
  AlertInput,
  IonSearchbar,
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/react';

import { Athlete, Assessment, ATHLETES_KEY, ASSESSMENTS_KEY } from '../data/types';
import { loadJSON, saveJSON } from '../components/helpers';
import { add } from 'ionicons/icons';
import { AvatarItem } from '../components/AvatarItem';
  


const AthleteList: React.FC = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [showAddAlert, setShowAddAlert] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    const athletesData: Athlete[] = loadJSON(ATHLETES_KEY);
    const assessmentsData: Assessment[] = loadJSON(ASSESSMENTS_KEY);
    setAthletes(athletesData);
    setAssessments(assessmentsData);
  }, []);

  // Compute number of assessments and last date
  const getAthleteStats = (athleteId: string) => {
    const athleteAssessments = assessments.filter(a => a.athlete_id === athleteId);
    const count = athleteAssessments.length;
    const lastDate = count
      ? athleteAssessments
          .map(a => new Date(a.date))
          .sort((a, b) => b.getTime() - a.getTime())[0]
          .toISOString()
          .split('T')[0]
      : 'N/A';
    return { count, lastDate };
  };

  // Add athlete
  const addAthlete = (name: string, email: string) => {
    if (!name) return;

    const id = `athlete-${Date.now()}`;
    const newAthlete: Athlete = { id, name: name, email: email, status: 'active' };

    const updatedAthletes = [...athletes, newAthlete];
    setAthletes(updatedAthletes);
    saveJSON(ATHLETES_KEY, updatedAthletes);

    // Reset form
    setShowAddAlert(false);
  };

  const handleSearchInput = (ev:Event) => {
    let query = '';
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();
    setSearchQuery(query) 
  };
  
  // return true if searchQuery matches user property
  const filterAthlete = (athlete: Athlete) => {
    if (athlete.name.toLowerCase().includes(searchQuery))
      return true;
    if (athlete.email.toLowerCase().includes(searchQuery))
      return true;
    return false
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>
            Athletes
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent color="tertiary" fullscreen>
        <IonSearchbar showClearButton="focus" color="light" onIonInput={(ev) => handleSearchInput(ev)} />
        <IonList inset={true}>
          {athletes.filter(filterAthlete).map(athlete => {
            const stats = getAthleteStats(athlete.id);
            return (
              <IonItem key={athlete.id} button detail={true} lines="full" href={`/tabs/athlete-list/assessment/${athlete.id}`}>
                <AvatarItem name={athlete.name} />
                <IonLabel>
                  <h2>{athlete.name}</h2>
                  <p>Assessments: {stats.count}</p>
                  <p>Last assessment: {stats.lastDate}</p>
                </IonLabel>
                <IonBadge slot="end">{athlete.status || 'active'}</IonBadge>
              </IonItem>
            );
          })}
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowAddAlert(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        { athletes.length === 0 && (
          <IonList inset={true}>
          <IonItem>
            <IonLabel >No athletes found. Please add an athlete.</IonLabel>
          </IonItem>
          </IonList>
        )}

        {/* Add Athlete Alert */}
        <IonAlert
          isOpen={showAddAlert}
          onDidDismiss={() => setShowAddAlert(false)}
          header="Add Athlete"
          inputs={[
            { name: 'name', type: 'text', placeholder: 'Name' },
            { name: 'email', type: 'email', placeholder: 'Email' }
          ]}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => setShowAddAlert(false)
            },
            {
              text: 'Add',
              handler: (data) => {
                // data is an object with input values: { name: '...', email: '...' }
                console.log('Alert data:', data);
                addAthlete(data.name, data.email); // pass it to your add function if needed
              }
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default AthleteList;
