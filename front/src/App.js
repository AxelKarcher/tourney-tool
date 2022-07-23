import {useEffect, useState} from 'react'
import axios from 'axios'
import RefreshIcon from '@mui/icons-material/Refresh'

import './App.css'
import TextField from './components/TextField/TextField'
import {colors, margin} from './config'
import GridGiver from './components/GridGiver/GridGiver'
import Button from './components/Button/Button'

function App () {

  const paths = [
    {label: 'JOUEUR 1', id: 'pseudo1'},
    {label: 'JOUEUR 2', id: 'pseudo2'},
    {label: 'CAST', id: 'cast'},
    {label: 'MATCH', id: 'match'}
  ]

  const [fields, setFields] = useState({pseudo1: '', pseudo2: '',
    cast: '', match: ''})
  const [isChange, setIsChange] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:8080/files/')
      .then((res) => {setFields(res.data)})
      .catch((err) => {console.error(err)})
  }, [])

  const changeFiles = () => {
    axios.post('http://localhost:8080/files/', {data: fields})
      .then(() => setIsChange(false))
      .catch((err) => {console.error(err)})
  }

  const changeFields = (data, id) => {
    let newFields = {...fields}

    newFields[id] = data
    setFields(newFields)
    setIsChange(true)
  }

  return (
    <div
      className='appContainer'
      style={{backgroundColor: colors.bg, color: colors.primary}}
    >
      <div style={{cursor: 'crosshair'}}>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 100}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          {paths?.map((elem, i) => (
            <div
              key={i}
              style={{display: 'flex', alignItems: 'center',
                marginBottom: i !== paths.length ? margin : 0}}
            >
              <div style={{marginRight: margin, width: 145, textAlign: 'right'}}>
                {elem.label}
              </div>
              <TextField
                value={fields[elem.id]}
                action={(e) => changeFields(e, elem.id)}
              />
            </div>
          ))}
          <Button
            style={{width: '100%'}}
            icon={<RefreshIcon fontSize='large' />}
            action={() => changeFiles()}
            disabled={!isChange}
          />
        </div>
      </div>
      <GridGiver />
    </div>
  )
}

export default App
