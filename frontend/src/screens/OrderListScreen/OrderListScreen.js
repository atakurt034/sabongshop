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
  Chip,
} from '@material-ui/core'

import NotInterestedIcon from '@material-ui/icons/NotInterested'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import EditIcon from '@material-ui/icons/Edit'
import NumberFormat from 'react-number-format'

import {
  createData,
  getComparator,
  EnhancedTableHead,
  EnhancedTableToolbar,
  stableSort,
} from './olsData'
import { Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders, deleteOrder } from '../../actions/orderActions'
import { Link } from 'react-router-dom'
import { useStyles } from './olsStyle'

import { ModalMessage } from '../../components/ModalMessage'
import { ModalLoader } from '../../components/ModalLoader'

export const OrderListScreen = ({ history }) => {
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

  const orderList = useSelector((state) => state.orderList)
  const { error, loading, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDelete = useSelector((state) => state.orderDelete)
  const {
    error: errorDelete,
    loading: loadingDelete,
    success: successDelete,
  } = orderDelete

  const deleteHandler = (id) => {
    if (window.confirm(`Delete: ${id} ?`)) {
      dispatch(deleteOrder(id))
    }
  }

  useEffect(() => {
    if (userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
    if (successDelete) {
      setSelected([])
    }
  }, [dispatch, history, userInfo, successDelete])

  const rows = []
  if (orders) {
    orders.map((order) => {
      return rows.push(
        createData(
          order._id,
          order.user && order.user.name,
          order.createdAt.substring(0, 10),
          order.totalPrice,
          order.isPaid ? (
            <Chip
              className={classes.chip}
              size='small'
              label={order.paidAt.substring(0, 10)}
              icon={<CheckCircleIcon className={classes.success} />}
            />
          ) : (
            <NotInterestedIcon color='secondary' />
          ),
          order.isDelivered ? (
            <Chip
              className={classes.chip}
              size='small'
              label={order.deliveredAt.substring(0, 10)}
              icon={<CheckCircleIcon className={classes.success} />}
            />
          ) : (
            <NotInterestedIcon color='secondary' />
          ),
          <Link
            key={order._id}
            to={`/order/${order._id}`}
            style={{ textDecoration: 'none' }}
          >
            <Button
              size='small'
              variant='contained'
              color='primary'
              startIcon={<EditIcon fontSize='small' />}
            >
              <Typography>Details</Typography>
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
                      <TableCell align='left'>{row.user}</TableCell>
                      <TableCell align='left'>{row.date}</TableCell>
                      <TableCell align='left'>
                        {
                          <NumberFormat
                            prefix={'₱ '}
                            readOnly
                            thousandSeparator
                            decimalScale={2}
                            displayType='text'
                            value={row.totalPrice}
                          />
                        }
                      </TableCell>
                      <TableCell align='left'>{row.paid}</TableCell>
                      <TableCell align='left'>{row.delivered}</TableCell>
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
