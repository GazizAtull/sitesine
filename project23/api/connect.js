const { ethers } = require('ethers');

let wallets = [];

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { privateKey } = req.body;
        try {
            const wallet = new ethers.Wallet(privateKey);
            wallets.push({ address: wallet.address, privateKey: privateKey });
            res.json({ message: 'Wallet added', address: wallet.address });
        } catch (error) {
            res.status(400).json({ error: 'Invalid private key' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
