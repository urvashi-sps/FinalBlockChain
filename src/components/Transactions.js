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
const TransactionsCard = ({id,name,price,owner }) => {
//   const gifUrl = useFetch({ keyword });
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
          
        </div>
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
        <p className="text-white text-base">Owner: {owner.slice(0, 5)}...{owner.slice(id.length - 4)} ETH</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = (props) => {
//     console.log("%%%%%%%%%%%%%%%TESTSSSS",props.products);
//    const b= props.products.map((object)=> {return JSON.parse(JSON.stringify(object))})
//     console.log("AGAIN",b);
   const c = props.products.map((x)=>{return {id:x.id,name:x.name,price:window.web3.utils.fromWei(x.price.toString(), 'Ether'),owner:x.owner}});
    console.log("AGAIN23",c);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        <div className="flex flex-wrap justify-center items-center mt-10">
          {[...c].reverse().map((transaction, i) => (
            <TransactionsCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;