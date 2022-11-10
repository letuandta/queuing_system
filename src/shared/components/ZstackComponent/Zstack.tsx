import React from 'react'
import './style.scss'

interface ZstackProps {
    children: React.ReactNode
}

const Zstack = (props: ZstackProps) => {
    return (
        <div className='zstack'>{props.children}</div>
    )
}

export default Zstack