const options = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 100 },
  {
    id: 'email',
    label: 'Email',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'admin',
    label: 'Admin',
    minWidth: 60,
    align: 'center',
  },
  {
    id: 'edit',
    label: '',
    minWidth: 40,
    align: 'center',
  },
  {
    id: 'deleteUser',
    label: '',
    minWidth: 40,
    align: 'center',
  },
]

function createData(id, name, email, admin, edit, deleteUser) {
  return { id, name, email, admin, edit, deleteUser }
}

export { createData, columns, options }
