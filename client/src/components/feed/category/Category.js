import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia
} from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { Link } from 'react-router-dom'
import {categoryPageRoute} from "../../../config/routes";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    margin: 5
  },
  media: {
    maxHeight: 120,
    height: 200,
    width: 250,
    minWidth: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  content: {
    display: "flex",
    width: '100%',
    height: '100%',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'rgba(220,220,220, 0.6)',
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  header: {
    fontSize: 12
  },
  description: {
    height: 100,
    fontSize: '12px'
  },
  title: {
    fontSize: '22px',
    '& :hover': {
      textDecoration: 'none'
    },

    color: '#000',
    borderRadius: '3px',
    textAlign: 'center'
  }
}))

export default function Category({ label }) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link target="_blank" to={{ pathname: categoryPageRoute.path.replace(':category', label) }}>
          <CardMedia
              component="div"
              alt="Contemplative Reptile"
              height="100%"
              className={classes.media}
              image={setCategoryImage(label)}
              title="Contemplative Reptile"
          >
            <CardContent className={classes.content}>
              <Typography
                  color={'textPrimary'}
                  className={classes.title}
                  gutterBottom
                  variant="h2"
                  component="h2"
              >
                {label}
              </Typography>
            </CardContent>
          </CardMedia>
          {/*<CardContent>*/}
          {/*  <Typography*/}
          {/*    color={'textPrimary'}*/}
          {/*    className={classes.title}*/}
          {/*    gutterBottom*/}
          {/*    variant="h5"*/}
          {/*    component="h4"*/}
          {/*  >*/}
          {/*    {label}*/}
          {/*  </Typography>*/}
          {/*</CardContent>*/}
        </Link>
      </CardActionArea>
    </Card>
  )
}

function setCategoryImage(label) {
  let baseImagePath = '/public/images/'
  switch(true) {
    case (new RegExp('Anime').test(label)):
      return baseImagePath + 'anime.jpg'
    default: return baseImagePath + 'placeholder.jpg'
  }

}
