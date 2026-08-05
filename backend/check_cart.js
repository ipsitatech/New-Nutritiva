const mysql = require('mysql2/promise');

async function run() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nutritiva'
  });

  const [cart] = await connection.execute('SELECT * FROM cart');
  console.log('Cart Items:', cart);

  const [products] = await connection.execute('SELECT product_id, name FROM products');
  console.log('Products:', products);

  await connection.end();
}

run().catch(console.error);
