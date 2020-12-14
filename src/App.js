import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import TimelineDisplay from './components/TimelineDisplay'

function App() {
  return (
    <Container disableGutters maxWidth='md' style={{background: '#e5e5e5', height: '100%'}}>
      <AppBar position='sticky'>
        <Toolbar>
          <Typography variant='h6'>
            RPG Organizer
          </Typography>
        </Toolbar>
      </AppBar>
      <TimelineDisplay/>
    </Container>
  )
}

export default App
