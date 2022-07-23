import {useState} from 'react'

import './Button.scss'
import {colors} from '../../config'

const Button = ({label, icon, action, disabled, style}) => {

  const [isHover, setIsHover] = useState(false)

  return (
    <div
      id='buttonContainer'
      className={disabled ? '' : 'anim a b'}
      onClick={disabled ? null : action}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        backgroundColor: disabled ? 'grey' : colors.primary,
        cursor: disabled ? 'initial' : 'pointer',
        color: disabled ? 'lightgrey' : 'white',
        borderColor: disabled ? 'grey' :
          isHover ? 'white' : colors.primary,
        borderRadius: 15, ...style
      }}
    >
      <div style={{display: 'flex', alignItems: 'center',
        justifyContent: 'center'}}
      >
        {
          icon &&
          <div style={{marginRight: label ? 7 : 0, display: 'flex',
            alignItems: 'center'}}>
            {icon}
          </div>
        }
        {label && <div style={{paddingBottom: 2}}>{label.toUpperCase()}</div>}
      </div>
    </div>
  )
}

export default Button