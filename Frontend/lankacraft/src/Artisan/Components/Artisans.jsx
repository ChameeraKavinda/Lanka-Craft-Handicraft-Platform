import React, { useState, useEffect, memo, createContext, useContext } from 'react';
import {
    Menu,
    X,
    Home,
    Package,
    Eye,
    ShoppingCart,
    HelpCircle,
    Plus,
    Edit,
    Trash2,
    User,
    LogOut,
    Bell,
    Search,
    Globe
} from 'lucide-react';

const LanguageContext = createContext();

const translations = {
    en: {
        // Navigation
        dashboard: 'Dashboard',
        addProducts: 'Add Products',
        viewProducts: 'View Products',
        viewOrders: 'View Orders',
        help: 'Help',
        logout: 'Logout',
        
        // Dashboard
        welcomeTitle: 'Welcome to LankaCraft Artisan',
        welcomeSubtitle: 'Manage your artisan products and orders',
        totalProducts: 'Total Products',
        totalOrders: 'Total Orders',
        revenue: 'Revenue',
        recentOrders: 'Recent Orders',
        
        // Products
        addNewProduct: 'Add New Product',
        addProduct: 'Add Product',
        allProducts: 'All Products',
        searchProducts: 'Search products...',
        noProductsFound: 'No products found',
        productCreatedSuccess: 'Product created successfully!',
        productUpdatedSuccess: 'Product updated successfully!',
        productDeletedSuccess: 'Product deleted successfully!',
        failedCreateProduct: 'Failed to create product. Please check if the backend is running.',
        failedUpdateProduct: 'Failed to update product. Please check if the backend is running.',
        failedDeleteProduct: 'Failed to delete product. Please check if the backend is running.',
        confirmDelete: 'Are you sure you want to delete this product?',
        
        // Orders
        allOrders: 'All Orders',
        noOrders: 'No Orders',
        noOrdersMessage: 'Orders will appear here when your backend is connected.',
        ordersWillAppear: 'Orders will appear here when your backend is connected.',
        
        // Form Labels
        title: 'Title',
        brand: 'Brand',
        description: 'Description',
        price: 'Price',
        discountedPrice: 'Discounted Price',
        quantity: 'Quantity',
        imageUrl: 'Image URL',
        topLevelCategory: 'Top Level Category',
        secondLevelCategory: 'Second Level Category',
        thirdLevelCategory: 'Third Level Category',
        discountPercent: 'Discount Percent',
        
        // Table Headers
        image: 'Image',
        actions: 'Actions',
        orderId: 'Order ID',
        customer: 'Customer',
        status: 'Status',
        total: 'Total',
        date: 'Date',
        
        // Buttons
        cancel: 'Cancel',
        create: 'Create',
        update: 'Update',
        updateProduct: 'Update Product',
        createProduct: 'Create Product',
        
        // Status
        pending: 'Pending',
        
        // Other
        artisanPanel: 'Artisan Panel',
        loginRequired: 'Please ensure you are logged in with a valid JWT token.',
        backendNotAvailable: 'Orders API returned invalid data or backend not available',
        productsBackendNotAvailable: 'Products API returned invalid data or backend not available',
        helpContent: 'Help content will be updated here.',
        noOrdersFoundMessage: 'No orders found'
    },
    si: {
        // Navigation
        dashboard: 'උපකරණ පුවරුව',
        addProducts: 'නිෂ්පාදන එක් කරන්න',
        viewProducts: 'නිෂ්පාදන බලන්න',
        viewOrders: 'ඇණවුම් බලන්න',
        help: 'උදව්',
        logout: 'ඉවත් වන්න',
        
        // Dashboard
        welcomeTitle: 'Lanka Craft ශිල්පකරු වෙත සාදරයෙන් පිළිගනිමු',
        welcomeSubtitle: 'ඔබේ  නිෂ්පාදන සහ ඇණවුම් කළමනාකරණය කරන්න',
        totalProducts: 'මුළු නිෂ්පාදන',
        totalOrders: 'මුළු ඇණවුම්',
        revenue: 'ආදායම',
        recentOrders: 'නවතම ඇණවුම්',
        
        // Products
        addNewProduct: 'නව නිෂ්පාදනයක් එක් කරන්න',
        addProduct: 'නිෂ්පාදනය එක් කරන්න',
        allProducts: 'සියලුම නිෂ්පාදන',
        searchProducts: 'නිෂ්පාදන සොයන්න...',
        noProductsFound: 'කිසිදු නිෂ්පාදනයක් හමු නොවීය',
        productCreatedSuccess: 'නිෂ්පාදනය සාර්ථකව නිර්මාණය කරන ලදී!',
        productUpdatedSuccess: 'නිෂ්පාදනය සාර්ථකව යාවත්කාලීන කරන ලදී!',
        productDeletedSuccess: 'නිෂ්පාදනය සාර්ථකව ඉවත් කරන ලදී!',
        failedCreateProduct: 'නිෂ්පාදනය නිර්මාණය කිරීම අසාර්ථක විය. කරුණාකර බ්‍යාක්එන්ඩ් ක්‍රියාත්මක වේදැයි පරීක්ෂා කරන්න.',
        failedUpdateProduct: 'නිෂ්පාදනය යාවත්කාලීන කිරීම අසාර්ථක විය. කරුණාකර බ්‍යාක්එන්ඩ් ක්‍රියාත්මක වේදැයි පරීක්ෂා කරන්න.',
        failedDeleteProduct: 'නිෂ්පාදනය ඉවත් කිරීම අසාර්ථක විය. කරුණාකර බ්‍යාක්එන්ඩ් ක්‍රියාත්මක වේදැයි පරීක්ෂා කරන්න.',
        confirmDelete: 'ඔබට මෙම නිෂ්පාදනය ඉවත් කිරීමට අවශ්‍ය බව විශ්වාසද?',
        
        // Orders
        allOrders: 'සියලුම ඇණවුම්',
        noOrders: 'ඇණවුම් නැත',
        noOrdersMessage: 'ඔබේ බ්‍යාක්එන්ඩ් සම්බන්ධ වූ විට ඇණවුම් මෙහි දිස් වේ.',
        ordersWillAppear: 'ඔබේ බ්‍යාක්එන්ඩ් සම්බන්ධ වූ විට ඇණවුම් මෙහි දිස් වේ.',
        
        // Form Labels
        title: 'මාතෘකාව',
        brand: 'සන්නාමය',
        description: 'විස්තරය',
        price: 'මිල',
        discountedPrice: 'වට්ටම් මිල',
        quantity: 'ප්‍රමාණය',
        imageUrl: 'රූප URL',
        topLevelCategory: 'ප්‍රධාන කාණ්ඩය',
        secondLevelCategory: 'දෙවන මට්ටමේ කාණ්ඩය',
        thirdLevelCategory: 'තෙවන මට්ටමේ කාණ්ඩය',
        discountPercent: 'වට්ටම් ප්‍රතිශතය',
        
        // Table Headers
        image: 'රූපය',
        actions: 'ක්‍රියාමාර්ග',
        orderId: 'ඇණවුම් අංකය',
        customer: 'පාරිභෝගිකයා',
        status: 'තත්ත්වය',
        total: 'මුළු මුදල',
        date: 'දිනය',
        
        // Buttons
        cancel: 'අවලංගු කරන්න',
        create: 'නිර්මාණය කරන්න',
        update: 'යාවත්කාලීන කරන්න',
        updateProduct: 'නිෂ්පාදනය යාවත්කාලීන කරන්න',
        createProduct: 'නිෂ්පාදනය නිර්මාණය කරන්න',
        
        // Status
        pending: 'පොරොත්තු',
        
        // Other
        artisanPanel: 'ශිල්පකරු මණ්ඩලය',
        loginRequired: 'කරුණාකර වලංගු JWT ටෝකනයක් සමඟ පුරනය වී ඇති බව සහතික කරගන්න.',
        backendNotAvailable: 'ඇණවුම් API වලංගු නොවන දත්ත ලබා දෙන ලදී හෝ බ්‍යාක්එන්ඩ් ලබා ගත නොහැක',
        productsBackendNotAvailable: 'නිෂ්පාදන API වලංගු නොවන දත්ත ලබා දෙන ලදී හෝ බ්‍යාක්එන්ඩ් ලබා ගත නොහැක',
        helpContent: 'උදව් අන්තර්ගතය මෙහිදී යාවත්කාලීන කරනු ලැබේ.',
        noOrdersFoundMessage: 'ඇණවුම් හමු නොවීය'
    }
};

// Language Provider Component
const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('language') || 'en';
    });

    const changeLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

// Language Switcher Component
const LanguageSwitcher = () => {
    const { language, changeLanguage } = useContext(LanguageContext);

    return (
        <div className="flex items-center space-x-2 p-4 border-t border-gray-200">
            <Globe size={20} className="text-gray-600" />
            <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
                <option value="en">English</option>
                <option value="si">සිංහල</option>
            </select>
        </div>
    );
};

// Help Component
const Help = () => {
    const { t } = useContext(LanguageContext);
    
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('help')}</h2>
            <p className="text-gray-600">
                {t('helpContent')}
            </p>
        </div>
    );
};

const Dashboard = () => {
    const { t } = useContext(LanguageContext);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showProductForm, setShowProductForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    
    const token = localStorage.getItem('jwt') || '';
     
    
    const apiCall = async (url, options = {}) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers
        };

        try {
            const response = await fetch(url, { ...options, headers });
            if (!response.ok) {
                console.warn(`API call failed: ${response.status} ${response.statusText}`);
                return null;
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                console.warn('API returned non-JSON response, backend might not be running');
                return null;
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error.message);
            return null;
        }
    };

    
    const fetchOrders = async () => {
        setLoading(true);
        const data = await apiCall('http://localhost:8080/api/admin/orders/');
        if (data && Array.isArray(data)) {
            setOrders(data);
        } else {
            setOrders([]);
            console.warn(t('backendNotAvailable'));
        }
        setLoading(false);
    };

    
    const createProduct = async (productData) => {
        const data = await apiCall('http://localhost:8080/api/admin/products/', {
            method: 'POST',
            body: JSON.stringify(productData)
        });
        if (data) {
            setProducts([...products, data]);
            setShowProductForm(false);
            alert(t('productCreatedSuccess'));
        } else {
            alert(t('failedCreateProduct'));
        }
    };

    
    const fetchProducts = async () => {
        setLoading(true);

        
        const artisanEmail = localStorage.getItem('email');
        if (!artisanEmail) {
            console.warn('No artisan email found in localStorage.');
            setProducts([]);
            setLoading(false);
            return;
        }

        const data = await apiCall(`http://localhost:8080/api/admin/products/${artisanEmail}`);
        if (data && Array.isArray(data)) {
            setProducts(data);
        } else {
            setProducts([]);
            console.warn(t('productsBackendNotAvailable'));
        }
        setLoading(false);
    };

   
    const updateProduct = async (product_id, productData) => {
        const data = await apiCall(`http://localhost:8080/api/admin/products/${product_id}/update`, {
            method: 'PUT',
            body: JSON.stringify(productData)
        });
        if (data) {
            setProducts(products.map(p => p.product_id === product_id ? data : p));
            setEditingProduct(null);
            alert(t('productUpdatedSuccess'));
        } else {
            alert(t('failedUpdateProduct'));
        }
    };

    
    const deleteProduct = async (product_id) => {
        if (window.confirm(t('confirmDelete'))) {
            const data = await apiCall(`http://localhost:8080/api/admin/products/${product_id}/delete`, {
                method: 'DELETE'
            });
            if (data) {
                setProducts(products.filter(p => p.product_id !== product_id));
                alert(t('productDeletedSuccess'));
            } else {
                alert(t('failedDeleteProduct'));
            }
        }
    };

   
    useEffect(() => {
        if (activeMenu === 'dashboard') fetchOrders();
        if (activeMenu === 'view-products') fetchProducts();
        if (activeMenu === 'view-orders') fetchOrders();
    }, [activeMenu]);

    const menuItems = [
        { id: 'dashboard', label: t('dashboard'), icon: Home },
        { id: 'add-products', label: t('addProducts'), icon: Plus },
        { id: 'view-products', label: t('viewProducts'), icon: Package },
        { id: 'view-orders', label: t('viewOrders'), icon: ShoppingCart },
        { id: 'help', label: t('help'), icon: HelpCircle }
    ];

    useEffect(() => {
        const artisanEmail = localStorage.getItem("email");
        console.log("Artisan email:", artisanEmail);
    }, []);

    const ProductForm = ({ product, onSubmit, onCancel }) => {
        const [formData, setFormData] = useState({
            artisanEmail: localStorage.getItem('email') || '',
            title: product?.title || '',
            description: product?.description || '',
            price: product?.price || '',
            discountedPrice: product?.discountPrice || '',
            discountPresent: product?.discountPresent || '',
            quantity: product?.quantity || '',
            brand: product?.brand || '',
            imageUrl: product?.imageUrl || '',
            topLevelCategory: product?.category?.parentCategory?.parentCategory?.name || '',
            secondLevelCategory: product?.category?.parentCategory?.name || '',
            thirdLevelCategory: product?.category?.name || ''
        });

        const handleSubmit = (e) => {
            e.preventDefault();
            onSubmit(formData);
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {product ? t('updateProduct') : t('addNewProduct')}
                        </h2>
                        <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('title')}</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('brand')}</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    value={formData.brand}
                                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('description')}</label>
                            <textarea
                                required
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('price')}</label>
                                <input
                                    type="number"
                                    required
                                    step="0.01"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('discountedPrice')}</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    value={formData.discountedPrice}
                                    onChange={(e) => setFormData({ ...formData, discountedPrice: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('quantity')}</label>
                                <input
                                    type="number"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    value={formData.quantity}
                                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('imageUrl')}</label>
                            <input
                                type="url"
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('topLevelCategory')}</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    value={formData.topLevelCategory}
                                    onChange={(e) => setFormData({ ...formData, topLevelCategory: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('secondLevelCategory')}</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    value={formData.secondLevelCategory}
                                    onChange={(e) => setFormData({ ...formData, secondLevelCategory: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('thirdLevelCategory')}</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    value={formData.thirdLevelCategory}
                                    onChange={(e) => setFormData({ ...formData, thirdLevelCategory: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('discountPercent')}</label>
                            <input
                                type="number"
                                step="0.01"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                value={formData.discountPresent}
                                onChange={(e) => setFormData({ ...formData, discountPresent: e.target.value })}
                            />
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                {t('cancel')}
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                            >
                                {product ? t('update') : t('create')} Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const renderContent = () => {
        switch (activeMenu) {
            case 'dashboard':
                return (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-2xl">
                            <h1 className="text-2xl md:text-3xl font-bold mb-2">{t('welcomeTitle')}</h1>
                            <p className="text-orange-100">{t('welcomeSubtitle')}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm">{t('totalProducts')}</p>
                                        <p className="text-2xl font-bold text-gray-800">{products.length}</p>
                                    </div>
                                    <Package className="text-orange-500" size={24} />
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm">{t('totalOrders')}</p>
                                        <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
                                    </div>
                                    <ShoppingCart className="text-orange-500" size={24} />
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm">{t('revenue')}</p>
                                        <p className="text-2xl font-bold text-gray-800">Rs.{orders.length}0</p>
                                    </div>
                                    <Bell className="text-orange-500" size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('recentOrders')}</h2>
                            {loading ? (
                                <div className="text-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                                </div>
                            ) : orders.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('orderId')}</th>
                                                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('customer')}</th>
                                                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('status')}</th>
                                                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('totalPrice')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.slice(0, 5).map((order, index) => (
                                                <tr key={order.id || index} className="border-b border-gray-100 hover:bg-gray-50">
                                                    <td className="py-3 px-4">#{order.id || index + 1}</td>
                                                    <td className="py-3 px-4">{order.customerName || 'Customer'}</td>
                                                    <td className="py-3 px-4">
                                                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                                            {order.status || t('pending')}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">Rs.{order.totalPrice || '0.00'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <ShoppingCart size={48} className="mx-auto mb-4 text-gray-300" />
                                    <p className="text-lg font-medium mb-2">{t('noOrders')}</p>
                                    <p className="text-sm">
                                        {!token ? t('loginRequired') : t('ordersWillAppear')}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'add-products':
                return (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('addNewProduct')}</h2>
                            <button
                                onClick={() => setShowProductForm(true)}
                                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
                            >
                                <Plus size={20} />
                                <span>{t('addProduct')}</span>
                            </button>
                        </div>
                    </div>
                );

            case 'view-products':
                return (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold text-gray-800">{t('allProducts')}</h2>
                                <div className="flex items-center space-x-2">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            placeholder={t('searchProducts')}
                                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>

                            {loading ? (
                                <div className="text-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                                </div>
                            ) : products.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('image')}</th>
                                                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('title')}</th>
                                                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('brand')}</th>
                                                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('price')}</th>
                                                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('quantity')}</th>
                                                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('actions')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((product, index) => (
                                                <tr key={product.product_id || index} className="border-b border-gray-100 hover:bg-gray-50">
                                                    <td className="py-3 px-4">
                                                        <img
                                                            src={product.imageUrl || '/api/placeholder/50/50'}
                                                            alt={product.title}
                                                            className="w-12 h-12 object-cover rounded-lg"
                                                        />
                                                    </td>
                                                    <td className="py-3 px-4 font-medium">{product.title}</td>
                                                    <td className="py-3 px-4">{product.brand}</td>
                                                    <td className="py-3 px-4">
                                                        {product.discountPresent > 0 && product.discountPrice ? (
                                                            <div>
                                                                <span className="line-through text-gray-500">Rs.{product.price}</span>
                                                            </div>
                                                        ) : (
                                                            <span>Rs.{product.price}</span>
                                                        )}
                                                    </td>
                                                    <td className="py-3 px-4">{product.quantity}</td>
                                                    <td className="py-3 px-4">
                                                        <div className="flex space-x-2">
                                                            <button
                                                                onClick={() => setEditingProduct(product)}
                                                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                            >
                                                                <Edit size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => deleteProduct(product.product_id)}
                                                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <Package size={48} className="mx-auto mb-4 text-gray-300" />
                                    <p>{t('noProductsFound')}</p>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'view-orders':
                return (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('allOrders')}</h2>

                            {loading ? (
                                <div className="text-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                                </div>
                            ) : orders.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('orderId')}</th>
                                                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('customer')}</th>
                                                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('date')}</th>
                                                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('status')}</th>
                                                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('totalPrice')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order, index) => (
                                                <tr key={order.id || index} className="border-b border-gray-100 hover:bg-gray-50">
                                                    <td className="py-3 px-4">#{order.id || index + 1}</td>
                                                    <td className="py-3 px-4">{order.customerName || 'Customer'}</td>
                                                    <td className="py-3 px-4">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</td>
                                                    <td className="py-3 px-4">
                                                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                                            {order.status || t('pending')}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">Rs.{order.totalPrice || '0.00'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <ShoppingCart size={48} className="mx-auto mb-4 text-gray-300" />
                                    <p>{t('noOrdersFoundMessage')}</p>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'help':
                return (
                    <div className="space-y-6">
                        <Help />
                    </div>
                );

            default:
                return null;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        window.location.href = '/';
    };

    return (
        <LanguageProvider>
            <div className="min-h-screen" style={{ backgroundColor: 'rgb(207,150,128)' }}>
                {/* Mobile Header */}
                <div className="lg:hidden bg-white shadow-sm p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full">
                            <img alt="Logo" src="/Image/logo.png" className="h-10 w-auto" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-800">LankaCraft</h1>
                    </div>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-lg hover:bg-gray-100"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <div className="flex">
                    {/* Sidebar */}
                    <div className={`
                        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform 
                        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                        transition-transform duration-300 ease-in-out
                    `}>
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full">
                                    <img alt="Logo" src="/Image/logo.png" className="h-10 w-auto" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-800">LankaCraft</h1>
                                    <p className="text-sm text-gray-600">{t('artisanPanel')}</p>
                                </div>
                            </div>
                        </div>

                        <nav className="p-4 space-y-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setActiveMenu(item.id);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className={`
                                            w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                                            ${activeMenu === item.id
                                                ? 'bg-orange-100 text-orange-700 font-medium'
                                                : 'text-gray-600 hover:bg-gray-100'
                                            }
                                        `}
                                    >
                                        <Icon size={20} />
                                        <span>{item.label}</span>
                                    </button>
                                );
                            })}
                        </nav>

                        <LanguageSwitcher />

                        <div className="absolute bottom-16 left-4 right-4 mt-6">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <LogOut size={20} />
                                <span>{t('logout')}</span>
                            </button>
                        </div>
                    </div>

                    {/* Overlay */}
                    {isMobileMenuOpen && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
                            onClick={() => setIsMobileMenuOpen(false)}
                        ></div>
                    )}

                    {/* Main Content */}
                    <div className="flex-1 lg:ml-0">
                        <div className="p-4 lg:p-8">
                            {renderContent()}
                        </div>
                    </div>
                </div>

                {/* Product Form Modal */}
                {showProductForm && (
                    <ProductForm
                        onSubmit={createProduct}
                        onCancel={() => setShowProductForm(false)}
                    />
                )}

                {/* Edit Product Modal */}
                {editingProduct && (
                    <ProductForm
                        product={editingProduct}
                        onSubmit={(data) => updateProduct(editingProduct.product_id, data)}
                        onCancel={() => setEditingProduct(null)}
                    />
                )}
            </div>
        </LanguageProvider>
    );
};

// Main App Component
const App = () => {
    return (
        <LanguageProvider>
            <Dashboard />
        </LanguageProvider>
    );
};

export default memo(App);