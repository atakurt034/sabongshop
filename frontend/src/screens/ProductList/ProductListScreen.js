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
import AddCircleIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

import { columns, createData } from './plsData'
import { useStyles } from './plsStyle'

import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants'

import { ModalLoader } from '../../components/ModalLoader'
import { ModalMessage } from '../../components/ModalMessage'

export const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { error, loading, products } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDelete = useSelector((state) => state.productDelete)
  const {
    error: errorDelete,
    loading: loadingDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    error: errorCreate,
    loading: loadingCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (!userInfo && userInfo.isAdmin) {
      history.push('/login')
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts())
    }
  }, [
    dispatch,
    userInfo,
    history,
    successCreate,
    createdProduct,
    successDelete,
  ])

  const deleteHandler = (id, name) => {
    if (window.confirm(`Delete: ${name} ?`)) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  const rows = []
  if (products) {
    products.map((product) => {
      return rows.push(
        createData(
          product._id,
          product.name,
          `₱ ${product.price}`,
          product.category,
          product.brand,
          <Link
            key={product._id}
            to={`/admin/product/${product._id}/edit`}
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
            onClick={() => deleteHandler(product._id, product.name)}
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
      {loadingCreate ? (
        <ModalLoader />
      ) : (
        errorCreate && (
          <ModalMessage variant='error'>{errorCreate}</ModalMessage>
        )
      )}
      {loadingDelete ? (
        <ModalLoader />
      ) : (
        errorDelete && (
          <ModalMessage variant='error'>{errorDelete}</ModalMessage>
        )
      )}
      <Typography className={classes.title} variant='h5' component='h1'>
        PRODUCTS
      </Typography>
      <Button
        className={classes.button}
        size='small'
        variant='contained'
        startIcon={<AddCircleIcon />}
        onClick={createProductHandler}
      >
        <Typography>Create Product</Typography>
      </Button>
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
