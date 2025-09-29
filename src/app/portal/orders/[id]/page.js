"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function OrderDetailPage() {
    const params = useParams();
    const orderId = params.id;

    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadOrderDetails = async () => {
            // Check authentication
            const userData = localStorage.getItem('darley_user');
            if (!userData) {
                window.location.href = '/portal';
                return;
            }
            setUser(JSON.parse(userData));

            // TODO: Replace with actual API call
            // const response = await fetch(`/api/orders/${orderId}`);
            // const result = await response.json();

            // Mock order detail data
            const mockOrder = {
                id: orderId,
                orderDate: '2024-01-15',
                deliveryDate: '2024-02-10',
                status: 'in_production',
                customerPO: 'PO-2024-001',
                orderTotal: 15420.50,
                deliveryAddress: {
                    company: 'Example Construction Pty Ltd',
                    address1: '123 Industrial Drive',
                    address2: 'Unit 45',
                    city: 'Melbourne',
                    state: 'VIC',
                    postcode: '3000',
                    country: 'Australia'
                },
                billingAddress: {
                    company: 'Example Construction Pty Ltd',
                    address1: '456 Business Park Drive',
                    address2: 'Suite 12',
                    city: 'Melbourne',
                    state: 'VIC',
                    postcode: '3001',
                    country: 'Australia'
                },
                items: [
                    {
                        id: 'item-1',
                        product: 'Powder Coated Panels',
                        description: 'Architectural grade aluminium panels with premium powder coating',
                        quantity: 50,
                        unitPrice: 125.50,
                        totalPrice: 6275.00,
                        finish: 'Monument Grey Matt',
                        specifications: 'Grade 6063-T6, 3mm thickness',
                        status: 'in_production',
                        estimatedCompletion: '2024-02-05'
                    },
                    {
                        id: 'item-2',
                        product: 'Anodized Extrusions',
                        description: 'Custom anodized aluminium extrusions for structural applications',
                        quantity: 25,
                        unitPrice: 365.82,
                        totalPrice: 9145.50,
                        finish: 'Natural Anodized - 25μm',
                        specifications: 'Grade 6060-T5, Custom profile EX-2024-001',
                        status: 'quality_check',
                        estimatedCompletion: '2024-02-02'
                    }
                ],
                timeline: [
                    {
                        date: '2024-01-15',
                        status: 'Order Received',
                        description: 'Order confirmed and added to production queue',
                        completed: true
                    },
                    {
                        date: '2024-01-18',
                        status: 'Material Procurement',
                        description: 'Raw materials sourced and quality checked',
                        completed: true
                    },
                    {
                        date: '2024-01-22',
                        status: 'Production Started',
                        description: 'Manufacturing commenced in our facility',
                        completed: true
                    },
                    {
                        date: '2024-02-02',
                        status: 'Quality Control',
                        description: 'Items undergoing final quality inspection',
                        completed: false,
                        current: true
                    },
                    {
                        date: '2024-02-05',
                        status: 'Packaging',
                        description: 'Secure packaging for transport',
                        completed: false
                    },
                    {
                        date: '2024-02-08',
                        status: 'Dispatch',
                        description: 'Loaded onto delivery vehicle',
                        completed: false
                    },
                    {
                        date: '2024-02-10',
                        status: 'Delivered',
                        description: 'Order delivered to customer site',
                        completed: false
                    }
                ],
                trackingNumber: 'DA-TRK-001234',
                contactPerson: {
                    name: 'Sarah Mitchell',
                    title: 'Account Manager',
                    phone: '+61 3 9876 5432',
                    email: 'sarah.mitchell@darleyaluminium.com.au'
                },
                documents: [
                    { type: 'Order Confirmation', status: 'available', date: '2024-01-15' },
                    { type: 'Production Schedule', status: 'available', date: '2024-01-22' },
                    { type: 'Quality Certificate', status: 'pending', date: '2024-02-02' },
                    { type: 'Delivery Receipt', status: 'pending', date: '2024-02-10' },
                    { type: 'Invoice', status: 'pending', date: '2024-02-10' }
                ]
            };

            setOrder(mockOrder);
            setIsLoading(false);
        };

        loadOrderDetails();
    }, [orderId]);

    const getStatusConfig = (status) => {
        const configs = {
            'pending': { label: 'Pending', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: '' },
            'in_production': { label: 'In Production', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: '' },
            'quality_check': { label: 'Quality Check', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: '' },
            'shipped': { label: 'Shipped', color: 'bg-orange-100 text-orange-800 border-orange-200', icon: '' },
            'delivered': { label: 'Delivered', color: 'bg-green-100 text-green-800 border-green-200', icon: '' }
        };
        return configs[status] || { label: status, color: 'bg-gray-100 text-gray-800 border-gray-200', icon: '' };
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#2d697d]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <div className="text-lg text-white">Loading order details...</div>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#2d697d]">
                <div className="text-center bg-white rounded-xl shadow-sm p-8">
                    <div className="text-4xl mb-4 font-bold text-red-400">ERROR</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h1>
                    <p className="text-gray-600 mb-6">The order you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.</p>
                    <Link
                        href="/portal"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
                    >
                        Back to Portal
                    </Link>
                </div>
            </div>
        );
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
                            <Link href="/portal" className="text-lg font-semibold text-[#72aee6] hover:text-[#2271b1]">
                                Customer Portal
                            </Link>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <div className="text-sm font-medium text-[#f0f0f1]">{user?.name}</div>
                                <div className="text-sm text-[#c3c4c7]">{user?.company}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Link href="/portal" className="hover:text-blue-600">Portal</Link>
                        <span>›</span>
                        <span className="text-gray-900">Order {order.id}</span>
                    </div>
                </nav>

                {/* Order Header */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order {order.id}</h1>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>Placed: {new Date(order.orderDate).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>Expected: {new Date(order.deliveryDate).toLocaleDateString()}</span>
                                {order.customerPO && (
                                    <>
                                        <span>•</span>
                                        <span>PO: {order.customerPO}</span>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="text-right">
                            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getStatusConfig(order.status).color}`}>
                                {getStatusConfig(order.status).label}
                            </div>
                            <div className="text-2xl font-bold text-gray-900 mt-2">
                                ${order.orderTotal.toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Order Timeline */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Progress</h2>
                            <div className="space-y-4">
                                {order.timeline.map((event, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                                            {event.completed ? (
                                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                    <span className="text-white text-sm font-bold">✓</span>
                                                </div>
                                            ) : event.current ? (
                                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                                                    <span className="text-white text-sm font-bold">•</span>
                                                </div>
                                            ) : (
                                                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <h3 className={`text-sm font-medium ${event.completed || event.current ? 'text-gray-900' : 'text-gray-500'}`}>
                                                    {event.status}
                                                </h3>
                                                <span className={`text-xs ${event.completed || event.current ? 'text-gray-600' : 'text-gray-400'}`}>
                                                    {new Date(event.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className={`text-sm ${event.completed || event.current ? 'text-gray-600' : 'text-gray-400'}`}>
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Items</h2>
                            <div className="space-y-6">
                                {order.items.map((item) => (
                                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{item.product}</h3>
                                                <p className="text-sm text-gray-600">{item.description}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusConfig(item.status).color}`}>
                                                {getStatusConfig(item.status).label}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-500">Quantity:</span>
                                                <div className="font-medium">{item.quantity}</div>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Unit Price:</span>
                                                <div className="font-medium">${item.unitPrice}</div>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Total:</span>
                                                <div className="font-medium">${item.totalPrice.toLocaleString()}</div>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Est. Completion:</span>
                                                <div className="font-medium">{new Date(item.estimatedCompletion).toLocaleDateString()}</div>
                                            </div>
                                        </div>

                                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-500">Finish:</span>
                                                <div className="font-medium">{item.finish}</div>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Specifications:</span>
                                                <div className="font-medium">{item.specifications}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Contact Information */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Account Manager</h3>
                            <div className="space-y-3">
                                <div>
                                    <div className="font-medium text-gray-900">{order.contactPerson.name}</div>
                                    <div className="text-sm text-gray-600">{order.contactPerson.title}</div>
                                </div>
                                <div className="space-y-2">
                                    <a
                                        href={`tel:${order.contactPerson.phone}`}
                                        className="flex items-center text-sm text-blue-600 hover:text-blue-500"
                                    >
                                        Phone: {order.contactPerson.phone}
                                    </a>
                                    <a
                                        href={`mailto:${order.contactPerson.email}`}
                                        className="flex items-center text-sm text-blue-600 hover:text-blue-500"
                                    >
                                        Email: {order.contactPerson.email}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Tracking Information */}
                        {order.trackingNumber && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tracking</h3>
                                <div className="space-y-2">
                                    <div className="text-sm text-gray-600">Tracking Number:</div>
                                    <div className="font-mono text-sm bg-gray-100 p-2 rounded border">
                                        {order.trackingNumber}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Documents */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
                            <div className="space-y-3">
                                {order.documents.map((doc, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{doc.type}</div>
                                            <div className="text-xs text-gray-500">{new Date(doc.date).toLocaleDateString()}</div>
                                        </div>
                                        {doc.status === 'available' ? (
                                            <button className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                                                Download
                                            </button>
                                        ) : (
                                            <span className="text-gray-400 text-sm">Pending</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Delivery Address */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Address</h3>
                            <div className="text-sm text-gray-600 space-y-1">
                                <div className="font-medium text-gray-900">{order.deliveryAddress.company}</div>
                                <div>{order.deliveryAddress.address1}</div>
                                {order.deliveryAddress.address2 && <div>{order.deliveryAddress.address2}</div>}
                                <div>
                                    {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.postcode}
                                </div>
                                <div>{order.deliveryAddress.country}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}