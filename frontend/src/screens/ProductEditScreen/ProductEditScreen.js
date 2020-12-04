import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {
  Container,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Box,
  Button,
} from '@material-ui/core'

import AccountCircle from '@material-ui/icons/AccountCircle'
import EmailIcon from '@material-ui/icons/Email'

import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants'
import { listProductDetails, updateProduct } from '../../actions/productActions'

import { ModalMessage } from '../../components/ModalMessage'
import { ModalLoader } from '../../components/ModalLoader'
import { BackButton } from '../../components/NavItems/BackButton'

export const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [numReviews, setNumReviews] = useState(0)
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
        setNumReviews(product.numReviews)
      }
    }
  }, [dispatch, product, productId, history, successUpdate])

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
      const { data } = await axios.post('/api/upload', formData, config)
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
        countInStock,
        description,
        numReviews,
      })
    )
  }

  return (
    <Container maxWidth='sm'>
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
        <Container maxWidth='xs'>
          <form onSubmit={submitHandler}>
            <FormControl fullWidth required>
              <InputLabel htmlFor='name'>Name</InputLabel>
              <Input
                required
                type='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                id='name'
                startAdornment={
                  <InputAdornment position='start'>
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>

            <FormControl required fullWidth>
              <InputLabel htmlFor='price'>Price</InputLabel>
              <Input
                required
                type='number'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                id='price'
                startAdornment={
                  <InputAdornment position='start'>
                    <EmailIcon />
                  </InputAdornment>
                }
              />
            </FormControl>

            <FormControl required fullWidth>
              <InputLabel htmlFor='price'>Price</InputLabel>
              <Input
                required
                type='number'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                id='price'
                startAdornment={
                  <InputAdornment position='start'>
                    <EmailIcon />
                  </InputAdornment>
                }
              />
            </FormControl>

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
