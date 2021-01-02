// @flow
import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import TeamProfile from './TeamProfile';

const LandingPupils = (): React.Node => {
    return (
        <Container fluid>
            <Row>
                <Col md={{ span: 6, offset: 3 }} className="text-center">
                    <p className="Landing-Text  ">Наши ученики</p>
                </Col>
            </Row>
            <Row>
                {/*<Col md={{ span:12, offset:0 }} className="team w-50 d-flex flex-wrap">*/}
                <Col md={{ span:12, offset:0 }} className="team d-flex flex-wrap">
                    <TeamProfile name={'Victor USA'} />
                    <TeamProfile name={'Dmitrii Spain'} />
                    <TeamProfile name={'Olga Italy'} />
                    <TeamProfile name={'Victor USA'} />
                    <TeamProfile name={'Dmitrii Spain'} />
                    <TeamProfile name={'Olga Italy'} />
                    <TeamProfile name={'Victor USA'} />
                    <TeamProfile name={'Dmitrii Spain'} />
                    <TeamProfile name={'Olga Italy'} />
                    <TeamProfile name={'Victor USA'} />
                    <TeamProfile name={'Dmitrii Spain'} />
                    <TeamProfile name={'Olga Italy'} />

                </Col>
            </Row>
        </Container>
    );
};

export default LandingPupils;
