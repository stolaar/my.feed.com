import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import SignUpForm from '../../../components/auth/SignUpForm'
import {
    Container,
    Row,
    Col
  } from 'react-bootstrap'
import { setActiveModal } from '../../../store/actions/feedbackActions'
import classes from './SignUpPage.module.css'
import {
    register_success_modal
  } from '../../../config/modal_path'

const SignUpPage = () => {
    const dispatch = useDispatch()
    const {
        feedback: { responseMessage },

      } = useSelector(state => state)

    useEffect(() => {
        if (responseMessage) {
          dispatch(setActiveModal(register_success_modal))
        }
      }, [responseMessage, dispatch])

    return (
        <Container fluid className={classes.SignupPage}>
            <div className='container-1600'>
                <Row className={classes.divRow}>
                    <Col lg={4}>
                        <SignUpForm />
                    </Col>
                </Row>
            </div>
        </Container>
    )

}

export default SignUpPage
