import React from 'react';

const Menu = React.createClass({
  render() {
    let {
      posts = [],
      activePost,
      onSelectPost = () => {}
    } = this.props;
    return (
      <aside className="je-sidebar">
        <h4>Posts</h4>
        <nav>
          { posts.map((p, idx) => {
            return (
              <a
                href="#"
                onClick={(ev) => ev.preventDefault() & onSelectPost(idx)}
                className={idx === activePost ? 'active' : null}
                key={idx}>
                {p.meta.title}
              </a>
            );
          }).reverse() }
        </nav>
      </aside>
    );
  }
});

export default Menu;
