import React from 'react';
import AceEditor from 'react-ace';
import marked from 'marked';
import classnames from 'classnames';

import 'brace/mode/markdown';

const theme = 'solarized_light';
require(`brace/theme/${theme}`);

const PostEditor = React.createClass({
  getInitialState() {
    return {
      body: this.props.post.body,
      metaExpanded: false
    };
  },
  toggleMeta(ev) {
    ev.preventDefault();
    this.setState({
      metaExpanded: !this.state.metaExpanded
    });
  },
  render() {
    let preview = marked(this.state.body);
    let {
      meta: { title, date },
      meta
    } = this.props.post;
    return (
      <div className={classnames('je-post-editor', { 'meta-expanded': this.state.metaExpanded })}>
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
            <div className="je-post-meta-extra">
              { Object.keys(meta).filter(k => k !== 'title' && k !== 'date').map(k => {
                return (
                  <div className="je-input-group">
                    <label htmlFor={`je-fe-${k}`}>{k}</label>
                    <div className="je-input-wrapper">
                      <input id={`je-fe-${k}`} type="text" value={meta[k]} />
                    </div>
                  </div>
                );
              }) }
            </div>
            <a onClick={this.toggleMeta} className="je-meta-toggle">{ this.state.metaExpanded ? 'Collapse' : 'Expand' }</a>
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
