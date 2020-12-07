import { makeStyles } from '@material-ui/core'

export const useStyle = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    padding: 20,
  },
  button: {
    padding: 10,
  },
  buttonComment: {
    textTransform: 'none',
  },
  image: {
    width: 'auto',
  },
  table: {
    // backgroundColor: 'transparent',
    border: '1px solid #000',
  },
  cell: {
    borderBottom: '1px solid #000',
    textAlign: 'left',
  },
  cart: {
    border: 'none',
    padding: 0,
  },
  option: {
    backgroundColor: 'transparent',
    width: 40,
    fontWeight: 600,
  },
  cartButton: {
    padding: 12,
    margin: 10,
    width: '80%',
  },
  divider: {
    backgroundColor: '#000',
    border: 'none',
    height: 0.5,
  },
  formControl: {
    margin: theme.spacing(3),
  },
  inline: {
    display: 'inline',
  },
  textField: {
    margin: '15px 0',
  },
  textReviews: {
    wordWrap: 'break-word',
  },
  paginaation: {
    // marginTop: 10,
  },
}))
