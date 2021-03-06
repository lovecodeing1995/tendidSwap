import React, { ReactNode, useState } from 'react'
import { AutoRenewIcon, Button, ButtonProps } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import { usePredictionsContract } from 'hooks/useContract'
import useToast from 'hooks/useToast'

interface ReclaimPositionButtonProps extends ButtonProps {
  epoch: number
  onSuccess?: () => Promise<void>
  children?: ReactNode
}

const ReclaimPositionButton: React.FC<ReclaimPositionButtonProps> = ({ epoch, onSuccess, children, ...props }) => {
  const [isPendingTx, setIsPendingTx] = useState(false)
  const { account } = useWeb3React()
  const predictionsContract = usePredictionsContract()
  const { toastSuccess, toastError } = useToast()

  const handleReclaim = () => {
    predictionsContract.methods
      .claim(epoch)
      .send({ from: account })
      .once('sending', () => {
        setIsPendingTx(true)
      })
      .once('receipt', async () => {
        if (onSuccess) {
          await onSuccess()
        }
        setIsPendingTx(false)
        toastSuccess('Position reclaimed!')
      })
      .once('error', (error) => {
        setIsPendingTx(false)
        toastError('Error', error?.message)
        console.error(error)
      })
  }

  return (
    <Button
      onClick={handleReclaim}
      isLoading={isPendingTx}
      endIcon={isPendingTx ? <AutoRenewIcon spin color="white" /> : null}
      {...props}
    >
      {children || 'Reclaim Position'}
    </Button>
  )
}

export default ReclaimPositionButton
