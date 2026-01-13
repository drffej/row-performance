import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { clipboardOutline, ellipse, personOutline, square, trailSignOutline, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { AssessmentProvider } from './state/AssessmentContext';
import AssessmentPage from './pages/AssessmentPage';
import CoachAssessmentPage from './pages/CoachAssessmentPage';
import RadarPage from './pages/RadarPage';

setupIonicReact();

const App: React.FC = () => (
  
  <IonApp>
    <AssessmentProvider>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Redirect to="/assessment" />
          </Route>
          <Route exact path="/assessment">
            <AssessmentPage />
          </Route>
          <Route exact path="/coach-assessment">
            <CoachAssessmentPage />
          </Route>
          <Route exact path="/radar">
            <RadarPage />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/assessment">
            <IonIcon aria-hidden="true" icon={clipboardOutline} />
            <IonLabel>Assessment</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/coach-assessment">
            <IonIcon aria-hidden="true" icon={personOutline} />
            <IonLabel>Coach Assessment</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/radar">
            <IonIcon aria-hidden="true" icon={trailSignOutline} />
            <IonLabel>Radar</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
    </AssessmentProvider>
  </IonApp>
);

export default App;
