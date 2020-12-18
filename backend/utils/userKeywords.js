import mongoose from 'mongoose'
import pkg from 'lodash'
const { toNumber, isObject } = pkg

function isObjectID(keywords) {
  return keywords.length === 24
}

const key1 = (keyword) => {
  return keyword
    ? {
        name: {
          $regex: keyword,
          $options: 'i',
        },
      }
    : {}
}

const key2 = (keyword) => {
  return keyword
    ? {
        email: {
          $regex: keyword,
          $options: 'i',
        },
      }
    : {}
}

const key3 = (keyword) => {
  return keyword
    ? {
        googleId: {
          $regex: keyword,
          $options: 'i',
        },
      }
    : {}
}
const key4 = (keyword) => {
  return keyword
    ? {
        facebookId: {
          $regex: keyword,
          $options: 'i',
        },
      }
    : {}
}

const key5 = (keyword) => {
  return keyword
    ? {
        _id: keyword,
      }
    : {}
}

const isString = (keywords) => {
  return [
    { ...key1(keywords) },
    { ...key2(keywords) },
    { ...key3(keywords) },
    { ...key4(keywords) },
  ]
}

const isId = (keywords) => {
  return [{ ...key5(keywords) }]
}

export const Query = (keywords) => {
  if (isObjectID(keywords)) {
    return isId(keywords)
  } else {
    return isString(keywords)
  }
}
