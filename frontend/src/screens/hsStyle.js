import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  rootPaginate: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
  },
}))
