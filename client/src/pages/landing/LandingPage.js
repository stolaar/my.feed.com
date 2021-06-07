import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Button from '../../components/common/Button'
import { useHistory } from 'react-router-dom'
import { loginPageRoute } from '../../config/routes'
import { useSelector } from 'react-redux'
import {homePageRoute,} from '../../config/routes'


import LandingPageCss from './LandingPage.module.css'

function LandingPage() {
    const history = useHistory();

    const {
      auth: { isAuthenticated }
    } = useSelector(state => state)

    useEffect(() => {
        isAuthenticated && history.push(homePageRoute.path)
      }, [isAuthenticated, history])

    function handleLoginWithEmail() {
        history.push(loginPageRoute.path);
    }
    return (
        <Container fluid className={LandingPageCss.landingPage}>
            <div className="container-1600">
                <Row className={LandingPageCss.divHome}>
                    <Col lg={5} className={LandingPageCss.colText}>
                        <div className={LandingPageCss.divTitle}>
                            <p>
                                Lorem ipsum
                            </p>
                        </div>
                        <div className={LandingPageCss.divP}>
                            <p>
                                Lorem ipsum
                            </p>
                        </div>
                        <div className={LandingPageCss.homeButtons}>
                            <Button
                                text="Login with Email"
                                className={LandingPageCss.submitBtn}
                                onClick = {handleLoginWithEmail}
                            />
                        </div>
                    </Col>
                    <Col lg={7}/>
                </Row>
            </div>
        </Container>

    )

}

export default LandingPage
