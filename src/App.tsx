// app/src/App.tsx
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  clipboardOutline,
  peopleOutline,
  personOutline,
  trailSignOutline,
} from 'ionicons/icons';

import { Suspense, lazy } from 'react';

/* Core CSS */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional utilities */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Dark mode */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme */
import './theme/variables.css';
import './App.css';

import { AssessmentProvider } from './state/AssessmentContext';
import SplashScreen from './components/SplashScreen';

/* Lazy-loaded pages */
const AssessmentPage = lazy(() => import('./pages/AssessmentPage'));
const CoachAssessmentPage = lazy(() => import('./pages/CoachAssessmentPage'));
const RadarPage = lazy(() => import('./pages/RadarPage'));
const AthleteList = lazy(() => import('./pages/AthleteList'));
const AthleteAssessments = lazy(() => import('./pages/AthleteAssessments'));

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <AssessmentProvider>
      <IonReactRouter>
        <IonTabs>

          <IonRouterOutlet>
            <Suspense fallback={<SplashScreen />}>
              <Switch>
                {/* Redirect from root */}
                <Route exact path="/" render={() => <Redirect to="/tabs/assessment" />} />

                {/* Pages */}
                <Route exact path="/tabs/athlete-list" component={AthleteList} />
                <Route exact path="/tabs/assessment" component={AssessmentPage} />
                <Route exact path="/tabs/coach-assessment" component={CoachAssessmentPage} />
                <Route exact path="/tabs/radar" component={RadarPage} />
                <Route exact path="/tabs/athlete-list/assessment/:id" component={AthleteAssessments} />
                <Route exact path="/tabs/athlete-list/assessment/:id/new" component={AssessmentPage} />
              </Switch>
            </Suspense>
          </IonRouterOutlet>

          <IonTabBar slot="bottom" color="primary">
            <IonTabButton tab="athletes" href="/tabs/athlete-list">
              <IonIcon icon={peopleOutline} />
              <IonLabel>Athletes</IonLabel>
            </IonTabButton>

            <IonTabButton tab="assessment" href="/tabs/assessment">
              <IonIcon icon={clipboardOutline} />
              <IonLabel>Assessment</IonLabel>
            </IonTabButton>

            <IonTabButton tab="coach" href="/tabs/coach-assessment">
              <IonIcon icon={personOutline} />
              <IonLabel>Coach</IonLabel>
            </IonTabButton>

            <IonTabButton tab="radar" href="/tabs/radar">
              <IonIcon icon={trailSignOutline} />
              <IonLabel>Radar</IonLabel>
            </IonTabButton>
          </IonTabBar>

        </IonTabs>
      </IonReactRouter>
    </AssessmentProvider>
  </IonApp>
);

export default App;
