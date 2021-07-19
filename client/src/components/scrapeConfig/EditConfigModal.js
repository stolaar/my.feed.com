import React, {useEffect} from 'react'
import Modal from "../modal/Modal";
import ConfigForm from "./configForm/ConfigForm";
import {setConfig, setSelectors, updateConfig} from "../../pages/scrapeConfig/services/actions";
import {initialConfiguration} from "../../pages/scrapeConfig/services/reducer";
import {useDispatch, useSelector} from "react-redux";

function EditConfigModal({show, close}) {
    const dispatch = useDispatch()
    const {configuration} = useSelector(state => state.scrapeConfig)

    const onEditHandler = (e) => {
        e.preventDefault()
        dispatch(updateConfig(configuration, close))
    }

    useEffect(() => {
        return () => {
            dispatch(setConfig(initialConfiguration))
            dispatch(setSelectors(initialConfiguration.selectors))
        }
    }, [dispatch])

    return <Modal show={show} close={close}>
        Edit configuration
        <ConfigForm onSubmit={onEditHandler} />
    </Modal>
}

export default EditConfigModal
