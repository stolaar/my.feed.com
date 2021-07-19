import React from 'react'
import MainContainer from "../../containers/layout/MainContainer";
import Typography from "@material-ui/core/Typography";
import ConfigForm from "../../components/scrapeConfig/configForm/ConfigForm";
import {createConfig} from "./services/actions";
import {useDispatch, useSelector} from "react-redux";

function CreateScrapeConfigPage() {
    const {configuration} = useSelector(state => state.scrapeConfig)
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createConfig(configuration))
    }

    return <MainContainer>
        <Typography paragraph>
            Create config
        </Typography>
        <ConfigForm onSubmit={onSubmit} />
    </MainContainer>
}

export default CreateScrapeConfigPage
