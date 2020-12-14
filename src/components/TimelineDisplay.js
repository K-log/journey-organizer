import React, { Component } from 'react'
import TimelineItem from '@material-ui/lab/TimelineItem'
import Typography from '@material-ui/core/Typography'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineDot from '@material-ui/lab/TimelineDot'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import Paper from '@material-ui/core/Paper'
import Timeline from '@material-ui/lab/Timeline'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import { EditorState } from 'draft-js'


import TimelineItemEditor from './TimelineItemEditor'

const testTimelineData = [
  {
    "title" : "First Stop",
    "summary": "First stop on a long adventure.",
    "content": EditorState.createEmpty()
  },
  {
    "title" : "Second Stop",
    "summary": "Second stop on a long adventure.",
    "content": EditorState.createEmpty()
  },
  {
    "title" : "Third Stop",
    "summary": "Third stop on a long adventure.",
    "content": EditorState.createEmpty()
  },
  {
    "title" : "Fourth Stop",
    "summary": "Fourth stop on a long adventure.",
    "content": EditorState.createEmpty()
  }
]


export default class TimelineDisplay extends Component {

  state = {
    timelineItems: testTimelineData,
    itemEditorOpen: false,
    curItemIndex: null
  }

  addNewTLItem = () => {
    this.setState(state => ({
      timelineItems: [
        {
          title: 'New Item',
          summary: 'A newly added item. Click to edit!',
          "content": EditorState.createEmpty()
        },
        ...state.timelineItems
      ]}))
  }

  handleEditorClose = updatedItem => {
    const { timelineItems, curItemIndex } = this.state
    timelineItems[curItemIndex] = updatedItem
    this.setState({curItemIndex: null, timelineItems})
  }

  renderTimelineItem = ({title, summary, content}, index, array) => (
    <TimelineItem key={index}>
      <TimelineSeparator>
        <TimelineDot />
        {index !== array.length-1 && <TimelineConnector/>}
      </TimelineSeparator>
      <TimelineContent onClick={() => this.setState({curItemIndex: index})}>
        <Paper elevation={3}>
          <Typography variant='h6' component='h6'>
            {title}
          </Typography>
          <Typography variant='subtitle1' component='span'>{summary}</Typography>
        </Paper>
      </TimelineContent>
    </TimelineItem>
  )

  render() {
    const { timelineItems, curItemIndex } = this.state

    return (
      <div style={{maxWidth: '80%'}}>
        <TimelineItemEditor item={timelineItems[curItemIndex] ?? curItemIndex} onClose={this.handleEditorClose}/>
        <Timeline align='alternate'>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Button
                variant='contained'
                startIcon={<AddIcon />}
                onClick={this.addNewTLItem}
              >
                Click to add a new item
              </Button>
            </TimelineContent>
          </TimelineItem>
          {timelineItems.map(this.renderTimelineItem)}
        </Timeline>
      </div>
    )
  }
}