import React, { Component } from 'react'
import Header from '../../components/Admin/AdminHeader';
import Nav from '../../components/Admin/AdminNav';
import AdminButtonAddProps from '../../components/Admin/AdminButtonAddProps';
import RoleFilter from '../../components/Admin/AdminRoleFilter';
import SearchForm from '../../components/Admin/AdminSearch';
import TableData from '../../components/Admin/AdminTableDataUser';
export default class AdminUser extends Component {
  render() {
    return (
        <div className='container'>
            <Header />

            <Nav />

            <SearchForm onSearch={(query) => console.log(`Search query: ${query}`)} />

            <AdminButtonAddProps /> 
            
            <TableData />

            
        </div>
      )
    }
}
