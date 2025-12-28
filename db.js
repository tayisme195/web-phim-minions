const mysql = require('mysql2');

// Sử dụng Connection Pool để duy trì kết nối ổn định
const db = mysql.createPool({
    host: 'mysql-25be5d67-webphim.i.aivencloud.com', // Đã sửa theo ảnh mới nhất
    user: 'avnadmin', 
    password: 'AVNS_spBVMa1m1lQZ1bLlWqf', 
    database: 'defaultdb',
    port: 13572, // Đã sửa theo ảnh mới nhất của bạn
    ssl: {
        rejectUnauthorized: false
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Kiểm tra kết nối
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Lỗi kết nối Database:', err.message);
    } else {
        console.log('✅ Đã kết nối thành công tới Aiven!');
        connection.release();
    }
});

module.exports = db;
