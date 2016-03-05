import React from 'react';
import Sidebar from 'react-sidebar';
import Menu from './menu';
import PostEditor from './post-editor';

const JekyllEditor = React.createClass({
  getInitialState() {
    return {
      sidebarOpen: false,
      sidebarDocked: false
    };
  },
  onSetSidebarOpen(sidebarOpen) {
    this.setState({sidebarOpen});
  },
  componentWillMount() {
    let mql = window.matchMedia(`(min-width: 800px)`);
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql, sidebarDocked: mql.matches});
  },
  componentWillUnmount() {
    this.state.mql.removeLisrwnwe(this.mediaQueryChanged);
  },
  mediaQueryChanged() {
    this.setState({sidebarDocked: this.state.mql.matches});
  },
  renderContent() {
    if (this.state.activePost) {
      return <PostEditor post={this.props.posts[this.state.activePost]} />;
    }
    return <p>Select post from menu.</p>;
  },
  selectPost(id) {
    this.setState({activePost: id});
  },
  renderSidebarContent() {
    return (
      <Menu
        posts={this.props.posts}
        activePost={this.state.activePost}
        onSelectPost={this.selectPost} />
    );
  },
  render() {
    return (
      <div className="je-container">
        <Sidebar
          sidebar={this.renderSidebarContent()}
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}>
          <section className="je-content">
            { this.renderContent() }
          </section>
        </Sidebar>
      </div>
    );
  }
});

export default JekyllEditor;
