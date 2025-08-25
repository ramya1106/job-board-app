import './index.css'

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {MdHome} from 'react-icons/md'

import {BsBriefcaseFill} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="navbar">
      <Link to="/" className="link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-logo"
        />
      </Link>
      <ul className="nav-menu-sm">
        <li className="nav-item">
          <Link to="/" className="link">
            <MdHome />
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/jobs" className="link">
            <BsBriefcaseFill />
          </Link>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className="logout-icon-button"
            onClick={onLogout}
          >
            <FiLogOut />
          </button>
        </li>
      </ul>
      <ul className="nav-menu-lg">
        <li className="nav-item">
          <Link to="/" className="link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/jobs" className="link">
            Jobs
          </Link>
        </li>
      </ul>
      <button type="button" onClick={onLogout} className="logout-button-lg">
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
