import { PrismaClient } from '@prisma/client';
import fs from 'fs';
try {
    new PrismaClient();
} catch (e) {
    fs.writeFileSync('err.log', e.message);
}
