import React, {useEffect} from 'react'
import { useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import LoginForm from "../../components/auth/LoginForm"
import { Container, Row, Col } from 'react-bootstrap'
import {
    landingPageRoute,}
    from '../../config/routes'
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        minHeight: '100vh'
    },
    divRow: {
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

function LoginPage() {
    const classes = useStyles()
    const {
      auth: { isAuthenticated },
    } = useSelector(state => state)
    const history = useHistory()

    useEffect(() => {
        isAuthenticated && history.push(landingPageRoute.path)
      }, [isAuthenticated, history])

    return (
        <Container fluid className={classes.root}>
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
