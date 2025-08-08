#!/bin/bash

echo "🚀 Bắt đầu quá trình deploy website lên Vercel..."

# Kiểm tra xem có Vercel CLI chưa
if ! command -v vercel &> /dev/null; then
    echo "📦 Cài đặt Vercel CLI..."
    npm install -g vercel
fi

# Build project
echo "🔨 Building project..."
npm run build

# Deploy lên Vercel
echo "🚀 Deploying lên Vercel..."
vercel --prod

echo "✅ Deploy hoàn tất!"
echo ""
echo "📋 Các bước tiếp theo:"
echo "1. Đăng nhập vào Vercel Dashboard"
echo "2. Vào project 'portfolio'"
echo "3. Vào Settings > Domains"
echo "4. Thêm domain: cobweb.id.vn"
echo "5. Làm theo hướng dẫn trong file dns-config.md"
echo ""
echo "🌐 Website sẽ có sẵn tại:"
echo "- https://cobweb.id.vn"
echo "- https://www.cobweb.id.vn"
