import pkg from 'lodash'
const { toNumber } = pkg

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

function isNumeric(num) {
  return !isNaN(num)
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

export const Query = (keywords) => {
  if (isNumeric(keywords)) {
    return isNumber(keywords)
  } else {
    return isString(keywords)
  }
}
