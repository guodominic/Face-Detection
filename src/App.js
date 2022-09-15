
import './App.css';
import React, { Component } from 'react';
import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo'
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm'
import Count from './component/Count/Count';
import FaceRecognition from './component/FaceRecognition/FaceRecognition';
import Signin from './component/Signin/Signin';
import Register from './component/Register/Register';

const initialState = {
  input: '',
  imgUrl: '',
  box: {},
  route: 'signin',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {

    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onPictureSubmit = () => {
    this.setState({ imgUrl: this.state.input });
    fetch('https://quiet-shelf-72514.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {

        if (response) {
          fetch('https://quiet-shelf-72514.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          }).then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
              //this.setState({ user: { entries: count } });
            })
            .catch(console.log)
          this.displayFaceBox(this.calculateFaceLocation(response))
        } else {
          alert('wrong');
          return;
        }
      })
      .catch(console.log)
  }

  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState(initialState);
      this.setState({ route: route });
    } else {
      this.setState({ route: route });
    }
  }

  render() {
    const { route } = this.state;
    return (
      <div className='App '>
        <br />
        <div className='ml4 mr4' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Logo />
          <Navigation routeChange={this.onRouteChange} currentRoute={route} id={this.state.user.id} />
        </div>
        {route === 'home'
          ? <div>
            <Count entries={this.state.user.entries} name={this.state.user.name} />
            <ImageLinkForm inputChange={this.onInputChange} pictureSubmit={this.onPictureSubmit} />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imgUrl} />
          </div>
          : (
            route === 'signin'
              ? <Signin routeChange={this.onRouteChange} loadUser={this.loadUser} />
              : <Register loadUser={this.loadUser} routeChange={this.onRouteChange} />
          )
        }
      </div>
    )
  }
}

export default App;
