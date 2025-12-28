// ==========================================
// 1. CÁC TÍNH NĂNG GIAO DIỆN (LỌC & TÌM KIẾM)
// ==========================================

function locPhim() {
    const giaTriLoc = document.getElementById('loc-theo-nam').value;
    const tatCaThePhim = document.querySelectorAll('.the-phim');
    tatCaThePhim.forEach(thePhim => {
        const namPhim = thePhim.getAttribute('data-nam');
        thePhim.style.display = (giaTriLoc === 'tat-ca' || namPhim === giaTriLoc) ? 'block' : 'none';
    });
}

function timKiemPhim() {
    const tuKhoa = document.getElementById('tim-kiem').value.toLowerCase();
    const tatCaThePhim = document.querySelectorAll('.the-phim');
    tatCaThePhim.forEach(thePhim => {
        const tenPhim = thePhim.querySelector('.ten-phim').textContent.toLowerCase();
        thePhim.style.display = tenPhim.includes(tuKhoa) ? 'block' : 'none';
    });
}

// ==========================================
// 2. XỬ LÝ LIÊN HỆ & CHI TIẾT PHIM
// ==========================================

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

function capNhatThongTinPhim() {
    const urlParams = new URLSearchParams(window.location.search);
    const phimId = urlParams.get('phim');
    const tenPhimEl = document.getElementById('ten-phim');
    if (!tenPhimEl) return;
    if (phimId === 'minions1') {
        tenPhimEl.textContent = 'Minions (2015)';
        document.getElementById('mo-ta-phim').textContent = 'Phim kể về lịch sử của những chú Minions...';
    } else if (phimId === 'minions2' || phimId === 'minions3') {
        tenPhimEl.textContent = 'Minions: Sự Trỗi Dậy Của Gru';
        document.getElementById('mo-ta-phim').textContent = 'Phim kể về cuộc phiêu lưu của Gru khi còn trẻ...';
    }
}

// ==========================================
// 3. XỬ LÝ ĐĂNG NHẬP & ĐĂNG KÝ (RENDER)
// ==========================================

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

async function xuLyDangNhap(event) {
    event.preventDefault();
    const taiKhoan = document.getElementById('tai-khoan').value;
    const matKhau = document.getElementById('mat-khau').value;

    try {
        const res = await fetch('https://web-phim-minions.onrender.com/api/dang-nhap', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: taiKhoan, password: matKhau })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('dangNhap', 'true');
            localStorage.setItem('taiKhoan', data.username);
            alert('Đăng nhập thành công! Chào ' + data.username);
            window.location.href = 'index.html';
        } else {
            hienThiThongBao(data.error || 'Sai tài khoản hoặc mật khẩu', 'loi');
        }
    } catch (error) {
        console.error('Lỗi kết nối:', error);
        alert('Lỗi: Không thể kết nối tới Server!');
    }
}

async function xuLyDangKy(event) {
    event.preventDefault();
    const taiKhoan = document.getElementById('tai-khoan').value;
    const matKhau = document.getElementById('mat-khau').value;
    const email = document.getElementById('email').value;

    try {
        // Đã sửa dấu nháy dư thừa ở đây
        const res = await fetch('https://web-phim-minions.onrender.com/api/dang-ky', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: taiKhoan, password: matKhau, email: email })
        });
        const data = await res.json();
        if (res.ok) {
            alert('Đăng ký thành công!');
            window.location.href = 'dang-nhap.html'; 
        } else {
            alert("Lỗi: " + data.error);
        }
    } catch (error) {
        console.error("Lỗi kết nối:", error);
        alert('Không thể kết nối tới Server Render!');
    }
}

// ==========================================
// 4. QUẢN LÝ TRẠNG THÁI
// ==========================================

function kiemTraDangNhap() {
    const dangNhap = localStorage.getItem('dangNhap');
    const taiKhoan = localStorage.getItem('taiKhoan');
    const userInfo = document.getElementById('user-info');
    if (!userInfo) return;
    if (dangNhap === 'true' && taiKhoan) {
        userInfo.innerHTML = `
            <span style="color: yellow; font-weight: bold;">👤 Chào, ${taiKhoan}</span>
            <button onclick="dangXuat()" style="margin-left: 10px; cursor: pointer; border: none; background: red; color: white; padding: 2px 5px; border-radius: 3px;">Thoát</button>
        `;
    } else {
        userInfo.innerHTML = `<a href="dang-nhap.html">Đăng nhập</a> | <a href="dang-ky.html">Đăng ký</a>`;
    }
}

function dangXuat() {
    localStorage.clear();
    alert('Đã đăng xuất!');
    window.location.href = 'index.html';
}

window.onload = function () {
    capNhatThongTinPhim();
    kiemTraDangNhap();
};
