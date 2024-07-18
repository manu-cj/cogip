import React from 'react';

const Notification: React.FC = () => {
    const storedNotification = JSON.parse(localStorage.getItem("notification") || "null");

    const showNotification = (): React.ReactNode => {
        return storedNotification && storedNotification.message ? (
            <h2>{storedNotification.message}</h2>
        ) : null;
    }

    return (
        <>
            {showNotification()}
        </>
    );
}

export default Notification;