import {
  IonItem,
  IonLabel,
  IonRange
} from '@ionic/react';
import { Attribute } from '../data/attributes';

interface Props {
  attribute: Attribute;
  value: number;
  onChange: (value: number) => void;
}


export const AttributeSlider: React.FC<Props> = ({
  attribute,
  value,
  onChange
}) => {
  const guidance =
    value < 4
      ? attribute.guidance.low
      : value < 7
      ? attribute.guidance.mid
      : attribute.guidance.high;

  return (
    <IonItem lines="full">
      <IonLabel className="ion-text-wrap">
        <h2>{attribute.label}</h2>
        <p>{attribute.description}</p>
        <small>{guidance}</small>
        <IonRange
        min={attribute.scale.min}
        max={attribute.scale.max}
        step={attribute.scale.step}
        value={value}
        snaps
        ticks
        pin={true}
        onIonChange={e => onChange(e.detail.value as number)}
      />
      </IonLabel>

      
    </IonItem>
  );
};
