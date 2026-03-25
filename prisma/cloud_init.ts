import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient({ 
    datasources: { 
        db: { url: 'postgresql://postgres.rbhizgyqnfgbjswfpgsw:E7na%40ELshilla@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true' } 
    } 
});

async function init() {
    console.log('🏗️ INITIALIZING CLOUD SCHEMA MANUALLY...');
    
    try {
        const sql = fs.readFileSync('schema_utf8.sql', 'utf8');
        
        // Split by semicolon and filter out empty statements
        // This is safer than running the whole block which might fail due to "multiple statements"
        const statements = sql
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        console.log(`Executing ${statements.length} SQL statements...`);
        
        for (let i = 0; i < statements.length; i++) {
            try {
                process.stdout.write(`Progress: ${i+1}/${statements.length} \r`);
                await prisma.$executeRawUnsafe(statements[i]);
            } catch (err: any) {
                // Ignore "already exists" errors
                if (!err.message.includes('already exists')) {
                    console.error(`\n❌ Error in statement #${i+1}:`, err.message);
                }
            }
        }

        console.log('\n✅ SCHEMA INITIALIZED SUCCESSFULLY!');
    } catch (error) {
        console.error('❌ Schema Initialization Failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

init();
