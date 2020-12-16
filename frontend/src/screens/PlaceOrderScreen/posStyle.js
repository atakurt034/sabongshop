import { makeStyles } from '@material-ui/core'

export const useStyle = makeStyles((theme) => ({
  summaryRoot: {
    [theme.breakpoints.down('xs')]: {
      margin: 5,
    },
  },
  summary: {
    margin: 5,
    padding: 5,
  },
  summaryTitle: {
    cursor: 'unset',
  },
  orderItems: {
    padding: 15,
    margin: '5px auto',
  },
  card: {
    backgroundColor: 'transparent',
  },
  placeOrderBtn: {
    width: '65%',
    padding: 10,
    margin: '20px auto auto',
  },
}))
