import React, { Component } from 'react'
import logo from '../../assets/image/Logo.jpg';

export default class Header extends Component {
  render() {
    return (
        <header className="header">
            <div className="logo-container">
                <img src={logo} alt="" />
                <h6 className="brand-name">TrackSmart</h6>
            </div>
            <button className="logout-btn">Log out</button>     
        </header>
    )
  }
}
