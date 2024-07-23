function currency_converter(value) {
    return value.toLocaleString("id-ID", {style:"currency", currency:"IDR"});
}

module.exports = { currency_converter }