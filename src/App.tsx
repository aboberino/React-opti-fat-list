import './App.css'
import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import WithReRender from './pages/WithReRender'
import WithoutReRender from './pages/WithoutReRender'
import { Button } from '@mui/material'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export default function App() {
  const [page, setPage] = useState<'classic' | 'opti'>('classic')

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">

        <div className='btns'>
          <Button fullWidth variant={page === 'classic' ? 'outlined' : 'text'} color='primary' size='large' onClick={() => setPage('classic')}>Classic</Button>
          <Button fullWidth variant={page === 'opti' ? 'outlined' : 'text'} color='primary' size='large' onClick={() => setPage('opti')}>Opti</Button>
        </div>

        {page === 'classic' ? <WithReRender /> : <WithoutReRender />}

      </div>
    </ThemeProvider>
  )
}
