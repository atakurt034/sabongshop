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
  TextField,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core'

import NumberFormat from 'react-number-format'
import ExtensionIcon from '@material-ui/icons/Extension'
import EcoIcon from '@material-ui/icons/Eco'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import NotInterestedIcon from '@material-ui/icons/NotInterested'

import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants'
import { listProductDetails, updateProduct } from '../../actions/productActions'

import { ModalMessage } from '../../components/ModalMessage'
import { ModalLoader } from '../../components/ModalLoader'
import { BackButton } from '../../components/NavItems/BackButton'

import { ProductImageList } from './ProductImageList/ProductImageList'

export const ProductEditScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const productId = match.params.id

  const [details, setDetails] = useState({
    name: '',
    price: 0,
    image: '',
    brand: '',
    category: '',
    countInStock: 0,
    descriptiion: '',
    isOnSale: false,
    salePrice: 0,
  })

  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
    isOnSale,
    salePrice,
  } = details

  const [uploading, setUploading] = useState(false)

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  const productDeleteImage = useSelector((state) => state.productDeleteImage)
  const { success: successDelete, loading: loadingDelete } = productDeleteImage

  useEffect(() => {
    if (successUpdate || successDelete) {
      dispatch(listProductDetails(productId))
      history.push('/admin/productlist')
      dispatch({ type: PRODUCT_UPDATE_RESET })
    } else if (!loading && !loadingDelete && !loadingUpdate) {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setDetails({
          name: product.name,
          price: product.price,
          image: product.image[product.image.length - 1],
          brand: product.brand,
          category: product.category,
          countInStock: product.countInStock,
          description: product.description,
          isOnSale: product.isOnSale,
          salePrice: product.salePrice,
        })
      }
    } else {
      dispatch(listProductDetails(productId))
    }
  }, [
    dispatch,
    history,
    productId,
    product,
    successUpdate,
    successDelete,
    loadingDelete,
    loadingUpdate,
    loading,
  ])

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

      setDetails({ image: data })
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
        image:
          product.image[product.image.length - 1] === image
            ? [...product.image]
            : [...product.image, image],
        brand,
        category,
        description,
        countInStock,
        isOnSale,
        salePrice,
      })
    )
  }

  const changeHandler = (event) => {
    const { name, value, checked } = event.target
    let currentValue = value
    if (name === 'isOnSale') {
      currentValue = checked
    }
    setDetails({ ...details, [name]: currentValue })
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
                  onChange={changeHandler}
                  name='name'
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
                  onChange={changeHandler}
                  name='brand'
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
                  onChange={changeHandler}
                  name='category'
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
                  name='description'
                  label='Description'
                  multiline
                  rowsMax={6}
                  fullWidth
                  variant='outlined'
                  onChange={changeHandler}
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
                  name='countInStock'
                  value={countInStock}
                  labelWidth={50}
                  decimalScale={0}
                  customInput={OutlinedInput}
                  thousandSeparator
                  onChange={changeHandler}
                  startAdornment={
                    <InputAdornment position='start'>
                      <DynamicFeedIcon />
                    </InputAdornment>
                  }
                  // onValueChange={(values) => {
                  //   setCountInStock(values.value)
                  // }}
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
                  name='price'
                  value={price}
                  labelWidth={50}
                  customInput={OutlinedInput}
                  startAdornment={
                    <InputAdornment position='start'>₱</InputAdornment>
                  }
                  thousandSeparator
                  decimalScale={2}
                  onChange={changeHandler}
                  // onValueChange={(values) => {
                  //   setPrice(values.value)
                  // }}
                />
              </FormControl>
            </Box>
            <Box m={2}>
              <FormControl fullWidth>
                <InputLabel variant='outlined' htmlFor='saleprice'>
                  Sale Price
                </InputLabel>
                <NumberFormat
                  labelWidth={70}
                  disabled={!isOnSale}
                  type='text'
                  name='salePrice'
                  value={salePrice}
                  customInput={OutlinedInput}
                  startAdornment={
                    <InputAdornment position='start'>₱</InputAdornment>
                  }
                  thousandSeparator
                  decimalScale={2}
                  onChange={changeHandler}
                  // onValueChange={(values) => {
                  //   setSalePrice(values.value)
                  // }}
                />

                <FormControlLabel
                  label='Put on Sale?'
                  control={
                    <Checkbox
                      checked={isOnSale}
                      name='isOnSale'
                      onChange={changeHandler}
                      icon={<NotInterestedIcon color='secondary' />}
                      checkedIcon={
                        <CheckCircleIcon
                          style={{
                            color: 'green',
                            backgroundColor: '#fff',
                            borderRadius: '50%',
                          }}
                        />
                      }
                    />
                  }
                />
              </FormControl>
            </Box>

            <Box m={2}>
              <FormControl required fullWidth>
                {loadingDelete ? (
                  <ModalLoader />
                ) : (
                  <ProductImageList
                    imageProduct={product.image}
                    upload={uploadFileHandler}
                    id={productId}
                  />
                )}
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
