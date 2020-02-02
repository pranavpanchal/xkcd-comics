import React, { Component } from 'react';
import './App.css';

import { Grid, Segment, Image, Button, Icon, Header } from 'semantic-ui-react';
const axios = require('axios');

export default class App extends Component {
  state = {
    currentInfo: {},
    numComics: 0,
  };

  componentDidMount() {
    this.fetchComic('http://xkcd.com/info.0.json').then(data => {
      this.setState({ currentInfo: data, numComics: data.num });
    });
  }

  fetchComic(url) {
    return axios
      .get(url)
      .then(function(response) {
        // handle success
        // console.log(response.data);
        return response.data;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  }

  changeComic(action) {
    let currentNum = this.state.currentInfo.num;
    if (action === 'next') {
      console.log(this.state.numComics, currentNum);
      if (this.state.numComics === currentNum) {
        console.log('no forward');
        return;
      } else {
        currentNum += 1;
      }
    } else if (action === 'prev') {
      if (this.state.numComics === 1) {
        console.log('no backward');
        return;
      }
      currentNum -= 1;
    } else if (action === 'random') {
      currentNum = Math.ceil(Math.random() * this.state.numComics);
    }

    console.log(currentNum);

    this.fetchComic(`http://xkcd.com/${currentNum}/info.0.json`).then(data => {
      this.setState({ currentInfo: data });
    });
  }

  render() {
    return (
      <div className="App">
        <Header style={{ textAlign: 'center' }} as="h1">
          First Header
        </Header>
        <Grid columns="equal">
          <Grid.Column style={{ textAlign: 'center' }}>
            <Button
              className="nextprev"
              icon
              onClick={() => this.changeComic('prev')}
            >
              <Icon name="world" />
            </Button>
          </Grid.Column>
          <Grid.Column width={12}>
            <Segment>
              <Image
                src={
                  typeof this.state.currentInfo !== 'undefined' &&
                  this.state.currentInfo.img
                }
                fluid
              />
            </Segment>
          </Grid.Column>
          <Grid.Column style={{ textAlign: 'center' }}>
            <Button
              className="nextprev"
              icon
              onClick={() => this.changeComic('next')}
            >
              <Icon name="world" />
            </Button>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
