// app/page.js
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useLanguage } from "./contexts/LanguageContext";
import AuthApp from "./login/page";

export default function HomePage() {
    const { isAuthenticated, currentUser, login, isLoading } = useAuth();
    const { t, language } = useLanguage();
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());

    // 模拟订单数据
    const [orders] = useState([
        {
            id: 'ORD-001',
            productName: 'MacBook Pro 14"',
            date: '2025-01-28',
            amount: 1999.99,
            status: 'delivered',
            trackingNumber: 'TRK123456789',
            estimatedDelivery: '2025-01-30'
        },
        {
            id: 'ORD-002',
            productName: 'iPhone 15 Pro',
            date: '2025-01-29',
            amount: 1199.99,
            status: 'shipped',
            trackingNumber: 'TRK987654321',
            estimatedDelivery: '2025-02-02'
        },
        {
            id: 'ORD-003',
            productName: 'AirPods Pro',
            date: '2025-01-30',
            amount: 249.99,
            status: 'processing',
            trackingNumber: null,
            estimatedDelivery: '2025-02-05'
        },
        {
            id: 'ORD-004',
            productName: 'iPad Air',
            date: '2025-01-31',
            amount: 599.99,
            status: 'pending',
            trackingNumber: null,
            estimatedDelivery: '2025-02-07'
        },
        {
            id: 'ORD-005',
            productName: 'Apple Watch Series 9',
            date: '2025-01-25',
            amount: 429.99,
            status: 'delivered',
            trackingNumber: 'TRK456789123',
            estimatedDelivery: '2025-01-27'
        },
        {
            id: 'ORD-006',
            productName: 'Magic Keyboard',
            date: '2025-02-01',
            amount: 349.99,
            status: 'cancelled',
            trackingNumber: null,
            estimatedDelivery: null
        },
        {
            id: 'ORD-007',
            productName: 'Studio Display',
            date: '2025-02-01',
            amount: 1599.99,
            status: 'pending',
            trackingNumber: null,
            estimatedDelivery: '2025-02-10'
        },
        {
            id: 'ORD-008',
            productName: 'HomePod mini',
            date: '2025-01-28',
            amount: 99.99,
            status: 'shipped',
            trackingNumber: 'TRK789456123',
            estimatedDelivery: '2025-02-01'
        }
    ]);

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // 订单状态配置
    const statusConfig = {
        pending: {
            label: t('pending'),
            color: 'bg-yellow-100 text-yellow-800',
            icon: '⏳',
            bgGradient: 'from-yellow-400 to-orange-400'
        },
        processing: {
            label: t('processing'),
            color: 'bg-blue-100 text-blue-800',
            icon: '📦',
            bgGradient: 'from-blue-400 to-indigo-400'
        },
        shipped: {
            label: t('shipped'),
            color: 'bg-purple-100 text-purple-800',
            icon: '🚚',
            bgGradient: 'from-purple-400 to-pink-400'
        },
        delivered: {
            label: t('delivered'),
            color: 'bg-green-100 text-green-800',
            icon: '✅',
            bgGradient: 'from-green-400 to-teal-400'
        },
        cancelled: {
            label: t('cancelled'),
            color: 'bg-red-100 text-red-800',
            icon: '❌',
            bgGradient: 'from-red-400 to-pink-400'
        }
    };

    // 统计各状态订单数量
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

    // 过滤订单
    const filteredOrders = orders.filter(order => {
        const matchesFilter = selectedFilter === 'all' || order.status === selectedFilter;
        const matchesSearch = order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // 显示加载状态
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg text-gray-600">{t('loading')}</div>
            </div>
        );
    }

    // 如果未认证，显示登录页面
    if (!isAuthenticated) {
        return <AuthApp onLogin={login} />;
    }

    // 如果已认证，显示订单管理页面
    return (
        <div className="min-h-screen bg-gray-50">
            {/* 页面头部 */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{t('orderManagementCenter')}</h1>
                            <p className="text-gray-600 mt-1">{t('welcomeBack2')}, {currentUser}！{t('manageOrders')}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">{t('currentTime')}</p>
                            <p className="text-lg font-mono text-gray-700">
                                {currentTime.toLocaleString(language === 'zh' ? 'zh-CN' : 'en-US')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 状态统计卡片 */}
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

                {/* 搜索栏 */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder={t('searchPlaceholder')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                {t('search')}
                            </button>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedFilter('all');
                                }}
                                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                {t('reset')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* 订单列表 */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {selectedFilter === 'all' ? t('allOrders') : statusConfig[selectedFilter].label + (language === 'zh' ? '的订单' : ' Orders')}
                            <span className="ml-2 text-sm text-gray-500">({filteredOrders.length} {t('orders')})</span>
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t('orderInfo')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t('date')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t('amount')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t('status')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t('logistics')}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t('actions')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredOrders.length > 0 ? (
                                    filteredOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {order.productName}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {order.id}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{order.date}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900">
                                                    ¥{order.amount.toFixed(2)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig[order.status].color}`}>
                                                    <span className="mr-1">{statusConfig[order.status].icon}</span>
                                                    {statusConfig[order.status].label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {order.trackingNumber ? (
                                                    <div>
                                                        <div className="text-sm text-gray-900">
                                                            {order.trackingNumber}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {t('estimated')} {order.estimatedDelivery}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-500">{t('noLogisticsInfo')}</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <button className="text-blue-600 hover:text-blue-900 font-medium">
                                                    {t('viewDetails')}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center">
                                            <div className="text-gray-500">
                                                <div className="text-4xl mb-4">📭</div>
                                                <p className="text-lg">{t('noOrdersFound')}</p>
                                                <p className="text-sm mt-2">{t('adjustFilters')}</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 快速统计 */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 p-3 bg-blue-100 rounded-lg">
                                <span className="text-2xl">💰</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">{t('totalOrderAmount')}</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {language === 'zh' ? '¥' : '$'}{orders.reduce((sum, order) => sum + order.amount, 0).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 p-3 bg-green-100 rounded-lg">
                                <span className="text-2xl">📈</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">{t('monthlyOrders')}</p>
                                <p className="text-2xl font-bold text-gray-900">{orders.length} {language === 'zh' ? '个' : ''}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 p-3 bg-purple-100 rounded-lg">
                                <span className="text-2xl">🚀</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">{t('pendingOrders')}</p>
                                <p className="text-2xl font-bold text-gray-900">{statusCounts.pending + statusCounts.processing} {language === 'zh' ? '个' : ''}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
