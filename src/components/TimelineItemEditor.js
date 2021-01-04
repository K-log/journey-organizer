import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CustomEditor from './CustomEditor'
import styled from 'styled-components'

const EditDialog = styled(Dialog)`
  height: 100%;
  
  .edit-dialog-paper {
    height: 100%;
  }
`

const EditDialogContent = styled(DialogContent)`
  height: 100%;
`

const TitleTextField = styled(TextField)`
  width: 30%;
  margin-right: 2rem;
`

const SummaryTextField = styled(TextField)`
  width: calc(70% - 2rem);
`

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
        editorState: item.content ? EditorState.createWithContent(convertFromRaw(item.content)) : EditorState.createEmpty()
      })
    }
  }

  handleSave = () => {
    const {
      title,
      summary,
      editorState
    } = this.state

    this.props.onClose({ title, summary, content: convertToRaw(editorState.getCurrentContent()) })
  }

  onChange = editorState => this.setState({ editorState })

  render() {
    const {
      item,
      onClose
    } = this.props

    if(item === null) return null

    const { title, summary, editorState } = this.state

    return (
      <EditDialog
        open={true}
        onClose={e => onClose()}
        scroll='paper'
        fullWidth
        maxWidth='md'
        PaperProps={{
          className: 'edit-dialog-paper'
        }}
      >
        <DialogTitle disableTypography>
          <TitleTextField
            label='Title'
            required
            variant='outlined'
            value={title}
            onChange={e => this.setState({title: e.target.value})}
          />
          <SummaryTextField
            label='Summary'
            required
            variant='outlined'
            value={summary}
            onChange={e => this.setState({summary: e.target.value})}
          />
        </DialogTitle>
        <EditDialogContent dividers>
          <CustomEditor editorState={editorState} onChange={this.onChange}/>
        </EditDialogContent>
        <DialogActions>
          <Button autoFocus onClick={e => onClose()} color='primary'>
            Cancel
          </Button>
          <Button onClick={this.handleSave} color='primary'>
            Save
          </Button>
        </DialogActions>
      </EditDialog>
    )
  }
}