import React, { useContext } from "react";
import useFetch from '../utils/fetchGIF';

const TransactionsCard =  ({id,name,price,owner,purchased,purchaseProduct}) => {
  id = id.toString();
  let gifUrl = useFetch({name});
  if(!gifUrl)
  gifUrl= "https://giphy.com/gifs/nehumanesociety-dog-space-keyboard-jkZtSdwKOx05BOlapR";
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
        <p className="text-white text-base font-semibold text-center">{name}</p>
          {/* <p className="text-white text-base">Amount: {price} ETH</p> */}
          <p className="text-white text-base text-sm text-center ">Owner: {owner.slice(0, 5)}...{owner.slice(owner.length - 4)} ETH</p>
        </div>
        <div >
        <img
          src={gifUrl}
          alt="nature"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl items-center mx-auto">
          <p className="text-[#37c7da] font-bold text-center">{price} ETH</p>
        </div>
        { !purchased
          ? <button className="flex flex-row justify-center items-center my-5 mx-auto bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
              name={id}
              value={price}
              onClick={(event) => {
                 purchaseProduct(event.target.name,window.web3.utils.toWei(event.target.value, 'ether') )
              }
            }
            >
              Buy
            </button>
          : <button className="flex flex-row justify-center items-center mx-auto my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">Sold Out!</button>
        }
        </div>
      </div>
    </div>
    );
  };

const AllTransactions = (props) => {
    console.log(props.products);
   let c = props.products.map((x)=>{return {id:x.id,name:x.name,
     price:window.web3.utils.fromWei(x.price.toString(),'Ether'),
    owner:x.owner,purchased:x.purchased}});
    console.log("$$$$$$$$",c.length);
//    let c= [];
  return (
    <div className="flex w-full justify-center 2xl:px-20 gradient-bg-transactions min-h-screen">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {props.products.length==0?(<h1 className="text-white text-3xl mb-10 items-top text-center my-2 min-h-screen">No products found!</h1>):(<div><h3 className="text-white text-3xl mb-10 text-center my-2">
            All Products
          </h3>
          <div className="flex flex-wrap justify-center items-center mt--10 ">
          {[...c].reverse().map((transaction, i) => (
            <TransactionsCard key={i} {...transaction}{...props}  />
          ))}
        </div></div>)}
      </div>
    </div>
  );
};

export default AllTransactions;