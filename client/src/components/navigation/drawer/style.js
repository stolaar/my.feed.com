import makeStyles from '@material-ui/core/styles/makeStyles'
import { drawerWidth } from '../../../constants/style'

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    '& span#brand': {
      justifySelf: 'flex-start',
      alignSelf: 'center',
      fontSize: '20px',
      marginRight: 'auto'
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  activeItem: {
    color: 'white',
    backgroundColor: theme.palette?.grey[500],
    '&:hover': {
      backgroundColor: theme.palette?.grey[500],
    },
    '& svg': {
      color: theme.palette.common.white,
    }
  },
  nestedList: {
    paddingLeft: '5px'
  }
}))



export default useStyles
