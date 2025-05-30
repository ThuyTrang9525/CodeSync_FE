import React, { Component } from 'react'
import Header from '../../components/Admin/AdminHeader';
import Nav from '../../components/Admin/AdminNav';
import Report from '../../components/Admin/AdminTableDataReport';
export default class AdminReport extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <Header />
        <Nav /> 
        <div style={{ marginTop: '20px' }}>
            <Report />  
        </div>
      </div>
    )
  }
}
