const mysql = require('mysql2');

// Sử dụng Connection Pool để tránh lỗi "Connection is in closed state"
const db = mysql.createPool({
    host: 'mysql-25be5d67-tayhao2009-db97.l.aivencloud.com', //
    user: 'avnadmin', 
    password: 'AVNS_spBVMa1m1lQZ1bLlWqf', // Mật khẩu bạn vừa cung cấp
    database: 'defaultdb',
    port: 11218, // Cổng chính xác từ ảnh Aiven của bạn
    ssl: {
        rejectUnauthorized: false // Bắt buộc để kết nối từ Render
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Kiểm tra kết nối
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Lỗi kết nối Database Aiven:', err.message);
    } else {
        console.log('✅ Đã kết nối Database Aiven thành công!');
        connection.release();
    }
});

module.exports = db;
