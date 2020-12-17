import { Grid, Typography } from '@material-ui/core'

export const textSale = (price, salePrice) => {
  return (
    <Grid item component='span' style={{ textAlign: 'center' }}>
      <Typography
        style={{
          textDecoration: 'line-through',
          color: 'red',
        }}
      >
        {`₱ ${price}`}
      </Typography>
      <Typography>₱ {salePrice}</Typography>
    </Grid>
  )
}
