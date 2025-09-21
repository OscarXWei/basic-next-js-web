// app/page.js
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useLanguage } from "./contexts/LanguageContext";
import { loadOrderData } from "./utils/csvParser";
import AuthApp from "./login/page";

export default function HomePage() {
    const { isAuthenticated, currentUser, login, isLoading } = useAuth();
    const { t, language } = useLanguage();
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [orders, setOrders] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [loadError, setLoadError] = useState(null);

    // Load order data
    useEffect(() => {
        const loadData = async () => {
            setIsLoadingData(true);
            setLoadError(null);
            try {
                console.log('Starting to load data...');
                const orderData = await loadOrderData();
                console.log('Data loaded:', orderData);
                setOrders(orderData);
                console.log('Orders loaded successfully:', orderData.length);
            } catch (error) {
                console.error('Failed to load order data:', error);
                setLoadError(error.message);
                // Use fallback data
                setOrders([{
                    id: 'WOB06376',
                    productName: 'NV | GA236A Surfmist Matt',
                    customer: 'CASH SALES NSW',
                    date: '2025-01-28',
                    dueDate: '2025-01-09',
                    amount: 2500,
                    status: 'pending',
                    quantity: 45,
                    sqmTotal: 46.8,
                    sqmClosed: 0,
                    sqmInProcess: 0,
                    sqmReleased: 46.8,
                    sqmUnscheduled: 0,
                    scheduler: 'N-ESKP',
                    notes: 'B/O',
                    lines: 1,
                    trackingNumber: null,
                    estimatedDelivery: '2025-01-09'
                }]);
            } finally {
                setIsLoadingData(false);
            }
        };
        loadData();
    }, []);

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // order status configuration for aluminum production
    const statusConfig = {
        pending: {
            label: 'Unscheduled',
            color: 'bg-amber-100 text-amber-800',
            icon: '📋',
            bgGradient: 'from-amber-400 to-orange-400'
        },
        processing: {
            label: 'In Process',
            color: 'bg-blue-100 text-blue-800',
            icon: '⚡',
            bgGradient: 'from-blue-400 to-indigo-400'
        },
        shipped: {
            label: 'Released',
            color: 'bg-purple-100 text-purple-800',
            icon: '📤',
            bgGradient: 'from-purple-400 to-pink-400'
        },
        delivered: {
            label: 'Completed',
            color: 'bg-green-100 text-green-800',
            icon: '✅',
            bgGradient: 'from-green-400 to-teal-400'
        },
        cancelled: {
            label: 'Cancelled',
            color: 'bg-red-100 text-red-800',
            icon: '❌',
            bgGradient: 'from-red-400 to-pink-400'
        }
    };

    // count orders by status
    const getStatusCounts = () => {
        const counts = {
            all: orders.length,
            pending: 0,
            processing: 0,
            shipped: 0,
            delivered: 0,
            cancelled: 0
        };

        orders.forEach(order => {
            counts[order.status]++;
        });

        return counts;
    };

    const statusCounts = getStatusCounts();

    // filter and search orders
    const filteredOrders = orders.filter(order => {
        const matchesFilter = selectedFilter === 'all' || order.status === selectedFilter;
        const matchesSearch = order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // show loading state while checking auth or data
    if (isLoading || isLoadingData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="text-center">
                    <div className="text-6xl mb-4">⚙️</div>
                    <div className="text-lg text-gray-600">Loading Aluminum Production Data...</div>
                    {loadError && (
                        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            <p>Error loading data: {loadError}</p>
                            <p className="text-sm mt-2">Using fallback data instead.</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // if not authenticated, show login page
    if (!isAuthenticated) {
        return <AuthApp onLogin={login} />;
    }

    // if authenticated, show order management dashboard
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg border-b-4 border-blue-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="flex items-center space-x-3 mb-2">
                                <div className="text-4xl">🏭</div>
                                <h1 className="text-4xl font-bold text-white">Darley Aluminum Production</h1>
                            </div>
                            <p className="text-blue-200 mt-1">Welcome back, {currentUser}! Managing aluminum fabrication orders</p>
                        </div>
                        <div className="text-right">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                <p className="text-sm text-blue-200">Production Time</p>
                                <p className="text-xl font-mono text-white">
                                    {currentTime.toLocaleString('en-US')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Status Card */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    {Object.entries(statusConfig).map(([status, config]) => (
                        <div
                            key={status}
                            onClick={() => setSelectedFilter(status)}
                            className={`relative overflow-hidden rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${selectedFilter === status ? 'ring-2 ring-blue-500' : ''
                                }`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient} opacity-10`}></div>
                            <div className="relative">
                                <div className="text-2xl mb-2">{config.icon}</div>
                                <p className="text-sm text-gray-600">{config.label}</p>
                                <p className="text-2xl font-bold text-gray-900">{statusCounts[status]}</p>
                            </div>
                        </div>
                    ))}
                    <div
                        onClick={() => setSelectedFilter('all')}
                        className={`relative overflow-hidden rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${selectedFilter === 'all' ? 'ring-2 ring-blue-500' : ''
                            }`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 opacity-10"></div>
                        <div className="relative">
                            <div className="text-2xl mb-2">📊</div>
                            <p className="text-sm text-gray-600">{t('allOrders')}</p>
                            <p className="text-2xl font-bold text-gray-900">{statusCounts.all}</p>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search by WOB#, finish, or customer name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
                                Search
                            </button>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedFilter('all');
                                }}
                                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Order List */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-blue-50">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {selectedFilter === 'all' ? 'All Production Orders' : statusConfig[selectedFilter].label + ' Orders'}
                            <span className="ml-2 text-sm text-gray-500">({filteredOrders.length} orders)</span>
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Production Order
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Due Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Quantity & SQM
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Est. Value
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredOrders.length > 0 ? (
                                    filteredOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-bold text-slate-900">
                                                        {order.id}
                                                    </div>
                                                    <div className="text-xs text-gray-600 max-w-xs truncate">
                                                        {order.productName}
                                                    </div>
                                                    <div className="text-xs text-blue-600">
                                                        {order.lines} line{order.lines !== 1 ? 's' : ''}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 max-w-xs truncate">{order.customer}</div>
                                                <div className="text-xs text-gray-500">{order.scheduler}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{order.dueDate}</div>
                                                <div className="text-xs text-gray-500">Pick: {order.date}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900">
                                                    {order.quantity} units
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {order.sqmTotal.toFixed(1)} SQM total
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig[order.status].color}`}>
                                                    <span className="mr-1">{statusConfig[order.status].icon}</span>
                                                    {statusConfig[order.status].label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-green-700">
                                                    ${order.amount.toFixed(0)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <button className="text-slate-600 hover:text-slate-900 font-medium">
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center">
                                            <div className="text-gray-500">
                                                <div className="text-4xl mb-4">🏭</div>
                                                <p className="text-lg">No production orders found</p>
                                                <p className="text-sm mt-2">Try adjusting your search or filters</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Production Metrics */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 p-3 bg-green-100 rounded-lg">
                                <span className="text-2xl">💰</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Total Production Value</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ${orders.reduce((sum, order) => sum + order.amount, 0).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 p-3 bg-blue-100 rounded-lg">
                                <span className="text-2xl">📏</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Total SQM</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {orders.reduce((sum, order) => sum + order.sqmTotal, 0).toFixed(1)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 p-3 bg-orange-100 rounded-lg">
                                <span className="text-2xl">📊</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Active Orders</p>
                                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 p-3 bg-purple-100 rounded-lg">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">In Progress</p>
                                <p className="text-2xl font-bold text-gray-900">{statusCounts.pending + statusCounts.processing}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
