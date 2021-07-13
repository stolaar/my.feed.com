import React, {useEffect} from 'react'
import { useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import LoginForm from "../../components/auth/LoginForm"
import { Container, Row, Col } from 'react-bootstrap'
import classes from './SignUpPage/SignUpPage.module.css'
import {
    landingPageRoute,}
    from '../../config/routes'

function LoginPage() {

    const {
      auth: { isAuthenticated },
    } = useSelector(state => state)
    const history = useHistory()

    useEffect(() => {
        isAuthenticated && history.push(landingPageRoute.path)
      }, [isAuthenticated, history])

    return (
        <Container fluid className={classes.SignupPage}>
            <div className='container-1600'>
                <Row className={classes.divRow}>
                    <Col lg={4}>
                        <LoginForm />
                    </Col>
                </Row>
            </div>
        </Container>
    )
}

export default LoginPage
