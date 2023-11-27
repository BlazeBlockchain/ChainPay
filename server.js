const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Store generated invoices in-memory (for demo purposes)
const invoices = [];

app.post('/api/generate-invoice', (req, res) => {
    const { clientName, amount, cryptoPayment } = req.body;

    // For demo purposes, generate a unique invoice ID
    const invoiceId = invoices.length + 1;

    // Store the invoice in-memory
    invoices.push({
        invoiceId,
        clientName,
        amount,
        cryptoPayment,
        paid: false
    });

    res.json({
        success: true,
        invoiceId
    });
});

app.get('/api/get-invoice/:id', (req, res) => {
    const invoiceId = parseInt(req.params.id);

    const invoice = invoices.find(i => i.invoiceId === invoiceId);

    if (invoice) {
        res.json({
            success: true,
            invoice
        });
    } else {
        res.json({
            success: false,
            message: 'Invoice not found'
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
