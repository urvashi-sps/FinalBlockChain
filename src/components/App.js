import Web3 from 'web3';
import Marketplace from '../abis/Marketplace.json';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Home from './Home.js';
import AllTransactions from './AllTransactions';
import About from './About';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import React, { Component } from "react";
import logo from '../images/logo.png';

class App extends Component {

  async componentWillMount() {
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
    const networkData = Marketplace.networks[networkId];
    if (networkData) {
      const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)
      this.setState({ marketplace });
      console.log("marketplace", marketplace)
      let productCount = await marketplace.methods.productCount().call()

      if (!productCount) {
        productCount = 0;
      }
      this.setState({ productCount });
      let addedProducts = []
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call()
        addedProducts.push(product)
      }
      this.setState({
        products: [...addedProducts]
      })
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
      connected: true
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

  async createProduct(name, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.createProduct(name, price).send({ from: this.state.account })
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
        <div className="App">
          <div className="gradient-bg-welcome">
            <nav className='w-full flex md: justify-center justify-between items-center p-4'>
              <div className='md: flex-[0.5] flex-initial justify-center items-center'>
                <img src={logo} alt="logo" className="w-32 cursor-pointer " />
              </div>
              <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
                <Link className={`mx-4 cursor-pointer`} to="/">Home</Link>
                <a
                  className={`mx-4 cursor-pointer`}
                  href="https://in.tradingview.com/symbols/ETHUSD/"
                  target='_blank'
                  rel="noopener"
                >
                  Market
                </a>
                <Link className={`mx-4 cursor-pointer`} to="/transactions">Products</Link>
                <Link className={`mx-4 cursor-pointer`} to="/about">About Us</Link>
                <a className= 'bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]' href="mailto:urvashi_suden@softprodigy.com">Contact Us</a>
              </ul>
              <div className='flex relative'>
                <AiOutlineClose fontSize={108} className="text-white md:hidden cursor-pointer" />
                <HiMenuAlt4 fontSize={108} className="text-white md:hidden cursor-pointer" />

              </div>
            </nav>
          </div>
        </div>
        <Routes>
          <Route exact path='/' element={<Home accountNumber={this.state.account} createProduct={this.createProduct} loading={this.state.loading} connectWallet={this.connectWallet} connected={this.state.connected} purchaseProduct={this.purchaseProduct} products={this.state.products} />}></Route>
          <Route exact path='/transactions' element={<AllTransactions connected={this.state.connected} purchaseProduct={this.purchaseProduct} products={this.state.products} accountNumber={this.state.account}  />}></Route>
          <Route exact path='/about' element={<About />}></Route>
        </Routes>
      </Router>

    );
  }
}

export default App;
