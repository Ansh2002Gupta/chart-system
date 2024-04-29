import React, {useContext, useEffect} from 'react'
import Card_cart from '../Components/Card_cart'
import { cartStatus } from '../Layouts/Layout'

const Cart = () => {
  const {cartData, setMsg, grandTotal, setGrandTotal} = useContext(cartStatus)

  useEffect(()=>{
    calculateAmount()
  },[grandTotal])

  const calculateAmount = () => {
    let amount = 0
    for(let i = 0; i < cartData.length; i++)
      amount += (cartData[i].quantity)*(cartData[i].cost)
    setGrandTotal(amount)
    setMsg(`Grand Total: ${amount}`)
  }

  // console.log(msg)

  return (
    <>
     <div className='flex-grow flex justify-center items-center h-full'>
        <div className='bg-black p-6 flex flex-col gap-8'>
            <Card_cart/>
        </div>
    </div>
    </>
  )
}

export default Cart
