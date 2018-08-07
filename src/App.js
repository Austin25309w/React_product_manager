import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import 'react-router';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'


const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      </div>
  )
}



class AddProduct extends Component {
  constructor(props){
    super(props);
    this.state = {
      

    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleNameChange(e){
    this.setState({
      productName: e.target.value
    })
  }
  handlePriceChange(e){
    this.setState({
        productPrice: e.target.value
    })
    console.log('handlePriceChange' + this.state.value)
}
handleSubmit(e){
    e.preventDefault();
    console.log(this.props)
    this.props.addProduct(this.state.productName, this.state.productPrice);
    this.handleClear()
}

handleClear(){
    const productName = '';
    const productPrice = '';
    this.setState ({ productName });
    this.setState ({ productPrice });

}
  render(){
    return(
      <form onSubmit = {this.handleSubmit}>
      <input type='text' placeholder='product name' name='productName' value={this.state.productName} onChange= {this.handleNameChange}/>
      <input type='number' placeholder='product price' name='productPrice' value={this.state.productPrice} onChange= {this.handlePriceChange}/>
      <input type = 'submit'/>
      </form>
    )
  }
}


//-----------------------------------------------------------



// class ProductList extends Component {
//   constructor(props) {
//     super(props);

//   }
//   render() {
//     return this.props.products.map( (product, index) => {
//       return (

//         <ProductDetails
//           index={index}
//           product={product}
//           editProduct={this.props.editProduct}
//           deleteProduct={this.props.deleteProduct}
//         />

//       )
//     })

//   }
// }

//-----------------------------------------------------------

class EditForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: props.name,
      price: props.price,
      id: props.id


    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handlePriceChange = this.handlePriceChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
 

    handleNameChange(event){
      this.setState({
        name: event.target.value
      })
      console.log('handlenamechange' + event.target.name)
    }

    handlePriceChange(e){
      this.setState({
        price: e.target.value
      })

    }

    handleSubmit(e){
      e.preventDefault()
      this.props.editProduct(this.state.id, this.state.name, this.state.price)
      console.log('in handle submit', this.state.id, this.state.name, this.state.price)
      this.props.changeEditable()
    }
  render() {
    return (
      <div>
        
        <form onSubmit = {this.handleSubmit}>
        <label> Edit To do
          <input type='text' value ={this.state.name} onChange={this.handleNameChange}/>
          <input type='number' value ={this.state.price} onChange ={this.handlePriceChange}/> 
          </label>
          <input type='submit' value='save' />
        </form>
        </div>
    )
  }
}

//-----------------------------------------------------------
class ProductDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      editable: false, 
      products: props.products
    }
    this.changeEditable = this.changeEditable.bind(this);
  }

  changeEditable() {
    this.setState({
      editable: !this.state.editable
    })
  }


  render(){
    console.log(this.props.match)
    return (
        this.props.products.map( (product, index) => {
      <div>
        { 
          this.state.editable ?
          <EditForm name= {this.props.product.name} price={this.props.product.price} id={this.props.product.id} editProduct={this.props.editProduct} changeEditable={this.changeEditable} />
          
          :       
          
          <li key = {this.props.index}>
          {this.props.product.id}. {this.props.product.name} | {'$ ' + this.props.product.price }{' | '}
          <button onClick={ () => { this.setState({ editable: true })  }}>Edit</button> {' | '}
          <button onClick={ () => {this.props.deleteProduct(this.props.product.id) }}>Delete</button>
          </li> 
        }
    
    </div>
  )
})
  }
}

//-----------------------------------------------------------
class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      products: [
        {id:1, name:'Macbook', price:'1000'},
        {id:2, name:'iPhone', price:'800'},
        {id:3, name:'iPad', price:'500'},
      ]
      
    }
    this.addProduct = this.addProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
  }

  addProduct(name, price) {
    const id = this.state.products[this.state.products.length-1].id+1;
    this.setState({
      products: [...this.state.products, {id:id, name: name, price:price} ]
    })
  }

  

  editProduct(productId, newName, newPrice) {
    let newProducts = this.state.products; // create copy of the array
      newProducts.map( (product) => {  
      if(product.id === productId){
        product['name'] = newName;
        product['price'] = newPrice;
        console.log('in edit product', newProducts)
      }
          this.setState({
            products: newProducts // set old product into new product
          })
    })
  }

  deleteProduct(productId){
    console.log(this.state.products)
    this.state.products.map( (product, index) => {
      if(product.id === productId){
        this.state.products.splice(index, 1);
          return this.setState({
            products: this.state.products
          })
      }
    })
  }


  render() {
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h1>Product Manager</h1>
        <AddProduct 
        addProduct = {this.addProduct}
        />

        {/* <ProductList 
        products = {this.state.products}
        editProduct = {this.editProduct}
        deleteProduct = {this.deleteProduct}
        />   */}
      
      <Link to ="/">Home</Link><span> | </span>
      <Link to ="/list">Product List</Link><span> | </span>
      <Link to ="/create">Product Creation</Link>
      
      <hr/> 
      
      <Route exact path='/' component={ Home}/>
      <Route path='/list' component={ ProductDetails }/>
      <Route path='/create' component={ AddProduct }/>
       
      </div>
        </Router>
    );
  }
}

export default App;
