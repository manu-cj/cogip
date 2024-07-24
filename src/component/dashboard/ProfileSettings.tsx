import React from 'react';
import ImageSettings from './settingComponent/ImageSettings';
import PersonSettings from './settingComponent/PersonSettings';
import OtherSettings from './settingComponent/OtherSettings';

function ProfileSettings() {
    return (
        <div>
            <ImageSettings />
            <PersonSettings />
            <OtherSettings />
        </div>
    );
}

export default ProfileSettings;