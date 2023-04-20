import React from "react";
import Footer from './Footer.js';
import Welcome from './Welcome.js'
import Services from './Services.js';
import Transactions from './Transactions.js'
const Home=(props)=>{
    return (
       <div>
        <div className="min-h-screen">
          <div className="gradient-bg-welcome">
            <Welcome accountNumber={props.accountNumber} createProduct={props.createProduct} loading={props.loading} connectWallet={props.connectWallet} connected={props.connected} />
          </div>
          <Services />
          {props.connected ? <Transactions purchaseProduct={props.purchaseProduct} products={props.products} accountNumber={props.accountNumber}/> : null}

          <Footer />
        </div>
      </div>)
}
export default Home;