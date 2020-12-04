import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  root: {
    width: '100%',
    borderRadius: 10,
  },
  container: {
    maxHeight: '75vh',
  },
  tableHead: { fontWeight: 900, borderRadius: 10 },
  title: {
    padding: 10,
    margin: 10,
    fontWeight: 600,
    float: 'left',
  },
})
