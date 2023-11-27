//  script.js code with slight modifications for displaying cryptocurrency payment

async function generateInvoice() {
    const clientName = document.getElementById('clientName').value;
    const amount = document.getElementById('amount').value;
    const cryptoPayment = document.getElementById('cryptoPayment').value;

    const response = await fetch('/api/generate-invoice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            clientName,
            amount,
            cryptoPayment
        })
    });

    const result = await response.json();

    if (result.success) {
        const invoiceId = result.invoiceId;
        displayInvoice(invoiceId);
    } else {
        alert('Failed to generate invoice. Please try again.');
    }
}

async function displayInvoice(invoiceId) {
    const response = await fetch(`/api/get-invoice/${invoiceId}`);
    const result = await response.json();

    if (result.success) {
        const { clientName, amount, cryptoPayment, paid } = result.invoice;

        document.getElementById('displayClientName').textContent = clientName;
        document.getElementById('displayAmount').textContent = amount;
        document.getElementById('displayCryptoPayment').textContent = cryptoPayment;
        document.getElementById('paymentStatus').textContent = paid ? 'Paid' : 'Pending';

        document.getElementById('invoiceDisplay').classList.remove('hidden');
    } else {
        alert('Failed to retrieve invoice details. Please try again.');
    }
}
