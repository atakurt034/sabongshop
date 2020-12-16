import React from 'react'
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
import { Button, Chip } from '@material-ui/core'

import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import { useStyles } from './psStyle'
import NumberFormat from 'react-number-format'
import Message from '../../components/Message'

const options = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'date', label: 'DATE', minWidth: 100 },
  {
    id: 'total',
    label: 'Total',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('en', options),
  },
  {
    id: 'paid',
    label: 'Paid',
    minWidth: 120,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'delivered',
    label: 'Delivered',
    minWidth: 120,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'details',
    label: '',
    minWidth: 80,
    align: 'left',
  },
]

function createData(id, date, total, paid, delivered, details) {
  return { id, date, total, paid, delivered, details }
}

export const TableOrders = () => {
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const rows = []
  const orderListMy = useSelector((state) => state.orderListMy)
  const { orders } = orderListMy
  orders.map((order) => {
    return rows.push(
      ((order.isPaid && order.isDelivered) || order.isCancelled) &&
        createData(
          order._id,
          order.createdAt.substring(0, 10),
          <NumberFormat
            prefix={'₱ '}
            readOnly
            thousandSeparator
            decimalScale={2}
            displayType='text'
            value={order.totalPrice}
          />,
          order.isPaid && !order.isCancelled ? (
            <Chip
              className={classes.chip}
              size='small'
              label={order.paidAt.substring(0, 10)}
              icon={<CheckCircleIcon className={classes.success} />}
            />
          ) : order.isCancelled ? (
            <Message variant='error'>Cancelled</Message>
          ) : (
            <NotInterestedIcon color='error' />
          ),
          order.isDelivered && !order.isCancelled ? (
            <Chip
              className={classes.chip}
              size='small'
              label={order.deliveredAt.substring(0, 10)}
              icon={<CheckCircleIcon className={classes.success} />}
            />
          ) : order.isCancelled ? (
            <Message variant='error'>Cancelled</Message>
          ) : (
            <NotInterestedIcon color='error' />
          ),
          <Link
            key={order._id}
            to={`/order/${order._id}`}
            style={{ textDecoration: 'none' }}
          >
            <Button variant='contained' color='primary'>
              Details
            </Button>
          </Link>
        )
    )
  })

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper className={classes.rootTable}>
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
