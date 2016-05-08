import { Component } from 'react';
import { map } from 'lodash';
import req from 'reqwest';

class SearchResultItem extends Component {
  render() {
    return (
      <div>
        <a href={`https://www.google.com/search?q=define ${this.props.word.toLowerCase()}`} target="_blank">{this.props.word}</a>
        <br />
      </div>
    );
  }
}

class WordFinderContainer extends Component {
  constructor() {
    super();
    this.state = { words: [], searchTerm: "" };
  }

  renderWords() {
    return map(this.state.words, w => <SearchResultItem word={w} key={w} />);
  }

  render() {
    return(
        <div>
        <form onSubmit={this.onSubmit.bind(this)}>

        <input type="text"
      autoComplete="off"
      className="col-md-12"
      name="pattern"
      onChange={this.setSearchTerm.bind(this)}
      value={this.state.searchTerm}
      placeholder="enter pattern and press" />
        </form>
        { this.renderWords() }
      </div>
    );
  }

  searchSuccessful(d) {
    this.setState({words: d });
  }

  setSearchTerm(e) {
    this.setState({searchTerm: e.target.value});
    console.log(e.target.value);
  }

  onSubmit(e) {
    e.preventDefault();
    req({
      url: `/dictionary?searchTerm=${this.state.searchTerm}`,
      method: 'get',
      success: this.searchSuccessful.bind(this)
    });
  }
}




function initApp() {
  ReactDOM.render(
      <WordFinderContainer />,
    document.getElementById('content')
  );
}

module.exports.initApp = initApp;
