const options = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 100 },
  {
    id: 'price',
    label: 'Price',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toLocaleString('en', options),
  },
  {
    id: 'category',
    label: 'Category',
    minWidth: 60,
    align: 'center',
  },
  {
    id: 'brand',
    label: 'Brand',
    minWidth: 40,
    align: 'center',
  },
  {
    id: 'edit',
    label: '',
    minWidth: 40,
    align: 'center',
  },
  {
    id: 'deleteProduct',
    label: '',
    minWidth: 40,
    align: 'center',
  },
]

function createData(id, name, price, category, brand, edit, deleteProduct) {
  return { id, name, price, category, brand, edit, deleteProduct }
}

export { createData, columns, options }
