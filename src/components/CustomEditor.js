import React, { Component } from 'react'
import { Editor } from 'draft-js'
import * as RichUtils from 'draft-js'
import 'draft-js/dist/Draft.css'
import styled from 'styled-components'

const Wrap = styled.div`
  height: 100%;
  
  .DraftEditor-root {
    height: 100%;
  }
`

class CustomEditor extends Component {
  editorRef = React.createRef()

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.props.onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  render() {
    const { editorState, onChange } = this.props

    return (
      <Wrap>
        <Editor
          ref={this.editorRef}
          editorState={editorState}
          onChange={onChange}
          onHandleKeyCommand={this.handleKeyCommand}
          placeholder='Write a story...'
          autoComplete={true}
          spellCheck={true}
        />
      </Wrap>
    )
  }
}

export default CustomEditor