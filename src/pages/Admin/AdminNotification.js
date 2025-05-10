import React, { Component } from 'react'
import Header from '../../components/Admin/AdminHeader';
import Nav from '../../components/Admin/AdminNav';
import Notification from '../../components/Admin/AdminNotification'; 
import Pagination from '../../components/Admin/AdminPagination';
export default class AdminNotification extends Component {
  render() {
    return (
      <div className='container'>
        <Header />
        <Nav /> 
        <div style={{ marginTop: '20px' }}>
            <Notification />
            <Notification />
            <Notification />
            <Notification />
            <Notification />
            <Notification />
        </div>
        <Pagination />
      </div>
    )
  }
}
