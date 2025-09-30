"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser, RedirectToSignIn } from "@clerk/nextjs";

export default function CustomerPortal() {
    const { isSignedIn, user, isLoaded } = useUser();
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('all');

    // Load orders when user is authenticated
    useEffect(() => {
        if (isSignedIn) {
            loadOrders();
        }
    }, [isSignedIn]);


    // Load orders from API (placeholder)
    const loadOrders = async () => {
        setLoadingOrders(true);
        try {
            // TODO: Replace with actual API call to /api/orders
            // const response = await fetch('/api/orders');
            // const result = await response.json();

            // Mock order data for now
            const mockOrders = [
                {
                    id: 'WOB-001234',
                    orderDate: '2025-01-15',
                    deliveryDate: '2025-02-10',
                    status: 'in_production',
                    items: [
                        { product: 'Powder Coated Panels', quantity: 50, finish: 'Monument Grey Matt' },
                        { product: 'Anodized Extrusions', quantity: 25, finish: 'Natural Anodized' }
                    ],
                    totalAmount: 15420.50,
                    deliveryAddress: '123 Industrial Drive, Melbourne VIC 3000',
                    trackingNumber: 'DA-TRK-001234'
                },
                {
                    id: 'WOB-001198',
                    orderDate: '2025-01-02',
                    deliveryDate: '2025-01-28',
                    status: 'delivered',
                    items: [
                        { product: 'Custom Fabrication', quantity: 12, finish: 'Surfmist Matt' }
                    ],
                    totalAmount: 8250.00,
                    deliveryAddress: '456 Business Park, Sydney NSW 2000',
                    trackingNumber: 'DA-TRK-001198'
                },
                {
                    id: 'WOB-001067',
                    orderDate: '2023-12-18',
                    deliveryDate: '2025-01-22',
                    status: 'shipped',
                    items: [
                        { product: 'Structural Components', quantity: 100, finish: 'Black Satin' }
                    ],
                    totalAmount: 22150.75,
                    deliveryAddress: '789 Construction Ave, Brisbane QLD 4000',
                    trackingNumber: 'DA-TRK-001067'
                }
            ];

            setOrders(mockOrders);
        } catch (error) {
            console.error('Failed to load orders:', error);
        } finally {
            setLoadingOrders(false);
        }
    };

    const getStatusConfig = (status) => {
        const configs = {
            'pending': { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: '' },
            'in_production': { label: 'In Production', color: 'bg-blue-100 text-blue-800', icon: '' },
            'quality_check': { label: 'Quality Check', color: 'bg-purple-100 text-purple-800', icon: '' },
            'shipped': { label: 'Shipped', color: 'bg-orange-100 text-orange-800', icon: '' },
            'delivered': { label: 'Delivered', color: 'bg-green-100 text-green-800', icon: '' }
        };
        return configs[status] || { label: status, color: 'bg-gray-100 text-gray-800', icon: '' };
    };

    const filteredOrders = selectedStatus === 'all'
        ? orders
        : orders.filter(order => order.status === selectedStatus);

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#2d697d]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <div className="text-lg text-white">Loading Portal...</div>
                </div>
            </div>
        );
    }

    if (!isSignedIn) {
        return <RedirectToSignIn />;
    }

    return (
        <div className="min-h-screen bg-[#2d697d]">
            {/* Header */}
            <header className="bg-[#2c3338] shadow-sm border-b border-[#3c434a]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="flex items-center">
                                <img
                                    src="/images/Darley_Logo.png"
                                    alt="Darley Aluminium Logo"
                                    className="w-16 h-16 object-contain"
                                />
                            </Link>
                            <span className="text-[#a7aaad]">|</span>
                            <span className="text-lg font-semibold text-[#c3c4c7]">Customer Portal</span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <div className="text-sm font-medium text-[#f0f0f1]">
                                    {user?.firstName || user?.emailAddresses?.[0]?.emailAddress?.split('@')[0] || 'User'}
                                </div>
                                <div className="text-sm text-[#c3c4c7]">Customer Portal</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome back, {user?.firstName || user?.emailAddresses?.[0]?.emailAddress?.split('@')[0] || 'User'}
                    </h1>
                    <p className="text-gray-600">
                        Track your orders, view delivery status, and manage your account
                    </p>
                </div>


                {/* Orders Section */}
                <div className="bg-white rounded-xl shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h2 className="text-2xl font-bold text-gray-900">Your Orders</h2>

                            {/* Status Filter */}
                            <div className="flex space-x-2">
                                {['all', 'pending', 'in_production', 'shipped', 'delivered'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setSelectedStatus(status)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedStatus === status
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {status === 'all' ? 'All' : getStatusConfig(status).label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Orders List */}
                    <div className="divide-y divide-gray-200">
                        {loadingOrders ? (
                            <div className="p-8 text-center">
                                <div className="inline-block w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                                <div className="mt-2 text-gray-600">Loading orders...</div>
                            </div>
                        ) : filteredOrders.length === 0 ? (
                            <div className="p-8 text-center">
                                <div className="text-4xl mb-4 font-bold text-gray-400">Orders</div>
                                <div className="text-lg text-gray-600">No orders found</div>
                                <div className="text-sm text-gray-500 mt-2">
                                    {selectedStatus === 'all' ? 'You haven\'t placed any orders yet' : `No ${getStatusConfig(selectedStatus).label.toLowerCase()} orders`}
                                </div>
                            </div>
                        ) : (
                            filteredOrders.map((order) => (
                                <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusConfig(order.status).color}`}>
                                                    {getStatusConfig(order.status).label}
                                                </span>
                                            </div>

                                            <div className="text-sm text-gray-600 space-y-1">
                                                <div>Order Date: {new Date(order.orderDate).toLocaleDateString()}</div>
                                                <div>Delivery Date: {new Date(order.deliveryDate).toLocaleDateString()}</div>
                                                <div>Items: {order.items.map(item => `${item.quantity}x ${item.product}`).join(', ')}</div>
                                                {order.trackingNumber && (
                                                    <div>Tracking: <span className="font-medium">{order.trackingNumber}</span></div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-gray-900 mb-2">
                                                ${order.totalAmount.toLocaleString()}
                                            </div>
                                            <Link
                                                href={`/portal/orders/${order.id}`}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
