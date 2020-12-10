import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    textAlign: 'center',
    '&:visited': {
      color: 'inherit',
    },
    padding: '20px 0',
  },
  image: {
    borderRadius: '100%',
    padding: '20px 0',
    margin: '10px 0',
  },
  title: {
    textDecoration: 'underline',
    padding: '0 10px',
  },
  paper: {
    width: '100%',
    margin: 'auto',
    padding: theme.spacing(2),
  },
  item: {
    marginRight: 20,
    [theme.breakpoints.down('xs')]: {
      marginRight: 30,
    },
  },
}))
