import { Router } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const vendorRouter = Router();

// Regex for Vendor ID format: alphanumeric and underscores only, 3 to 20 characters
const VENDOR_ID_REGEX = /^[a-z0-9_]{3,20}$/;

// 1. Signup Route
vendorRouter.post('/signup', async (req, res) => {
    try {
        const { vendorId, password } = req.body;

        if (!vendorId || !password) {
            return res.status(400).json({ error: 'Vendor ID and password are required.' });
        }

        if (!VENDOR_ID_REGEX.test(vendorId)) {
            return res.status(400).json({
                error: 'Invalid Vendor ID format. Must be 3-20 characters, lowercase alphanumeric and underscores only.'
            });
        }

        const existingVendor = await prisma.vendor.findUnique({
            where: { username: vendorId }
        });

        if (existingVendor) {
            return res.status(409).json({ error: 'Vendor ID already exists.' });
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newVendor = await prisma.vendor.create({
            data: {
                username: vendorId,
                passwordHash,
                // Default placeholder values for required fields
                name: vendorId,
                image: '/placeholder-avatar.jpg'
            }
        });

        res.status(201).json({ message: 'Vendor account created successfully.', vendorId: newVendor.id });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// 2. Login Route
vendorRouter.post('/login', async (req, res) => {
    try {
        const { vendorId, password } = req.body;

        if (!vendorId || !password) {
            return res.status(400).json({ error: 'Vendor ID and password are required.' });
        }

        const vendor = await prisma.vendor.findUnique({
            where: { username: vendorId }
        });

        if (!vendor) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, vendor.passwordHash);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        res.status(200).json({
            message: 'Login successful.',
            vendor: {
                id: vendor.id,
                username: vendor.username,
                name: vendor.name,
                ledgerPinHash: vendor.ledgerPinHash
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// 3. Onboarding Route
vendorRouter.post('/onboard', async (req, res) => {
    try {
        const { vendorId, vendorName, instapayAddress, instapayName, pin } = req.body;

        if (!vendorId || !vendorName || !pin) {
            return res.status(400).json({ error: 'Missing required onboarding fields.' });
        }

        const saltRounds = 10;
        const ledgerPinHash = await bcrypt.hash(pin, saltRounds);

        const updatedVendor = await prisma.vendor.update({
            where: { username: vendorId },
            data: {
                name: vendorName,
                instapayAddress,
                instapayName,
                ledgerPinHash
            }
        });

        res.status(200).json({ message: 'Onboarding complete.', vendorId: updatedVendor.id });
    } catch (error) {
        console.error('Onboarding error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});
