# Deployment Guide - Chinese Culture Map

## Quick Deployment Options

### 1. 🚀 GitHub Pages (Free & Easy)

#### Prerequisites
- GitHub account
- Git installed

#### Steps
1. Create a new GitHub repository named `chinese-culture-map`
2. Clone the repository locally:
   ```bash
   git clone https://github.com/your-username/chinese-culture-map.git
   cd chinese-culture-map
   ```

3. Add all project files:
   ```bash
   git add .
   git commit -m "Initial commit: Chinese Culture Map"
   git push origin main
   ```

4. Go to repository Settings → Pages
5. Set branch to `main` and folder to `/root`
6. Your site will be live at: `https://your-username.github.io/chinese-culture-map`

#### Customization
- Update `README.md` with your information
- Modify `package.json` with your repository URL

---

### 2. 🎯 Netlify (Recommended - Easiest)

#### Prerequisites
- Netlify account (free at netlify.com)

#### Step-by-Step
1. Sign in to Netlify
2. Click "Add new site" → "Deploy manually"
3. Drag and drop the project folder
4. Site will be live immediately with auto-refreshing HTTPS

#### For Continuous Deployment
1. Push code to GitHub
2. Connect repository in Netlify dashboard
3. Netlify auto-deploys on every push

#### Custom Domain
1. Go to Site settings → Domain management
2. Add your custom domain
3. Update DNS records as instructed

---

### 3. 🔗 Vercel (Fast CDN)

#### Prerequisites
- Vercel account (free at vercel.com)

#### Deployment
```bash
npm i -g vercel
vercel
```

Follow prompts and your project is live!

---

### 4. 🌐 Traditional Web Hosting

#### Requirements
- Web hosting with FTP/SFTP access
- SSH access (optional but recommended)

#### Via FTP
1. Connect via FTP client (FileZilla, Cyberduck, etc.)
2. Upload all files to public_html or www directory
3. Maintain folder structure:
   ```
   public_html/
   ├── index.html
   ├── styles.css
   ├── script.js
   ├── service-worker.js
   └── README.md
   ```
4. Access via your domain name

#### Via SSH
```bash
# Connect to server
ssh user@example.com

# Navigate to web directory
cd public_html

# Clone repository (if using Git)
git clone https://github.com/your-username/chinese-culture-map.git .

# Or upload files
# scp -r ./Chinese_Culture_Map/* user@example.com:/public_html/
```

#### Server Configuration
##### Apache (.htaccess)
Create `.htaccess` in root:
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ index.html [QSA,L]
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache headers
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

##### Nginx
Configure nginx.conf:
```nginx
server {
    listen 80;
    server_name example.com;
    
    root /var/www/chinese-culture-map;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css text/xml text/javascript
               application/x-javascript application/xml+rss
               application/javascript application/json;
    
    # Cache static files
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Route all requests to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

### 5. 🐳 Docker Deployment

#### Dockerfile
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY . .
EXPOSE 8000
CMD ["npm", "start"]
```

#### Build and Run
```bash
# Build
docker build -t culture-map .

# Run
docker run -p 8000:8000 culture-map
```

#### Docker Compose
```yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - .:/app
    restart: unless-stopped
```

Run with: `docker-compose up`

---

## 🔒 Security Checklist

- [ ] Enable HTTPS/SSL certificate
- [ ] Set security headers:
  ```nginx
  add_header X-Frame-Options "SAMEORIGIN" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header X-XSS-Protection "1; mode=block" always;
  add_header Referrer-Policy "no-referrer-when-downgrade" always;
  ```
- [ ] Update meta tags for security
- [ ] Regular backups
- [ ] Monitor error logs

---

## ⚡ Performance Optimization

### Pre-Deployment Checklist
- [ ] Minify CSS and JavaScript
- [ ] Optimize images
- [ ] Enable GZIP compression
- [ ] Set up CDN for static files
- [ ] Configure browser caching
- [ ] Test lighthouse score (target: 90+)

### Cloudflare Integration (Free CDN)
1. Sign up at cloudflare.com
2. Add your domain
3. Update nameservers at registrar
4. Enable caching in dashboard
5. Enjoy free CDN + DDoS protection

---

## 📊 Monitoring & Analytics

### Google Analytics Setup
Add to `script.js`:
```javascript
// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID');
```

### Uptime Monitoring
Services to monitor:
- UptimeRobot (free tier)
- Pingdom
- StatusCake

---

## 🔄 Continuous Deployment

### GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to server
        run: |
          mkdir -p ~/.ssh
          echo "$SSH_KEY" > ~/.ssh/deploy_key
          chmod 600 ~/.ssh/deploy_key
          ssh-keyscan -H $HOST >> ~/.ssh/known_hosts
          ssh -i ~/.ssh/deploy_key $USERNAME@$HOST 'cd /var/www/culture-map && git pull'
        env:
          SSH_KEY: ${{ secrets.SSH_KEY }}
          HOST: ${{ secrets.HOST }}
          USERNAME: ${{ secrets.USERNAME }}
```

---

## 🆘 Troubleshooting

### Service Worker Not Working
- Ensure HTTPS on production
- Clear browser cache
- Check browser console for errors
- Verify service-worker.js is accessible

### Map Not Loading
- Check that SVG is properly formatted
- Verify CSS is loaded
- Check browser console for errors

### Slow Performance
- Enable GZIP compression
- Use CDN for assets
- Minimize JavaScript
- Enable browser caching

### CORS Issues
Add headers to server:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
```

---

## 📱 Mobile Deployment

### App Wrapper Options
1. **Capacitor** - Convert web app to mobile app
2. **React Native Web** - Cross-platform
3. **Electron** - Desktop app wrapper

---

## 🎓 Recommended Hosting

| Provider | Cost | Ease | Features | Best For |
|----------|------|------|----------|----------|
| GitHub Pages | Free | ⭐⭐⭐ | Basic | Open source projects |
| Netlify | Free-$19 | ⭐⭐⭐⭐ | Advanced | Modern web apps |
| Vercel | Free-$20 | ⭐⭐⭐⭐ | Optimized | JAM stack |
| TraditionalHosting | $5-50 | ⭐⭐ | Basic-Full | Full control |
| AWS/GCP/Azure | Pay-as-you-go | ⭐ | Enterprise | Scale |

---

## 📝 Post-Deployment

1. **Test Everything**
   - Test all interactive features
   - Check on multiple browsers
   - Test on mobile devices
   - Verify offline functionality

2. **Monitor**
   - Set up analytics
   - Monitor error logs
   - Track performance metrics
   - User feedback

3. **Maintain**
   - Regular backups
   - Security updates
   - Content updates
   - Performance optimization

---

## 🚨 Emergency Support

If deployment fails:
1. Check error logs
2. Verify file permissions
3. Ensure correct folder structure
4. Test locally first
5. Check hosting provider status
6. Contact support team

---

## 📚 Resources

- [Netlify Documentation](https://docs.netlify.com)
- [GitHub Pages Guide](https://pages.github.com)
- [Vercel Deployment](https://vercel.com/docs)
- [Web.dev Performance](https://web.dev)
- [MDN Deployment Guide](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/Upload_files_to_a_web_server)

---

**Happy deploying! 🚀**

