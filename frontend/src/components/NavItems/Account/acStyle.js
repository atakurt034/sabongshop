import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
    color: 'inherit',
    textDecoration: 'none',
    '&:active': {
      color: 'inherit',
    },
    '&:visited': {
      color: 'inherit',
    },
  },
}))
