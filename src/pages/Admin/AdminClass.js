import React, { Component } from 'react'
import Header from '../../components/Admin/AdminHeader';
import Nav from '../../components/Admin/AdminNav';
import Button from '../../components/Admin/AdminButtonAddProps';
import RoleFilter from '../../components/Admin/AdminRoleFilter';
import SearchForm from '../../components/Admin/AdminSearch';
import TitleTable from '../../components/Admin/AdminTitleTable';
import TableDataClass from '../../components/Admin/AdminTableDataClass';
import Pagination from '../../components/Admin/AdminPagination';
export default class AdminClass extends Component {
  render() {
    return (
      <div className='container'>
        <Header />
        <Nav />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <SearchForm onSearch={(query) => console.log(`Search query: ${query}`)} />
        <RoleFilter onFilterChange={(role) => console.log(`Selected role: ${role}`)} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <TitleTable title="Class List" />
            <Button
            icon={<i className="fas fa-plus"></i>}
            text="Add Class"
            />  
        </div> 
        <TableDataClass />
        <Pagination />
      </div>
    )
  }
}
