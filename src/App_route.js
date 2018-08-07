import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CreateProduct from './CreateProduct'

import 'react-router';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'


const Home = () => {
    return (
        <div>
            <h2> Home </h2>
        </div>
    )
}

const List = () => {
    return(
    <div>
        <h2> Product List </h2>
    </div>
    )
}

const Create = () => {
    return(
    <div>
        <h2> Product Creation </h2>
    </div>
    )
}


const Routing = () => (
    <Router>
        <div>
        
        <Link to ="/">Home</Link><span> | </span>
        <Link to ="/list">Product List</Link><span> | </span>
        <Link to ="/create">Product Creation</Link>
        
        <hr/> 
        
        <Route exact path='/' component={ Home}/>
        <Route path='/list' component={ List}/>
        <Route path='/create' component={ Create}/>   
        </div>
    </Router>
)

class App12 extends Component {

render(){
    return(
        <div style = {{ padding:'20px'}}>
        <h1>Product Manager</h1>
        <Routing />
        </div>
    )
    
}
}
export default App12