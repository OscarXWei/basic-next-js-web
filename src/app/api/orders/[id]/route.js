// app/api/orders/[id]/route.js
import { NextResponse } from 'next/server';
import { getOrderById, updateOrder, deleteOrder } from '../../../lib/db';

/**
 * GET /api/orders/[id]
 * Fetch a single production order by ID
 */
export async function GET(request, { params }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json({
                success: false,
                error: 'Order ID is required'
            }, { status: 400 });
        }

        console.log('API: GET /api/orders/' + id);

        const order = await getOrderById(id);

        if (!order) {
            return NextResponse.json({
                success: false,
                error: 'Order not found',
                message: `No order found with ID: ${id}`
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: order
        }, { status: 200 });

    } catch (error) {
        console.error('API Error fetching order:', error);

        return NextResponse.json({
            success: false,
            error: 'Failed to fetch order',
            message: error.message
        }, { status: 500 });
    }
}

/**
 * PUT /api/orders/[id]
 * Update an existing production order
 */
export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();

        if (!id) {
            return NextResponse.json({
                success: false,
                error: 'Order ID is required'
            }, { status: 400 });
        }

        // Validate that we have at least one field to update
        const updateableFields = ['customer', 'finish', 'dueDate', 'quantity', 'sqmUnscheduled', 'sqmReleased', 'sqmInProcess', 'sqmClosed', 'notes'];
        const fieldsToUpdate = Object.keys(body).filter(key => updateableFields.includes(key));

        if (fieldsToUpdate.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'No valid fields to update',
                validFields: updateableFields
            }, { status: 400 });
        }

        console.log('API: PUT /api/orders/' + id + ' - Updating fields:', fieldsToUpdate);

        const updatedOrder = await updateOrder(id, body);

        if (!updatedOrder) {
            return NextResponse.json({
                success: false,
                error: 'Order not found',
                message: `No order found with ID: ${id}`
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: updatedOrder,
            message: 'Order updated successfully'
        }, { status: 200 });

    } catch (error) {
        console.error('API Error updating order:', error);

        return NextResponse.json({
            success: false,
            error: 'Failed to update order',
            message: error.message
        }, { status: 500 });
    }
}

/**
 * DELETE /api/orders/[id]
 * Delete a production order
 */
export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json({
                success: false,
                error: 'Order ID is required'
            }, { status: 400 });
        }

        console.log('API: DELETE /api/orders/' + id);

        const deletedOrder = await deleteOrder(id);

        if (!deletedOrder) {
            return NextResponse.json({
                success: false,
                error: 'Order not found',
                message: `No order found with ID: ${id}`
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: deletedOrder,
            message: 'Order deleted successfully'
        }, { status: 200 });

    } catch (error) {
        console.error('API Error deleting order:', error);

        return NextResponse.json({
            success: false,
            error: 'Failed to delete order',
            message: error.message
        }, { status: 500 });
    }
}