import { Grid, Typography } from '@material-ui/core'
import NumberFormat from 'react-number-format'

export const textSale = (price, salePrice) => {
  return (
    <Grid item component='span' style={{ textAlign: 'center' }}>
      <Typography
        style={{
          textDecoration: 'line-through',
          color: 'red',
        }}
      >
        <NumberFormat
          prefix={'₱ '}
          readOnly
          thousandSeparator
          decimalScale={2}
          displayType='text'
          value={price}
        />
      </Typography>
      <Typography>
        <NumberFormat
          prefix={'₱ '}
          readOnly
          thousandSeparator
          decimalScale={2}
          displayType='text'
          value={salePrice}
        />
      </Typography>
    </Grid>
  )
}
