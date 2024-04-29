import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {cartStatus} from '../Layouts/Layout'

const Header = () => {
  const {cartData} = useContext(cartStatus)
  return (
    <div className='sticky top-0 flex flex-row justify-around items-center bg-zinc-800 w--screen h-[70px]'>
      <Link className='flex justify-center items-center text-center py-4 px-8 hover:border-b-4 hover:border-b-amber-500 focus:border-b-4 focus:border-b-amber-500  text-amber-500 text-2xl' to=''>Home</Link>
      <Link className='flex justify-center items-center text-center py-4 px-8 hover:border-b-4 hover:border-b-amber-500 focus:border-b-4 focus:border-b-amber-500 text-amber-500 text-2xl' to='/cart'>Cart<span className="flex justify-center items-center ml-4 w-[20px] h-[20px] text-xs font-bold rounded-full ring-amber-500 ring-2">{cartData.length}</span></Link>
    </div>
  )
}

export default Header
