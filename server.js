const express = require('express');
const cors = require('cors');
const db = require('./db'); // Kết nối tới file db.js vừa tạo

const app = express();
app.use(express.json()); // Để server hiểu được dữ liệu bạn gửi từ Web
app.use(cors());         // Cho phép giao diện web gọi vào server này

// Một đường dẫn (API) đơn giản để kiểm tra
app.get('/', (req, res) => {
    res.send("Chào mừng bạn đến với Server Phim Minions!");
});
// --- ĐOẠN CODE XỬ LÝ ĐĂNG NHẬP ---
app.post('/api/dang-nhap', (req, res) => {
    const { username, password } = req.body;
    console.log(`📡 Nhận yêu cầu đăng nhập cho: ${username}`);

    // Truy vấn vào Database (Sử dụng db đã require ở đầu file)
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            console.error("Lỗi DB:", err);
            return res.status(500).json({ error: "Lỗi cơ sở dữ liệu" });
        }

        if (results.length === 0) {
            return res.status(400).json({ error: "Tài khoản không tồn tại!" });
        }

      // Tìm đoạn này trong app.post('/api/dang-nhap')
const user = results[0];

// Sửa lại cho đúng tên cột password_hash trong ảnh của bạn
if (password === user.password_hash) { 
    console.log("✅ Đăng nhập thành công!");
    res.json({ 
        username: user.username,
        role: user.role || 'user' 
    });
} else {
    res.status(400).json({ error: "Mật khẩu không chính xác!" });
}
    });
});
app.post('/api/dang-ky', (req, res) => {
    const { username, password, email } = req.body;
    
    // Kiểm tra xem dữ liệu có bị trống không
    if (!username || !password || !email) {
        return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin!" });
    }

    const sql = 'INSERT INTO users (username, password_hash, email) VALUES (?, ?, ?)';
    db.query(sql, [username, password, email], (err, result) => {
        if (err) {
            console.error("Lỗi khi INSERT:", err);
            return res.status(500).json({ error: "Tài khoản hoặc Email đã tồn tại!" });
        }
        console.log(`👤 Người dùng mới đã đăng ký: ${username}`);
        res.json({ message: "Đăng ký thành công!" });
    });
});

const PORT = 5000;
// Thêm '0.0.0.0' để server chấp nhận mọi kết nối từ localhost và 127.0.0.1
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server đang chạy tại cổng ${PORT}`);
});