import React from 'react'
import MainContainer from "../../containers/layout/MainContainer";
import Typography from "@material-ui/core/Typography";
import ConfigForm from "../../components/scrapeConfig/configForm/ConfigForm";

function CreateScrapeConfigPage() {
    return <MainContainer>
        <Typography paragraph>
            Create config
        </Typography>
        <ConfigForm />
    </MainContainer>
}

export default CreateScrapeConfigPage
