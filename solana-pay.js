document.addEventListener("DOMContentLoaded", function () {
    console.log("Page is ready");

    const button = document.getElementById("button1"); // Adjust to your button's actual ID
    if (button) {
        button.addEventListener("click", async () => {
            console.log("Button was clicked!");

            if (typeof window !== "undefined" && window.solana && window.solana.isPhantom) {
                try {
                    await window.solana.connect();
                    console.log("Phantom Wallet connected!");

                    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'));
                    const recipient = new solanaWeb3.PublicKey('7JPfkCfAAKLzdMGVLkU26AanKSr9V4kwRzjerWagE2MK'); // Replace with your wallet address
                    const amount = 0.1 * solanaWeb3.LAMPORTS_PER_SOL; // Amount in lamports

                    const transaction = new solanaWeb3.Transaction().add(
                        solanaWeb3.SystemProgram.transfer({
                            fromPubkey: window.solana.publicKey,
                            toPubkey: recipient,
                            lamports: amount,
                        })
                    );

                    const signedTransaction = await window.solana.signTransaction(transaction);
                    const signature = await connection.sendRawTransaction(signedTransaction.serialize());
                    await connection.confirmTransaction(signature);

                    console.log("Transaction successful!");
                } catch (err) {
                    console.error("Transaction failed:", err);
                }
            } else {
                console.log("Phantom wallet not found. Please install it.");
            }
        });
    } else {
        console.log("Button not found on the page.");
    }
});
