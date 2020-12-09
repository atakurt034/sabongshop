import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { withRouter } from 'react-router-dom'
import {
  CardMedia,
  Container,
  Grid,
  Typography,
  Button,
} from '@material-ui/core'
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

  //   const handleOpen = () => {
  //     setOpen(true)
  //   }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (match.path === '/') {
      setOpen(true)
    }
  }, [match])

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
              <Link to='/product/5fce3fa433cdce48d4e49eae'>
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
