# PowerShell Script để Deploy và Cấu hình Domain
Write-Host "🚀 Bắt đầu quá trình deploy website lên Vercel..." -ForegroundColor Green

# Kiểm tra và cài đặt dependencies
Write-Host "📦 Cài đặt dependencies..." -ForegroundColor Yellow
npm install

# Build project
Write-Host "🔨 Building project..." -ForegroundColor Yellow
npm run build

# Kiểm tra xem có Vercel CLI chưa
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "📦 Cài đặt Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

# Deploy lên Vercel
Write-Host "🚀 Deploying lên Vercel..." -ForegroundColor Yellow
vercel --prod

Write-Host "✅ Deploy hoàn tất!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Các bước tiếp theo để kết nối domain cobweb.id.vn:" -ForegroundColor Cyan
Write-Host "1. Đăng nhập vào Vercel Dashboard: https://vercel.com/dashboard" -ForegroundColor White
Write-Host "2. Chọn project 'portfolio'" -ForegroundColor White
Write-Host "3. Vào Settings > Domains" -ForegroundColor White
Write-Host "4. Thêm domain: cobweb.id.vn" -ForegroundColor White
Write-Host "5. Thêm subdomain: www.cobweb.id.vn" -ForegroundColor White
Write-Host "6. Làm theo hướng dẫn verification" -ForegroundColor White
Write-Host ""
Write-Host "🌐 DNS Records cần thêm vào nhà cung cấp domain:" -ForegroundColor Cyan
Write-Host "A Record: @ -> 76.76.19.36" -ForegroundColor White
Write-Host "CNAME Record: www -> cname.vercel-dns.com" -ForegroundColor White
Write-Host ""
Write-Host "📖 Xem chi tiết trong file dns-config.md" -ForegroundColor Yellow
Write-Host ""
Write-Host "🌐 Website sẽ có sẵn tại:" -ForegroundColor Green
Write-Host "- https://cobweb.id.vn" -ForegroundColor White
Write-Host "- https://www.cobweb.id.vn" -ForegroundColor White
