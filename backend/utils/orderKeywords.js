import mongoose from 'mongoose'
import pkg from 'lodash'
const { toNumber, isObject } = pkg

function isNumeric(keywords) {
  return !isNaN(keywords)
}

function isObjectID(keywords) {
  return keywords.length === 24
}

function isDateCheck(val) {
  let d = new Date(val)
  return !isNaN(d.valueOf())
}

const key1 = (keyword) => {
  return keyword
    ? {
        _id: keyword,
      }
    : {}
}

const key2 = (keyword) => {
  let numbers
  if (isNumeric(keyword)) {
    numbers = toNumber(keyword)
  }
  const min = 0
  const max = numbers
  return keyword
    ? {
        totalPrice: { $gt: min, $lt: max },
      }
    : {}
}

const key3 = (keyword) => {
  return keyword
    ? {
        createdAt: { $gte: new Date(keyword) },
      }
    : {}
}

const isNumber = (keywords) => {
  return [{ ...key2(keywords) }]
}

const isId = (keywords) => {
  return [{ ...key1(keywords) }]
}

const isDate = (keywords) => {
  return [{ ...key3(keywords) }]
}

export const Query = (keywords) => {
  if (isNumeric(keywords)) {
    return isNumber(keywords)
  } else if (isObjectID(keywords)) {
    return isId(keywords)
  } else if (isDateCheck(keywords)) {
    return isDate(keywords)
  }
}
