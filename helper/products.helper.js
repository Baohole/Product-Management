module.exports.newPrice = (data) => {
    data.forEach(item => {
        const newPrice = item.price * (1 - item.discountPercentage / 100);
        item.newPrice = Math.round((newPrice + Number.EPSILON) * 100 ) / 100
    });
}