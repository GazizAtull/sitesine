const { ethers } = require('ethers');

let wallets = [];

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { fromAddress, toAddress, amount } = req.body;
        const wallet = wallets.find(w => w.address === fromAddress);

        if (!wallet) {
            return res.status(404).json({ error: 'Wallet not found' });
        }

        try {
            const provider = ethers.getDefaultProvider(); // Используйте подходящий провайдер
            const walletInstance = new ethers.Wallet(wallet.privateKey, provider);
            const tx = await walletInstance.sendTransaction({
                to: toAddress,
                value: ethers.utils.parseEther(amount)
            });
            await tx.wait();
            res.json({ message: 'Transaction sent', txHash: tx.hash });
        } catch (error) {
            res.status(400).json({ error: 'Transaction failed', details: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
