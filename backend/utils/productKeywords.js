import mongoose from 'mongoose'
import pkg from 'lodash'
const { toNumber, isObject } = pkg

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
        brand: {
          $regex: keyword,
          $options: 'i',
        },
      }
    : {}
}

function isNumeric(keywords) {
  return !isNaN(keywords)
}
function isObjectID(keywords) {
  return keywords.length === 24
}

const key3 = (keyword) => {
  let numbers
  if (isNumeric(keyword)) {
    numbers = toNumber(keyword)
  }
  const min = 0
  const max = numbers
  return keyword
    ? {
        price: { $gt: min, $lt: max },
      }
    : {}
}

const key4 = (keyword) => {
  return keyword
    ? {
        category: {
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

const isNumber = (keywords) => {
  return [
    { ...key1(keywords) },
    { ...key2(keywords) },
    { ...key3(keywords) },
    { ...key4(keywords) },
  ]
}

const isString = (keywords) => {
  return [{ ...key1(keywords) }, { ...key2(keywords) }, { ...key4(keywords) }]
}

const isId = (keywords) => {
  return [{ ...key5(keywords) }]
}

export const Query = (keywords) => {
  if (isNumeric(keywords)) {
    return isNumber(keywords)
  } else if (isObjectID(keywords)) {
    return isId(keywords)
  } else {
    return isString(keywords)
  }
}
