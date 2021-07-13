import React from 'react'
import InputField from "../../common/InputField";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import {Button, makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    form: {
        maxWidth: 600,
    },
    heading: {
        margin: 6,
        fontSize: '16px'
    },
    selectors: {},
    button: {
        margin: 'auto'
    }
})

function ConfigForm() {
    const classes = useStyles()

    return <form className={classes.form}>
        <InputField labelValue={'URI'} />
        <InputField labelValue={'Label'} />
        <Divider />
        <Typography color="textSecondary"
                    component="h2"
                    variant={'body2'}
                    className={classes.heading}
        >
            Selectors
        </Typography>
        <div className={classes.selectors}>
        <InputField labelValue={'wrapper'} />
        <InputField labelValue={'article'} />
        </div>
        <Button className={classes.button} color={'primary'} variant={'contained'}>Submit</Button>
    </form>
}

export default ConfigForm
