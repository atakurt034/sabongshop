import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {
  Container,
  FormControl,
  InputLabel,
  InputAdornment,
  Box,
  Button,
  CardMedia,
  OutlinedInput,
  useMediaQuery,
  useTheme,
  TextField,
} from '@material-ui/core'

import { useStyles } from './pesStyle'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import NumberFormat from 'react-number-format'
import ExtensionIcon from '@material-ui/icons/Extension'
import EcoIcon from '@material-ui/icons/Eco'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed'

import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants'
import { listProductDetails, updateProduct } from '../../actions/productActions'

import { ModalMessage } from '../../components/ModalMessage'
import { ModalLoader } from '../../components/ModalLoader'
import { BackButton } from '../../components/NavItems/BackButton'

export const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id
  const classes = useStyles()
  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.down('xs'))

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, history, productId, product, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload/product', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    )
  }

  return (
    <Container maxWidth='md'>
      <h2>Edit Product</h2>
      <BackButton to={'/admin/productlist'} />
      {loadingUpdate && <ModalLoader />}
      {errorUpdate && (
        <ModalMessage variant='error'>{errorUpdate}</ModalMessage>
      )}
      {loading ? (
        <ModalLoader />
      ) : error ? (
        <ModalMessage variant='error'>{error}</ModalMessage>
      ) : (
        <Container maxWidth='sm'>
          <Box p={1}>
            <CardMedia image={image} component='img' />
          </Box>
          <form onSubmit={submitHandler}>
            <Box m={2}>
              <FormControl fullWidth required>
                <InputLabel variant='outlined' htmlFor='name'>
                  Name
                </InputLabel>
                <OutlinedInput
                  labelWidth={60}
                  required
                  type='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id='name'
                  startAdornment={
                    <InputAdornment position='start'>
                      <WhatshotIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>

            <Box m={2}>
              <FormControl fullWidth required>
                <InputLabel variant='outlined' htmlFor='brand'>
                  Brand
                </InputLabel>
                <OutlinedInput
                  labelWidth={60}
                  required
                  type='brand'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  id='brand'
                  startAdornment={
                    <InputAdornment position='start'>
                      <EcoIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>

            <Box m={2}>
              <FormControl fullWidth required>
                <InputLabel variant='outlined' htmlFor='category'>
                  Category
                </InputLabel>
                <OutlinedInput
                  labelWidth={90}
                  required
                  type='text'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  id='category'
                  startAdornment={
                    <InputAdornment position='start'>
                      <ExtensionIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>

            <Box m={2}>
              <FormControl fullWidth required>
                <TextField
                  required
                  value={description}
                  id='description'
                  label='Description'
                  multiline
                  rowsMax={6}
                  fullWidth
                  variant='outlined'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
            </Box>

            <Box m={2}>
              <FormControl required fullWidth>
                <InputLabel variant='outlined' htmlFor='countInStock'>
                  Stock
                </InputLabel>

                <NumberFormat
                  type='text'
                  id='countInStock'
                  value={countInStock}
                  labelWidth={50}
                  customInput={OutlinedInput}
                  thousandSeparator
                  startAdornment={
                    <InputAdornment position='start'>
                      <DynamicFeedIcon />
                    </InputAdornment>
                  }
                  onValueChange={(values) => {
                    setCountInStock(values.value)
                  }}
                />
              </FormControl>
            </Box>

            <Box m={2}>
              <FormControl required fullWidth>
                <InputLabel variant='outlined' htmlFor='price'>
                  Price
                </InputLabel>
                <NumberFormat
                  type='text'
                  id='price'
                  value={price}
                  labelWidth={50}
                  customInput={OutlinedInput}
                  startAdornment={
                    <InputAdornment position='start'>₱</InputAdornment>
                  }
                  thousandSeparator
                  decimalScale={2}
                  onValueChange={(values) => {
                    setPrice(values.value)
                  }}
                />
              </FormControl>
            </Box>
            <Box m={2}>
              <FormControl required fullWidth>
                <InputLabel htmlFor='image' variant='outlined'>
                  Image
                </InputLabel>
                <OutlinedInput
                  id='image'
                  required
                  value={image}
                  labelWidth={50}
                  onChange={(e) => setImage(e.target.value)}
                  endAdornment={
                    <InputAdornment>
                      <input
                        accept='image/*'
                        multiple
                        className={classes.input}
                        id='contained-button-file'
                        type='file'
                        onChange={uploadFileHandler}
                      />
                      <label htmlFor='contained-button-file'>
                        <Button
                          variant='contained'
                          color='primary'
                          component='span'
                          size='small'
                          startIcon={
                            !xs && <CloudUploadIcon fontSize='small' />
                          }
                        >
                          {xs && <CloudUploadIcon fontSize='small' />}
                          {!xs && 'Upload'}
                        </Button>
                      </label>
                    </InputAdornment>
                  }
                />
                {uploading && <ModalLoader />}
              </FormControl>
            </Box>

            <Box justifyContent='center' display='flex' p={2}>
              <div>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={loading}
                >
                  UPDATE
                </Button>
              </div>
            </Box>
          </form>
        </Container>
      )}
    </Container>
  )
}
