import React, { useContext } from 'react'
import { cartStatus } from '../Layouts/Layout'
const MsgBox = () => {
    const {msg} = useContext(cartStatus)
    // to hide the msg-box after 5 seconds of time
    // useEffect(()=>{
    //     const element = document.getElementById('msg-box')
    //     element.style.visibility = 'visible'
    //     setTimeout(()=>{
    //         element.style.visibility = 'hidden'
    //     },5000)
    // },[msg])
  return (
    <div id='msg-box' className='sticky top-[70px] min-h-[70px] min-w-full flex font-bold text-2xl bg-sky-800 h-[50px] justify-center items-center text-white'>
      {msg}
    </div>
  )
}

export default MsgBox
