const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'mysql-25be5d67-webphim.i.aivencloud.com', //
    user: 'avnadmin', 
    password: 'AVNS_spBVMa1m1lQZ1bLlWqf', 
    database: 'defaultdb',
    port: 13572, //
    ssl: { rejectUnauthorized: false },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// TỰ ĐỘNG TẠO BẢNG KHI KẾT NỐI
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Lỗi kết nối:', err.message);
    } else {
        console.log('✅ Đã kết nối Aiven!');
        const createTable = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL
            );`;
        connection.query(createTable, (err) => {
            if (err) console.error('❌ Lỗi tạo bảng:', err.message);
            else console.log('✅ Bảng users đã sẵn sàng!');
            connection.release();
        });
    }
});

module.exports = db;
