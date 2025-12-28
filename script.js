// ==========================================
// 1. CÁC TÍNH NĂNG GIAO DIỆN (LỌC & TÌM KIẾM)
// ==========================================

// Hàm lọc phim theo năm
function locPhim() {
    const giaTriLoc = document.getElementById('loc-theo-nam').value;
    const tatCaThePhim = document.querySelectorAll('.the-phim');
    
    tatCaThePhim.forEach(thePhim => {
        const namPhim = thePhim.getAttribute('data-nam');
        if (giaTriLoc === 'tat-ca' || namPhim === giaTriLoc) {
            thePhim.style.display = 'block';
        } else {
            thePhim.style.display = 'none';
        }
    });
}

// Hàm tìm kiếm phim theo tên
function timKiemPhim() {
    const tuKhoa = document.getElementById('tim-kiem').value.toLowerCase();
    const tatCaThePhim = document.querySelectorAll('.the-phim');
    
    tatCaThePhim.forEach(thePhim => {
        const tenPhim = thePhim.querySelector('.ten-phim').textContent.toLowerCase();
        if (tenPhim.includes(tuKhoa)) {
            thePhim.style.display = 'block';
        } else {
            thePhim.style.display = 'none';
        }
    });
}

// ==========================================
// 2. XỬ LÝ LIÊN HỆ & CHI TIẾT PHIM
// ==========================================

// Hàm gửi tin nhắn liên hệ
function guiTinNhan(event) {
    event.preventDefault();
    const hoTen = document.getElementById('ho-ten').value;
    const email = document.getElementById('email').value;
    const noiDung = document.getElementById('noi-dung').value;
    
    if (!hoTen || !email || !noiDung) {
        alert('Vui lòng điền đầy đủ các trường bắt buộc (*)');
        return;
    }
    
    alert('Cảm ơn ' + hoTen + ' đã gửi tin nhắn!');
    document.getElementById('form-lien-he').reset();
}

// Hàm cập nhật thông tin phim khi trang chi tiết được mở
function capNhatThongTinPhim() {
    const urlParams = new URLSearchParams(window.location.search);
    const phimId = urlParams.get('phim');
    const tenPhimEl = document.getElementById('ten-phim');
    
    if (!tenPhimEl) return; // Nếu không ở trang chi tiết thì thoát

    if (phimId === 'minions1') {
        document.getElementById('ten-phim').textContent = 'Minions (2015)';
        document.getElementById('mo-ta-phim').textContent = 'Phim kể về lịch sử của những chú Minions...';
    } else if (phimId === 'minions2' || phimId === 'minions3') {
        document.getElementById('ten-phim').textContent = 'Minions: Sự Trỗi Dậy Của Gru';
        document.getElementById('mo-ta-phim').textContent = 'Phim kể về cuộc phiêu lưu của Gru khi còn trẻ...';
    }
}

// ==========================================
// 3. XỬ LÝ ĐĂNG NHẬP & ĐĂNG KÝ (KẾT NỐI NODE.JS)
// ==========================================

// Hàm hiển thị thông báo lỗi/thành công
function hienThiThongBao(thongBao, loai) {
    const thongBaoDiv = document.getElementById('thong-bao');
    if (thongBaoDiv) {
        thongBaoDiv.textContent = thongBao;
        thongBaoDiv.className = 'thong-bao ' + loai;
        setTimeout(() => {
            thongBaoDiv.textContent = '';
            thongBaoDiv.className = 'thong-bao';
        }, 3000);
    }
}

// Hàm xử lý ĐĂNG NHẬP (Kết nối tới Server 5000)
async function xuLyDangNhap(event) {
    event.preventDefault();
    const taiKhoan = document.getElementById('tai-khoan').value;
    const matKhau = document.getElementById('mat-khau').value;

    try {
        // Tìm hàm xuLyDangNhap và sửa dòng fetch
const res = await fetch('http://127.0.0.1:5000/api/dang-nhap', {
    method: 'POST', // Giữ nguyên POST
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: taiKhoan, password: matKhau })
});

        const data = await res.json();

        // Trong hàm xuLyDangNhap (phần xử lý kết quả từ server)
if (res.ok) {
    localStorage.setItem('dangNhap', 'true');
    localStorage.setItem('taiKhoan', data.username); // Lưu tên người dùng vào máy
    
    alert('Đăng nhập thành công! Chào ' + data.username);
    
    // Chuyển hướng về trang chủ
    window.location.href = 'index.html'; 
        } else {
            hienThiThongBao(data.error || 'Sai tài khoản hoặc mật khẩu', 'loi');
        }
    } catch (error) {
        console.error('Lỗi kết nối:', error);
        alert('Lỗi: Không thể kết nối tới Server cổng 5000!');
    }
}

// Hàm xử lý ĐĂNG KÝ (Kết nối tới Server 5000)
async function xuLyDangKy(event) {
    event.preventDefault(); // Ngăn trang web tải lại

    const taiKhoan = document.getElementById('tai-khoan').value;
    const matKhau = document.getElementById('mat-khau').value;
    const email = document.getElementById('email').value;

    console.log("Đang gửi dữ liệu đăng ký:", { taiKhoan, matKhau, email });

    try {
        const res = await fetch('http://127.0.0.1:5000/api/dang-ky', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: taiKhoan, 
                password: matKhau, 
                email: email 
            })
        });

        const data = await res.json();

        if (res.ok) {
            alert('Đăng ký thành công!');
            window.location.href = 'dang-nhap.html'; // Chuyển sang trang đăng nhập
        } else {
            alert("Lỗi: " + data.error);
        }
    } catch (error) {
        console.error("Lỗi kết nối fetch:", error);
        alert('Không thể kết nối tới Server cổng 5000. Hãy kiểm tra xem Terminal đã chạy node server.js chưa!');
    }
}

// ==========================================
// 4. QUẢN LÝ TRẠNG THÁI & GOOGLE LOGIN
// ==========================================

function kiemTraDangNhap() {
    const dangNhap = localStorage.getItem('dangNhap');
    const taiKhoan = localStorage.getItem('taiKhoan');
    const userInfo = document.getElementById('user-info');

    if (!userInfo) return; // Nếu trang đó không có thẻ user-info thì bỏ qua

    if (dangNhap === 'true' && taiKhoan) {
        // NẾU ĐÃ ĐĂNG NHẬP: Ghi đè nội dung mới (Hiện tên người dùng)
        userInfo.innerHTML = `
            <span style="color: yellow; font-weight: bold;">👤 Chào, ${taiKhoan}</span>
            <button onclick="dangXuat()" style="margin-left: 10px; cursor: pointer; border: none; background: red; color: white; padding: 2px 5px; border-radius: 3px;">Thoát</button>
        `;
    } else {
        // NẾU CHƯA ĐĂNG NHẬP: Giữ nguyên hoặc hiện lại nút đăng nhập
        userInfo.innerHTML = `<a href="dang-nhap.html">Đăng nhập</a> | <a href="dang-ky.html">Đăng ký</a>`;
    }
}

function dangXuat() {
    localStorage.clear();
    alert('Đã đăng xuất!');
    window.location.href = 'index.html';
}

function handleGoogleLogin(response) {
    const base64Url = response.credential.split('.')[1];
    const data = JSON.parse(atob(base64Url));
    localStorage.setItem('dangNhap', 'true');
    localStorage.setItem('taiKhoan', data.name);
    alert('Chào ' + data.name + '!');
    window.location.href = 'index.html';
}
window.onload = function () {
    // Luôn chạy các hàm này trước
    capNhatThongTinPhim();
    kiemTraDangNhap();

    // Bọc Google vào đây để nếu lỗi nó không làm hỏng cả trang
    try {
        if (document.getElementById('google-btn')) {
            google.accounts.id.initialize({
                client_id: 'ID_TAM_THOI', // Thay bằng ID thật sau
                callback: handleGoogleLogin
            });

            google.accounts.id.renderButton(
                document.getElementById('google-btn'),
                { theme: 'outline', size: 'large' }
            );
        }
    } catch (error) {
        console.log("Tính năng Google Login đang tạm dừng để fix lỗi.");
    }
};