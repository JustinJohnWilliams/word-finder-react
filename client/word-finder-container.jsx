import { Component } from 'react';

class WordFinderContainer extends Component {
  render() {
    return(
      <h1>hello, world!</h1>
    );
  }
}





function initApp() {
  ReactDOM.render(
      <WordFinderContainer />,
    document.getElementById('content')
  );
}

module.exports.initApp = initApp;
