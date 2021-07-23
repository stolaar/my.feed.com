import {createScrapeConfigPage, landingPageRoute, scrapeConfigPage} from "../../../config/routes";
import {Add, Home, Settings} from "@material-ui/icons";

export const drawerItems = [
    {
        ...landingPageRoute,
        name: 'Home',
        icon: <Home/>
    },
    {
        ...scrapeConfigPage,
        icon: <Settings />,
        pages: [
            {
                ...createScrapeConfigPage,
                icon: <Add/>
            }
        ]
    }
]
