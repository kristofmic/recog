var
  React = require('react'),
  Toolbar;

Toolbar = React.createClass({
  render () {
    return (
      <div className="toolbar" style={{position: 'fixed', top: 0, left: 0, width: '100%', backgroundColor: '#1E88E5', padding: '15px'}}>
        <div className="toolbar-right"></div>
        <div className="toolbar-main">
          <h2 style={{color: '#fff', margin: 0}}>Recog</h2>
        </div>
      </div>
    );
  }
});

module.exports = Toolbar;