const currency = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD'
});

const formatCurrency = value => {
    return currency.format(value);
}

export {formatCurrency};