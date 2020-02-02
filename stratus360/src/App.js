import React, { Component } from 'react';
import './App.css';

import {
  Grid,
  Segment,
  Image,
  Button,
  Icon,
  Header,
  Input,
  Label,
  Accordion,
} from 'semantic-ui-react';
const axios = require('axios');

export default class App extends Component {
  state = {
    currentInfo: {},
    numComics: 0,
    description: '',
    searchInput: '',
    currentId: '',
  };

  componentDidMount() {
    let url = window.location.href;
    url = url.split('/');
    console.log(url[url.length - 1]);

    this.fetchComic(`http://xkcd.com/${url[url.length - 1]}/info.0.json`).then(
      data => {
        this.setState({ currentInfo: data, numComics: data.num });
        window.history.pushState('', '', `/${this.state.currentInfo.num}`);
        // let str = data.transcript;
        // this.setState({ description: str.replace(/\s/g, '\n') });
        // console.log(this.state.description);
      },
    );
  }

  fetchComic(url) {
    return axios
      .get(url)
      .then(function(response) {
        // handle success
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
    console.log(this.state);
    let currentNum = this.state.currentInfo.num;
    if (action === 'next') {
      currentNum += 1;
    } else if (action === 'prev') {
      currentNum -= 1;
    } else if (action === 'random') {
      currentNum = Math.ceil(Math.random() * this.state.numComics);
    } else {
      currentNum = parseInt(action);
    }

    console.log(currentNum);

    this.fetchComic(`http://xkcd.com/${currentNum}/info.0.json`).then(data => {
      this.setState({ currentInfo: data });
      window.history.pushState('', '', `/${this.state.currentInfo.num}`);
    });
  }

  handleSearch() {
    if (this.state.value > this.state.numComics) {
      alert('nope');
    } else {
      this.changeComic(this.state.value);
      this.setState({ value: '' });
    }
  }

  render() {
    let panels = [
      {
        key: 'acquire-dog',
        title: {
          content: (
            <Label color="blue" style={{ width: '90%' }}>
              Transcript
            </Label>
          ),
        },
        content: {
          content: <span>{this.state.currentInfo.transcript}</span>,
        },
      },
    ];

    return (
      <div className="App">
        <Grid columns="equal">
          <Grid.Column style={{ textAlign: 'center' }}>
            <Button
              style={{ left: '0%' }}
              size="massive"
              disabled={this.state.currentInfo.num === 1}
              className="btn"
              icon
              onClick={() => this.changeComic('prev')}
            >
              <Icon name="arrow alternate circle left" />
            </Button>
          </Grid.Column>
          <Grid.Column width={12}>
            <Segment>
              <div className="wrapperDiv">
                <Header style={{ textAlign: 'center' }} as="h1">
                  {this.state.currentInfo.title}
                </Header>
                <p>{`Date: ${this.state.currentInfo.month}/${this.state.currentInfo.day}/${this.state.currentInfo.year}`}</p>
                <Button as="div" labelPosition="right">
                  <Button
                    color="teal"
                    onClick={() => this.changeComic('random')}
                  >
                    <Icon name="random" />
                    Random
                  </Button>
                  <Label as="a" basic pointing="left">
                    {`ID: ${this.state.currentInfo.num}`}
                  </Label>
                </Button>
                <Input
                  value={this.state.value}
                  onChange={event => {
                    this.setState({ value: event.target.value });
                  }}
                  style={{ marginRight: '2%' }}
                  action={
                    <Button
                      onClick={() => this.handleSearch()}
                      color="teal"
                      icon="search"
                      content="Go to"
                    />
                  }
                  placeholder="Search..."
                />
                <div className="wrapperDiv">
                  <Accordion defaultActiveIndex={1} panels={panels} />
                </div>
              </div>
            </Segment>
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
              style={{ right: '0%', margin: '0%' }}
              size="massive"
              disabled={this.state.currentInfo.num === this.state.numComics}
              className="btn"
              icon
              onClick={() => this.changeComic('next')}
            >
              <Icon name="arrow alternate circle right" />
            </Button>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
