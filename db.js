const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'web_phim' 
});

connection.connect((err) => {
    if (err) {
        console.error('❌ Lỗi kết nối MySQL:', err.message);
    } else {
        console.log('✅ Đã kết nối với MySQL (web_phim)!');
    }
});

module.exports = connection; // Thiếu dòng này server.js sẽ bị lỗi