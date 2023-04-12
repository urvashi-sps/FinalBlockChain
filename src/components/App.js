import React, { Component } from 'react';
import Web3 from 'web3';
import logo from '../logo.png';
import Main from './Main'
// import './App.css';
import '../input.css';
import Navbar from'./Navbar.js';
import Marketplace from '../abis/Marketplace.json';

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
          loading: true
        }
        this.createProduct = this.createProduct.bind(this);
        this.purchaseProduct = this.purchaseProduct.bind(this);
   }
   
   createProduct(name, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.createProduct(name, price).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  purchaseProduct(id, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      console.log(receipt,receipt);
      this.setState({ loading: false })
    })
  }
   
  render() {
    return (
      <div>
         <h1 class="text-7xl font-bold underline">
    Hello world!
  </h1>
      
      </div>
    );
  }
}

export default App;
