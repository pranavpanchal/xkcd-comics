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
  };

  componentDidMount() {
    this.fetchComic('http://xkcd.com/614/info.0.json').then(data => {
      this.setState({ currentInfo: data, numComics: data.num });
      // let str = data.transcript;
      // this.setState({ description: str.replace(/\s/g, '\n') });
      // console.log(this.state.description);
    });
    console.log(this.state.description);
  }

  fetchComic(url) {
    return axios
      .get(url)
      .then(function(response) {
        // handle success
        console.log(response.data);
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
    } else {
      currentNum = action;
    }

    console.log(currentNum);

    this.fetchComic(`http://xkcd.com/${currentNum}/info.0.json`).then(data => {
      this.setState({ currentInfo: data });
    });
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
              className="nextprev"
              icon
              onClick={() => this.changeComic('prev')}
            >
              <Icon name="world" />
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
                  <Button color="teal">
                    <Icon name="random" />
                    Random
                  </Button>
                  <Label as="a" basic pointing="left">
                    {`ID: ${this.state.currentInfo.num}`}
                  </Label>
                </Button>
                <Input
                  style={{ marginRight: '2%' }}
                  action={{
                    color: 'teal',
                    content: 'Go to',
                  }}
                  placeholder="Search..."
                  defaultValue=""
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
