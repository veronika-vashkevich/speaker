// @flow
import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import TeamProfile from './TeamProfile';

const LandingTeam = (): React.Node => {
    return (
        <Container fluid>
            <Row>
                <Col md={{ span: 6, offset: 3 }} className="text-center">
                    <p className="Landing-Text  ">Наши учителя</p>
                </Col>
            </Row>
            <Row>                
                <Col md={{ span:11, offset:2 }} className="team w-50 d-flex flex-wrap">
                <TeamProfile name={'Mariaya'} />
                <TeamProfile name={'Veronika'} />
                <TeamProfile name={'Margarita'} />
               
            </Col>
            </Row>
        </Container>
    );
};

export default LandingTeam;
