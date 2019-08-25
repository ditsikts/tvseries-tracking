import React from 'react';
import MainMenu from './Components/MainMenu/main-menu';
import AuthContext from './Context/auth-context';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      authenticated: false
    }
  }
  loginHandler = () => {
    this.setState({ authenticated: true });
    console.log("loginHandler");
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          authenticated: this.state.authenticated,
          login: this.loginHandler
        }}
      >
        <MainMenu />

      </AuthContext.Provider>
    );
  }
}

export default App;
