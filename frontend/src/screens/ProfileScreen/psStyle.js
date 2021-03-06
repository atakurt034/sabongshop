import { makeStyles } from '@material-ui/core'
import { green } from '@material-ui/core/colors'

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  error: {
    backgroundColor: 'red',
    '&:hover': {
      backgroundColor: 'red',
    },
  },
  success: {
    color: green[500],
  },
  chip: {
    backgroundColor: 'transparent',
  },
  rootTable: {
    width: '100%',
    borderRadius: 10,
  },
  container: {
    maxHeight: 440,
  },
  tableHead: { fontWeight: 900, borderRadius: 10 },
  avatar: {
    borderRadius: '50%',
    margin: 10,
    height: '100%',
  },
}))
