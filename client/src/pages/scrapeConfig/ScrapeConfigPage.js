import React, {useEffect} from 'react'
import MainContainer from "../../containers/layout/MainContainer";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import {getConfigurations} from "./services/actions";
import ConfigCard from "../../components/scrapeConfig/ConfigCard";

function ScrapeConfigPage() {
    const dispatch = useDispatch()
    const {configurations} = useSelector(state => state.scrapeConfig)

    useEffect(() => {
        dispatch(getConfigurations())
    }, [dispatch])

    return <MainContainer>
        <Typography paragraph>
            Customize your feed
        </Typography>
        <div>
            {configurations.map((config, index) => <ConfigCard key={index} {...config} />)}
        </div>
    </MainContainer>
}

export default ScrapeConfigPage
