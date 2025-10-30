<div align="center">

# Modern Portfolio — Phan Thái Bảo

[![Vercel](https://img.shields.io/badge/hosted%20on-Vercel-black?logo=vercel)](https://vercel.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Last Commit](https://img.shields.io/github/last-commit/BBariOxit/portfolio?color=999)](https://github.com/BBariOxit/portfolio/commits/main)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

</div>

> Website portfolio hiện đại, tối ưu hiệu năng, xây dựng bằng HTML + Tailwind CSS, kèm JavaScript thuần và cấu hình triển khai Vercel. Hỗ trợ dark mode, chuẩn SEO cơ bản (sitemap, robots).

- Demo: https://cobweb.id.vn
- Repo: https://github.com/BBariOxit/portfolio

## Mục lục

- [Tính năng nổi bật](#tính-năng-nổi-bật)
- [Tech stack](#tech-stack)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Bắt đầu nhanh (Windows/PowerShell)](#bắt-đầu-nhanh-windowspowershell)
- [Triển khai lên Vercel](#triển-khai-lên-vercel)
- [Cấu hình domain cobwebidvn](#cấu-hình-domain-cobwebidvn)
- [Ảnh minh họa](#ảnh-minh-họa)
- [Ghi chú phát triển](#ghi-chú-phát-triển)
- [Đóng góp](#đóng-góp)
- [Liên hệ](#liên-hệ)
- [Bản quyền](#bản-quyền)

## Tính năng nổi bật

- UI hiện đại với Tailwind 3.x, tùy biến theme, dark mode (class-based)
- Performance tốt cho static site; có sitemap.xml và robots.txt
- Trang Blog mẫu: `src/blog.html`
- Cấu hình bảo mật headers cơ bản qua `vercel.json`
- Tự động build CSS bằng Tailwind CLI (watch + production build)

## Tech stack

- HTML, CSS (Tailwind via PostCSS + Autoprefixer)
- JavaScript (vanilla)
- Vercel (static hosting)

## Cấu trúc thư mục

```
portfolio/
├─ src/
│  ├─ index.html            # Trang chính
│  ├─ blog.html             # Trang blog (demo)
│  ├─ input.css             # Tailwind input
│  ├─ css/
│  │  └─ main.css           # CSS sau khi build
│  ├─ js/
│  │  └─ main.js            # JavaScript
│  └─ assets/
│     ├─ images/            # Ảnh
│     └─ icons/             # Icon
├─ docs/
│  └─ technical_documentation.md
├─ vercel.json              # Cấu hình deploy + headers
├─ vercel-domains.json      # Danh sách domain & headers bổ sung
├─ tailwind.config.js       # Cấu hình Tailwind
├─ postcss.config.js        # Cấu hình PostCSS
├─ sitemap.xml, robots.txt  # SEO cơ bản
├─ deploy.ps1, deploy.sh    # Script deploy nhanh
└─ package.json
```

## Bắt đầu nhanh (Windows/PowerShell)

Yêu cầu: Node.js 18+.

1. Cài dependencies

```powershell
npm install
```

2. Chạy chế độ phát triển (1 tab build CSS + 1 tab serve tĩnh)

```powershell
# Tab 1: build CSS và watch thay đổi
npm run dev

# Tab 2: serve thư mục src ở http://localhost:3000
npm start
```

3. Build production CSS

Lưu ý: script build mặc định có lệnh chmod dành cho Linux. Trên Windows, nếu gặp lỗi, dùng npx để build trực tiếp:

```powershell
# Thử trước:
npm run build

# Nếu lỗi do chmod trên Windows, chạy:
npx tailwindcss -i ./src/input.css -o ./src/css/main.css
```

## Triển khai lên Vercel

Chọn một trong hai cách:

### Cách 1: Dùng script tự động (khuyến nghị cho Windows)

```powershell
./deploy.ps1
```

Script sẽ: cài dependencies, build CSS, kiểm tra/cài Vercel CLI, rồi deploy với `--prod`.

### Cách 2: Thủ công

```powershell
npm install
npm run build
npx vercel --prod
```

Vercel đã cấu hình sẵn qua `vercel.json`:

- outputDirectory: `src` (deploy nguyên thư mục src)
- rewrites: trỏ mọi đường dẫn về `index.html`
- security headers: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection

## Cấu hình domain cobweb.id.vn

Tóm tắt nhanh:

- Thêm domain `cobweb.id.vn` và `www.cobweb.id.vn` trong Vercel Project Settings > Domains
- Thêm DNS:
  - A @ → 76.76.19.36
  - CNAME www → cname.vercel-dns.com
- Nếu cần verification, thêm TXT theo hướng dẫn của Vercel

Chi tiết xem `dns-config.md`.

## Ảnh minh họa

Bạn có thể đặt ảnh giao diện tại `src/assets/images/`. Ví dụ:

```
![Trang chủ](src/assets/images/1.jpg)
![Blog](src/assets/images/2.jpg)
```

## Ghi chú phát triển

- Tailwind cấu hình `content: ["./src/**/*.{html,js}"]`, dark mode dùng `class`
- Có thể thêm plugin Tailwind trong `tailwind.config.js`
- File SEO: `sitemap.xml`, `robots.txt`
- Tài liệu kỹ thuật thêm: `docs/technical_documentation.md`

## Đóng góp

Mọi góp ý/PR đều được chào đón. Vui lòng tạo issue trước khi gửi thay đổi lớn.

## Liên hệ

- Tác giả: Phan Thái Bảo
- Email: phanbao2648@gmail.com
- GitHub: https://github.com/BBariOxit
- LinkedIn: https://www.linkedin.com/in/thái-bảo-phan-854a00340/

## Bản quyền

Phát hành theo giấy phép ISC (xem trong `package.json`).
