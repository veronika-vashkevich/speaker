// @flow
import * as React from 'react';
import { Image } from 'react-bootstrap';

import './LandingPage.scss';
import profileImage from '../../images/profileImage.jpg';

type Props = {
    name: String,
};

const TeamProfile = (props: Props): React.Node => {
    return (
        <div className="w-25 text-center">
            <Image src={profileImage} />
            <p>{props.name}</p>
        </div>
    );
};

export default TeamProfile;
