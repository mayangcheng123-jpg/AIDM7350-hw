// Province Data
const provinceData = {
    'Heilongjiang': { name: '黑龙江', culture: 'Ice Festival | Folk Opera | Ginseng', desc: 'Known for ice sculpture and winter festivals.' },
    'Jilin': { name: '吉林', culture: 'Mountains | Korean Heritage | Falls', desc: 'Features legendary Changbai Mountains.' },
    'Liaoning': { name: '辽宁', culture: 'Manchurian Heritage | Port Culture | Dynasty', desc: 'Rich Manchurian heritage.' },
    'Inner Mongolia': { name: '内蒙古', culture: 'Grassland | Horse Culture | Festival', desc: 'Nomadic heritage traditions.' },
    'Xinjiang': { name: '新疆', culture: 'Silk Road | Uighur Crafts | Oasis', desc: 'Historic trade crossroads.' },
    'Qinghai': { name: '青海', culture: 'Tibetan Buddhism | Sacred Lakes | Nomadic', desc: 'Tibetan Buddhist center.' },
    'Tibet': { name: '西藏', culture: 'Tibetan Buddhism | Potala Palace | Mountains', desc: 'Spiritual heart of Tibet.' },
    'Gansu': { name: '甘肃', culture: 'Silk Road | Mogao Caves | Great Wall', desc: 'Important Silk Road corridor.' },
    'Ningxia': { name: '宁夏', culture: 'Islamic Architecture | Muslim Heritage | Desert', desc: 'Islamic culture center.' },
    'Shaanxi': { name: '陕西', culture: 'Tang Dynasty | Warriors | River Culture', desc: 'Home of Terracotta Army.' },
    'Henan': { name: '河南', culture: 'Shaolin Temple | Kung Fu | Central Plains', desc: 'Legendary Shaolin Temple.' },
    'Shandong': { name: '山东', culture: 'Confucius | Mount Tai | Opera', desc: 'Birthplace of Confucianism.' },
    'Anhui': { name: '安徽', culture: 'Architecture | Landscape | Tea', desc: 'Distinctive Ming architecture.' },
    'Jiangsu': { name: '江苏', culture: 'Suzhou Gardens | Capital | Aesthetics', desc: 'World-renowned gardens.' },
    'Zhejiang': { name: '浙江', culture: 'West Lake | Silk | Tea', desc: 'Legendary West Lake.' },
    'Shanghai': { name: '上海', culture: 'Modern Hub | Water Town | Architecture', desc: 'Global trading center.' },
    'Jiangxi': { name: '江西', culture: 'Porcelain | Buddhist | Traditions', desc: 'Historic porcelain center.' },
    'Fujian': { name: '福建', culture: 'Min Culture | Buildings | Tea', desc: 'Unique Min traditions.' },
    'Guangdong': { name: '广东', culture: 'Cantonese Opera | Cuisine | Port', desc: 'Cantonese traditions.' },
    'Guangxi': { name: '广西', culture: 'Guilin | Karst | Minorities', desc: 'Spectacular karst scenery.' },
    'Yunnan': { name: '云南', culture: 'Minorities | Stone Forest | Silk Road', desc: 'Most diverse province.' },
    'Guizhou': { name: '贵州', culture: 'Ethnic Arts | Terraced | Crafts', desc: 'Vibrant ethnic cultures.' },
    'Sichuan': { name: '四川', culture: 'Pandas | Emei | Opera', desc: 'Legendary for pandas.' },
    'Chongqing': { name: '重庆', culture: 'Yangtze | Gorges | Mountain City', desc: 'Dramatic mountain city.' },
    'Hunan': { name: '湖南', culture: 'Literary Hub | Miao | Yangtze', desc: 'Literary center.' },
    'Hubei': { name: '湖北', culture: 'Chu Kingdom | Han River | Music', desc: 'Ancient Chu culture.' },
    'Shanxi': { name: '山西', culture: 'Jin Culture | Ancient Town | Coal', desc: 'Historic Jin Kingdom.' },
    'Hebei': { name: '河北', culture: 'North Plain | Wall | Mountain', desc: 'Northern plains.' },
    'Beijing': { name: '北京', culture: 'Imperial | Forbidden City | Wall', desc: 'Imperial capital.' },
    'Tianjin': { name: '天津', culture: 'Port | Architecture | Canal City', desc: 'Historic port.' },
    'Hong Kong': { name: '香港', culture: 'Colonial | Harbor | Modern', desc: 'Maritime center.' },
    'Macau': { name: '澳门', culture: 'Portuguese | Casino | Maritime', desc: 'Portuguese post.' },
    'Taiwan': { name: '台湾', culture: 'Aboriginal | Heritage | Tea', desc: 'Island culture.' }
};


let chart = null;

// Wait for DOM and ECharts
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initMap, 500);
});

function initMap() {
    const container = document.getElementById('china-map-echarts');
    if (!container) {
        console.log('容器未找到');
        return;
    }

    try {
        chart = echarts.init(container);

        // Prepare data
        const data = Array.from({length: 32}, (_, i) => ({
            value: Math.random() * 100,
            name: Object.keys(provinceData)[i] || 'Region ' + i
        }));

        const option = {
            backgroundColor: 'transparent',
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(0,0,0,0.8)',
                borderColor: '#c60c30',
                borderWidth: 2,
                textStyle: { 
                    color: '#fff',
                    fontSize: 12
                }
            },
            visualMap: {
                min: 0,
                max: 100,
                inRange: {
                    color: ['#e8f4f8', '#c60c30']
                },
                show: false
            },
            series: [{
                name: '中国地图',
                type: 'map',
                map: 'china',
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#f0f9ff',
                        borderColor: '#1a5490'
                    },
                    emphasis: {
                        areaColor: '#ffd700',
                        borderColor: '#c60c30',
                        borderWidth: 2
                    }
                },
                data: data
            }]
        };

        // Register built-in map
        if (window.echarts && window.echarts.registerMap) {
            // Use built-in China map
            const chinaGeoJSON = {
                "type": "FeatureCollection",
                "features": [
                    {"properties": {"name": "黑龙江"}, "type": "Feature"},
                    {"properties": {"name": "吉林"}, "type": "Feature"},
                    {"properties": {"name": "辽宁"}, "type": "Feature"},
                    {"properties": {"name": "内蒙古"}, "type": "Feature"},
                    {"properties": {"name": "新疆"}, "type": "Feature"},
                    {"properties": {"name": "青海"}, "type": "Feature"},
                    {"properties": {"name": "西藏"}, "type": "Feature"},
                    {"properties": {"name": "甘肃"}, "type": "Feature"},
                    {"properties": {"name": "宁夏"}, "type": "Feature"},
                    {"properties": {"name": "陕西"}, "type": "Feature"},
                    {"properties": {"name": "河南"}, "type": "Feature"},
                    {"properties": {"name": "山东"}, "type": "Feature"},
                    {"properties": {"name": "安徽"}, "type": "Feature"},
                    {"properties": {"name": "江苏"}, "type": "Feature"},
                    {"properties": {"name": "浙江"}, "type": "Feature"},
                    {"properties": {"name": "上海"}, "type": "Feature"},
                    {"properties": {"name": "江西"}, "type": "Feature"},
                    {"properties": {"name": "福建"}, "type": "Feature"},
                    {"properties": {"name": "广东"}, "type": "Feature"},
                    {"properties": {"name": "广西"}, "type": "Feature"},
                    {"properties": {"name": "云南"}, "type": "Feature"},
                    {"properties": {"name": "贵州"}, "type": "Feature"},
                    {"properties": {"name": "四川"}, "type": "Feature"},
                    {"properties": {"name": "重庆"}, "type": "Feature"},
                    {"properties": {"name": "湖南"}, "type": "Feature"},
                    {"properties": {"name": "湖北"}, "type": "Feature"},
                    {"properties": {"name": "山西"}, "type": "Feature"},
                    {"properties": {"name": "河北"}, "type": "Feature"},
                    {"properties": {"name": "北京"}, "type": "Feature"},
                    {"properties": {"name": "天津"}, "type": "Feature"},
                    {"properties": {"name": "香港"}, "type": "Feature"},
                    {"properties": {"name": "澳门"}, "type": "Feature"}
                ]
            };
            echarts.registerMap('china', chinaGeoJSON);
        }
        
        chart.setOption(option);

        // Click handler
        chart.on('click', function(params) {
            const name = params.name;
            if (provinceData[name] || Object.values(provinceData).some(p => p.name === name)) {
                showInfo(name);
            }
        });

        // Resize handler
        window.addEventListener('resize', () => {
            if (chart) chart.resize();
        });

    } catch (error) {
        console.error('地图错误:', error);
        container.style.backgroundColor = '#f9f9f9';
        container.innerHTML = '<div style="padding: 40px; text-align: center; color: #999;">地图加载中...</div>';
    }
}

function showInfo(region) {
    const panel = document.querySelector('.region-info-panel');
    const name = document.getElementById('regionName');
    const content = document.getElementById('regionContent');

    if (!panel || !name || !content) return;

    let info = provinceData[region];
    if (!info) {
        for (const p of Object.values(provinceData)) {
            if (p.name.includes(region) || region.includes(p.name)) {
                info = p;
                break;
            }
        }
    }

    if (info) {
        name.textContent = `${info.name} (${region})`;
        content.innerHTML = `
            <div class="culture-tags">
                ${info.culture.split(' | ').map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <p class="province-description">${info.desc}</p>
        `;
        panel.classList.add('active');
    }
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
    alert('谢谢您的消息！');
    e.target.reset();
});
