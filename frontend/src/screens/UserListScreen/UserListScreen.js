import React, { useEffect } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  Switch,
} from '@material-ui/core'

import NotInterestedIcon from '@material-ui/icons/NotInterested'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import EditIcon from '@material-ui/icons/Edit'

import {
  createData,
  getComparator,
  EnhancedTableHead,
  EnhancedTableToolbar,
  stableSort,
} from './ulsData'
import { Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, deleteUser } from '../../actions/userActions'
import { Link } from 'react-router-dom'
import { useStyles } from './ulsStyle'

import { ModalMessage } from '../../components/ModalMessage'
import { ModalLoader } from '../../components/ModalLoader'

export const UserListScreen = ({ history }) => {
  const classes = useStyles()
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { error, loading, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
    if (successDelete) {
      setSelected([])
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm(`Delete: ${id} ?`)) {
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
          </Link>
        )
      )
    })
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = (event) => {
    setDense(event.target.checked)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  return (
    <div className={classes.root}>
      {loading && <ModalLoader />}
      {loadingDelete && <ModalLoader />}
      {error && <ModalMessage variant='error'>{error}</ModalMessage>}
      {errorDelete && (
        <ModalMessage variant='error'>{errorDelete}</ModalMessage>
      )}
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          clicked={() => deleteHandler(selected)}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby='tableTitle'
            size={dense ? 'small' : 'medium'}
            aria-label='enhanced table'
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component='th'
                        id={labelId}
                        scope='row'
                        padding='none'
                      >
                        {row.id}
                      </TableCell>
                      <TableCell align='left'>{row.name}</TableCell>
                      <TableCell align='left'>{row.email}</TableCell>
                      <TableCell align='left'>{row.admin}</TableCell>
                      <TableCell align='left'>{row.edit}</TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label='Dense padding'
      />
    </div>
  )
}
