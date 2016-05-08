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

class WordFinderView extends Component {
  renderCount() {

    if (this.props.firstLoad) return null;
    return(
      <div>
        <p>Words Found: {this.props.words.length}</p>
        <hr />
      </div>
    )
  }

  renderWords() {
    return map(this.props.words, w => <SearchResultItem word={w} key={w} />);
  }

  onChange(e) {
    this.props.setSearchTerm(e.target.value);
  }

  render() {
    return(
        <div>
        <form onSubmit={this.props.search}>

          <input type="text" autoComplete="off"
            className="col-md-12"
            name="pattern"
            onChange={this.onChange.bind(this)}
            value={this.props.searchTerm}
            placeholder="enter pattern and press" />
        </form>
        <br />
        { this.renderCount() }
        { this.renderWords() }
      </div>
    );
  }
}

class WordFinderContainer extends Component {
  constructor() {
    super();
    this.state = { words: [], searchTerm: "", firstLoad: true };
  }

  render() {
    return (
      <WordFinderView words={this.state.words}
        firstLoad={this.state.firstLoad}
        search={this.search.bind(this)}
        setSearchTerm={this.setSearchTerm.bind(this)}
        searchTerm={this.state.searchTerm} />
    );
  }

  searchSuccessful(d) {
    this.setState({words: d, firstLoad: false });
  }

  setSearchTerm(term) {
    this.setState({searchTerm: term});
    if(term.length > 3) this.searchByTerm(term);
    console.log(term);
  }

  searchByTerm(term) {
    req({
      url: `/dictionary?searchTerm=${term}`,
      method: 'get',
      success: this.searchSuccessful.bind(this)
    });
  }

  search(e) {
    if(e) {
      e.preventDefault();
    }
    this.searchByTerm(this.state.searchTerm);
  }
}

function initApp() {
  ReactDOM.render(
      <WordFinderContainer />,
    document.getElementById('content')
  );
}

module.exports.initApp = initApp;
