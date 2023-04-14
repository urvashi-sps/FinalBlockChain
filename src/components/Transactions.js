import React, { useContext } from "react";
const dummyData =[{
    id: 1,
    name: "name",
    price: "0.01",
    owner: "0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE",
  },
  {
    id: "0x2423ab0e1d227f4f72468789e538fdeb55c087e45ed6befa38392950394e6e3a",
    name: "name",
    price: "0.01",
    owner: "0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE",
  },
  {
    id: "0x2423ab0e1d227f4f72468789e538fdeb55c087e45ed6befa38392950394e6e3a",
    name: "name",
    price: "0.01",
    owner: "0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE",
  },
  {
    id: "0x2423ab0e1d227f4f72468789e538fdeb55c087e45ed6befa38392950394e6e3a",
    name: "name",
    price: "0.01",
    owner: "0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE",
  }
];
const TransactionsCard = ({id,name,price,owner,purchased,purchaseProduct}) => {
id = id.toString();
  return (
    <div className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a href="www.google.com" target="_blank" rel="noreferrer">
            <p className="text-white text-base">Id: {id}</p>
            {/* <p className="text-white text-base">From: {id}</p> */}

          </a>
          <p className="text-white text-base">Amount: {price} ETH</p>
          <p className="text-white text-base">Name: {name}</p>
          <p className="text-white text-base">Owner: {owner.slice(0, 5)}...{owner.slice(owner.length - 4)} ETH</p>
        </div>
        <div >
        { !purchased
          ? <button className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
              name={id}
              value={price}
              onClick={(event) => {
                 purchaseProduct(event.target.name,window.web3.utils.toWei(event.target.value, 'ether') )
              }
            }
            >
              Buy
            </button>
          : <button className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">Owned</button>
        }
        </div>
      </div>
    </div>
  );
};

const Transactions = (props) => {
   const c = props.products.map((x)=>{return {id:x.id,name:x.name,
     price:window.web3.utils.fromWei(x.price.toString(),'Ether'),
    owner:x.owner,purchased:x.purchased}});
   
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        <div className="flex flex-wrap justify-center items-center mt-10">
          {[...c].reverse().map((transaction, i) => (
            <TransactionsCard key={i} {...transaction}{...props}  />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;