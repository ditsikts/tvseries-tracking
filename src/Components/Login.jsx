import React, { Component } from 'react';
import AuthContext from '../Context/auth-context';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', isAuthenticated: false, open: false };
    }

    static contextType = AuthContext;

    login = () => {
        const user = { userName: this.state.username, password: this.state.password };
        fetch("http://localhost:8080/login", {
            method: 'POST',
            body: JSON.stringify(user)
        })
            .then(res => {
                const jwtToken = res.headers.get('Authorization');
                if (jwtToken !== null) {
                    sessionStorage.setItem("jwt", jwtToken);
                    this.setState({ isAuthenticated: true });
                    this.context.login();
                }
                else {
                    this.setState({ open: true });
                }
            })
            .catch(err => console.error(err))
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        console.log(this.context.authenticated);
        

        // const jwt = sessionStorage.getItem("jwt");
        // if (jwt) {
        //     const base64Url = jwt.split('.')[1];
        //     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        //     const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        //     }).join(''));
        //     console.log(JSON.parse(jsonPayload));
        // }

        if (this.state.isAuthenticated === true) {
            return (<h1>Loggedin</h1>)
        }
        else {
            return (
                <div id="login">
                    <h3 className="text-center text-white pt-5">Login form</h3>
                    <div className="container">
                        <div id="login-row" className="row justify-content-center align-items-center">
                            <div id="login-column" className="col-md-6">
                                <div id="login-box" className="col-md-12">
                                    <div className="form-group">
                                        <input type="text" name="username" onChange={this.handleChange} className="form-control" placeholder="username" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password" onChange={this.handleChange} className="form-control" placeholder="password" />
                                    </div>
                                    <input type="submit" name="submit" onClick={this.login} className="btn btn-info btn-md" value="Login" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            );
        }
    }
}

export default Login;