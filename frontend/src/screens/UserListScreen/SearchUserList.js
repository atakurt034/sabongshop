import React, { useState } from 'react'
import InputBase from '@material-ui/core/InputBase'
import { useStyles } from './ulsStyle'
import FilterListIcon from '@material-ui/icons/FilterList'

export const Search = ({ history, searched }) => {
  const classes = useStyles()
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    if (keyword.trim()) {
      e.preventDefault()
      searched(keyword)
    }
  }
  let search = (
    <div className={classes.search}>
      <form onSubmit={submitHandler}>
        <div className={classes.searchIcon}>
          <FilterListIcon />
        </div>

        <InputBase
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Filter…'
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'filter' }}
        />
      </form>
    </div>
  )

  return search
}
