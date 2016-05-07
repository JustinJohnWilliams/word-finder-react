import { Component } from 'react';

class WordFinderContainer extends Component {
  render() {
    return(
        <input type="text"
      class="col-md-12"
      name="pattern"
      placeholder="Enter pattern and press" />
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
