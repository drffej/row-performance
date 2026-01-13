import { IonAvatar } from "@ionic/react";

interface AvatarItemProps {
  name: string;
}

export const AvatarItem: React.FC<AvatarItemProps> = ({ name}) => {
  
  const getInitials = (name: string) => {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    return initials.slice(0, 2);
  };

  function getColorFromName(name: string) {
    const colors = [
      '#E57373', // red
      '#64B5F6', // blue
      '#81C784', // green
      '#BA68C8', // purple
      '#FFD54F', // yellow
      '#4DB6AC', // teal
      '#F06292'  // pink
    ];

    // Simple hash function
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Map hash to one of the colors
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }

  return (
      <IonAvatar aria-hidden="true" slot="start" style={{ width: '50px', height: '50px', alignSelf: 'flex-start', marginTop: '0.75rem'}}>
        <div
          style={{
            backgroundColor: getColorFromName(name),
            color: '#fff',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            fontWeight: 'bold'
          }}
        >
          {getInitials(name)}
        </div>
      </IonAvatar>
  );
};

