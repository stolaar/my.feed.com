import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import feed from '../../../constants/feed'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    maxHeight: 450,
    margin: 5
  },
  media: {
    maxHeight: 120,
    minWidth: '100%',
    // paddingTop: '56.25%', // 16:9,
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
    whiteSpace: 'nowrap',
    maxHeight: 50,
    maxWidth: '100%',
    margin: 'auto'
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
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {label}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader="September 14, 2016"
      />
      <img
        onError={onImageError}
        className={classes.media}
        src={postImage}
        alt=""
      />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.description}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Link target="_blank" rel="noopener noreferrer" to={{ pathname: link }}>
          <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  )
}
