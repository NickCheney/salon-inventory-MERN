import { FC } from 'react'
import './ExitButton.css'

import cancelIcon from './assets/icons/cancel_icon.svg'
  
const ExitButton: FC<{onClick: Function, id?: string, style?: object}> = (props) => {
  return (
    <button id={props.id} className="cancel exit" style={props.style} onClick={() => props.onClick()}>
      <img src={cancelIcon}/>
    </button>
  )
}

export default ExitButton