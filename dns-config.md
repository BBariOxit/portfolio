# Cấu hình DNS cho Domain cobweb.id.vn

## Bước 1: Cấu hình DNS Records

Để kết nối domain `cobweb.id.vn` với Vercel, bạn cần thêm các DNS records sau vào nhà cung cấp domain của bạn:

### Records cần thêm:

1. **A Record:**
   ```
   Type: A
   Name: @ (hoặc để trống)
   Value: 76.76.19.36
   TTL: 3600 (hoặc Auto)
   ```

2. **CNAME Record:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 3600 (hoặc Auto)
   ```

3. **TXT Record (cho verification):**
   ```
   Type: TXT
   Name: @ (hoặc để trống)
   Value: vc-domain-verify=cobweb.id.vn,<verification-code>
   TTL: 3600 (hoặc Auto)
   ```

## Bước 2: Thêm Domain vào Vercel

1. Đăng nhập vào Vercel Dashboard
2. Chọn project "portfolio"
3. Vào tab "Settings" > "Domains"
4. Thêm domain: `cobweb.id.vn`
5. Thêm subdomain: `www.cobweb.id.vn`
6. Làm theo hướng dẫn verification

## Bước 3: Cấu hình SSL

Vercel sẽ tự động cấu hình SSL certificate cho domain của bạn.

## Bước 4: Kiểm tra

Sau khi cấu hình xong, đợi 24-48 giờ để DNS propagate hoàn toàn.

Kiểm tra bằng cách:
- Truy cập: https://cobweb.id.vn
- Truy cập: https://www.cobweb.id.vn

## Lưu ý:

- Đảm bảo domain `cobweb.id.vn` đã được đăng ký và active
- Nếu sử dụng Cloudflare, hãy tắt proxy (chỉ DNS) cho các records này
- Có thể mất 24-48 giờ để DNS propagate hoàn toàn
