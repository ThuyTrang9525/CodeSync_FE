import React, { Component } from 'react';
import Header from '../../components/Admin/AdminHeader';
import Nav from '../../components/Admin/AdminNav';
import TopProgressChart from '../../components/Admin/AdminTopProgressChart';
import '../../assets/css/Admin.css';
import axios from 'axios';

export default class AdminDashboard extends Component {
  state = {
    teachers: 0,
    students: 0,
    classes: 0,
    visits: 0
  };

  componentDidMount() {
    axios.get('http://localhost:8000/api/dashboard')
      .then(response => {
        const { teachers, students, classes, visits } = response.data;
        this.setState({ teachers, students, classes, visits });
      })
      .catch(error => {
        console.error('Error fetching dashboard data:', error);
      });
  }

  render() {
    const { teachers, students, classes, visits } = this.state;

    return (
      <div className="container">
        <Header />
        <Nav />
        <div className="stats-grid">
          <div className="stat-card">
            <h3 className="stat-title">Total Teachers</h3>
            <p className="stat-value">{teachers}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-title">Total Students</h3>
            <p className="stat-value">{students}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-title">Total Classes</h3>
            <p className="stat-value">{classes}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-title">Weekly Visits</h3>
            <p className="stat-value">{visits}</p>
          </div>
        </div>

        <TopProgressChart />
      </div>
    );
  }
}
