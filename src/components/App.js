import Web3 from 'web3';
import Marketplace from '../abis/Marketplace.json';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Home from'./Home.js';
import AllTransactions from './AllTransactions';
import {HiMenuAlt4} from 'react-icons/hi';
import {AiOutlineClose} from 'react-icons/ai';
import React, {Component} from "react";
import logo from '../images/logo.png';
import { useState } from 'react';
import gifURL from '../utils/fetchGIF';
class App extends Component {

  async componentWillMount() {
;
    await this.loadWeb3();
    await this.loadBlockChainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockChainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId();
    console.log("Network Id", networkId);
    const networkData = Marketplace.networks[networkId];
    console.log("NETWORK DATA", networkData);
    if (networkData) {
      const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)
      this.setState({ marketplace });
      console.log("marketplace", marketplace)
      let productCount = await marketplace.methods.productCount().call()
      
      if(!productCount){
        productCount=0;
      }

      console.log(productCount.toString());
      this.setState({ productCount });
      // // Load products
      // for (var i = 1; i <= productCount; i++) {
      //   const product = await marketplace.methods.products(i).call()
      //   this.setState({
      //     products: [...this.state.products, product]
      //   })
      // }
            // Load products
    let addedProducts = []
    for (var i = 1; i <= productCount; i++) {
      const product = await marketplace.methods.products(i).call()
      addedProducts.push(product)
    }
    this.setState({
      products: [...addedProducts]
    })
      console.log(this.state.products);
      this.setState({ loading: false })
    }
    else {
      window.alert('Something went wrong!')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true,
      connected: true,
      image:" "
    }
    this.createProduct = this.createProduct.bind(this);
    this.purchaseProduct = this.purchaseProduct.bind(this);
    this.connectWallet = this.connectWallet.bind(this)
  }

  async connectWallet() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    this.setState({ connected: true })
  }

  async refresh() {
    this.loadBlockChainData()
  }

  //  async createProduct(name, price) {
  //   this.setState({ loading: true })
  //    this.state.marketplace.methods.createProduct(name, price).send({ from: this.state.account})
  //   .once('transactionhash', (transactionhash) => {
  //     console.log("***********************",transactionhash)
  //     this.setState({ loading: false })
  //   })
  //  this.refresh();
  // }

  async createProduct(name, price) {
    const keyword ="TEST";
    const gifUrl = await gifURL({keyword});
    console.log("THIS IS WHAT U WANT",gifUrl)
    this.setState({image:gifURL})
    console.log("HERE U ARE",this.state.image)
    this.setState({ loading: true })
    this.state.marketplace.methods.createProduct(name, price).send({ from: this.state.account })
      .once('error', (e) => {
        console.log("here,93")
        this.setState({ loading: false })
        this.refresh()
      })
      .once('confirmation', (confirmation, receipt) => {
        this.setState({ loading: false })
        this.refresh();
        window.location.reload();

      })
  }


  // purchaseProduct(id, price) {
  //   this.setState({ loading: true })
  //   this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
  //   .once('receipt', (receipt) => {
  //     console.log("receipt",receipt);
  //     this.setState({ loading: false })
  //   })
  //   this.refresh();
  // }

  purchaseProduct(id, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
      .once('error', (e) => {
        this.setState({ loading: false })
        this.refresh()
      })
      .once('confirmation', (confirmation, receipt) => {
        this.setState({ loading: false })
        this.refresh();
        window.location.reload();
      })
  }

  render() {
    
    return (
      <Router>
           <img
          src={this.state.image}
          alt="nature"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
      <div className="App">
      <div className="gradient-bg-welcome">
       <nav className='w-full flex md: justify-center justify-between items-center p-4'>
         <div className='md: flex-[0.5] flex-initial justify-center items-center'>
         <img src ={logo} alt ="logo" className="w-32 cursor-pointer "/>
         </div>
         <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
         <Link className={`mx-4 cursor-pointer`} to="/">Home</Link>
         <Link className={`mx-4 cursor-pointer`} to={{ pathname: "https://herewecode.io/" }} target="_blank">Market</Link>
         <Link className={`mx-4 cursor-pointer`} to="/transactions">Products</Link>
         <Link className={`mx-4 cursor-pointer`} to="/about">About Us</Link>
             <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>
                Login
             </li>
         </ul>
         <div className='flex relative'>
         <AiOutlineClose fontSize={108} className ="text-white md:hidden cursor-pointer"/>
         <HiMenuAlt4 fontSize={108} className ="text-white md:hidden cursor-pointer"/>
        
         </div>
       </nav>
       </div>
       </div>
<Routes>
<Route exact path='/' element={<Home accountNumber={this.state.account} createProduct={this.createProduct} loading={this.state.loading} connectWallet={this.connectWallet} connected={this.state.connected} purchaseProduct={this.purchaseProduct} products={this.state.products}/>}></Route>
<Route exact path='/transactions' element={<AllTransactions connected={this.state.connected} purchaseProduct={this.purchaseProduct} products={this.state.products}/>}></Route>
</Routes>
</Router>
      // <div>
      //   <div className="min-h-screen">
      //     <div className="gradient-bg-welcome">
      //       <Navbar />
      //       <Welcome accountNumber={this.state.account} createProduct={this.createProduct} loading={this.state.loading} connectWallet={this.connectWallet} connected={this.state.connected} />
      //     </div>
      //     <Services />
      //     {this.state.connected ? <Transactions purchaseProduct={this.purchaseProduct} products={this.state.products} /> : null}

      //     <Footer />
      //   </div>
      // </div>

    );
  }
}

export default App;
