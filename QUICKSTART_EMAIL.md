# 🚀 Hướng dẫn nhanh: Kích hoạt Contact Form

## ✅ Những gì đã sẵn sàng

- ✅ Frontend form đã được code đầy đủ (validation, loading state, error handling)
- ✅ Backend API `api/contact.js` đã được tạo (Vercel Serverless Function + Nodemailer)
- ✅ Package `nodemailer` đã được cài trong `package.json`
- ✅ File `.env.example` mẫu đã tạo
- ✅ README.md đã được cập nhật

## 📋 Các bước còn lại (BẮT BUỘC)

### Bước 1: Tạo Gmail App Password

1. Bật **2-Step Verification** cho Gmail:

   - Truy cập: https://myaccount.google.com/security
   - Tìm "2-Step Verification" → Bật lên

2. Tạo **App Password**:
   - Truy cập: https://myaccount.google.com/apppasswords
   - App: **Mail**
   - Device: **Other** → nhập `Portfolio`
   - Click **Generate**
   - Copy mã **16 ký tự** (dạng: `abcd efgh ijkl mnop`)

### Bước 2: Cấu hình trên Vercel

1. Đăng nhập vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Chọn project **portfolio**
3. Vào **Settings** → **Environment Variables**
4. Thêm 3 biến sau:

```
GMAIL_USER = phanbao2648@gmail.com
GMAIL_PASS = abcd efgh ijkl mnop  (App Password vừa tạo)
CONTACT_TO_EMAIL = phanbao2648@gmail.com
```

5. Click **Save**

### Bước 3: Deploy lại project

```powershell
# Cách 1: Script tự động
./deploy.ps1

# Cách 2: Vercel CLI
npx vercel --prod
```

**LƯU Ý**: Phải deploy lại sau khi thêm biến môi trường để Vercel áp dụng!

### Bước 4: Test thử

1. Truy cập: https://cobweb.id.vn
2. Scroll xuống phần **Liên hệ**
3. Điền form:
   - Họ và tên: `Test User`
   - Email: `test@example.com`
   - Tiêu đề: `Test form liên hệ`
   - Nội dung: `Đây là tin nhắn test`
4. Click **Gửi tin nhắn**
5. Kiểm tra email `phanbao2648@gmail.com` (cả Inbox và Spam)

## ✅ Nếu thành công

- Thông báo xanh: "Tin nhắn đã được gửi thành công!"
- Email xuất hiện trong hộp thư với format đẹp (có HTML template)
- Subject: `[Portfolio Contact] Test form liên hệ - Test User`
- Reply-to tự động: `test@example.com`

## ❌ Nếu gặp lỗi

### "Email service is not configured"

→ Chưa thêm biến môi trường trên Vercel. Quay lại Bước 2.

### "Authentication failed" / "Invalid login"

→ Sai App Password hoặc chưa bật 2FA. Kiểm tra lại:

- App Password đúng 16 ký tự (loại bỏ dấu cách khi copy)
- 2FA đã được bật
- Tạo lại App Password mới nếu cần

### Không nhận được email

→ Kiểm tra:

- **Spam/Junk folder**
- Biến `CONTACT_TO_EMAIL` có đúng không
- Xem log trên Vercel: Dashboard → Functions → Logs

## 📊 Giới hạn & Chi phí

- **Vercel Free Plan**:
  - 1000 serverless invocations/tháng
  - Đủ cho portfolio cá nhân
- **Gmail SMTP**:
  - ~500 emails/ngày (free)
  - Đủ dư cho contact form

## 🔒 Bảo mật

- ✅ App Password (không dùng mật khẩu thực)
- ✅ Biến môi trường không lộ ra client
- ✅ Validation server-side
- ✅ Rate limiting tự động (Vercel)

## 📖 Tài liệu chi tiết

Xem thêm: [`SETUP_EMAIL.md`](./SETUP_EMAIL.md)

---

**Sau khi hoàn thành, form liên hệ sẽ hoạt động hoàn hảo! 🎉**
