import React from 'react'
import BigNumber from 'bignumber.js'
import { Text, TextProps } from '@pancakeswap-libs/uikit'
import { BIG_ZERO } from 'utils/bigNumber'

interface PercentageOfTotalProps extends TextProps {
  userAmount: BigNumber
  totalAmount: BigNumber
}

const PercentageOfTotal: React.FC<PercentageOfTotalProps> = ({ userAmount, totalAmount, ...props }) => {
  const percentOfUserContribution = totalAmount.isGreaterThan(0)
    ? userAmount.div(totalAmount).times(100).toNumber()
    : BIG_ZERO
  const percentOfUserDisplay = percentOfUserContribution.toLocaleString(undefined, { maximumFractionDigits: 5 })

  return (
    <Text fontSize="14px" color="textSubtle" {...props}>
      {`${percentOfUserDisplay}% of total`}, num: percentOfUserDisplay
    </Text>
  )
}

export default PercentageOfTotal
