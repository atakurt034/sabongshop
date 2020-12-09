import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  cropper: {
    position: 'relative',
    width: '100%',
    height: 300,
    background: '#333',
    [theme.breakpoints.up('sm')]: {
      height: 400,
    },
  },
}))
