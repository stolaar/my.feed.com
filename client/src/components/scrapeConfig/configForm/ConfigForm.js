import React from 'react'
import InputField from "../../common/InputField";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import {Button, makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {createConfig, setConfig, setSelectors} from "../../../pages/scrapeConfig/services/actions";

const useStyles = makeStyles({
    form: {
        maxWidth: 600,
    },
    heading: {
        margin: 6,
        fontSize: '18px'
    },
    selectors: {},
    button: {
        margin: 'auto'
    }
})

function ConfigForm() {
    const classes = useStyles()
    const {configuration} = useSelector(state => state.scrapeConfig)
    const dispatch = useDispatch()

    const onConfigChange = (e) => {
        dispatch(setConfig({...configuration, [e.target.name]: e.target.value}))
    }

    const onSelectorsChange = (e) => {
        dispatch(setSelectors({...configuration.selectors, [e.target.name]: e.target.value}))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createConfig(configuration))
    }

    return <form onSubmit={onSubmit} className={classes.form}>
        <InputField labelValue={'URI'} name={'uri'} onChange={onConfigChange} />
        <InputField labelValue={'Label'} name={'label'} onChange={onConfigChange} />
        <Divider />
        <Typography color="textSecondary"
                    component="h2"
                    variant={'body2'}
                    className={classes.heading}
        >
            Selectors
        </Typography>
        <div className={classes.selectors}>
        <InputField labelValue={'Wrapper'}  name={'wrapper'} onChange={onSelectorsChange} />
        <InputField labelValue={'Article'}  name={'article'} onChange={onSelectorsChange} />
        <InputField labelValue={'Title'}  name={'title'} onChange={onSelectorsChange} />
        <InputField labelValue={'Image'}  name={'image'} onChange={onSelectorsChange} />
        <InputField labelValue={'Description'}  name={'description'} onChange={onSelectorsChange} />
        <InputField labelValue={'Link'}  name={'link'} onChange={onSelectorsChange} />
        </div>
        <Button type={'submit'} className={classes.button} color={'primary'} variant={'contained'}>Submit</Button>
    </form>
}

export default ConfigForm
