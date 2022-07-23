import OldTextField from '@mui/material/TextField'

import {colors} from '../../config'

const TextField = ({value, style, fullWidth, action,
  label, disabled, isOptional, handleConfirm, password}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      {
        label &&
        <div style={{display: 'flex', alignItems: 'flex-end'}}>
          <div style={{fontSize: 20}}>{label}</div>
          {
            isOptional &&
            <div style={{fontSize: 11, marginLeft: 5, color: 'grey', paddingBottom: 2}}>
              (Optionnel)
            </div>}
        </div>
      }
      <OldTextField
        type={password ? 'password' : 'text'}
        disabled={disabled}
        fullWidth={fullWidth}
        autoComplete='off'
        style={{...style}}
        value={value}
        onChange={(e) => action(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleConfirm()}
        inputProps={{style: {textAlign: 'center', height: 3}}}
        sx={{
          borderWidth: 1,
          borderStyle: 'solid',
          borderRadius: 1,
          borderColor: disabled ? 'black' : colors.primary,
          '& .MuiOutlinedInput-root': {
            color: colors.primary,
            '&:hover fieldset': {
              borderColor: !disabled && colors.primary,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary
            }
          }
        }}
      />
    </div>
  )
}

export default TextField