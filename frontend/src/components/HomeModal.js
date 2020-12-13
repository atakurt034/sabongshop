import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { withRouter } from 'react-router-dom'
import { CardMedia, Container, Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '80%',
    height: '80vh',
  },
  button: {
    textAlign: 'right',
    cursor: 'pointer',
  },
  saleText: {
    textAlign: 'center',
    padding: 10,
    margin: 10,
    color: 'red',
    fontWeight: 900,
  },
  text: {
    textAlign: 'center',
  },
}))

const HomeModal = ({ match }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const key = 'modalState'

  function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key)

    // if the item doesn't exist, return null
    if (!itemStr) {
      return null
    }

    const item = JSON.parse(itemStr)
    const now = new Date()

    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key)
      return null
    }
    return item.value
  }

  function setWithExpiry(key, value, ttl) {
    const now = new Date()

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
  }

  const handleClose = () => {
    setOpen(false)
  }

  const modalState = getWithExpiry(key)

  useEffect(() => {
    if (match.url === '/') {
      if (modalState === null) {
        setOpen(true)
      }
    }
    if (open) {
      setWithExpiry(key, false, 3600000)
    }
    if (
      (Storage !== 'undefined' && modalState !== 'undefined') ||
      modalState !== null
    ) {
      if (modalState === false) {
        setOpen(false)
      }
    }
  }, [match, open, modalState])

  return (
    <Container>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Grid container className={classes.paper}>
            <Grid item className={classes.button} xs={12}>
              <Typography size='small' onClick={handleClose}>
                X
              </Typography>
            </Grid>
            <Grid item sm={6}>
              <Link to='/product/5fd314a3aa84b9123426ae0d'>
                <CardMedia
                  className={classes.image}
                  image={'/uploads/product_images/image-1607530899536.jpg'}
                  component='img'
                />
              </Link>
            </Grid>
            <Grid item sm={6}>
              <Typography variant='h2' className={classes.saleText}>
                On Sale Right Now!!!
              </Typography>
              <Typography
                style={{ textDecoration: 'line-through' }}
                variant='h5'
                className={classes.text}
              >
                from ₱ 599.99
              </Typography>
              <Typography variant='h5' className={classes.text}>
                to 399.99
              </Typography>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Container>
  )
}

export default withRouter(HomeModal)
