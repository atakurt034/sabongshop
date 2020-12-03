import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Container,
} from '@material-ui/core'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import AssignmentIcon from '@material-ui/icons/Assignment'
import StoreIcon from '@material-ui/icons/Store'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
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

export const Admin = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const logged = (
    <>
      <Button
        fullWidth
        style={{
          textTransform: 'capitalize',
          fontSize: 'inherit',
          margin: 0,
          padding: '5px',
          boxSizing: 'border-box',
        }}
        variant='text'
        disableElevation
        disableFocusRipple
        color='inherit'
        onClick={handleClick}
        size='small'
      >
        <Container disableGutters>
          <Grid justify='flex-start' container>
            <Grid item xs={4}>
              <SupervisorAccountIcon fontSize='inherit' />
            </Grid>
            <Grid
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
              item
              xs={8}
            >
              <ArrowLeftIcon fontSize='small' /> {'Admin'}
            </Grid>
          </Grid>
        </Container>
      </Button>

      <StyledMenu
        id='customized-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={handleClose}>
          <Link
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
            to='/admin/userlist'
          >
            <ListItemIcon>
              <EmojiPeopleIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText primary='Users' />
          </Link>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <StoreIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Products' />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <AssignmentIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Orders' />
        </StyledMenuItem>
      </StyledMenu>
    </>
  )

  return logged
}
