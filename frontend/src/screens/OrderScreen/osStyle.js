import { makeStyles } from '@material-ui/core'

export const useStyle = makeStyles((theme) => ({
  title: {
    fontWeight: 900,
    [theme.breakpoints.down('sm')]: {
      fontSize: '24px',
      fontWeight: 900,
    },
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    margin: '5px auto',
  },
  items: {
    margin: '4px auto',
  },
  summaryRoot: {
    [theme.breakpoints.down('xs')]: {
      margin: 5,
    },
  },
  orderItems: {
    padding: 15,
    margin: '5px auto',
  },
  card: {
    backgroundColor: 'transparent',
    padding: 10,
  },
  placeOrderBtn: {
    width: '65%',
    padding: 10,
    margin: '20px auto auto',
    backgroundColor: '#ab000d',
    color: '#fff',
  },
  summary: {
    margin: 5,
    padding: 5,
  },
}))
