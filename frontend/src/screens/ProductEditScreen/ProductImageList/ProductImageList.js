import React, { useEffect, useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  FormControlLabel,
  Switch,
} from '@material-ui/core'

import {
  createData,
  getComparator,
  EnhancedTableHead,
  EnhancedTableToolbar,
  stableSort,
} from './pilData'
import { Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useStyles } from './pilStyle'
import { PRODUCT_DELETE_IMAGE_RESET } from '../../../constants/productConstants'
import {
  deleteProductImage,
  listProductDetails,
} from '../../../actions/productActions'

import Message from '../../../components/Message'
import Loader from '../../../components/Loader'

import CloudUploadIcon from '@material-ui/icons/CloudUpload'

export const ProductImageList = ({ history, imageProduct, upload, id }) => {
  const classes = useStyles()
  const [order, setOrder] = React.useState('desc')
  const [orderBy, setOrderBy] = React.useState('path')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const productDeleteImage = useSelector((state) => state.productDeleteImage)
  const { loading, error, success } = productDeleteImage

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const dispatch = useDispatch()

  const deleteHandler = (images) => {
    if (window.confirm(`Delete: ${images} ?`)) {
      dispatch(deleteProductImage(id, images))
    }
  }

  useEffect(() => {
    if (success) {
      dispatch(listProductDetails(id))
      dispatch({ type: PRODUCT_DELETE_IMAGE_RESET })
    }
  }, [dispatch, success, id])

  const rows = []
  if (imageProduct !== undefined) {
    imageProduct.map((img) => {
      return rows.push(
        createData(
          <img src={img} alt={img} style={{ height: 50, padding: 10 }} />,
          img
        )
      )
    })
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.path)
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
                  const isItemSelected = isSelected(row.path)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.path)}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.path}
                      selected={isItemSelected}
                    >
                      {loading && <Loader />}
                      {error && <Message variant='error'>{error}</Message>}
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
                        {row.image}
                      </TableCell>
                      <TableCell align='left'>{row.path}</TableCell>
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
      <input
        accept='image/*'
        multiple
        className={classes.input}
        id='contained-button-file'
        type='file'
        onChange={(e) => upload(e)}
      />
      <label htmlFor='contained-button-file'>
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          component='span'
          size='small'
          startIcon={<CloudUploadIcon fontSize='small' />}
        >
          {'Upload'}
        </Button>
      </label>
    </div>
  )
}
