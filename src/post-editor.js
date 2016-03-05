import React from 'react';
import AceEditor from 'react-ace';
import marked from 'marked';

import 'brace/mode/markdown';
import 'brace/theme/idle_fingers';

const PostEditor = React.createClass({
  getInitialState() {
    return {
      body: this.props.post.body
    };
  },
  render() {
    let preview = marked(this.state.body);
    return (
      <div className="je-post-editor">
        <div className="je-post-post">
          <AceEditor
            mode="markdown"
            theme="idle_fingers"
            name="je-post-post-ace"
            editorProps={{$blockScrolling: true}}
            wrapEnabled={true}
            height="80vh"
            value={this.state.body} />
          <div className="je-editor-actions">
            <button className="je-save-button">Save</button>
          </div>
        </div>
        <div className="je-post-preview">
          <h2>Preview</h2>
          <div dangerouslySetInnerHTML={{__html: preview}} />
        </div>
      </div>
   );
  }
});

export default PostEditor;
