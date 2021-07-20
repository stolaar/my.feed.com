import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FeedSelectors from "./FeedSelectors";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {useDispatch, useSelector} from "react-redux";
import {
    deleteConfiguration,
    scrapeFromConfiguration,
    setConfig,
    setSelectors
} from "../../pages/scrapeConfig/services/actions";
import {setActiveModal} from "../../store/actions/feedbackActions";
import {edit_configuration_modal} from "../../config/modal_path";
import SyncIcon from '@material-ui/icons/Sync';
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: '10px auto 10px auto'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        alignItems: 'center'
    },
    margin: {
        margin: theme.spacing(1),
    },
    detailsContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    tools: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    scrapeInfo: {
        justifySelf: 'flex-start',
        textAlign: 'left',
        marginRight: 'auto'
    },
    isScrapping: {
        animation: 'spin 4s linear infinite'
    }
}));

export default function ConfigCard({uri, label, selectors, lastScrapped, feed_configuration_id}) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const {isScrapping} = useSelector(state => state.scrapeConfig)

    const onDeleteHandler = () => {
        dispatch(deleteConfiguration(feed_configuration_id))
    }

    const onEditHandler = (e) => {
        e.preventDefault()
        dispatch(setConfig({uri, label, feed_configuration_id}))
        dispatch(setSelectors(selectors))
        dispatch(setActiveModal(edit_configuration_modal))
    }

    const onScrapeHandler = () => {
        dispatch(scrapeFromConfiguration(feed_configuration_id))
    }

    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
               <Typography className={classes.heading}>{uri}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.detailsContainer}>
                    <div className={classes.tools}>
                        <div className={classes.scrapeInfo} >
                            {lastScrapped ? `Last scrapped: ${new Date(lastScrapped).toLocaleString()}` : 'Not scrapped yet!'}

                            <IconButton disabled={isScrapping} onClick={onScrapeHandler} >
                                <SyncIcon className={clsx({[classes.isScrapping]: isScrapping})} fontSize="small" />
                                <style>{`
            @keyframes spin {
                 0% { transform: rotate(0deg); }
                 100% { transform: rotate(360deg); }
            }
        `}</style>
                            </IconButton>
                        </div>
                        <IconButton onClick={onDeleteHandler} className={classes.margin}>
                            <DeleteIcon fontSize="medium" />
                        </IconButton>
                        <IconButton onClick={onEditHandler} className={classes.margin}>
                            <EditIcon fontSize="medium" />
                        </IconButton>
                    </div>
                    <FeedSelectors configuration={{uri, label, selectors}} />
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
