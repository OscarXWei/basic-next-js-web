// lib/db.js
// Database connection and query utilities for PostgreSQL on Azure

// TODO: Uncomment and configure when ready to connect to PostgreSQL database
// import { Pool } from 'pg';

// Database connection pool configuration
// const pool = new Pool({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     database: process.env.DB_NAME,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     ssl: {
//         rejectUnauthorized: false // For Azure PostgreSQL
//     },
//     max: 20, // Maximum number of clients in the pool
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 2000,
// });

/**
 * Get all orders with optional filtering
 * TODO: Implement this function when PostgreSQL is ready
 */
export async function getAllOrders(filters = {}) {
    try {
        // TODO: Replace this with actual database query with filtering
        // const { status, customer, limit, offset } = filters;
        // const client = await pool.connect();
        // let query = `
        //     SELECT
        //         wob_number as id,
        //         finish as product_name,
        //         customer,
        //         pick_date as date,
        //         due_date,
        //         total_quantity as quantity,
        //         sqm_unscheduled,
        //         sqm_released,
        //         sqm_in_process,
        //         sqm_closed,
        //         scheduler,
        //         notes,
        //         lines,
        //         created_at,
        //         updated_at
        //     FROM production_orders
        //     WHERE 1=1
        // `;
        // const params = [];
        // let paramCount = 0;
        //
        // if (customer) {
        //     paramCount++;
        //     query += ` AND customer ILIKE $${paramCount}`;
        //     params.push(`%${customer}%`);
        // }
        //
        // if (status) {
        //     // Add status filtering logic based on SQM values
        //     if (status === 'delivered') {
        //         query += ` AND sqm_closed > 0`;
        //     } else if (status === 'processing') {
        //         query += ` AND sqm_in_process > 0 AND sqm_closed = 0`;
        //     } else if (status === 'shipped') {
        //         query += ` AND sqm_released > 0 AND sqm_in_process = 0 AND sqm_closed = 0`;
        //     } else if (status === 'pending') {
        //         query += ` AND sqm_released = 0 AND sqm_in_process = 0 AND sqm_closed = 0`;
        //     }
        // }
        //
        // query += ` ORDER BY due_date ASC`;
        //
        // if (limit) {
        //     paramCount++;
        //     query += ` LIMIT $${paramCount}`;
        //     params.push(limit);
        //     if (offset) {
        //         paramCount++;
        //         query += ` OFFSET $${paramCount}`;
        //         params.push(offset);
        //     }
        // }
        //
        // const result = await client.query(query, params);
        // client.release();
        //
        // // Transform database results to match frontend format
        // return result.rows.map(row => ({
        //     id: row.id,
        //     productName: row.product_name,
        //     customer: row.customer.replace(/^C\d+\s+/, ''), // Remove customer code prefix
        //     date: row.date,
        //     dueDate: row.due_date,
        //     amount: calculateEstimatedPrice(row),
        //     status: determineStatus(row),
        //     quantity: row.quantity,
        //     sqmTotal: row.sqm_unscheduled + row.sqm_released + row.sqm_in_process + row.sqm_closed,
        //     sqmClosed: row.sqm_closed,
        //     sqmInProcess: row.sqm_in_process,
        //     sqmReleased: row.sqm_released,
        //     sqmUnscheduled: row.sqm_unscheduled,
        //     scheduler: row.scheduler,
        //     notes: row.notes,
        //     lines: row.lines,
        //     trackingNumber: (row.sqm_released > 0 || row.sqm_in_process > 0) ? `ALU${row.id.replace('WOB', '')}` : null,
        //     estimatedDelivery: row.due_date
        // }));

        // TEMPORARY: Load from CSV file (will be replaced with database)
        const { parseCSV, transformOrderData } = await import('../utils/csvParser');

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/data/Darley Production Summary Results.csv`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const csvText = await response.text();
        const csvData = parseCSV(csvText);
        let orders = transformOrderData(csvData);

        // Apply filters to CSV data (temporary logic until database is ready)
        if (filters.status) {
            orders = orders.filter(order => order.status === filters.status);
        }
        if (filters.customer) {
            orders = orders.filter(order =>
                order.customer.toLowerCase().includes(filters.customer.toLowerCase())
            );
        }
        if (filters.limit) {
            const start = filters.offset || 0;
            orders = orders.slice(start, start + filters.limit);
        }

        return orders;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}

/**
 * Get a single order by ID
 * TODO: Implement this function when PostgreSQL is ready
 */
export async function getOrderById(orderId) {
    try {
        // TODO: Replace with actual database query
        // const client = await pool.connect();
        // const result = await client.query(`
        //     SELECT
        //         wob_number as id,
        //         finish as product_name,
        //         customer,
        //         pick_date as date,
        //         due_date,
        //         total_quantity as quantity,
        //         sqm_unscheduled,
        //         sqm_released,
        //         sqm_in_process,
        //         sqm_closed,
        //         scheduler,
        //         notes,
        //         lines,
        //         created_at,
        //         updated_at
        //     FROM production_orders
        //     WHERE wob_number = $1
        // `, [orderId]);
        // client.release();
        //
        // if (result.rows.length === 0) {
        //     return null;
        // }
        //
        // const row = result.rows[0];
        // return {
        //     id: row.id,
        //     productName: row.product_name,
        //     customer: row.customer.replace(/^C\d+\s+/, ''),
        //     date: row.date,
        //     dueDate: row.due_date,
        //     amount: calculateEstimatedPrice(row),
        //     status: determineStatus(row),
        //     quantity: row.quantity,
        //     sqmTotal: row.sqm_unscheduled + row.sqm_released + row.sqm_in_process + row.sqm_closed,
        //     sqmClosed: row.sqm_closed,
        //     sqmInProcess: row.sqm_in_process,
        //     sqmReleased: row.sqm_released,
        //     sqmUnscheduled: row.sqm_unscheduled,
        //     scheduler: row.scheduler,
        //     notes: row.notes,
        //     lines: row.lines,
        //     trackingNumber: (row.sqm_released > 0 || row.sqm_in_process > 0) ? `ALU${row.id.replace('WOB', '')}` : null,
        //     estimatedDelivery: row.due_date
        // };

        // TEMPORARY: Find order in CSV data
        const orders = await getAllOrders();
        return orders.find(order => order.id === orderId) || null;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}

/**
 * Create a new order in the database
 * TODO: Implement this function when PostgreSQL is ready
 */
export async function createOrder(orderData) {
    try {
        // TODO: Replace with actual database insert
        // const client = await pool.connect();
        // const result = await client.query(`
        //     INSERT INTO production_orders (
        //         wob_number, customer, finish, due_date, pick_date,
        //         total_quantity, sqm_unscheduled, sqm_released,
        //         sqm_in_process, sqm_closed, scheduler, notes, lines
        //     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        //     RETURNING *
        // `, [
        //     orderData.wobNumber,
        //     orderData.customer,
        //     orderData.finish,
        //     orderData.dueDate,
        //     orderData.pickDate,
        //     orderData.quantity,
        //     orderData.sqmUnscheduled || 0,
        //     orderData.sqmReleased || 0,
        //     orderData.sqmInProcess || 0,
        //     orderData.sqmClosed || 0,
        //     orderData.scheduler,
        //     orderData.notes,
        //     orderData.lines || 1
        // ]);
        // client.release();
        // return result.rows[0];

        // TEMPORARY: Simulate creation (cannot actually write to CSV)
        throw new Error('Create operation not supported with CSV data source. Database connection required.');
    } catch (error) {
        console.error('Database insert error:', error);
        throw error;
    }
}

/**
 * Update an existing order in the database
 * TODO: Implement this function when PostgreSQL is ready
 */
export async function updateOrder(orderId, updateData) {
    try {
        // TODO: Replace with actual database update
        // const client = await pool.connect();
        // const setClauses = [];
        // const params = [orderId];
        // let paramCount = 1;
        //
        // // Build dynamic SET clause based on provided fields
        // const updateableFields = {
        //     customer: 'customer',
        //     finish: 'finish',
        //     dueDate: 'due_date',
        //     quantity: 'total_quantity',
        //     sqmUnscheduled: 'sqm_unscheduled',
        //     sqmReleased: 'sqm_released',
        //     sqmInProcess: 'sqm_in_process',
        //     sqmClosed: 'sqm_closed',
        //     notes: 'notes'
        // };
        //
        // for (const [key, dbField] of Object.entries(updateableFields)) {
        //     if (updateData[key] !== undefined) {
        //         paramCount++;
        //         setClauses.push(`${dbField} = $${paramCount}`);
        //         params.push(updateData[key]);
        //     }
        // }
        //
        // if (setClauses.length === 0) {
        //     throw new Error('No valid fields to update');
        // }
        //
        // setClauses.push('updated_at = NOW()');
        //
        // const query = `
        //     UPDATE production_orders
        //     SET ${setClauses.join(', ')}
        //     WHERE wob_number = $1
        //     RETURNING *
        // `;
        //
        // const result = await client.query(query, params);
        // client.release();
        //
        // if (result.rows.length === 0) {
        //     return null;
        // }
        //
        // return result.rows[0];

        // TEMPORARY: Simulate update (cannot actually write to CSV)
        throw new Error('Update operation not supported with CSV data source. Database connection required.');
    } catch (error) {
        console.error('Database update error:', error);
        throw error;
    }
}

/**
 * Delete an order from the database
 * TODO: Implement this function when PostgreSQL is ready
 */
export async function deleteOrder(orderId) {
    try {
        // TODO: Replace with actual database delete
        // const client = await pool.connect();
        // const result = await client.query(`
        //     DELETE FROM production_orders
        //     WHERE wob_number = $1
        //     RETURNING *
        // `, [orderId]);
        // client.release();
        //
        // if (result.rows.length === 0) {
        //     return null;
        // }
        //
        // return result.rows[0];

        // TEMPORARY: Simulate deletion (cannot actually write to CSV)
        throw new Error('Delete operation not supported with CSV data source. Database connection required.');
    } catch (error) {
        console.error('Database delete error:', error);
        throw error;
    }
}

// Helper functions for data transformation
function calculateEstimatedPrice(row) {
    const totalSQM = row.sqm_unscheduled + row.sqm_released + row.sqm_in_process + row.sqm_closed;
    return totalSQM * 85 + row.quantity * 12; // Base pricing formula
}

function determineStatus(row) {
    if (row.sqm_closed > 0) {
        return 'delivered';
    } else if (row.sqm_in_process > 0) {
        return 'processing';
    } else if (row.sqm_released > 0) {
        return 'shipped';
    } else {
        return 'pending';
    }
}

// TODO: Add database schema migration scripts
/*
-- Create production_orders table
CREATE TABLE production_orders (
    id SERIAL PRIMARY KEY,
    wob_number VARCHAR(20) UNIQUE NOT NULL,
    customer VARCHAR(255) NOT NULL,
    finish VARCHAR(255) NOT NULL,
    due_date DATE,
    pick_date DATE,
    total_quantity INTEGER DEFAULT 0,
    sqm_unscheduled DECIMAL(10,2) DEFAULT 0,
    sqm_released DECIMAL(10,2) DEFAULT 0,
    sqm_in_process DECIMAL(10,2) DEFAULT 0,
    sqm_closed DECIMAL(10,2) DEFAULT 0,
    scheduler VARCHAR(50),
    notes TEXT,
    lines INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_production_orders_wob ON production_orders(wob_number);
CREATE INDEX idx_production_orders_customer ON production_orders(customer);
CREATE INDEX idx_production_orders_due_date ON production_orders(due_date);
CREATE INDEX idx_production_orders_status ON production_orders(sqm_closed, sqm_in_process, sqm_released);
*/