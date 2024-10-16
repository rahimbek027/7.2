import {GithubOutlined} from '@ant-design/icons'
import React from 'react'

function Header() {
  return (
    <div className='py-5 bg-[#001529] px-10  border-b-[2px] border-white'>
        <div className='flex  items-center gap-5 space-x-5 '>
        <GithubOutlined  className='scale-[3] text-white'/>
        <h2 className='text-[22px] text-white font-semibold'>Admin panel</h2>
        </div>
    </div>
  )
}

export default Header
