const options = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}
let i = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Dessert (100g serving)',
  },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
]

const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'ID',
  },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'admin', numeric: false, disablePadding: false, label: 'Admin' },
  { id: 'edit', numeric: false, disablePadding: false, label: '' },
]

// {
//   id: 'deleteUser',
//   label: '',
//   minWidth: 40,
//   align: 'center',
// },

function createData(id, name, email, admin, edit, deleteUser) {
  return { id, name, email, admin, edit, deleteUser }
}

export { createData, headCells, options }
