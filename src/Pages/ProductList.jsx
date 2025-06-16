import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const { products, next, prev, offset, limit, goToPage } = useContext(AuthContext);
    const [pageInput, setPageInput] = useState('');
    const handleGoToPage = (e) => {
        e.preventDefault();
        const pageNumber = parseInt(pageInput, 10);
        if (!isNaN(pageNumber) && pageNumber > 0) {
            goToPage(pageNumber);
            setPageInput('');
            scrollTo(0, 0);
        }
    };
    return (
        <div className='sm:max-w-6xl mx-auto px-4 py-8'>
            <div className='grid grid-cols-1 gap-8'>
                {products.map((product, index) => (
                    <div key={index} className='flex flex-col bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden'>
                        <img className='h-100 w-full' src={product.image_url} alt={product.name} />
                        <div className='p-4 flex-1 flex flex-col justify-between'>
                            <h2 className='text-lg font-semibold text-gray-800 mb-2'>
                                {product.name}
                            </h2>
                            <p className='text-gray-800 mb-4'>
                                Price: <span className='font-bold text-primary-600'>${product.price}</span>
                            </p>
                            <Link to={`/products/${product.slug}`}>
                                <button onClick={() => scrollTo(0, 0)} className='bg-blue-500 w-full text-white py-2 px-4 cursor-pointer rounded-lg hover:bg-blue-700 transition-colors duration-200'>
                                    See Details
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex justify-center mt-10 gap-5'>
                <button onClick={prev} disabled={offset === 0} className={`px-4 py-2 rounded-lg ${offset === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}>
                    Previous
                </button>
                <span className='flex items-center'>
                    Page {Math.floor(offset / limit) + 1}
                </span>

                <button onClick={next} disabled={offset + limit >= products} className={`px-4 py-2 rounded-lg ${offset + limit >= products ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}>
                    Next
                </button>
                <form onSubmit={handleGoToPage} className='flex items-center gap-5'>
                    <input type='number' placeholder=' Page ' min='1' value={pageInput} onChange={(e) => setPageInput(e.target.value)} className='w-20 px-2 py-1 border rounded' />
                </form>
            </div>
        </div>
    );
};

export default ProductList;
