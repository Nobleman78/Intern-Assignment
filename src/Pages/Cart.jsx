import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';

const Cart = () => {
    const { cart, deleteProduct, calculateAmount, updateQuanity } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleQuanity = (id, number) => {
        const product = cart.find(item => item.id === id);
        if (product) {
            const newQuanity = product.quantity + number
            updateQuanity(id, newQuanity)
        }

    }

    return (
        <div className='max-w-6xl mx-auto'>
            <div className='mb-4 ms-3'>
                <MdArrowBack onClick={() => { navigate(-1), scrollTo(0, 0) }} className='text-3xl p-1 rounded-full bg-blue-400 hover:bg-blue-600 text-white cursor-pointer' />
            </div>
            <div className='max-w-6xl mx-auto p-4'>
                <h2 className='text-3xl font-bold mb-4 '>My Cart</h2>
                <p className='text-xl text-gray-600 mb-6 r'>
                    Total products: <span className='font-semibold'>{cart.length}</span>
                </p>
                {
                    cart.length === 0 ? <Link to='/products' className='bg-blue-500 px-3 py-3 text-white rounded'>Start Shopping? </Link> :
                        <div className='flex flex-col gap-5'>
                            {cart.map((product, index) => (
                                <div key={index} className='rounded-lg flex flex-col gap-5 sm:gap-0 sm:flex-row sm:items-center justify-between p-4 shadow hover:shadow-lg transition-shadow duration-300'>
                                    <img src={product.image_url} alt='' className='w-full sm:w-30 sm:h-30 sm:object-cover rounded-md mb-3' />
                                    <h3 className='text-xl font-semibold mb-2'>{product.name}</h3>
                                    <p className='text-gray-600 mb-2'>Price: ${(product.price * product.quantity).toFixed(2)}</p>
                                    <div className='flex items-center w-full sm:w-0'>
                                        <button onClick={() => handleQuanity(product.id, -1)}className='px-3 py-1 bg-gray-200 rounded-l w-50 sm:w-0'>
                                            -
                                        </button>
                                        <span className='px-3 py-1 bg-gray-100'>
                                            {product.quantity}
                                        </span>
                                        <button onClick={() => handleQuanity(product.id, 1)}className='px-3 py-1 bg-gray-200 rounded-r w-50 sm:w-0'>
                                            +
                                        </button>
                                    </div>
                                    <button onClick={() => deleteProduct(product)} className='bg-red-500 px-5 py-2 text-white rounded cursor-pointer '>Delete</button>
                                </div>
                            ))}
                        </div>

                }

                <p className='text-end text-2xl mt-5'>Total Price : ${calculateAmount().toFixed(2)}</p>


            </div>
        </div>
    );
};

export default Cart;
