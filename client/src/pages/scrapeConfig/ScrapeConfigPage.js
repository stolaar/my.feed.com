import React, {useEffect} from 'react'
import MainContainer from "../../containers/layout/MainContainer";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import {getConfigurations} from "./services/actions";

function ScrapeConfigPage() {
    const dispatch = useDispatch()
    const {configurations} = useSelector(state => state.scrapeConfig)

    useEffect(() => {
        dispatch(getConfigurations())
    }, [dispatch])
    console.log('configurations', configurations)
    return <MainContainer>
        <Typography paragraph>
            Customize your feed
        </Typography>
    </MainContainer>
}

export default ScrapeConfigPage
