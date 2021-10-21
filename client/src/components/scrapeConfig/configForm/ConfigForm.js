import React from 'react'
import InputField from '../../common/InputField'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import { Button, makeStyles } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import {
  setConfig,
  setSelectors
} from '../../../pages/scrapeConfig/services/actions'

const useStyles = makeStyles({
  form: {
    maxWidth: 600
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

function ConfigForm({ onSubmit }) {
  const classes = useStyles()
  const {
    configuration: { selectors, ...configuration }
  } = useSelector(state => state.scrapeConfig)
  const dispatch = useDispatch()

  const onConfigChange = e => {
    dispatch(setConfig({ ...configuration, [e.target.name]: e.target.value }))
  }

  const onSelectorsChange = e => {
    e.persist()
    dispatch(
      setSelectors({
        ...selectors,
        [e.target.name]: e.target.value
      })
    )
  }

  return (
    <form onSubmit={onSubmit} className={classes.form}>
      <InputField
        labelValue={'URI'}
        name={'uri'}
        onChange={onConfigChange}
        value={configuration.uri}
      />
      <InputField
          labelValue={'Slug'}
          name={'slug'}
          onChange={onConfigChange}
          value={configuration.slug}
      />
      <InputField
        labelValue={'Label'}
        name={'label'}
        onChange={onConfigChange}
        value={configuration.label}
      />
      <Divider />
      <Typography
        color="textSecondary"
        component="h2"
        variant={'body2'}
        className={classes.heading}
      >
        Selectors
      </Typography>
      <div className={classes.selectors}>
        <InputField
          labelValue={'Wrapper'}
          name={'wrapper'}
          id={'wrapper'}
          onChange={onSelectorsChange}
          value={selectors.wrapper}
        />
        <InputField
          labelValue={'Article'}
          name={'article'}
          id={'article'}
          onChange={onSelectorsChange}
          value={selectors.article}
        />
        <InputField
          labelValue={'Title'}
          name={'title'}
          id={'title'}
          onChange={onSelectorsChange}
          value={selectors.title}
        />
        <InputField
          labelValue={'Image'}
          name={'image'}
          id={'image'}
          onChange={onSelectorsChange}
          value={selectors.image}
        />
        <InputField
          labelValue={'Description'}
          name={'description'}
          id={'description'}
          onChange={onSelectorsChange}
          value={selectors.description}
        />
        <InputField
          labelValue={'Link'}
          name={'link'}
          id={'link'}
          onChange={onSelectorsChange}
          value={selectors.link}
        />
      </div>
      <Button
        type={'submit'}
        className={classes.button}
        color={'primary'}
        variant={'contained'}
      >
        Submit
      </Button>
    </form>
  )
}

export default ConfigForm
