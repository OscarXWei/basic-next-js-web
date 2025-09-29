# Database Setup Instructions

## PostgreSQL Dependencies

When ready to connect to the PostgreSQL database, install the required dependency:

```bash
npm install pg
npm install -D @types/pg  # If using TypeScript
```

## Database Connection Setup

1. **Copy environment file:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Update `.env.local` with your Azure PostgreSQL credentials:**
   - Get the connection details from your Azure PostgreSQL instance
   - If connecting through a VM, ensure the VM can access the database
   - Update the connection string components accordingly

3. **Uncomment database code:**
   - In `src/app/lib/db.js`: Uncomment the Pool import and connection code
   - In `src/app/api/orders/route.js`: Replace CSV loading with database calls

## Database Schema

The expected PostgreSQL table structure is documented in `src/app/lib/db.js`. Create the table using the provided SQL schema.

## Azure PostgreSQL Connection Notes

- SSL is typically required for Azure PostgreSQL
- You may need to configure firewall rules to allow connections
- If using a VM as a jump host, ensure proper SSH tunneling is set up

## Migration Steps

1. **Current State**: Application reads from CSV files
2. **Target State**: Application reads from PostgreSQL database
3. **Migration Process**:
   - Set up PostgreSQL database and table
   - Import CSV data into PostgreSQL
   - Update environment variables
   - Uncomment database connection code
   - Comment out CSV reading code
   - Test the connection

## Rollback Plan

If database connection fails:
- The API will automatically fall back to CSV data
- Frontend will continue to function with fallback data
- Check logs for specific connection errors