import React, { useEffect, useState, useMemo } from 'react';

const Notification: React.FC<{ notification: string }> = ({ notification }) => {
  const [notifStyle, setNotifStyle] = useState<React.CSSProperties>({
    animationName: 'NotifEntrance',
    backgroundColor: "green",
  });

  const ShowNotif = (): JSX.Element | null => {
    return notification !== "" ? (
      <section className="notification" style={notifStyle}>
        <h5>{notification}</h5>
      </section>
    ) : null;
  };

  const successMessages = useMemo(() => [
    "Registration successful",
    "Contact successfully created"
    // Add more success messages here
  ], []);

  useEffect(() => {
    setNotifStyle({
      backgroundColor: successMessages.includes(notification) ? "green" : "tomato"
    });

    if (notification !== "") {
      const timeout1 = setTimeout(() => {
        setNotifStyle(prevStyle => ({
          ...prevStyle,
          animationName: prevStyle.animationName === 'NotifEntrance' ? 'notifOut' : 'NotifEntrance',
        }));
        const timeout2 = setTimeout(() => {
          setNotifStyle(prevStyle => ({
            ...prevStyle,
            animationName: prevStyle.animationName === 'notifOut' ? 'NotifEntrance' : 'notifOut',
          }));
        }, 2000);
        return () => {
          clearTimeout(timeout2);
        };
      }, 8000);

      return () => {
        clearTimeout(timeout1);
      };
    }
  }, [notification, successMessages]);

  return <>{ShowNotif()}</>;
};

export default Notification;
