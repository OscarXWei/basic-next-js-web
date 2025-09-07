"use client";

import { useLanguage } from '../../contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductDetail({ params }) {
    const { t, language } = useLanguage();

    // Product data with images and descriptions
    const products = {
        "1": {
            name: "iPhone 16 Pro",
            price: language === 'zh' ? "¥7999" : "$999",
            image: "/images/iphone16pro.jpg",
            description: {
                en: "The most advanced iPhone ever with A18 Pro chip, ProRAW photography, and 5G connectivity. Experience breakthrough performance and stunning camera capabilities.",
                zh: "史上最先进的iPhone，搭载A18 Pro芯片、ProRAW摄影功能和5G连接。体验突破性的性能和惊艳的拍摄能力。"
            },
            features: {
                en: [
                    "A18 Pro chip with 6-core CPU",
                    "Pro camera system with 48MP Main",
                    "6.3-inch Super Retina XDR display",
                    "5G connectivity",
                    "iOS 18 with advanced AI features",
                    "Up to 27 hours battery life"
                ],
                zh: [
                    "A18 Pro芯片，6核CPU",
                    "专业相机系统，4800万像素主摄",
                    "6.3英寸超视网膜XDR显示屏",
                    "5G网络连接",
                    "iOS 18，配备先进AI功能",
                    "最长27小时续航时间"
                ]
            },
            specs: {
                en: [
                    { label: "Display", value: "6.3-inch OLED" },
                    { label: "Chip", value: "A18 Pro" },
                    { label: "Camera", value: "48MP + 12MP + 12MP" },
                    { label: "Storage", value: "128GB / 256GB / 512GB / 1TB" },
                    { label: "Colors", value: "Black Titanium, White Titanium, Natural Titanium, Desert Titanium" }
                ],
                zh: [
                    { label: "显示屏", value: "6.3英寸OLED" },
                    { label: "芯片", value: "A18 Pro" },
                    { label: "相机", value: "4800万+1200万+1200万像素" },
                    { label: "存储", value: "128GB / 256GB / 512GB / 1TB" },
                    { label: "颜色", value: "黑色钛金属、白色钛金属、原色钛金属、沙漠色钛金属" }
                ]
            }
        },
        "2": {
            name: "MacBook Pro",
            price: language === 'zh' ? "¥14999" : "$1999",
            image: "/images/macbookpro.jpg",
            description: {
                en: "Supercharged by M3 Pro and M3 Max chips. Built for Apple Intelligence. Up to 22 hours of battery life. Liquid Retina XDR display.",
                zh: "M3 Pro和M3 Max芯片强力驱动。为Apple Intelligence打造。最长22小时续航。Liquid Retina XDR显示屏。"
            },
            features: {
                en: [
                    "M3 Pro or M3 Max chip",
                    "14-inch or 16-inch Liquid Retina XDR display",
                    "Up to 128GB unified memory",
                    "Up to 8TB SSD storage",
                    "Advanced camera and audio",
                    "Extensive connectivity including Thunderbolt 4"
                ],
                zh: [
                    "M3 Pro或M3 Max芯片",
                    "14英寸或16英寸Liquid Retina XDR显示屏",
                    "最高128GB统一内存",
                    "最高8TB SSD存储",
                    "先进的摄像头和音频系统",
                    "丰富连接选项，包括雷雳4"
                ]
            },
            specs: {
                en: [
                    { label: "Display", value: "14-inch or 16-inch Liquid Retina XDR" },
                    { label: "Chip", value: "M3 Pro or M3 Max" },
                    { label: "Memory", value: "18GB to 128GB unified memory" },
                    { label: "Storage", value: "512GB to 8TB SSD" },
                    { label: "Battery", value: "Up to 22 hours video playback" }
                ],
                zh: [
                    { label: "显示屏", value: "14英寸或16英寸Liquid Retina XDR" },
                    { label: "芯片", value: "M3 Pro或M3 Max" },
                    { label: "内存", value: "18GB至128GB统一内存" },
                    { label: "存储", value: "512GB至8TB SSD" },
                    { label: "电池", value: "最长22小时视频播放" }
                ]
            }
        },
        "3": {
            name: "Apple Watch",
            price: language === 'zh' ? "¥2999" : "$399",
            image: "/images/applewatch.jpg",
            description: {
                en: "Your essential companion for a healthy life. Advanced health features, fitness tracking, and seamless connectivity with your iPhone.",
                zh: "健康生活的必备伴侣。先进的健康功能、健身跟踪，与iPhone无缝连接。"
            },
            features: {
                en: [
                    "Always-On Retina display",
                    "Blood oxygen and ECG monitoring",
                    "Advanced workout metrics",
                    "Water resistant to 50 meters",
                    "Family Setup available",
                    "Crash Detection and Fall Detection"
                ],
                zh: [
                    "全天候视网膜显示屏",
                    "血氧和心电图监测",
                    "先进的运动指标",
                    "50米防水",
                    "支持家人共享设置",
                    "车祸检测和跌倒检测"
                ]
            },
            specs: {
                en: [
                    { label: "Display", value: "Always-On Retina LTPO OLED" },
                    { label: "Sizes", value: "41mm or 45mm" },
                    { label: "Health", value: "Blood oxygen, ECG, heart rate" },
                    { label: "Fitness", value: "Built-in GPS, cellular option" },
                    { label: "Battery", value: "Up to 18 hours all-day battery" }
                ],
                zh: [
                    { label: "显示屏", value: "全天候视网膜LTPO OLED" },
                    { label: "尺寸", value: "41毫米或45毫米" },
                    { label: "健康", value: "血氧、心电图、心率监测" },
                    { label: "健身", value: "内置GPS，可选蜂窝网络" },
                    { label: "电池", value: "最长18小时全天候续航" }
                ]
            }
        },
        "4": {
            name: "iPad Pro",
            price: language === 'zh' ? "¥6799" : "$899",
            image: "/images/ipadpro.jpg",
            description: {
                en: "The ultimate iPad experience with M4 chip. Stunning Ultra Retina XDR display and all-day battery life. Compatible with Apple Pencil Pro.",
                zh: "M4芯片带来终极iPad体验。令人惊艳的Ultra Retina XDR显示屏，全天续航。兼容Apple Pencil Pro。"
            },
            features: {
                en: [
                    "M4 chip with next-level performance",
                    "Ultra Retina XDR display with nano-texture",
                    "12MP Wide and 10MP Ultra Wide cameras",
                    "Thunderbolt / USB 4 connector",
                    "Apple Pencil Pro compatibility",
                    "Magic Keyboard support"
                ],
                zh: [
                    "M4芯片，带来下一代性能",
                    "Ultra Retina XDR显示屏，配备纳米纹理玻璃",
                    "1200万像素广角和1000万像素超广角摄像头",
                    "雷雳/USB 4连接器",
                    "兼容Apple Pencil Pro",
                    "支持妙控键盘"
                ]
            },
            specs: {
                en: [
                    { label: "Display", value: "11-inch or 13-inch Ultra Retina XDR" },
                    { label: "Chip", value: "M4 with 10-core CPU" },
                    { label: "Storage", value: "256GB to 2TB" },
                    { label: "Camera", value: "12MP Wide, 10MP Ultra Wide, LiDAR" },
                    { label: "Battery", value: "Up to 10 hours video playback" }
                ],
                zh: [
                    { label: "显示屏", value: "11英寸或13英寸Ultra Retina XDR" },
                    { label: "芯片", value: "M4芯片，10核CPU" },
                    { label: "存储", value: "256GB至2TB" },
                    { label: "摄像头", value: "1200万广角、1000万超广角、激光雷达" },
                    { label: "电池", value: "最长10小时视频播放" }
                ]
            }
        },
        "5": {
            name: "AirPods Pro",
            price: language === 'zh' ? "¥1899" : "$249",
            image: "/images/airpodspro.jpg",
            description: {
                en: "Immersive sound with Adaptive Audio. Active Noise Cancellation and Transparency mode. Personalized Spatial Audio with dynamic head tracking.",
                zh: "自适应音频带来沉浸式声音体验。主动降噪和通透模式。个性化空间音频，支持动态头部追踪。"
            },
            features: {
                en: [
                    "Active Noise Cancellation",
                    "Adaptive Audio and Transparency mode",
                    "Personalized Spatial Audio",
                    "H2 chip for advanced audio processing",
                    "Up to 6 hours listening time",
                    "MagSafe and wireless charging case"
                ],
                zh: [
                    "主动降噪功能",
                    "自适应音频和通透模式",
                    "个性化空间音频",
                    "H2芯片，先进音频处理",
                    "最长6小时聆听时间",
                    "MagSafe和无线充电盒"
                ]
            },
            specs: {
                en: [
                    { label: "Chip", value: "Apple H2 headphone chip" },
                    { label: "Audio", value: "Adaptive Audio, Active Noise Cancellation" },
                    { label: "Battery", value: "Up to 6 hours (30 hours with case)" },
                    { label: "Charging", value: "Lightning, MagSafe, Wireless" },
                    { label: "Water Resistance", value: "IPX4 rated" }
                ],
                zh: [
                    { label: "芯片", value: "Apple H2耳机芯片" },
                    { label: "音频", value: "自适应音频、主动降噪" },
                    { label: "电池", value: "最长6小时（配充电盒最长30小时）" },
                    { label: "充电", value: "闪电接口、MagSafe、无线充电" },
                    { label: "防水", value: "IPX4级别" }
                ]
            }
        },
        "6": {
            name: "HomePod",
            price: language === 'zh' ? "¥2299" : "$299",
            image: "/images/homepod.jpg",
            description: {
                en: "Room-filling sound with computational audio. Works seamlessly with Apple Music, Siri, and your smart home. Privacy built in.",
                zh: "计算音频技术带来充满房间的音效。与Apple Music、Siri和智能家居无缝配合。内置隐私保护。"
            },
            features: {
                en: [
                    "Room-filling sound with computational audio",
                    "Siri built in for voice control",
                    "Works with Apple Music and AirPlay",
                    "Smart home hub with Matter support",
                    "Privacy and security built in",
                    "Seamless handoff from iPhone"
                ],
                zh: [
                    "计算音频技术，房间环绕音效",
                    "内置Siri语音控制",
                    "支持Apple Music和AirPlay",
                    "智能家居中枢，支持Matter",
                    "内置隐私和安全保护",
                    "与iPhone无缝切换"
                ]
            },
            specs: {
                en: [
                    { label: "Audio", value: "High-excursion woofer, array of tweeters" },
                    { label: "Chip", value: "S7 chip" },
                    { label: "Voice Control", value: "Siri built in" },
                    { label: "Connectivity", value: "Wi-Fi 6, Bluetooth 5.0, Thread" },
                    { label: "Smart Home", value: "HomeKit hub with Matter support" }
                ],
                zh: [
                    { label: "音频", value: "高偏移低音单元，高音扬声器阵列" },
                    { label: "芯片", value: "S7芯片" },
                    { label: "语音控制", value: "内置Siri" },
                    { label: "连接", value: "Wi-Fi 6、蓝牙5.0、Thread" },
                    { label: "智能家居", value: "HomeKit中枢，支持Matter" }
                ]
            }
        }
    };

    const product = products[params.id];

    if (!product) {
        return (
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        {language === 'zh' ? '产品未找到' : 'Product Not Found'}
                    </h1>
                    <Link href="/products" className="text-blue-600 hover:text-blue-800">
                        {language === 'zh' ? '返回产品页面' : 'Back to Products'}
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav className="mb-8">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Link href="/products" className="hover:text-blue-600">
                        {t('products')}
                    </Link>
                    <span>›</span>
                    <span className="text-gray-800">{product.name}</span>
                </div>
            </nav>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Product Header */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                    {/* Product Image */}
                    <div className="flex items-center justify-center bg-gray-50 rounded-lg p-8">
                        <div className="relative w-full h-96">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain rounded-lg"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                            <p className="text-3xl font-semibold text-blue-600">{product.price}</p>
                        </div>

                        <p className="text-lg text-gray-700 leading-relaxed">
                            {product.description[language]}
                        </p>

                        {/* Key Features */}
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                {language === 'zh' ? '主要特性' : 'Key Features'}
                            </h3>
                            <ul className="space-y-2">
                                {product.features[language].map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-blue-500 mr-2">✓</span>
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button className="flex-1 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                {language === 'zh' ? '立即购买' : 'Buy Now'}
                            </button>
                            <button className="flex-1 border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 transition-colors">
                                {language === 'zh' ? '加入购物车' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Technical Specifications */}
                <div className="border-t border-gray-200 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        {language === 'zh' ? '技术规格' : 'Technical Specifications'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {product.specs[language].map((spec, index) => (
                            <div key={index} className="border-b border-gray-100 pb-4">
                                <dt className="font-semibold text-gray-900 mb-2">{spec.label}</dt>
                                <dd className="text-gray-700">{spec.value}</dd>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Additional Info */}
                <div className="border-t border-gray-200 bg-gray-50 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-3xl mb-3">🚚</div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                {language === 'zh' ? '免费送货' : 'Free Shipping'}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {language === 'zh' ? '订单满¥599免费送货' : 'Free shipping on orders over $75'}
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-3">↩️</div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                {language === 'zh' ? '14天退货' : '14-Day Returns'}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {language === 'zh' ? '14天无理由退货' : 'Easy returns within 14 days'}
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-3">🛡️</div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                {language === 'zh' ? '官方保修' : 'Official Warranty'}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {language === 'zh' ? '1年官方保修服务' : '1-year official warranty'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
