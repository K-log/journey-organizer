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
import styled from 'styled-components'
import TimelineItemEditor from './TimelineItemEditor'


const TimelinePaper = styled(Paper)`
  padding: 0.5rem;
  cursor: pointer;
`

export default class JourneyTimeline extends Component {

  state = {
    timelineItems: [],
    itemEditorOpen: false,
    curItemIndex: null
  }

  componentDidMount() {
    const timeline = JSON.parse(localStorage.getItem('timeline')) ?? []
    this.setState({ timelineItems: timeline })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      timelineItems
    } = this.state

    if(prevState.timelineItems !== timelineItems) {
      const timeline = JSON.stringify(timelineItems)
      localStorage.setItem('timeline', timeline)
    }
  }

  addNewTLItem = () => {
    this.setState(state => ({
      timelineItems: [
        {
          title: 'New Item',
          summary: 'A newly added item. Click to edit!',
          content: null
        },
        ...state.timelineItems
      ]}))
  }

  handleEditorClose = updatedItem => {
    const {
      timelineItems,
      curItemIndex
    } = this.state

    if(updatedItem) {
      timelineItems[curItemIndex] = updatedItem

      this.setState({ curItemIndex: null, timelineItems })
    } else {
      this.setState({ curItemIndex: null })
    }
  }

  onItemEdit = index => this.setState({curItemIndex: index})

  renderTimelineItem = ({title, summary, content}, index, array) => (
    <TimelineItem key={index}>
      <TimelineSeparator>
        <TimelineDot />
        {index !== array.length-1 && <TimelineConnector/>}
      </TimelineSeparator>
      <TimelineContent
        onClick={e => this.onItemEdit(index)}
        style={{ maxWidth: '50%' }}
      >
        <TimelinePaper elevation={3}>
          <Typography variant='h6' component='h6'>
            {title}
          </Typography>
          <Typography variant='subtitle1' component='span' noWrap>{summary}</Typography>
        </TimelinePaper>
      </TimelineContent>
    </TimelineItem>
  )

  render() {
    const { timelineItems, curItemIndex } = this.state

    return (
      <Timeline align='alternate'>
        <TimelineItemEditor item={timelineItems[curItemIndex] ?? null} onClose={this.handleEditorClose}/>
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
    )
  }
}