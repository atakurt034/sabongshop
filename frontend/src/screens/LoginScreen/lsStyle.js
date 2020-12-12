import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.action.active,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  icon: {
    boxSizing: 'border-box',
    display: 'inline-flex',
    alignItems: 'center',
  },
  button: {
    textTransform: 'none',
    margin: '5px 0',
  },
  svg: {
    color: '#fff',
    // backgroundColor: '#fff',
  },
}))
