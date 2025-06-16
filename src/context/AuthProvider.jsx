import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useEffect, useState } from 'react';

const AuthProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [limit, setLimit] = useState(1);
    const [offset, setOffset] = useState(2);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const timer = setTimeout(() => {
            setLoading(false)
            return ()=>clearTimeout(timer)
        }, 1000);
        axios.get(`https://nanis-backend-live.sandbox.payinpos.com/api/v1/inventory/web/item/?limit=${limit}&offset=${offset}`)
            .then(res => setProducts(res.data.data.results))
            .catch(err => console.log(err));
    }, [limit, offset,setLoading]);
    if (loading === true) {
        return (
            <div className="sm:max-w-7xl mx-auto px-2 flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const addToCart = (product) => {
        setCart(prev => {
            const existingProduct = prev.find(item => item.id === product.id);
            if (existingProduct) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [{ ...product, quantity: 1 }, ...prev];
            }
        });
    };
    const updateQuanity = (id, newProduct) => {
        setCart(prev =>
            prev.map(item => item.id === id ? { ...item, quantity: newProduct } : item)
        )
    }

    const deleteProduct = (product) => {
        setCart(prev => prev.filter(item => item.id !== product.id));
    };

    const calculateAmount = () => {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };
    const next = () => setOffset(prev => prev + limit);
    const prev = () => setOffset(prev => Math.max(0, prev - limit));
    const goToPage = (page) => setOffset((page - 1) * limit)

    const value = {
        products,
        addToCart,
        cart,
        deleteProduct,
        calculateAmount,
        limit,
        offset,
        setLimit,
        setOffset,
        next,
        prev,
        goToPage,
        updateQuanity

    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
