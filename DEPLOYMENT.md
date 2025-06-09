# 部署指南

本文档说明如何正确部署 Star Copy And Paste 项目到生产服务器。

## 🚀 部署流程

### 1. 本地构建

```bash
# 安装依赖
npm install

# 构建生产版本
npm run build
```

### 2. 构建结果

构建完成后，`dist` 目录包含所有需要部署的文件：

```
dist/
├── index.html              # 主页面
├── assets/                 # 静态资源
│   ├── index-[hash].js     # JavaScript文件
│   ├── index-[hash].css    # CSS文件
│   └── ...                 # 其他资源文件
├── sitemap.xml             # 自动生成的站点地图
├── robots.txt              # 自动生成的robots文件
├── favicon.ico             # 网站图标
└── og-image.svg            # 社交分享图片
```

## 📁 文件分类

### ✅ 需要上传到服务器的文件

#### 构建输出 (dist目录)

- `index.html` - 主页面
- `assets/` - 所有静态资源
- `sitemap.xml` - SEO站点地图
- `robots.txt` - 搜索引擎指导

#### 静态资源 (已包含在dist中)

- `favicon.ico` - 网站图标
- `og-image.svg` - 社交分享图片

### ❌ 不需要上传到服务器的文件

#### 开发工具和脚本

- `scripts/` - 开发工具脚本
  - `seo-audit.js` - SEO审计工具
  - `seo-length-check.js` - SEO长度检查
  - `simple-keyword-check.js` - 关键词检查

#### 源代码和配置

- `src/` - 源代码目录
- `node_modules/` - 依赖包
- `docs/` - 项目文档
- `*.config.js` - 配置文件
- `package.json` - 包配置文件
- `.gitignore` - Git忽略文件

#### 开发文件

- `.env*` - 环境变量文件
- `*.log` - 日志文件
- `.DS_Store` - 系统文件

## 🌐 服务器配置

### 静态文件服务器

将 `dist` 目录的内容上传到服务器的网站根目录：

```
网站根目录/
├── index.html
├── assets/
│   ├── index-xxx.js
│   └── index-xxx.css
├── sitemap.xml
├── robots.txt
├── favicon.ico
└── og-image.svg
```

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name starsymbols.io www.starsymbols.io;
    root /var/www/starsymbols;
    index index.html;

    # 启用gzip压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # 静态文件缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # SEO文件
    location = /sitemap.xml {
        add_header Content-Type application/xml;
    }

    location = /robots.txt {
        add_header Content-Type text/plain;
    }
}
```

### Apache 配置示例

```apache
<VirtualHost *:80>
    ServerName starsymbols.io
    ServerAlias www.starsymbols.io
    DocumentRoot /var/www/starsymbols

    # 启用压缩
    LoadModule deflate_module modules/mod_deflate.so
    <Location />
        SetOutputFilter DEFLATE
    </Location>

    # 静态文件缓存
    <FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg)$">
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
    </FilesMatch>

    # SPA路由支持
    <Directory "/var/www/starsymbols">
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

## 🔧 部署脚本示例

### 自动部署脚本

```bash
#!/bin/bash
# deploy.sh

echo "🚀 开始部署 Star Copy And Paste..."

# 构建项目
echo "📦 构建项目..."
npm run build

# 检查构建是否成功
if [ $? -eq 0 ]; then
    echo "✅ 构建成功"
else
    echo "❌ 构建失败"
    exit 1
fi

# 上传到服务器 (使用rsync)
echo "📤 上传文件到服务器..."
rsync -avz --delete dist/ user@server:/var/www/starsymbols.io/

echo "🎉 部署完成！"
```

## 📊 部署检查清单

### 构建前检查

- [ ] 所有代码已提交
- [ ] 依赖已安装 (`npm install`)
- [ ] 测试通过
- [ ] SEO配置正确

### 构建检查

- [ ] 构建成功 (`npm run build`)
- [ ] `dist` 目录生成
- [ ] `sitemap.xml` 存在
- [ ] `robots.txt` 存在
- [ ] 静态资源正确

### 部署后检查

- [ ] 网站可以正常访问
- [ ] 所有页面路由正常
- [ ] 静态资源加载正常
- [ ] SEO标签正确
- [ ] 站点地图可访问 (`/sitemap.xml`)
- [ ] Robots文件可访问 (`/robots.txt`)

## 🔍 常见问题

### Q: 为什么不上传 scripts 目录？

A: `scripts` 目录包含开发工具，只在开发时使用，生产环境不需要。

### Q: 如何更新站点地图？

A: 站点地图在每次构建时自动生成，无需手动更新。

### Q: 如何处理SPA路由？

A: 需要配置服务器将所有路由请求重定向到 `index.html`。

### Q: 静态文件缓存设置？

A: 建议对 JS/CSS 文件设置长期缓存，对 HTML 文件设置短期缓存。

## 📈 性能优化建议

1. **启用Gzip压缩** - 减少传输大小
2. **设置缓存头** - 提高重复访问速度
3. **使用CDN** - 加速全球访问
4. **启用HTTP/2** - 提高加载性能
5. **压缩图片** - 减少图片文件大小

通过遵循这个部署指南，您可以确保 Star Copy And Paste 项目正确、高效地部署到生产环境。
