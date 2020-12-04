import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Typography } from '@material-ui/core'
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

import { columns, createData } from './ulsData'
import { useStyles } from './ulsStyle'

import { listUsers, deleteUser } from '../../actions/userActions'

import { ModalLoader } from '../../components/ModalLoader'
import { ModalMessage } from '../../components/ModalMessage'

export const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { error, loading, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const {
    // loading: loadingDelete,
    success: successDelete,
    // error: errorDelete,
  } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = (id, name) => {
    if (window.confirm(`Delete: ${name} ?`)) {
      dispatch(deleteUser(id))
    }
  }

  const rows = []
  if (users) {
    users.map((user) => {
      return rows.push(
        createData(
          user._id,
          user.name,
          <a href={`mailto:${user.email}`}>{user.email}</a>,
          user.isAdmin ? (
            <CheckCircleIcon style={{ color: 'green' }} />
          ) : (
            <NotInterestedIcon color='error' />
          ),
          <Link
            key={user._id}
            to={`/admin/user/${user._id}/edit`}
            style={{ textDecoration: 'none' }}
          >
            <Button
              size='small'
              variant='contained'
              color='default'
              startIcon={<EditIcon fontSize='small' />}
            >
              <Typography>Edit</Typography>
            </Button>
          </Link>,
          <Button
            size='small'
            variant='contained'
            color='secondary'
            startIcon={<DeleteForeverIcon />}
            onClick={() => deleteHandler(user._id, user.name)}
          >
            <Typography>Delete</Typography>
          </Button>
        )
      )
    })
  }

  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper className={classes.root}>
      {loading ? (
        <ModalLoader />
      ) : (
        error && <ModalMessage variant='error'>{error}</ModalMessage>
      )}
      <Typography className={classes.title} variant='h5' component='h1'>
        USERS
      </Typography>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  className={classes.tableHead}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
