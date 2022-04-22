import React from 'react'
import {} from './Container.scss'

export default function Container({ children }: { children: (string | React.ReactNode)[] }){
  return <div className={}>
    {children}
  </div>
}
