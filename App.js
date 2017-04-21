import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './app/components/common';
import LoginForm from './app/components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
		// Initialize Firebase
		firebase.initializeApp({
			apiKey: 'AIzaSyBUdC0zc12iVufDVIJqbfx0nKemLeNd9M0',
			authDomain: 'rn-auth-example.firebaseapp.com',
			databaseURL: 'https://rn-auth-example.firebaseio.com',
			projectId: 'rn-auth-example',
			storageBucket: 'rn-auth-example.appspot.com',
			messagingSenderId: '228111868039'
		});

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />
    }
  }

  render() {
    return (
      <View>
        <Header text='Authentication'/>
        { this.renderContent() }
      </View>
    );
  }
};

export default App;
