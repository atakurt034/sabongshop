import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Typography,
} from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PersonIcon from '@material-ui/icons/Person'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../actions/userActions'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem)

export const Account = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.up('md'))

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
    handleClose()
  }
  let size = 'small'
  if (sm) {
    size = 'large'
  }
  const logged = (
    <>
      <Button
        variant='contained'
        disableElevation
        color='primary'
        onClick={userInfo && handleClick}
        size='small'
        startIcon={<PersonIcon fontSize={size} />}
        endIcon={userInfo && <ArrowDropDownIcon />}
      >
        <Typography variant='caption'>
          {userInfo ? (
            userInfo.name.split(' ')[0]
          ) : (
            <Link
              style={{ textDecoration: 'none', color: 'inherit' }}
              to='/login'
            >
              <Typography style={{ fontWeight: 600 }} variant='caption'>
                LOGIN
              </Typography>
            </Link>
          )}
        </Typography>
      </Button>

      <StyledMenu
        id='customized-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Profile' />
        </StyledMenuItem>
        <StyledMenuItem onClick={logoutHandler}>
          <ListItemIcon>
            <ExitToAppIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </StyledMenuItem>
        <StyledMenuItem onClick={handleClose}>
          <ListItemIcon>
            <InboxIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Inbox' />
        </StyledMenuItem>
      </StyledMenu>
    </>
  )

  return logged
}
