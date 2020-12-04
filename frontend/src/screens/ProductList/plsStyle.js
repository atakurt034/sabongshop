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
    textAlign: 'center',
    padding: 10,
    margin: 10,
    position: 'absolute',
    fontWeight: 600,
  },
  button: {
    color: '#fff',
    backgroundColor: 'green',
    float: 'right',
    padding: 10,
    margin: 10,
  },
})
