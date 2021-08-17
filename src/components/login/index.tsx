import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import ReactDOM from 'react-dom'
import App from '../../App';
import { Switch, Route } from 'react-router-dom';


class Login extends Component <{}, { userName: string ,Password: string ,}> {
    errormsg;
    constructor(props: {}) {
        super(props);
        this.state = {
            userName: '',
            Password: ''
        }
        localStorage.setItem('registeredKey', '')
        this.changeUserName = this.changeUserName.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.errormsg = ''
    }

    changeUserName(event:any) {
        this.setState({
            userName: event.target.value
        })
    }

    changePassword(event:any) {
        this.setState({
            Password: event.target.value
        })
    }

    changeLogOut = () => {
        localStorage.removeItem('registeredKey')
        this.setState({});
    }

    onSubmit(event:any) {
        event.preventDefault()

        const registered = {
            userName: this.state.userName,
            Password: this.state.Password
        }

        axios.post('https://tictactoeservernew.azurewebsites.net/signin', registered)//change the url to azure post signin
            .then(res => this.errormsg = (res.data.message))
        localStorage.setItem('registeredKey', registered.userName)
        this.setState({
            userName: '',
            Password: ''
        })
    }

    render() {
       
        if (this.errormsg === '' && (localStorage.getItem('registeredKey') !== null || localStorage.getItem('registeredKey') !== '')) {
            if (localStorage.getItem('registeredKey')!.length > 5) {
                console.log(localStorage.getItem('registeredKey'))
                ReactDOM.render(<App />, document.getElementById('root'))
            }
        }

        return (
            <div className='bg-light'>

                <div className='container'>
                    <div className='form-div'>

                        <form onSubmit={this.onSubmit}>
                            <input type='text' required placeholder='Username'
                                onChange={this.changeUserName}
                                value={this.state.userName}
                                className='form-control form-group'
                            />
                            <input type='password' required placeholder='Password'
                                onChange={this.changePassword}
                                value={this.state.Password}
                                className='form-control form-group'
                            />
                            <div className='d-grid gap-2 col-6 mx-auto'>
                                <input type='submit' className='btn btn-info' value='Submit/Register' />
                            </div>
                            <div className="text-center text-danger h4">{this.errormsg}</div>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
    catch(error:any) {
        if (error.response) {
            console.log(error.response.data); // => the response payload 
        }
    }
}

export default Login;
