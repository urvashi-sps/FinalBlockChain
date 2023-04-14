import React, { Component } from 'react';
import Web3 from 'web3';
import Main from './Main'
import Navbar from'./Navbar.js';
import Marketplace from '../abis/Marketplace.json';
import Footer from './Footer.js'
import Services from './Services.js'
import Transactions from './Transactions.js'
import Loader from './Loader.js'
import Welcome from './Welcome.js'
import './App.css';

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

  async loadBlockChainData(){
    const web3= window.web3
    const accounts =await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId();
    console.log("Network Id",networkId);
    const networkData = Marketplace.networks[networkId];
    console.log("NETWORK DATA",networkData);
    if(networkData){
      const marketplace = web3.eth.Contract(Marketplace.abi,networkData.address)
      this.setState({ marketplace});
      console.log("marketplace",marketplace)
      const productCount = await marketplace.methods.productCount().call()
      console.log(productCount.toString());
      this.setState({productCount});
    // Load products
    for (var i = 1; i <= productCount; i++) {
      const product = await marketplace.methods.products(i).call()
      this.setState({
        products: [...this.state.products, product]
      })
    }
    console.log(this.state.products);
      this.setState({ loading: false})
    }
    else{
      window.alert('Something went wrong!')
    }
  }

  constructor(props){
        super(props)
        this.state = {
          account: '',
          productCount: 0,
          products: [],
          loading: true,
          connected:true
        }
        this.createProduct = this.createProduct.bind(this);
        this.purchaseProduct = this.purchaseProduct.bind(this);
        this.connectWallet=this.connectWallet.bind(this)
   }

   async connectWallet() {
    const web3= window.web3
    const accounts =await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    this.setState({connected:true})
  }

  async refresh (){
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(10000);
    window.location.reload();
  }

   async createProduct(name, price) {
    this.setState({ loading: true })
     this.state.marketplace.methods.createProduct(name, price).send({ from: this.state.account})
    .once('transactionhash', (transactionhash) => {
      console.log("***********************",transactionhash)
      this.setState({ loading: false })
    })
   this.refresh();
  }


  purchaseProduct(id, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      console.log("receipt",receipt);
      this.setState({ loading: false })
    })
    this.refresh();
  }
   
  render() {
    return (
      <div>
    <div className= "min-h-screen">
    <div className="gradient-bg-welcome">
     <Navbar/>
      <Welcome accountNumber = {this.state.account} createProduct={this.createProduct} loading={this.state.loading} connectWallet={this.connectWallet} connected={this.state.connected} /> 
    </div>
    <Services/>
    {this.state.connected?<Transactions purchaseProduct={this.purchaseProduct} products={this.state.products} />:null}
    
     <Footer/>
   </div>
      </div>
       
    );
  }
}

export default App;
