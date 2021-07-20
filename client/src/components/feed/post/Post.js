import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardActionArea,
  CardMedia
} from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { Link } from 'react-router-dom'
import feed from '../../../constants/feed'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    margin: 5
  },
  media: {
    maxHeight: 120,
    minWidth: '100%',
    objectFit: 'contain'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
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
    fontSize: '12px'
  },
  title: {
    fontSize: '16px',
    // height: 60,
    '& :hover': {
      textDecoration: 'none'
    }
  },
  actionsContainer: {
     flex: 0,
     maxHeight: '100%'
  },
  content: {
    flex: '0 1 100%',
    minHeight: '100%'
  }
}))

export default function Post({ title, image, label, description, link }) {
  const classes = useStyles()
  const [postImage, setImage] = useState(image)

  useEffect(() => {
    if (image) setImage(image)
    else setImage(feed.post.placeholder)
  }, [image])

  const onImageError = () => {
    setImage(feed.post.placeholder)
  }
  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.actionsContainer}>
        <Link target="_blank" rel="noopener noreferrer" to={{ pathname: link }}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            onError={onImageError}
            image={postImage}
            title="Contemplative Reptile"
          />
          <CardContent className={classes.content}>
            <Typography
              color={'textPrimary'}
              className={classes.title}
              gutterBottom
              variant="h5"
              component="h4"
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.description}
            >
              {description}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions>
        <Link target="_blank" rel="noopener noreferrer" to={{ pathname: link }}>
          <Button color={'primary'} size="small">
            See More
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}
