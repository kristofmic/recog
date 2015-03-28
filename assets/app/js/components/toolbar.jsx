var
  React = require('react'),
  toolbarStyle,
  h2Style,
  Toolbar;

toolbarStyle = {
  boxShadow: '0 3px 8px rgba(0, 0, 0, .26)',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  backgroundColor: '#1E88E5',
  padding: '15px'
};

h2Style = {
  textShadow: '0 1px 1px rgba(0, 0, 0, .12)',
  color: '#FFF',
  margin: 0
};

Toolbar = React.createClass({
  render () {
    return (
      <div className="toolbar" style={toolbarStyle}>
        <div className="toolbar-right"></div>
        <div className="toolbar-main">
          <h2 style={h2Style}>Recog</h2>
        </div>
      </div>
    );
  }
});

module.exports = Toolbar;