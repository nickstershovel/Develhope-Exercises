const order = {};
const city = order.customer?.address?.city || 'Unknown';

if (city === "Unknown") {
  console.log('City is required');
}