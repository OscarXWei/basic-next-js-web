// app/api/orders/route.js
import { NextResponse } from 'next/server';
import { getAllOrders, createOrder } from '../../lib/db';

/**
 * GET /api/orders
 * Fetch all production orders with optional filtering
 * Query params: status, customer, limit, offset
 */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const customer = searchParams.get('customer');
        const limit = parseInt(searchParams.get('limit')) || null;
        const offset = parseInt(searchParams.get('offset')) || 0;

        console.log('API: GET /api/orders - Fetching orders with filters:', { status, customer, limit, offset });

        const orders = await getAllOrders({ status, customer, limit, offset });

        return NextResponse.json({
            success: true,
            data: orders,
            count: orders.length,
            pagination: limit ? {
                limit,
                offset,
                total: orders.length
            } : null
        }, { status: 200 });

    } catch (error) {
        console.error('API Error fetching orders:', error);

        return NextResponse.json({
            success: false,
            error: 'Failed to fetch orders',
            message: error.message
        }, { status: 500 });
    }
}

/**
 * POST /api/orders
 * Create a new production order
 */
export async function POST(request) {
    try {
        const body = await request.json();

        // Validate required fields
        const requiredFields = ['wobNumber', 'customer', 'finish', 'dueDate', 'quantity'];
        const missingFields = requiredFields.filter(field => !body[field]);

        if (missingFields.length > 0) {
            return NextResponse.json({
                success: false,
                error: 'Missing required fields',
                missingFields
            }, { status: 400 });
        }

        console.log('API: POST /api/orders - Creating new order:', body.wobNumber);

        const newOrder = await createOrder(body);

        return NextResponse.json({
            success: true,
            data: newOrder,
            message: 'Order created successfully'
        }, { status: 201 });

    } catch (error) {
        console.error('API Error creating order:', error);

        if (error.message.includes('already exists')) {
            return NextResponse.json({
                success: false,
                error: 'Order already exists',
                message: error.message
            }, { status: 409 });
        }

        return NextResponse.json({
            success: false,
            error: 'Failed to create order',
            message: error.message
        }, { status: 500 });
    }
}