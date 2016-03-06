import React from 'react';
import AceEditor from 'react-ace';
import marked from 'marked';

import 'brace/mode/markdown';

const theme = 'solarized_light';
require(`brace/theme/${theme}`);

const PostEditor = React.createClass({
  getInitialState() {
    return {
      body: this.props.post.body
    };
  },
  render() {
    let preview = marked(this.state.body);
    let {
      meta: { title, date }
    } = this.props.post;
    return (
      <div className="je-post-editor">
        <div className="je-post-summary">
          <div className="je-editor-actions">
            <h2>{title}</h2>
            <button className="je-save-button">Save</button>&nbsp;
            <button className="je-reset-button">Reset</button>&nbsp;
            <button className="je-delete-button">Delete</button>
          </div>
          <div className="je-post-meta">
            <h4>Attributes</h4>
            <div className="je-input-group">
              <label htmlFor="je-fe-title">Title</label>
              <div className="je-input-wrapper">
                <input id="je-fe-title" type="text" value={title} />
              </div>
            </div>
            <div className="je-input-group">
              <label htmlFor="je-fe-date">Date</label>
              <div className="je-input-wrapper">
                <input id="je-fe-date" type="text" value={date} />
              </div>
            </div>
          </div>
        </div>
        <div className="je-post-post">
          <AceEditor
            mode="markdown"
            theme={theme}
            name="je-post-post-ace"
            showGutter={false}
            showPrintMargin={false}
            editorProps={{$blockScrolling: true}}
            wrapEnabled={true}
            height="100%"
            width="100%"
            value={this.state.body} />
        </div>
        <div className="je-post-preview">
          <h2>{title}</h2>
          <div dangerouslySetInnerHTML={{__html: preview}} />
        </div>
      </div>
   );
  }
});

export default PostEditor;
