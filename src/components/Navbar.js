import {HiMenuAlt4} from 'react-icons/hi';
import {AiOutlineClose} from 'react-icons/ai';
import React, {Component} from "react";
import logo from '../images/logo.png';
import { useState } from 'react';

const NavbarItem = ({title,classProps})=>{
console.log(title,classProps);
title =title.split(" ");
const name= title[0];
const href1= title[1];
return (
   <div>
   <a href={href1}>
    <li className={`mx-4 cursor-pointer ${classProps}`}>
    {name}
    </li>
    </a>
    </div>
);
}

const Navbar =()=>{
    const [ toggleMenu,setToggleMenu] = useState(false);
    return(
      <div className="min-h-screen">
      <div className="gradient-bg-welcome">
       <nav className='w-full flex md: justify-center justify-between items-center p-4'>
         <div className='md: flex-[0.5] flex-initial justify-center items-center'>
         <img src ={logo} alt ="logo" className="w-32 cursor-pointer "/>
         </div>
         <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
            {["Market https://meet.google.com/qkw-uypo-hpp","Transactions transactions","Tutorials","About"].map((item,index)=>(
                <NavbarItem key = {item+index} title ={item}/>
             ))}
             <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>
                Login
             </li>
         </ul>
         <div className='flex relative'>
         <AiOutlineClose fontSize={108} className ="text-white md:hidden cursor-pointer"/>
         <HiMenuAlt4 fontSize={108} className ="text-white md:hidden cursor-pointer"/>
         {
            toggleMenu ? <AiOutlineClose fontSize={28} className ="text-white md:hidden cursor-pointer" onClick={()=>setToggleMenu(false)}/>:
            <HiMenuAlt4 fontSize={28} className ="text-white md:hidden cursor-pointer" onClick={()=>setToggleMenu(true)}/> 
         }
         {
            toggleMenu && (
                <ul className='z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-cp; justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'>
                    <li className='text-xl w-full my-2'>
                     <AiOutlineClose onClick={()=>setToggleMenu(false)}   
                     className = ""/>
                    </li>
                    {["Market","Transactions","Tutorials","About"].map((item,index)=>(
                <NavbarItem key = {item+index} title ={item}  classProps = "my-2 text-lg"/>
             ))}
                </ul>
            )
         }
         </div>
       </nav>
       </div>
       </div>
    )
}

export default Navbar;
