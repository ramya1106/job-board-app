import './index.css'

import Cookies from 'js-cookie'

import {Component} from 'react'

import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', hasError: false, errorMsg: ''}

  onChangeUsername = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const {history} = this.props
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 7})
      history.replace('/')
      this.setState({hasError: false, errorMsg: '', username: '', password: ''})
    } else {
      this.setState({hasError: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, hasError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-page-logo"
          />
          <form onSubmit={this.onSubmit}>
            <label htmlFor="username" className="login-page-label">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="login-page-input"
              placeholder="Username"
              value={username}
              onChange={this.onChangeUsername}
            />
            <label htmlFor="password" className="login-page-label">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="login-page-input"
              placeholder="Password"
              value={password}
              onChange={this.onChangePassword}
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {hasError && <p className="login-error-text">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
