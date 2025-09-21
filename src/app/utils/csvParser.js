export function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = parseCSVLine(lines[0]);

    const data = [];
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length >= headers.length - 1) { // Allow for some flexibility in column count
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index] ? values[index].trim() : '';
            });
            data.push(row);
        }
    }

    return data;
}

function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"' && (i === 0 || line[i-1] === ',' || line[i-1] === '"')) {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }

    result.push(current.trim());
    return result;
}

export function transformOrderData(csvData) {
    return csvData.map((row, index) => {
        const woNumber = row['WOB#'] || `WOB${String(index + 1).padStart(5, '0')}`;
        const customer = row['Customer'] || 'Unknown Customer';
        const finish = row['Finish'] || 'Standard Finish';
        const totalQuantity = parseInt(row['Total Quantity']) || 0;
        const sqmClosed = parseFloat(row['SQM Closed']) || 0;
        const sqmInProcess = parseFloat(row['SQM In Process']) || 0;
        const sqmReleased = parseFloat(row['SQM Released']) || 0;
        const sqmUnscheduled = parseFloat(row['SQM Unscheduled']) || 0;

        // Determine status based on SQM values
        let status = 'pending';
        if (sqmClosed > 0) {
            status = 'delivered';
        } else if (sqmInProcess > 0) {
            status = 'processing';
        } else if (sqmReleased > 0) {
            status = 'shipped';
        }

        // Calculate estimated price based on SQM and quantity
        const totalSQM = sqmClosed + sqmInProcess + sqmReleased + sqmUnscheduled;
        const estimatedPrice = totalSQM * 85 + totalQuantity * 12; // Base pricing formula

        return {
            id: woNumber,
            productName: finish,
            customer: customer.replace(/^C\d+\s+/, ''), // Remove customer code prefix
            date: row['Pick Date'] || row['Due Date'] || new Date().toISOString().split('T')[0],
            dueDate: row['Due Date'] || '',
            amount: estimatedPrice,
            status: status,
            quantity: totalQuantity,
            sqmTotal: totalSQM,
            sqmClosed: sqmClosed,
            sqmInProcess: sqmInProcess,
            sqmReleased: sqmReleased,
            sqmUnscheduled: sqmUnscheduled,
            scheduler: row['Scheduler'] || '',
            notes: row['Notes to  Warehouse'] || '',
            lines: parseInt(row['Lines']) || 1,
            trackingNumber: sqmReleased > 0 || sqmInProcess > 0 ? `ALU${woNumber.replace('WOB', '')}` : null,
            estimatedDelivery: row['Due Date'] || null
        };
    });
}

export async function loadOrderData() {
    try {
        console.log('Loading CSV data...');
        const response = await fetch('/data/Darley Production Summary Results.csv');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const csvText = await response.text();
        console.log('CSV loaded, length:', csvText.length);

        const csvData = parseCSV(csvText);
        console.log('CSV parsed, rows:', csvData.length);

        const transformedData = transformOrderData(csvData);
        console.log('Data transformed, orders:', transformedData.length);

        return transformedData;
    } catch (error) {
        console.error('Error loading order data:', error);
        // Return some mock data as fallback
        return [{
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
        }];
    }
}