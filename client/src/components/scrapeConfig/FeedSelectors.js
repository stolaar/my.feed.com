import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import StarBorder from '@material-ui/icons/StarBorder'
import {
    Language as WebIcon,
    LabelImportant,
    Code,
    WrapText,
    Assignment,
    Title, Description,
    Image,
    Link,
    ImportContacts as SlugIcon
} from '@material-ui/icons'
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}))

export default function FeedSelectors({
  configuration: { selectors, ...configuration }
}) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Configuration
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button>
        <ListItemIcon>
          <WebIcon />
        </ListItemIcon>
        <ListItemText primary={configuration?.uri} />
      </ListItem>
      <ListItem button>
          <ListItemIcon>
              <SlugIcon />
          </ListItemIcon>
          Slug:
          <ListItemText primary={configuration?.slug} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LabelImportant />
        </ListItemIcon>
        <ListItemText primary={configuration?.label} />
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <Code />
        </ListItemIcon>
        <ListItemText primary="Selectors" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto">
        <List component="div" disablePadding>
          {selectors
            ? mapSelectors(selectors).map(
                ({ icon: Icon, ...selector }, index) => {
                  return (<Tooltip key={index} title={selector.key} placement="bottom-start">
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                      <ListItemText primary={selector.text} />
                    </ListItem></Tooltip>
                  )
                }
              )
            : null}
        </List>
      </Collapse>
    </List>
  )
}

function mapSelectors(selectors = {}) {
  return Object.keys(selectors).filter(key => !(new RegExp('(feed_selectors_id|created_at|updated_at)')).test(key)).map(key => {
    const selector = { text: selectors[key], icon: StarBorder, key }
    switch (key) {
      case 'wrapper':
        selector.icon = WrapText
        break
      case 'article':
        selector.icon = Assignment
        break
      case 'title':
        selector.icon = Title
        break
        case 'description':
            selector.icon = Description
            break
        case 'image':
            selector.icon = Image
            break
        case 'link':
            selector.icon = Link
            break
      default:
        break
    }
    return selector
  })
}
