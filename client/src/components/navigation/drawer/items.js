import {landingPageRoute, scrapeConfigPage} from "../../../config/routes";
import {Home, Settings} from "@material-ui/icons";

export const drawerItems = [
    {
        ...landingPageRoute,
        icon: <Home/>
    },
    {
        ...scrapeConfigPage,
        icon: <Settings />
    }
]
