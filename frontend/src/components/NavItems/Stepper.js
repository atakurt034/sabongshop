import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import { Link } from 'react-router-dom'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import PaymentIcon from '@material-ui/icons/Payment'
import LoyaltyIcon from '@material-ui/icons/Loyalty'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}))

function getSteps() {
  //   return ['Sign In', 'Shipping', 'Payment', 'Place Order']
  return [
    {
      name: 'Sign In',
      icon: (
        <Link to='/login'>
          <LockOutlinedIcon color='secondary' />
        </Link>
      ),
    },
    {
      name: 'Shipping',
      icon: (
        <Link to='/shipping'>
          <LocalShippingIcon color='primary' />
        </Link>
      ),
    },
    {
      name: 'Payment',
      icon: (
        <Link to='/payment'>
          <PaymentIcon style={{ color: 'yellow' }} />
        </Link>
      ),
    },
    {
      name: 'Place Order',
      icon: <LoyaltyIcon style={{ color: 'green' }} />,
    },
  ]
}

// function getStepContent(stepIndex) {
//   switch (stepIndex) {
//     case 0:
//       return 'Sign In'
//     case 1:
//       return 'Shipping'
//     case 2:
//       return 'This is the bit I really care about!'
//     default:
//       return 'Unknown stepIndex'
//   }
// }

export const CheckSteps = ({ numSteps }) => {
  const classes = useStyles()
  const steps = getSteps()

  return (
    <div className={classes.root}>
      <Stepper
        style={{ backgroundColor: 'transparent' }}
        activeStep={numSteps + 1}
        alternativeLabel
      >
        {steps.map((label) => (
          <Step key={label.name}>
            <StepLabel>
              {label.icon}
              {<br />}
              {label.name}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}
