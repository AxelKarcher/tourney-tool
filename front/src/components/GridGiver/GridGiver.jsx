import {useState} from 'react'
import RefreshIcon from '@mui/icons-material/Refresh'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Switch from 'react-ios-switch'

import {colors, margin} from '../../config'
import './GridGiver.scss'
import Button from '../Button/Button'

const GridGiver = () => {

  const grid = new Array(25)

  const [nb, setNb] = useState(5)
  const [gen, setGen] = useState()
  const [generating, setGenerating] = useState(false)
  const [isStream, setIsStream] = useState(false)

  const getRandom = () => {
    return Math.floor(Math.random() * grid.length)
  }

  const generate = () => {
    setGenerating(true)

    const interval = setInterval(() => {
      let newGen = []
      let tmp

      {[...Array(nb)].forEach((elem) => {
        tmp = getRandom()
        while (newGen.includes(tmp)) {tmp = getRandom()}
        newGen.push(tmp)
      })}
      setGen(newGen)
    }, 50)

    setTimeout(() => {
      clearInterval(interval)
      setGenerating(false)
    }, 1500)
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: 20, backgroundColor: isStream ? 'lime' : ''}}
    >
      <div style={{width: '100%', display: 'flex', alignItems: 'center',
        justifyContent: 'space-around'}}
      >
        <div style={{display: 'flex'}}>
          <Button
            style={{width: '100%'}}
            icon={<RemoveIcon fontSize='large' />}
            action={nb !== 1  ? () => setNb(nb - 1) : null}
          />
          <div style={{display: 'flex', whiteSpace: 'nowrap', marginLeft: margin, marginRight: margin}}>
            {'Case' + (nb === 1 ? '' : 's') + ': ' + nb}
          </div>
          <Button
            style={{width: '100%'}}
            icon={<AddIcon fontSize='large' />}
            action={nb !== 25  ? () => setNb(nb + 1) : null}
          />
        </div>
        <Switch
          checked={isStream}
          onChange={() => {setIsStream(!isStream)}}
          handleColor={colors.bg}
          offColor='grey'
          onColor={colors.primary}
        />
      </div>
      <div id='grid' style={{marginTop: margin, marginBottom: margin}}>
        {[...grid].map((elem, i) => (
          <div
            key={i}
            style={{height: 100, width: 100,
              backgroundColor: gen?.includes(i) ? colors.primary : colors.light,
              borderTopLeftRadius: i === 0 ? 20 : 0,
              borderTopRightRadius: i === 4 ? 20 : 0,
              borderBottomLeftRadius: i === 20 ? 20 : 0,
              borderBottomRightRadius: i === 24 ? 20 : 0}}>
          </div>
        ))}
      </div>
      <Button
        style={{width: '100%'}}
        icon={<RefreshIcon fontSize='large' />}
        action={generate}
        disabled={generating}
      />
    </div>
  )
}

export default GridGiver