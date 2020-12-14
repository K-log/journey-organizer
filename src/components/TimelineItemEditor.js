import { EditorState } from 'draft-js'
import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import CustomEditor from './CustomEditor'

export default class TimelineItemEditor extends Component {
  state = {
    title: '',
    summary: '',
    editorState: EditorState.createEmpty()
  }

  componentDidUpdate(prevProps) {
    const { item } = this.props
    if(prevProps.item !== item && item) {
        this.setState({
          title: item.title,
          summary: item.summary,
          editorState: item.content
        })
    }
  }

  handleClose = () => {
    const { title, summary, editorState } = this.state
    this.props.onClose({ title, summary, content: editorState })
  }

  onChange = editorState => this.setState({ editorState })

  render() {
    const { item } = this.props

    if(item === null) return null

    const { title, summary, editorState } = this.state

    return (
      <Dialog
        open={true}
        onClose={this.handleClose}
        scroll='paper'
        fullWidth
        maxWidth='md'
      >
        <DialogTitle disableTypography>
          <OutlinedInput label='Title' required value={title} onChange={event => this.setState({title: event.target.value})}/>
          <OutlinedInput label='Summary' required value={summary} onChange={event => this.setState({summary: event.target.value})}/>
        </DialogTitle>
        <DialogContent dividers>
          <CustomEditor editorState={editorState} onChange={this.onChange}/>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}