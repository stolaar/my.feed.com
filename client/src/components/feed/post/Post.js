import React, { useEffect, useState } from 'react'
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
import feed from '../../../constants/feed'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    margin: 5,
    backgroundColor: 'transparent',
    color: theme.palette.common.white,
    border: 'none',
    boxShadow: 'none',
    minWidth: 270
  },
  media: {
    maxHeight: 240,
    minWidth: '100%',
    width: '100%',
    objectFit: 'cover'
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
    color: theme.palette.common.white,
    '& :hover': {
      textDecoration: 'none'
    }
  },
  actionsContainer: {
    flex: '0 1 100%',
    maxHeight: '100%',
    height: '100%',
    width: '100%'
  },
  content: {
    flex: '0 1 100%',
    minHeight: '100%',
    color: theme.palette.common.white
  }
}))

export default function Post({ title, image, label, description, link }) {
  const classes = useStyles()
  const [postImage, setImage] = useState(image)

  useEffect(() => {
    const fetch = async () => {
      const url = await fetchImage(image)
      setImage(url)
    }
    if (image) {
      new RegExp('(.jpg|.jpeg|.png)$').test(image) ? setImage(image) : fetch().catch(console.error)
    }
    else setImage(feed.post.placeholder)
  }, [image])

  const onImageError = (el, err) => {
    setImage(feed.post.placeholder)
  }

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.actionsContainer}>
        <Link target="_blank" rel="noopener noreferrer" to={{ pathname: link }}>
          <CardMedia
            component="img"
            alt=""
            className={classes.media}
            onError={onImageError}
            image={postImage}
          />
          <CardContent className={classes.content}>
            <Typography
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
    </Card>
  )
}


async function fetchImage(url) {
  const data = await fetch(`/post-image?img=${url}`)
  const blob = await data.blob()
  const arrBuffer = await blob.arrayBuffer()
  return URL.createObjectURL(new Blob([arrBuffer]))
}
