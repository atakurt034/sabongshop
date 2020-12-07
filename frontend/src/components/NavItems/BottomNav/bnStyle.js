import { withStyles } from '@material-ui/core/styles'
import { Badge, Menu, MenuItem, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
    color: 'inherit',
    textDecoration: 'none',
    '&:active': {
      color: 'inherit',
    },
    '&:visited': {
      color: 'inherit',
    },
  },
  avatar: {
    height: 25,
    width: 25,
  },
}))

export const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 3,
    top: 1,
    padding: '0 1px',
  },
}))(Badge)

let anchorOriginSettings = {
  vertical: 'bottom',
  horizontal: 'center',
}

let transformOriginSettings = {
  vertical: 'top',
  horizontal: 'center',
}

export const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={anchorOriginSettings}
    transformOrigin={transformOriginSettings}
    {...props}
  />
))

export const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem)
