// Province Data
const provinceData = {
    'Heilongjiang': { name: '黑龙江', culture: 'Ice Festival | Folk Opera | Ginseng', desc: 'World-class ice sculpture and winter festivals.' },
    'Jilin': { name: '吉林', culture: 'Changbai Mountain | Korean Heritage | Falls', desc: 'Features legendary Changbai Mountains.' },
    'Liaoning': { name: '辽宁', culture: 'Manchurian Heritage | Dalian Port | Ming Dynasty', desc: 'Rich Manchurian heritage with Ming architecture.' },
    'Inner Mongolia': { name: '内蒙古', culture: 'Grassland | Horse Culture | Nadam Festival', desc: 'Nomadic heritage with horsemanship traditions.' },
    'Xinjiang': { name: '新疆', culture: 'Silk Road | Uighur Crafts | Desert Oasis', desc: 'Historic Silk Road crossroads.' },
    'Qinghai': { name: '青海', culture: 'Tibetan Buddhism | Sacred Lakes | Nomadic', desc: 'Tibetan Buddhist culture center.' },
    'Tibet': { name: '西藏', culture: 'Tibetan Buddhism | Potala Palace | Mountains', desc: 'Spiritual heart of Tibet.' },
    'Gansu': { name: '甘肃', culture: 'Silk Road | Mogao Caves | Great Wall', desc: 'Important Silk Road corridor.' },
    'Ningxia': { name: '宁夏', culture: 'Islamic Architecture | Muslim Heritage | Desert', desc: 'Islamic culture center.' },
    'Shaanxi': { name: '陕西', culture: 'Tang Dynasty | Terracotta Warriors | Yellow River', desc: 'Home to famous Terracotta Army.' },
    'Henan': { name: '河南', culture: 'Shaolin Temple | Kung Fu | Central Plains', desc: 'Legendary Shaolin Temple.' },
    'Shandong': { name: '山东', culture: 'Confucius Hometown | Mount Tai | Opera', desc: 'Birthplace of Confucianism.' },
    'Anhui': { name: '安徽', culture: 'Huizhou Architecture | Landscape Painting | Tea', desc: 'Distinctive Ming-Qing architecture.' },
    'Jiangsu': { name: '江苏', culture: 'Suzhou Gardens | Nanjing Capital | Aesthetics', desc: 'World-renowned Suzhou gardens.' },
    'Zhejiang': { name: '浙江', culture: 'West Lake | Silk Production | Longjing Tea', desc: 'Legendary West Lake.' },
    'Shanghai': { name: '上海', culture: 'Modern Hub | Water Town | Art Deco Architecture', desc: 'Global trading center.' },
    'Jiangxi': { name: '江西', culture: 'Jingdezhen Porcelain | Buddhist Culture | Folk', desc: 'Historic porcelain production center.' },
    'Fujian': { name: '福建', culture: 'Min Culture | Tulou Buildings | Oolong Tea', desc: 'Unique Min cultural traditions.' },
    'Guangdong': { name: '广东', culture: 'Cantonese Opera | Cuisine | Trading Port', desc: 'Cantonese cultural traditions.' },
    'Guangxi': { name: '广西', culture: 'Guilin Landscape | Karst Mountains | Minorities', desc: 'Spectacular karst mountain scenery.' },
    'Yunnan': { name: '云南', culture: 'Multiple Ethnic Minorities | Stone Forest | Silk Road', desc: 'Most ethnically diverse province.' },
    'Guizhou': { name: '贵州', culture: 'Miao & Dong Arts | Terraced Fields | Crafts', desc: 'Vibrant Miao and Dong ethnic cultures.' },
    'Sichuan': { name: '四川', culture: 'Giant Panda Heritage | Emei Mountain | Opera', desc: 'Legendary for giant pandas.' },
    'Chongqing': { name: '重庆', culture: 'Yangtze River | Gorge Civilization | Mountain City', desc: 'Dramatic mountain city.' },
    'Hunan': { name: '湖南', culture: 'Changsha Literary Hub | Miao Heritage | Yangtze', desc: 'Important intellectual center.' },
    'Hubei': { name: '湖北', culture: 'Chu Kingdom | Han River | Music Traditions', desc: 'Ancient Chu Kingdom culture.' },
    'Shanxi': { name: '山西', culture: 'Jin Culture | Pingyao Ancient Town | Coal Heritage', desc: 'Historic Jin Kingdom culture.' },
    'Hebei': { name: '河北', culture: 'North Plain | Wall Guardian | Mountain Culture', desc: 'Northern plain civilization.' },
    'Beijing': { name: '北京', culture: 'Imperial Capital | Forbidden City | Great Wall', desc: "China's imperial capital." },
    'Tianjin': { name: '天津', culture: 'Bohai Bay Port | Concession Architecture | Canal', desc: 'Historic trading port.' },
    'Hong Kong': { name: '香港', culture: 'Colonial Heritage | Harbor Culture | Modern Blend', desc: 'Global maritime center.' },
    'Macau': { name: '澳门', culture: 'Portuguese Heritage | Casino Culture | Maritime', desc: 'Portuguese trading post.' },
    'Taiwan': { name: '台湾', culture: 'Aboriginal Culture | Heritage | Tea Mountains', desc: 'Island cultural heritage.' }
};

// Province map regions (simplified coordinates for interactive clicking)
const provinceRegions = [
    { name: 'Heilongjiang', x: 580, y: 80, w: 100, h: 80 },
    { name: 'Jilin', x: 500, y: 140, w: 80, h: 60 },
    { name: 'Liaoning', x: 460, y: 160, w: 70, h: 50 },
    { name: 'Inner Mongolia', x: 320, y: 100, w: 200, h: 80 },
    { name: 'Xinjiang', x: 80, y: 120, w: 180, h: 150 },
    { name: 'Tibet', x: 180, y: 250, w: 120, h: 120 },
    { name: 'Qinghai', x: 240, y: 200, w: 100, h: 100 },
    { name: 'Gansu', x: 260, y: 160, w: 100, h: 80 },
    { name: 'Ningxia', x: 300, y: 180, w: 50, h: 50 },
    { name: 'Shaanxi', x: 350, y: 200, w: 60, h: 70 },
    { name: 'Shanxi', x: 380, y: 180, w: 50, h: 70 },
    { name: 'Henan', x: 400, y: 240, w: 70, h: 60 },
    { name: 'Shandong', x: 450, y: 220, w: 80, h: 60 },
    { name: 'Hebei', x: 420, y: 190, w: 60, h: 50 },
    { name: 'Beijing', x: 430, y: 170, w: 20, h: 20 },
    { name: 'Tianjin', x: 450, y: 185, w: 25, h: 20 },
    { name: 'Shanxi', x: 370, y: 200, w: 50, h: 70 },
    { name: 'Anhui', x: 460, y: 260, w: 60, h: 50 },
    { name: 'Jiangsu', x: 500, y: 270, w: 60, h: 50 },
    { name: 'Shanghai', x: 520, y: 285, w: 20, h: 20 },
    { name: 'Zhejiang', x: 520, y: 310, w: 50, h: 50 },
    { name: 'Jiangxi', x: 480, y: 340, w: 50, h: 60 },
    { name: 'Fujian', x: 540, y: 360, w: 50, h: 60 },
    { name: 'Guangdong', x: 480, y: 420, w: 80, h: 80 },
    { name: 'Guangxi', x: 380, y: 400, w: 100, h: 100 },
    { name: 'Yunnan', x: 240, y: 380, w: 140, h: 140 },
    { name: 'Guizhou', x: 360, y: 340, w: 80, h: 80 },
    { name: 'Sichuan', x: 300, y: 300, w: 100, h: 100 },
    { name: 'Chongqing', x: 360, y: 310, w: 40, h: 40 },
    { name: 'Hunan', x: 430, y: 380, w: 70, h: 60 },
    { name: 'Hubei', x: 420, y: 320, w: 70, h: 70 },
    { name: 'Hong Kong', x: 490, y: 450, w: 15, h: 15 },
    { name: 'Macau', x: 470, y: 445, w: 12, h: 12 },
    { name: 'Taiwan', x: 560, y: 380, w: 30, h: 50 }
];

let canvas, ctx;

document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('mapCanvas');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Draw map on load
    drawMap();
    
    // Add mouse event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('mouseleave', () => {
        canvas.style.cursor = 'default';
    });
});

function drawMap() {
    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = '#e8f4f8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw simplified China outline
    drawChinaOutline();
    
    // Draw provinces
    provinceRegions.forEach((region, idx) => {
        ctx.fillStyle = '#f0f9ff';
        ctx.strokeStyle = '#1a5490';
        ctx.lineWidth = 1.5;
        ctx.fillRect(region.x, region.y, region.w, region.h);
        ctx.strokeRect(region.x, region.y, region.w, region.h);
        
        // Draw province labels
        ctx.fillStyle = '#1a5490';
        ctx.font = 'bold 8px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const prov = provinceData[region.name];
        if (prov) {
            const label = prov.name.substring(0, 3);
            ctx.fillText(label, region.x + region.w / 2, region.y + region.h / 2);
        }
    });
}

function drawChinaOutline() {
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 2;
    ctx.fillStyle = 'rgba(232, 244, 248, 0.3)';
    
    // Draw an overall China-like shape
    ctx.beginPath();
    ctx.moveTo(100, 120);
    ctx.lineTo(600, 100);
    ctx.lineTo(630, 200);
    ctx.lineTo(600, 450);
    ctx.lineTo(450, 480);
    ctx.lineTo(250, 450);
    ctx.lineTo(80, 350);
    ctx.lineTo(100, 120);
    ctx.fill();
    ctx.stroke();
}

function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    let foundRegion = null;
    for (const region of provinceRegions) {
        if (x >= region.x && x <= region.x + region.w &&
            y >= region.y && y <= region.y + region.h) {
            foundRegion = region;
            break;
        }
    }
    
    if (foundRegion) {
        canvas.style.cursor = 'pointer';
        // Redraw map with highlight
        drawMap();
        
        // Highlight hovered region
        ctx.fillStyle = '#ffd700';
        ctx.strokeStyle = '#c60c30';
        ctx.lineWidth = 3;
        ctx.fillRect(foundRegion.x, foundRegion.y, foundRegion.w, foundRegion.h);
        ctx.strokeRect(foundRegion.x, foundRegion.y, foundRegion.w, foundRegion.h);
        
        // Show tooltip
        const prov = provinceData[foundRegion.name];
        if (prov) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            ctx.fillRect(x + 10, y - 40, 150, 40);
            
            ctx.fillStyle = '#ffd700';
            ctx.font = 'bold 11px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(prov.name, x + 15, y - 20);
            
            ctx.fillStyle = '#fff';
            ctx.font = '9px Arial';
            ctx.fillText(foundRegion.name, x + 15, y - 5);
        }
    } else {
        canvas.style.cursor = 'default';
        drawMap();
    }
}

function handleClick(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    for (const region of provinceRegions) {
        if (x >= region.x && x <= region.x + region.w &&
            y >= region.y && y <= region.y + region.h) {
            showRegionInfo(region.name);
            break;
        }
    }
}

function showRegionInfo(regionName) {
    const prov = provinceData[regionName];
    if (!prov) return;
    
    const panel = document.querySelector('.region-info-panel');
    const regionNameEl = document.getElementById('regionName');
    const regionContent = document.getElementById('regionContent');
    
    if (!panel || !regionNameEl || !regionContent) return;
    
    regionNameEl.textContent = `${prov.name} (${regionName})`;
    
    const tags = prov.culture.split(' | ').map(tag => 
        `<span class="tag">${tag}</span>`
    ).join('');
    
    regionContent.innerHTML = `
        <div class="culture-tags">
            ${tags}
        </div>
        <p class="province-description">${prov.desc}</p>
    `;
    
    panel.classList.add('active');
}

// Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = e.target.getAttribute('href');
        if (href?.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

document.getElementById('exploreBtn')?.addEventListener('click', () => {
    document.querySelector('#regions')?.scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('closeBtn')?.addEventListener('click', () => {
    document.querySelector('.region-info-panel')?.classList.remove('active');
});

document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('谢谢您的消息！我们会尽快回复。');
    e.target.reset();
});
