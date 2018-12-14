import React from 'react'
import '../css/App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Search from './Search';
import Home from './Home';
import "antd/dist/antd.css"; 
class BooksApp extends React.Component { 
  render() {
    return (
      <Router>
        <div className="app">
            <Route exact path='/' component={Home} />               
            <Route path='/search' component={Search} /> 
        </div>
      </Router>
    )
  }
}

export default BooksApp
