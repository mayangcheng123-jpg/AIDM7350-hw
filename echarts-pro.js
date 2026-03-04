// ECharts 初始化脚本 - 中国文化地图 (纯文本展示版)
(function(){
  console.log('[页面加载] echarts-pro.js 开始执行...');
  
  function startInit(){
    if(!window.echarts){
      console.log('[等待中] ECharts库尚未加载，100ms后重试...');
      return setTimeout(startInit, 100);
    }
    
    var mainContainer = document.getElementById('main');
    if(!mainContainer){
      console.log('[错误] 找不到id="main"的容器！');
      return;
    }
    
    console.log('[就绪] ECharts库已加载，DOM容器已找到');
    console.log('[尺寸] 容器大小:', mainContainer.clientWidth, 'x', mainContainer.clientHeight);
    
    loadAndRenderMap(mainContainer);
  }
  
  function loadAndRenderMap(container){
    console.log('[加载中] 正在获取china-map.json...');
    
    fetch('china-map.json')
      .then(function(res){
        if(!res.ok) throw new Error('HTTP ' + res.status);
        console.log('[成功] china-map.json 文件已获取');
        return res.json();
      })
      .then(function(geoJsonData){
        console.log('[成功] GeoJSON已解析，包含', geoJsonData.features.length, '个地区');
        console.log('[注册] 正在向ECharts注册中国地图...');
        echarts.registerMap('china', geoJsonData);
        console.log('[完成] 地图已注册');
        
        renderChart(container);
      })
      .catch(function(err){
        console.error('[错误] 地图加载失败:', err.message);
      });
  }
  
  function renderChart(container){
    console.log('[初始化] 创建ECharts实例...');
    var myChart = echarts.init(document.getElementById('main'));
    
    var name_title = "China Regional Cultural Heritage Map";
    var subname = 'Hover over provinces to explore heritage, traditions and specialties';
    var nameColor = "#c60c30";
    var name_fontFamily = '"Segoe UI", Arial, sans-serif';
    var subname_fontSize = 13;
    var name_fontSize = 22;
    var mapName = 'china';

    var geoCoordMap = {
      "北京":[116.41,39.90],"天津":[117.20,39.13],"河北":[114.48,38.03],"山西":[112.55,37.87],
      "内蒙古":[111.65,40.82],"辽宁":[123.43,41.80],"吉林":[125.35,43.88],"黑龙江":[126.63,45.75],
      "上海":[121.47,31.23],"江苏":[118.80,32.59],"浙江":[120.15,30.27],"安徽":[117.23,32.86],
      "福建":[119.30,26.09],"江西":[115.86,28.68],"山东":[117.00,36.64],"河南":[113.65,34.76],
      "湖北":[114.31,30.52],"湖南":[112.94,28.21],"重庆":[106.55,29.59],"四川":[104.07,30.67],
      "贵州":[106.71,26.57],"云南":[102.73,24.97],"西藏":[88.78,31.96],"陕西":[108.95,34.27],
      "甘肃":[103.73,36.45],"青海":[101.78,36.62],"宁夏":[106.27,38.47],"新疆":[87.68,43.77],
      "广东":[113.27,23.13],"广西":[108.33,22.82],"海南":[110.33,19.80]
    };

    var convertData = function(data){
      return data.map(function(item){
        if(!geoCoordMap[item.name]) return null;
        return [geoCoordMap[item.name][0], geoCoordMap[item.name][1], 1];
      }).filter(function(item){ return item != null; });
    };

    // 各省份文化信息数据 - 纯文本展示
    var provinceInfoData = {
      "北京": "故宫是中国古代皇帝的官邸和国家权力中心，是世界上保存最完整的木结构古建筑群。特产：京烤鸭、京绣、珐琅彩瓷",
      "天津": "天津是中国近代工业文明的摇篮，五大道保留了多国租界建筑群。特产：天津麻花、狗不理包子、泥塑",
      "河北": "长城是中国最伟大的防御建筑，象征着中华文明的坚韧与伟大。特产：京津冀陶瓷、宣化葡萄、蔚县皮影",
      "山西": "晋商是中国传统商业文明的代表，平遥古城是现存规模最大的明清古城。特产：陈醋、汾酒、平遥牛肉",
      "内蒙古": "呼伦贝尔草原是中国最美的草原，代表了蒙古族的游牧文化。特产：羊肉、奶酪、蒙古刀",
      "辽宁": "沈阳故宫是清朝皇帝在沈阳的重要宫殿，融合了汉蒙满文化特色。特产：鞍山钢铁、本邦人参、大连海参",
      "吉林": "长白山是中国东北最高峰，是满族发源地和宗教圣地。特产：长白山野山参、黑木耳、珍珠",
      "黑龙江": "哈尔滨冰雕是世界前三冰雪艺术节，展示了北方的冰雪文化。特产：貂皮、松茸、黑蜂蜜",
      "上海": "外滩是上海的标志，代表了中西文化交融的独特都市风景。特产：上海毛蟹、豫园灯笼、绣花鞋",
      "江苏": "苏州园林是中国古典园林艺术的典范，展现了东方美学的精妙设计。特产：苏州丝绸、阳澄湖大闸蟹、宜兴紫砂",
      "浙江": "西湖是中国最著名的湖泊，以其秀美风景和文化底蕴著称。特产：龙井茶、杭州丝绸、绍兴黄酒",
      "安徽": "黄山以其奇峰山脉、苍劲古松和云海景观而闻名于世。特产：黄山毛峰、歙砚、宣纸",
      "福建": "土楼是福建特有的大型圆形民居建筑，被誉为'神州第一民居'。特产：乌龙茶、福州漆器、寿山石雕",
      "江西": "三清山是江西最高的山峰，被誉为'东方瑞士'。特产：瓷器、龙井茶、景德镇陶瓷",
      "山东": "泰山是中国五岳之首，具有重要的文化和宗教意义。特产：烟台苹果、青岛海参、兖州煤炭",
      "河南": "少林寺是中国武术文化的圣地，是禅宗和少林功夫的发源地。特产：河南烤鸭、汝窑瓷器、灵芝",
      "湖北": "三峡是长江最壮观的景观，以其险峻地貌而闻名天下。特产：武汉鸭脖、恩施茶叶、宜昌陶瓷",
      "湖南": "张家界以其独特的石英砂岩峰林地貌被誉为'世界地质公园'。特产：湘江鱼、安化黑茶、瓷器",
      "重庆": "重庆山城以其独特的地形和迷人的夜景而著称于世。特产：火锅、三峡橙、荣昌陶瓷",
      "四川": "乐山大佛是世界最大的石刻佛像，展现了古代工程的伟大成就。特产：川贝、冬虫夏草、蜀绣",
      "贵州": "黄果树瀑布是中国最大的瀑布，气势磅礴，景色壮观。特产：茅台酒、侗族木雕、苗族银饰",
      "云南": "大理古城是滇西独立的文化中心，融合了白族和其他民族特色。特产：普洱茶、玉石、民族工艺品",
      "西藏": "布达拉宫是西藏的象征，是世界上海拔最高的古代宫殿建筑。特产：冬虫夏草、藏红花、天珠",
      "陕西": "秦兵马俑是古代陶制艺术的奇迹，展现了秦朝的军事辉煌。特产：陕西煤炭、苹果、青铜器复制品",
      "甘肃": "敦煌莫高窟是丝绸之路上的文化艺术瑰宝，保存大量佛教艺术作品。特产：敦煌葡萄干、夜光杯、砖雕",
      "青海": "青海湖是中国最大的内陆湖，展现了高原独特的自然风景。特产：青海湖鱼、虫草、藏羚羊绒",
      "宁夏": "贺兰山岩画是人类远古文化的记录，具有重要的历史价值。特产：枸杞、贺兰山石、宁夏滩羊肉",
      "新疆": "天池是新疆的明珠，高山湖泊的独特风景令人叹为观止。特产：葡萄干、羊肉、地毯",
      "广东": "广州塔是现代中国城市建筑的象征，见证了广东的飞速发展。特产：凉茶、广式茶点、木雕",
      "广西": "桂林山水甲天下，漓江的喀斯特地貌是中国最美的自然景观。特产：螺蛳粉、阳朔画廊、竹编工艺",
      "海南": "三亚是中国最南端的旅游胜地，拥有中国最美的热带海滨风景。特产：椰子制品、黄花梨、海参"
    };

    var data = [
      {name:"北京"},{name:"天津"},{name:"河北"},{name:"山西"},
      {name:"内蒙古"},{name:"辽宁"},{name:"吉林"},{name:"黑龙江"},
      {name:"上海"},{name:"江苏"},{name:"浙江"},{name:"安徽"},
      {name:"福建"},{name:"江西"},{name:"山东"},{name:"河南"},
      {name:"湖北"},{name:"湖南"},{name:"重庆"},{name:"四川"},
      {name:"贵州"},{name:"云南"},{name:"西藏"},{name:"陕西"},
      {name:"甘肃"},{name:"青海"},{name:"宁夏"},{name:"新疆"},
      {name:"广东"},{name:"广西"},{name:"海南"}
    ];

    var toolTipData = [
      {name:"北京",value:[{name:"Heritage",value:"Forbidden City, Temple of Heaven"},{name:"Specialty",value:"Peking Duck, Oolong Tea"}]},
      {name:"天津",value:[{name:"Heritage",value:"Ancient Riverports, Grand Canal"},{name:"Specialty",value:"Tianjin Dumplings, Clay Figurines"}]},
      {name:"河北",value:[{name:"Heritage",value:"Royal Tombs, Great Wall Sections"},{name:"Specialty",value:"Tangshan Ceramics, Amber Carvings"}]},
      {name:"山西",value:[{name:"Heritage",value:"Pingyao Ancient Town, Datong Grottoes"},{name:"Specialty",value:"Shanxi Vinegar, Hand-pulled Noodles"}]},
      {name:"内蒙古",value:[{name:"Heritage",value:"Genghis Khan Mausoleum, Grasslands"},{name:"Specialty",value:"Mongolian Lamb, Inner Mongolia Leather"}]},
      {name:"辽宁",value:[{name:"Heritage",value:"Mukden Palace, Liaoyang Pagodas"},{name:"Specialty",value:"Liaoning Ginseng, Dalian Seafood"}]},
      {name:"吉林",value:[{name:"Heritage",value:"Changbai Mountain, Ginseng Heritage"},{name:"Specialty",value:"Jilin Ginseng, Deer Antler, Long White Tea"}]},
      {name:"黑龙江",value:[{name:"Heritage",value:"Five Dragon Forests, Harbin Ice Festival"},{name:"Specialty",value:"Heilongjiang Rice, Pine Nuts"}]},
      {name:"上海",value:[{name:"Heritage",value:"The Bund, Yu Garden, Jadeite Carvings"},{name:"Specialty",value:"Shanghai Hairy Crabs, Mooncakes"}]},
      {name:"江苏",value:[{name:"Heritage",value:"Suzhou Gardens, Nanjing Ming Tomb"},{name:"Specialty",value:"Nanjing Silk, Jiangsu Brocade, Long Jing Tea"}]},
      {name:"浙江",value:[{name:"Heritage",value:"West Lake, Dragon Well Tea Culture"},{name:"Specialty",value:"Longjing Tea, Silk, West Lake Fish"}]},
      {name:"安徽",value:[{name:"Heritage",value:"Huangshan Mountain, Hui-style Architecture"},{name:"Specialty",value:"Anhui Xuan Paper, Ink, Anhui Keemun Tea"}]},
      {name:"福建",value:[{name:"Heritage",value:"Tulou Fortresses, Fujian Tea Culture"},{name:"Specialty",value:"Wuyi Rock Tea, Fujian Porcelain, Lacquerware"}]},
      {name:"江西",value:[{name:"Heritage",value:"Jingdezhen Porcelain, Lushan Mountain"},{name:"Specialty",value:"Jingdezhen Porcelain, Ganzhou Citrine"}]},
      {name:"山东",value:[{name:"Heritage",value:"Confucius Temple, Mount Tai, Qingzhou Porcelain"},{name:"Specialty",value:"Shandong Soy Sauce, Qingdao Beer, Jinan Pottery"}]},
      {name:"河南",value:[{name:"Heritage",value:"Shaolin Temple, Yellow River Culture, Luoyang Peony"},{name:"Specialty",value:"Henan Jujube, Longmen Grottoes Art, Porcelain"}]},
      {name:"湖北",value:[{name:"Heritage",value:"Three Gorges, Wuhan Ancient City"},{name:"Specialty",value:"Enshi Yulu Tea, Wuhan Hot Dry Noodles, Jade Carvings"}]},
      {name:"湖南",value:[{name:"Heritage",value:"Zhangjiajie Peaks, Changsha Stele Culture"},{name:"Specialty",value:"Yueyang Tea, Hunan Embroidery, Ancient Pottery"}]},
      {name:"重庆",value:[{name:"Heritage",value:"Three Gorges, Dazu Stone Carvings"},{name:"Specialty",value:"Chongqing Hotpot, Lichee, Wulong Tea"}]},
      {name:"四川",value:[{name:"Heritage",value:"Leshan Giant Buddha, Dujiangyan Ancient Dam"},{name:"Specialty",value:"Faced Lacquerware, Bamboo Embroidery, Sichuan Pepper"}]},
      {name:"贵州",value:[{name:"Heritage",value:"Dong Village Culture, Karst Landscape"},{name:"Specialty",value:"Guizhou Maotai Liquor, Minority Brocade, Anshun Batik"}]},
      {name:"云南",value:[{name:"Heritage",value:"Dali Ancient Town, Ethnic Diversity"},{name:"Specialty",value:"Pu-erh Tea, Yunnan Embroidery, Jade Carving"}]},
      {name:"西藏",value:[{name:"Heritage",value:"Potala Palace, Buddhist Culture, Tibetan Thangka"},{name:"Specialty",value:"Tibetan Butter Tea, Meditation Art, Yak Products"}]},
      {name:"陕西",value:[{name:"Heritage",value:"Terracotta Warriors, Silk Road, Ancient Xi'an"},{name:"Specialty",value:"Shaanxi Jujube, Huizhou Inkstone, Calligraphy"}]},
      {name:"甘肃",value:[{name:"Heritage",value:"Dunhuang Mogao Caves, Silk Road Heritage"},{name:"Specialty",value:"Gansu Medicinal Materials, Lanzhou Beef Noodles"}]},
      {name:"青海",value:[{name:"Heritage",value:"Qinghai Lake Culture, Tibetan Buddhism"},{name:"Specialty",value:"Qinghai Butter, Salt Lake Products, Yak Wool"}]},
      {name:"宁夏",value:[{name:"Heritage",value:"Helan Mountain Petroglyphs, Ningxia Textile"},{name:"Specialty",value:"Ningxia Wine, Goji Berry, Muslim Cuisine"}]},
      {name:"新疆",value:[{name:"Heritage",value:"Silk Road Oasis Towns, Uighur Culture"},{name:"Specialty",value:"Xinjiang Raisins, Turpan Grapes, Persian Carpets"}]},
      {name:"广东",value:[{name:"Heritage",value:"Cantonese Opera, Guangzhou Harbor Culture"},{name:"Specialty",value:"Guangdong Tea, Dim Sum, Silk Embroidery"}]},
      {name:"广西",value:[{name:"Heritage",value:"Guilin Landscape Art, Zhuang Minority Culture"},{name:"Specialty",value:"Liuzhou Snail Noodles, Zhuang Brocade, Guilin Inkstone"}]},
      {name:"海南",value:[{name:"Heritage",value:"Maritime Silk Road, Island Culture"},{name:"Specialty",value:"Hainan Coffee, Tropical Fruits, Shell Crafts"}]}
    ];

    var mapData = [
      {name:"北京"},{name:"天津"},{name:"河北"},{name:"山西"},
      {name:"内蒙古"},{name:"辽宁"},{name:"吉林"},{name:"黑龙江"},
      {name:"上海"},{name:"江苏"},{name:"浙江"},{name:"安徽"},
      {name:"福建"},{name:"江西"},{name:"山东"},{name:"河南"},
      {name:"湖北"},{name:"湖南"},{name:"重庆"},{name:"四川"},
      {name:"贵州"},{name:"云南"},{name:"西藏"},{name:"陕西"},
      {name:"甘肃"},{name:"青海"},{name:"宁夏"},{name:"新疆"},
      {name:"广东"},{name:"广西"},{name:"海南"}
    ];

    // Image data removed - pure text display only
    
    var option = {
      backgroundColor: 'rgba(245, 248, 250, 0.8)',
      title: {
        text: name_title,
        subtext: subname,
        x: 'center',
        top: '2%',
        textStyle: {
          color: nameColor,
          fontFamily: name_fontFamily,
          fontSize: name_fontSize,
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        },
        subtextStyle: {
          fontSize: subname_fontSize,
          fontFamily: name_fontFamily,
          color: '#666',
          lineHeight: 1.5
        }
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        borderColor: '#c60c30',
        borderWidth: 3,
        borderRadius: 8,
        textStyle: { color: '#333', fontSize: 13, lineHeight: 1.8 },
        padding: [15, 20],
        extraCssText: 'box-shadow: 0 6px 20px rgba(198, 12, 48, 0.25); backdrop-filter: blur(5px);',
        formatter: function(params){
          if(params.seriesType === 'scatter') {
            var html = '<div style="font-weight:bold;color:#c60c30;margin-bottom:12px;font-size:15px;border-bottom:2px solid #c60c30;padding-bottom:8px;">' + params.name + '</div>';
            for(var i=0;i<toolTipData.length;i++){
              if(params.name==toolTipData[i].name){
                for(var j=0;j<toolTipData[i].value.length;j++){
                  html += '<div style="margin:8px 0;"><span style="color:#c60c30;font-weight:bold;margin-right:6px;">●</span><span style="color:#1a5490;font-weight:bold;">' + toolTipData[i].value[j].name + ':</span> <span style="color:#555;">' + toolTipData[i].value[j].value + '</span></div>';
                }
              }
            }
            return html;
          } else if(params.seriesType === 'map') {
            var name = params.name;
            var html = '<div style="font-weight:bold;color:#c60c30;margin-bottom:12px;font-size:15px;border-bottom:2px solid #c60c30;padding-bottom:8px;">' + name + '</div>';
            for(var i=0;i<toolTipData.length;i++){
              if(name==toolTipData[i].name){
                for(var j=0;j<toolTipData[i].value.length;j++){
                  html += '<div style="margin:8px 0;"><span style="color:#c60c30;font-weight:bold;margin-right:6px;">●</span><span style="color:#1a5490;font-weight:bold;">' + toolTipData[i].value[j].name + ':</span> <span style="color:#555;">' + toolTipData[i].value[j].value + '</span></div>';
                }
              }
            }
            return html;
          }
          return params.name;
        }
      },
      visualMap: {
        show: false
      },
      geo: {
        show: true,
        map: mapName,
        label: { show: false },
        roam: true,
        scaleLimit: { min: 0.8, max: 3 },
        itemStyle: {
          normal: {
            areaColor: {
              type: 'linear',
              x: 0, y: 0, x2: 1, y2: 1,
              colorStops: [
                { offset: 0, color: '#e8f0f7' },
                { offset: 1, color: '#d0e4f0' }
              ]
            },
            borderColor: '#a8c5d8',
            borderWidth: 0.8,
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 3,
            shadowOffsetY: 2
          },
          emphasis: {
            areaColor: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: '#ff9999' },
                { offset: 1, color: '#e85454' }
              ]
            },
            borderColor: '#c60c30',
            borderWidth: 2,
            shadowColor: '#c60c30',
            shadowBlur: 8,
            shadowOffsetY: 4
          }
        }
      },
      series: [
        {
          name: 'Provinces',
          type: 'map',
          geoIndex: 0,
          data: mapData,
          label: { show: false },
          itemStyle: {
            normal: {
              areaColor: {
                type: 'linear',
                x: 0, y: 0, x2: 1, y2: 1,
                colorStops: [
                  { offset: 0, color: '#e8f0f7' },
                  { offset: 1, color: '#d0e4f0' }
              ]},
              borderColor: '#a8c5d8',
              borderWidth: 0.8,
              shadowColor: 'rgba(0, 0, 0, 0.05)',
              shadowBlur: 3
            },
            emphasis: {
              areaColor: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: '#ffb3b3' },
                  { offset: 1, color: '#e67777' }
              ]},
              borderColor: '#c60c30',
              borderWidth: 2,
              shadowColor: 'rgba(198, 12, 48, 0.3)',
              shadowBlur: 10,
              shadowOffsetY: 5
            }
          }
        }
      ],
      animation: true,
      animationDuration: 1000,
      animationEasing: 'cubicOut'
    };

    console.log('[执行] 调用setOption设置图表...');
    myChart.setOption(option);
    console.log('[完成] ✓✓✓ Map rendered successfully! ✓✓✓');
    
    // 添加点击事件处理 - 仅用于信息输出，无弹窗显示
    myChart.on('click', function(params) {
      console.log('[ECharts点击事件] 点击了:', params.name);
      if(params.seriesType === 'map') {
        var provinceName = params.name;
        if(provinceInfoData[provinceName]) {
          console.log('[省份信息]', provinceName, ':', provinceInfoData[provinceName]);
        }
      }
    });
    
    // 改进resize处理
    var resizeTimer;
    window.addEventListener('resize', function(){
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function(){
        myChart.resize();
      }, 300);
    });
  }
  
  if(document.readyState === 'loading'){
    console.log('[加载中] DOM尚未完全加载，等待DOMContentLoaded事件...');
    document.addEventListener('DOMContentLoaded', startInit);
  } else {
    console.log('[就绪] DOM已加载完成，直接初始化...');
    startInit();
  }
})();
