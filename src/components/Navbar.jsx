import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { IoCartOutline } from "react-icons/io5";
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const {cart} = useContext(AuthContext)
    return (
        <div className='flex items-center justify-center gap-10 py-10 cursor-pointer '>
            <NavLink className={({isActive})=>`flex items-center px-5 py-2  transition-colors duration-300 text-white rounded ${isActive?'bg-orange-500':'bg-blue-400'}`} to='/'>Home</NavLink>
            <NavLink className={({isActive})=>`flex items-center px-5 py-2  transition-colors duration-300 text-white rounded ${isActive?'bg-orange-500':'bg-blue-400'}`} to='/products'>Product List</NavLink>
            <div className='flex relative'>
                <NavLink onClick={() => scrollTo(0, 0)} to='/cart'><IoCartOutline className='text-3xl'/></NavLink>
                <span className='w-4 h-4 rounded-full text-center absolute top-[-10px] right-[-10px]  text-white flex  items-center bg-black text-xs  justify-center'>{cart.length}</span>
            </div>
        </div>
    );
};

export default Navbar;