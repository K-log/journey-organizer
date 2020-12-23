import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import JourneyTimeline from './components/JourneyTimeline'

function App() {
  return (
    <Container disableGutters maxWidth='md' style={{background: '#e5e5e5', height: '100%'}}>
      <AppBar position='sticky'>
        <Toolbar>
          <Typography variant='h6'>
            Journey Organizer
          </Typography>
        </Toolbar>
      </AppBar>
      <JourneyTimeline/>
    </Container>
  )
}

export default App
