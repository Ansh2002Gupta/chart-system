import React from 'react'
import Card from './Components/Card'


const App = () => {
  return (
    <div className='flex-grow flex justify-center items-center'>
        <div className='bg-black p-4 grid grid-cols-3 gap-x-4 gap-y-6'>
            <Card/>
        </div>
    </div>
  )
}

export default App;
