import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { MdArrowBack } from "react-icons/md";

const ProductDetails = () => {
    const { products,addToCart } = useContext(AuthContext);
    const { slug } = useParams();
    const navigate = useNavigate()

    const filterData = products.find(product => product.slug === slug);

    if (!filterData) {
        return (
            <div className="sm:max-w-7xl mx-auto px-2 flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const { name, image_url, price, ingredients, description } = filterData;
    return (
        <div>
            <div className="px-2  sm:max-w-6xl mx-auto ">
                <MdArrowBack onClick={()=>{navigate(-1),scrollTo(0,0)}} className="text-3xl p-1 rounded-full bg-blue-400 hover:bg-blue-600 text-white cursor-pointer" />
            </div>
            <div className='max-w-6xl mx-auto py-5 px-3 '>
                <h2 className='text-4xl font-bold mb-4'>{name}</h2>
                <img className='w-full h-100 object-cover rounded-lg mb-4' src={image_url} alt={name} />
                <p className='text-2xl font-semibold mb-2 text-gray-700'>Price: ${price}</p>
                <p className='text-lg font-semibold mb-2 text-gray-600'>Description: <div dangerouslySetInnerHTML={{ __html: description }} /></p>
                {ingredients?.length > 0 && (
                    <div className='mb-4'>
                        <h3 className='font-semibold text-xl'>Ingredients:</h3>
                        <ul className="list-none">
                            {ingredients.map((ingred, index) => (
                                <li key={index} className='text-gray-600'>{ingred.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <button onClick={()=>{addToCart(filterData),navigate('/cart')}} className='w-full bg-blue-500 py-2 text-white rounded cursor-pointer transition-colors hover:bg-blue-800 duration-200'>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductDetails;
