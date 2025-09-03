// app/contexts/LanguageContext.js
"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext({});

// Translation dictionary
const translations = {
    en: {
        // Navigation
        home: 'Home',
        about: 'About',
        contact: 'Contact',
        products: 'Products',
        welcome: 'Welcome',
        logout: 'Logout',
        
        // Login page
        welcomeBack: 'Welcome Back!',
        createAccount: 'Create Account',
        pleaseLogin: 'Please login to your account',
        signUpToStart: 'Sign up to get started',
        emailAddress: 'Email Address',
        username: 'Username',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot password?',
        signIn: 'Sign In',
        dontHaveAccount: "Don't have an account?",
        alreadyHaveAccount: 'Already have an account?',
        signUp: 'Sign up',
        or: 'Or',
        
        // Form validation
        emailRequired: 'Email is required',
        emailInvalid: 'Email is invalid',
        usernameRequired: 'Username is required',
        passwordRequired: 'Password is required',
        passwordMinLength: 'Password must be at least 6 characters',
        passwordsMismatch: 'Passwords do not match',
        
        // Home page (Order Management)
        orderManagementCenter: 'Order Management Center',
        welcomeBack2: 'Welcome back',
        manageOrders: 'Manage all your orders',
        currentTime: 'Current time',
        allOrders: 'All Orders',
        pending: 'Pending',
        processing: 'Processing',
        shipped: 'Shipped',
        delivered: 'Delivered',
        cancelled: 'Cancelled',
        searchPlaceholder: 'Search order number or product name...',
        search: 'Search',
        reset: 'Reset',
        orderInfo: 'Order Info',
        date: 'Date',
        amount: 'Amount',
        status: 'Status',
        logistics: 'Logistics',
        actions: 'Actions',
        viewDetails: 'View Details',
        noOrdersFound: 'No orders found',
        adjustFilters: 'Please try adjusting filters or search keywords',
        totalOrderAmount: 'Total Order Amount',
        monthlyOrders: 'Monthly Orders',
        pendingOrders: 'Pending Orders',
        noLogisticsInfo: 'No logistics info',
        estimated: 'Estimated',
        orders: 'orders',
        
        // About page
        aboutMe: 'About Me',
        aboutIntro: 'Hello! I\'m building my first demo with Next.js 13.',
        aboutDescription: 'This page shows some basic info.',
        
        // Contact page
        contactUs: 'Contact Us',
        getInTouch: 'Get in touch with us',
        contactDescription: 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
        
        // Products page
        ourProducts: 'Our Products',
        exploreProducts: 'Explore our amazing products',
        productDescription: 'Discover our wide range of high-quality products designed to meet your needs.',
        
        // Common
        loading: 'Loading...'
    },
    zh: {
        // Navigation
        home: '首页',
        about: '关于',
        contact: '联系',
        products: '产品',
        welcome: '欢迎',
        logout: '退出',
        
        // Login page
        welcomeBack: '欢迎回来！',
        createAccount: '创建账户',
        pleaseLogin: '请登录您的账户',
        signUpToStart: '注册开始使用',
        emailAddress: '邮箱地址',
        username: '用户名',
        password: '密码',
        confirmPassword: '确认密码',
        rememberMe: '记住我',
        forgotPassword: '忘记密码？',
        signIn: '登录',
        dontHaveAccount: '还没有账户？',
        alreadyHaveAccount: '已有账户？',
        signUp: '注册',
        or: '或',
        
        // Form validation
        emailRequired: '邮箱是必填的',
        emailInvalid: '邮箱格式无效',
        usernameRequired: '用户名是必填的',
        passwordRequired: '密码是必填的',
        passwordMinLength: '密码至少需要6个字符',
        passwordsMismatch: '密码不匹配',
        
        // Home page (Order Management)
        orderManagementCenter: '订单管理中心',
        welcomeBack2: '欢迎回来',
        manageOrders: '管理您的所有订单',
        currentTime: '当前时间',
        allOrders: '全部订单',
        pending: '待处理',
        processing: '处理中',
        shipped: '已发货',
        delivered: '已送达',
        cancelled: '已取消',
        searchPlaceholder: '搜索订单号或产品名称...',
        search: '搜索',
        reset: '重置',
        orderInfo: '订单信息',
        date: '日期',
        amount: '金额',
        status: '状态',
        logistics: '物流信息',
        actions: '操作',
        viewDetails: '查看详情',
        noOrdersFound: '没有找到相关订单',
        adjustFilters: '请尝试调整筛选条件或搜索关键词',
        totalOrderAmount: '总订单金额',
        monthlyOrders: '本月订单',
        pendingOrders: '待处理订单',
        noLogisticsInfo: '暂无物流信息',
        estimated: '预计',
        orders: '个',
        
        // About page
        aboutMe: '关于我',
        aboutIntro: '您好！我正在用 Next.js 13 构建我的第一个演示。',
        aboutDescription: '此页面显示一些基本信息。',
        
        // Contact page
        contactUs: '联系我们',
        getInTouch: '与我们取得联系',
        contactDescription: '我们很乐意听到您的声音。给我们发送消息，我们会尽快回复。',
        
        // Products page
        ourProducts: '我们的产品',
        exploreProducts: '探索我们的优质产品',
        productDescription: '发现我们广泛的高品质产品系列，专为满足您的需求而设计。',
        
        // Common
        loading: '加载中...'
    }
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        // Check if language preference is stored in localStorage
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && translations[savedLanguage]) {
            setLanguage(savedLanguage);
        }
    }, []);

    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'zh' : 'en';
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{
            language,
            toggleLanguage,
            t
        }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);