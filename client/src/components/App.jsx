import React from 'react';
import CmtList from './CmtList.jsx';
import styled from 'styled-components';

const axios = require('axios');

const AppContainer = styled.div`
  padding: 4% 4% 10px 3%;
  font: 12px/1.4 'Lucida Grande';
  color: #333;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // data store
      comments: [],
      // total comments for each song
      totalComments: null,
      // determines how many comments will be passed down to CmtList
      lazyi: 12
    };

    this.getComments = this.getComments.bind(this);
    this.calcTotalComments = this.calcTotalComments.bind(this);
    this.updateLazyLoad = this.updateLazyLoad.bind(this);
  }

  componentDidMount() {
    // this.getComments();
  }

  getComments() {
    axios.get('/api/comments')
      .then((res) => {
        this.setState({
          comments: res.data[0].comments
        });
        this.calcTotalComments(res.data);
      });
  }

  calcTotalComments(res) {
    this.setState({
      totalComments: res[0].comments.length
    });
  }

  // This function gets fired in the CmtList component when the user scrolls to the bottom
  // of the page. It re-renders the comments, with an additional 12 comments to the list
  updateLazyLoad() {
    this.setState({
      lazyi: this.state.lazyi += 12
    });
  }

  render() {
    let lazyLoad = this.state.comments.slice(0, this.state.lazyi);
    return (
      <AppContainer>

        <CmtList
          comments={lazyLoad}
          totalComments={this.state.totalComments}
          updateLazyLoad={this.updateLazyLoad}
          id="CmtList"
        />

      </AppContainer>
    );
  }
}

export default App;