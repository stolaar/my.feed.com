import React from 'react'
import MainContainer from "../../containers/layout/MainContainer";
import Typography from "@material-ui/core/Typography";
import ConfigForm from "../../components/scrapeConfig/configForm/ConfigForm";

function ScrapeConfigPage() {
    return <MainContainer>
        <Typography paragraph>
            Customize your feed
        </Typography>
        <ConfigForm />
    </MainContainer>
}

export default ScrapeConfigPage
