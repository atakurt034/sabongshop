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
  stableSort,
} from './mosData'
import { Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { useStyles } from './mosStyle'

import { getAvatar } from '../../actions/userActions'
import { listMyOrders } from '../../actions/orderActions'
import { ModalMessage } from '../../components/ModalMessage'
import { ModalLoader } from '../../components/ModalLoader'
import Loader from '../../components/Loader'
import Message from '../../components/Message'

export const MyOrdersScreen = ({ history }) => {
  const classes = useStyles()
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name) {
        dispatch(getAvatar('profile'))
        dispatch(listMyOrders())
      }
    }
  }, [dispatch, history, userInfo, user])

  const rows = []
  if (orders) {
    orders.map((order) => {
      return (
        !order.isDelivered &&
        rows.push(
          createData(
            order._id,
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
      )
    })
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

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  return (
    <div className={classes.root}>
      {loading && <ModalLoader />}
      {error && <ModalMessage variant='error'>{error}</ModalMessage>}
      {loadingOrders && <Loader />}
      {errorOrders && <Message variant='error'>{errorOrders}</Message>}
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby='tableTitle'
            size={dense ? 'small' : 'medium'}
            aria-label='enhanced table'
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell
                        style={{ paddingLeft: 40, width: 'fit-content' }}
                        align='left'
                      >
                        {row.id}
                      </TableCell>
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
                      <TableCell align='left'>{row.details}</TableCell>
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
