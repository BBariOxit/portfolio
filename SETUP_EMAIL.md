# 📧 Hướng dẫn cấu hình Email cho Contact Form

Form liên hệ trên website sử dụng **Vercel Serverless Functions** + **Nodemailer** để gửi email về Gmail của bạn.

## 🚀 Các bước thiết lập

### Bước 1: Cài đặt dependencies

```powershell
npm install nodemailer
```

### Bước 2: Tạo App Password cho Gmail

Gmail yêu cầu **App Password** thay vì mật khẩu thông thường để bảo mật.

1. **Bật xác thực 2 bước (2FA)**:

   - Truy cập: https://myaccount.google.com/security
   - Tìm "2-Step Verification" và bật lên

2. **Tạo App Password**:
   - Truy cập: https://myaccount.google.com/apppasswords
   - Chọn "Select app" → **Mail**
   - Chọn "Select device" → **Other (Custom name)**
   - Nhập tên: `Portfolio Contact Form`
   - Click **Generate**
   - Copy **mã 16 ký tự** (dạng: `xxxx xxxx xxxx xxxx`)

### Bước 3: Cấu hình biến môi trường

#### Cho development (local):

1. Tạo file `.env` ở thư mục gốc:

```powershell
Copy-Item .env.example .env
```

2. Mở file `.env` và điền thông tin:

```env
GMAIL_USER=phanbao2648@gmail.com
GMAIL_PASS=xxxx xxxx xxxx xxxx
CONTACT_TO_EMAIL=phanbao2648@gmail.com
```

**Lưu ý**: File `.env` đã được thêm vào `.gitignore`, không bao giờ commit lên GitHub!

#### Cho production (Vercel):

1. Đăng nhập vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Chọn project **portfolio**
3. Vào **Settings** → **Environment Variables**
4. Thêm 3 biến:

| Name               | Value                                |
| ------------------ | ------------------------------------ |
| `GMAIL_USER`       | `phanbao2648@gmail.com`              |
| `GMAIL_PASS`       | `xxxx xxxx xxxx xxxx` (App Password) |
| `CONTACT_TO_EMAIL` | `phanbao2648@gmail.com`              |

5. Click **Save**
6. Redeploy project để áp dụng:

```powershell
./deploy.ps1
# hoặc
npx vercel --prod
```

### Bước 4: Test local (tùy chọn)

```powershell
# Cài Vercel CLI nếu chưa có
npm install -g vercel

# Chạy local dev server
vercel dev
```

Truy cập `http://localhost:3000`, điền form và gửi thử.

## ✅ Xác nhận hoạt động

Sau khi deploy lên Vercel:

1. Truy cập website: https://cobweb.id.vn
2. Scroll xuống phần **Liên hệ**
3. Điền form và click **Gửi tin nhắn**
4. Nếu thành công:
   - Thông báo màu xanh: "Tin nhắn đã được gửi thành công!"
   - Email xuất hiện trong hộp thư `phanbao2648@gmail.com`

## 🔍 Troubleshooting

### Lỗi: "Email service is not configured"

- Kiểm tra đã thêm biến môi trường `GMAIL_USER`, `GMAIL_PASS` trên Vercel chưa
- Redeploy sau khi thêm biến

### Lỗi: "Invalid login" hoặc "Authentication failed"

- Kiểm tra App Password có đúng 16 ký tự không (loại bỏ dấu cách)
- Đảm bảo đã bật 2FA cho Gmail
- Tạo lại App Password mới

### Email không nhận được

- Kiểm tra **Spam/Junk** folder
- Xác nhận `CONTACT_TO_EMAIL` đúng địa chỉ
- Xem log trên Vercel: Dashboard → Project → Deployments → Functions → Logs

## 📄 Cấu trúc API

```
api/
└── contact.js    # Vercel Serverless Function xử lý gửi email
```

Frontend gọi API tại: `POST /api/contact`

Body:

```json
{
  "fullName": "Nguyễn Văn A",
  "email": "example@domain.com",
  "subject": "Hợp tác dự án",
  "message": "Nội dung tin nhắn..."
}
```

Response (success):

```json
{
  "message": "Tin nhắn đã được gửi thành công."
}
```

## 🔒 Bảo mật

- ✅ App Password thay vì mật khẩu thực
- ✅ Biến môi trường không commit lên Git
- ✅ CORS được cấu hình an toàn
- ✅ Validation đầu vào server-side
- ✅ Rate limiting tự động bởi Vercel (1000 requests/ngày miễn phí)

## 💡 Lưu ý

- **Vercel Free Plan**: 1000 serverless function invocations/tháng (đủ dùng)
- Nếu cần gửi nhiều email hơn, cân nhắc dùng SendGrid, Mailgun, hoặc AWS SES
- App Password có thể thu hồi bất cứ lúc nào tại Google Account Settings

---

Nếu gặp vấn đề, xem logs chi tiết tại:

- Local: Terminal output khi chạy `vercel dev`
- Production: Vercel Dashboard → Functions → Logs
