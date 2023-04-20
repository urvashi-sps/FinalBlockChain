import React from 'react';
const About = () => (
                <div className='md:flex-row flex-col items-start justify-between flex w-full  items-top gradient-bg-welcome min-h-screen md: p-20 py-12 px-4  justify-center justify-between '>
                    <div className='flex flex-1 flex-col md:ml-40'>
                        <h1 className='text-3xl sm:text-5xl text-white text-gradient py-1'>
                            Sell Products <br /> across the world!
                        </h1>
                        <p className='text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base'>
                        This is a marketplace that runs on the blockchain, kind of like Craigslist. It allows people to list items for sale, but unlike Craigslist, it also allows people to purchase them on the website with cryptocurrency.
                        </p>
                        <br/>
                        <p className='text-left text-white font-light md:w-9/12 w-11/12 text-base'>Whenever someone purchases the item, they instantly become the owner. That’s because this application is powered by a smart contract on the blockchain which manages the market place. It tracks who owns the items for sale, and it transfers the ownership of the items automatically anytime someone purchases them with cryptocurrency. It works like a vending machine.</p>
                    </div>
                </div>
)

export default About;