/**
 * 数据来源 & 审计
 * ----------------
 * 主源：world.hyatt.com/content/gp/en/rewards/award-chart-updates.html (2026-04-24)
 * 中文源：world.hyatt.com/content/gp/zh-hans/rewards/award-chart-updates.html
 * 交叉验证：TPG, OMAAT, Frequent Miler, 飞常旅客, 抛因特达人
 * 对比脚本：scripts/diff-official.js (vs official-data.json)
 * 坐标校验：scripts/audit-coords.js (Nominatim, 50km 阈值)
 * 最后审计：2026-04-26
 */

export const OLD_STD = {1:5000,2:8000,3:12000,4:15000,5:20000,6:25000,7:30000,8:40000};
export const OLD_PK  = {1:6500,2:9500,3:15000,4:18000,5:23000,6:29000,7:35000,8:45000};
export const NEW_MOD = {1:6000,2:10000,3:15000,4:20000,5:25000,6:30000,7:35000,8:55000};
export const NEW_TOP = {1:9000,2:15000,3:20000,4:25000,5:35000,6:40000,7:55000,8:75000};

export const hotels = [
  // ===== US Mainland (May 20) =====
  {n:"Andaz 5th Avenue",c:"New York, NY",r:"US",lat:40.7558,lng:-73.9839,o:7,nw:8},
  {n:"The Beekman, A Thompson Hotel",c:"New York, NY",r:"US",lat:40.7115,lng:-74.0061,o:6,nw:7},
  {n:"The Time New York",c:"New York, NY",r:"US",lat:40.7611,lng:-73.9831,o:6,nw:5},
  {n:"Hyatt Place Albany/Downtown",c:"Albany, NY",r:"US",lat:42.6493,lng:-73.7557,o:2,nw:3},
  {n:"Hyatt Place Buffalo/Amherst",c:"Amherst, NY",r:"US",lat:42.9806,lng:-78.7985,o:2,nw:3},
  {n:"Hyatt Place Garden City",c:"Garden City, NY",r:"US",lat:40.7268,lng:-73.6343,o:3,nw:4},
  {n:"Hyatt Place Saratoga/Malta",c:"Malta, NY",r:"US",lat:43.0006,lng:-73.7779,o:2,nw:3},
  {n:"Hyatt Regency Greenwich",c:"Old Greenwich, CT",r:"US",lat:41.0387,lng:-73.5712,o:3,nw:4},
  {n:"Hyatt House Boston/Waltham",c:"Waltham, MA",r:"US",lat:42.3736,lng:-71.2356,o:2,nw:3},
  {n:"Hyatt House Jersey City",c:"Jersey City, NJ",r:"US",lat:40.7178,lng:-74.0431,o:4,nw:5},
  {n:"Hyatt Regency Jersey City on the Hudson",c:"Jersey City, NJ",r:"US",lat:40.7245,lng:-74.0335,o:4,nw:5},
  {n:"Hyatt Regency New Brunswick",c:"New Brunswick, NJ",r:"US",lat:40.4882,lng:-74.4434,o:2,nw:3},
  {n:"Hyatt House Mt. Laurel",c:"Mt. Laurel, NJ",r:"US",lat:39.9343,lng:-74.8923,o:1,nw:2},
  {n:"Hyatt Place Mt. Laurel",c:"Mt. Laurel, NJ",r:"US",lat:39.9450,lng:-74.8830,o:1,nw:2},
  {n:"Hyatt Place Baltimore/BWI Airport",c:"Linthicum, MD",r:"US",lat:39.2098,lng:-76.6694,o:1,nw:2},
  {n:"Hyatt House Pittsburgh/Bloomfield/Shadyside",c:"Pittsburgh, PA",r:"US",lat:40.4615,lng:-79.9344,o:2,nw:3},
  {n:"Hyatt Place Blacksburg/University",c:"Blacksburg, VA",r:"US",lat:37.2284,lng:-80.4170,o:2,nw:3},
  {n:"The Carolina Inn",c:"Chapel Hill, NC",r:"US",lat:35.9132,lng:-79.0558,o:4,nw:5},
  {n:"Hyatt Place Chapel Hill/Southern Village",c:"Chapel Hill, NC",r:"US",lat:35.8780,lng:-79.0858,o:2,nw:3},
  {n:"Hyatt Place Durham/Southpoint",c:"Durham, NC",r:"US",lat:35.9118,lng:-78.9530,o:1,nw:2},
  {n:"Hyatt Place Raleigh-Durham Airport",c:"Morrisville, NC",r:"US",lat:35.8814,lng:-78.7872,o:2,nw:3},
  {n:"Hyatt House Raleigh Durham Airport",c:"Morrisville, NC",r:"US",lat:35.8758,lng:-78.7811,o:1,nw:2},
  {n:"Hyatt House Raleigh/RDU/Brier Creek",c:"Raleigh, NC",r:"US",lat:35.9032,lng:-78.7497,o:1,nw:2},
  {n:"Hyatt Place Sumter/Downtown",c:"Sumter, SC",r:"US",lat:33.9204,lng:-80.3414,o:1,nw:2},
  {n:"Hyatt Regency Coral Gables",c:"Coral Gables, FL",r:"US",lat:25.7215,lng:-80.2683,o:4,nw:5},
  {n:"Hyatt Centric Las Olas Fort Lauderdale",c:"Fort Lauderdale, FL",r:"US",lat:26.1224,lng:-80.1373,o:4,nw:5},
  {n:"Hyatt Regency Grand Cypress Resort",c:"Orlando, FL",r:"US",lat:28.4002,lng:-81.5081,o:4,nw:5},
  {n:"Hyatt House Orlando International",c:"Orlando, FL",r:"US",lat:28.4282,lng:-81.3164,o:2,nw:3},
  {n:"Hyatt Place Across From Universal Orlando Resort",c:"Orlando, FL",r:"US",lat:28.4756,lng:-81.4654,o:2,nw:3},
  {n:"Hyatt Place Orlando/I-Drive/Convention Center",c:"Orlando, FL",r:"US",lat:28.4287,lng:-81.4699,o:2,nw:3},
  {n:"Hyatt Place Lakeland Center",c:"Lakeland, FL",r:"US",lat:28.0395,lng:-81.9498,o:2,nw:3},
  {n:"Hyatt Place Tampa/Busch Gardens",c:"Tampa, FL",r:"US",lat:28.0381,lng:-82.4179,o:2,nw:3},
  {n:"Hyatt Place Tampa/Wesley Chapel",c:"Wesley Chapel, FL",r:"US",lat:28.2400,lng:-82.3263,o:2,nw:3},
  {n:"Hyatt Place Sarasota/Bradenton Airport",c:"Sarasota, FL",r:"US",lat:27.3964,lng:-82.5544,o:2,nw:3},
  {n:"Hyatt Place Sarasota/Lakewood Ranch",c:"Sarasota, FL",r:"US",lat:27.4081,lng:-82.4571,o:2,nw:3},
  {n:"Hyatt Regency Lexington",c:"Lexington, KY",r:"US",lat:38.0406,lng:-84.4953,o:2,nw:3},
  {n:"Hyatt Place Cincinnati Airport/Florence",c:"Florence, KY",r:"US",lat:39.0228,lng:-84.6500,o:1,nw:2},
  {n:"Dream Nashville",c:"Nashville, TN",r:"US",lat:36.1656,lng:-86.7806,o:5,nw:4},
  {n:"Hyatt Place Memphis/Wolfchase Galleria",c:"Memphis, TN",r:"US",lat:35.1962,lng:-89.7894,o:2,nw:1},
  {n:"Hyatt Regency New Orleans",c:"New Orleans, LA",r:"US",lat:29.9508,lng:-90.0769,o:3,nw:4},
  {n:"Hyatt Place Baton Rouge/I-10",c:"Baton Rouge, LA",r:"US",lat:30.4515,lng:-91.1871,o:1,nw:2},
  {n:"Hyatt Regency DFW International Airport",c:"Dallas/Fort Worth, TX",r:"US",lat:32.8950,lng:-97.0367,o:3,nw:4},
  {n:"Hyatt Place DFW",c:"Dallas/Fort Worth, TX",r:"US",lat:32.9000,lng:-97.0470,o:2,nw:3},
  {n:"Hyatt Centric Congress Avenue Austin",c:"Austin, TX",r:"US",lat:30.2657,lng:-97.7411,o:5,nw:4},
  {n:"Hyatt Place Waco - South",c:"Waco, TX",r:"US",lat:31.5002,lng:-97.1840,o:1,nw:2},
  {n:"Hyatt Lodge Oak Brook Chicago",c:"Oak Brook, IL",r:"US",lat:41.8290,lng:-87.9381,o:2,nw:3},
  {n:"Hyatt House Chicago/Oak Brook",c:"Oak Brook, IL",r:"US",lat:41.8424,lng:-87.9498,o:2,nw:3},
  {n:"Hyatt Place Chicago/Schaumburg",c:"Schaumburg, IL",r:"US",lat:42.0333,lng:-88.0834,o:1,nw:2},
  {n:"Hyatt Place Flint/Grand Blanc",c:"Grand Blanc, MI",r:"US",lat:42.9275,lng:-83.6299,o:1,nw:2},
  {n:"Hyatt House Columbus OSU/Short North",c:"Columbus, OH",r:"US",lat:39.9919,lng:-83.0033,o:2,nw:3},
  {n:"Hyatt Place Columbus/OSU",c:"Columbus, OH",r:"US",lat:39.9989,lng:-83.0173,o:2,nw:3},
  {n:"Hyatt Place Columbus/Dublin",c:"Dublin, OH",r:"US",lat:40.0992,lng:-83.1141,o:1,nw:2},
  {n:"Hyatt Place Columbus/Worthington",c:"Worthington, OH",r:"US",lat:40.0928,lng:-83.0179,o:1,nw:2},
  {n:"Hyatt Regency Columbus",c:"Columbus, OH",r:"US",lat:39.9613,lng:-82.9988,o:2,nw:3},
  {n:"Hyatt Place at Wichita State University",c:"Wichita, KS",r:"US",lat:37.7196,lng:-97.2932,o:1,nw:2},
  {n:"Hyatt Regency Wichita",c:"Wichita, KS",r:"US",lat:37.6873,lng:-97.3375,o:1,nw:2},
  {n:"Hyatt Place Lincoln/Downtown-Haymarket",c:"Lincoln, NE",r:"US",lat:40.8136,lng:-96.7068,o:2,nw:3},
  {n:"Hyatt Centric Downtown Denver",c:"Denver, CO",r:"US",lat:39.7464,lng:-104.9924,o:4,nw:3},
  {n:"Hyatt Place Tucson-Central",c:"Tucson, AZ",r:"US",lat:32.2344,lng:-110.9508,o:1,nw:2},
  {n:"Hotel Figueroa",c:"Los Angeles, CA",r:"US",lat:34.0489,lng:-118.2620,o:4,nw:5},
  {n:"Andaz West Hollywood",c:"West Hollywood, CA",r:"US",lat:34.0902,lng:-118.3852,o:6,nw:5},
  {n:"Hyatt Centric Delfina Santa Monica",c:"Santa Monica, CA",r:"US",lat:34.0212,lng:-118.4945,o:6,nw:5},
  {n:"Hyatt Place Santa Barbara",c:"Santa Barbara, CA",r:"US",lat:34.4186,lng:-119.6919,o:6,nw:5},
  {n:"Hyatt Place Santa Cruz",c:"Santa Cruz, CA",r:"US",lat:36.9741,lng:-122.0308,o:4,nw:5},
  {n:"The Laurel Inn",c:"San Francisco, CA",r:"US",lat:37.7849,lng:-122.4427,o:5,nw:6},
  {n:"Hyatt Regency Lake Tahoe Resort",c:"Incline Village, NV",r:"US",lat:39.2459,lng:-119.9419,o:5,nw:6},
  {n:"Hyatt Regency Seattle",c:"Seattle, WA",r:"US",lat:47.6107,lng:-122.3346,o:4,nw:5},
  {n:"Hyatt Regency Lake Washington at Seattle's Southport",c:"Renton, WA",r:"US",lat:47.4936,lng:-122.1973,o:3,nw:4},
  {n:"Hyatt House Anchorage",c:"Anchorage, AK",r:"US",lat:61.1814,lng:-149.8859,o:3,nw:4},
  {n:"Hyatt Place Bayam\u00f3n",c:"Bayam\u00f3n, PR",r:"US",lat:18.3989,lng:-66.1614,o:2,nw:3},
  {n:"Hyatt Place Manat\u00ed",c:"Manat\u00ed, PR",r:"US",lat:18.4283,lng:-66.4823,o:2,nw:3},
  {n:"Hyatt Place Houston NW/Vintage Park",c:"Houston, TX",r:"US",lat:29.9715,lng:-95.5555,o:1,nw:2},
  {n:"Hyatt Place San Antonio-Northwest/Medical Center",c:"San Antonio, TX",r:"US",lat:29.5083,lng:-98.6020,o:1,nw:2,early:true},
  {n:"The Barnett (JdV by Hyatt)",c:"New Orleans, LA",r:"US",lat:29.9511,lng:-90.0715,o:5,nw:4,early:true},
  // ===== Asia-Pacific =====
  {n:"Andaz Macau",c:"Macau, China",r:"AP",lat:22.156,lng:113.555,o:5,nw:4},
  {n:"Andaz Nanjing Hexi",c:"Nanjing, China",r:"AP",lat:32.005,lng:118.741,o:3,nw:2},
  {n:"Caption by Hyatt Namba Osaka",c:"Osaka, Japan",r:"AP",lat:34.665,lng:135.502,o:2,nw:3},
  {n:"Commune by the Great Wall",c:"Beijing, China",r:"AP",lat:40.432,lng:116.570,o:3,nw:2},
  {n:"Grand Hyatt Dalian",c:"Dalian, China",r:"AP",lat:38.914,lng:121.615,o:4,nw:3},
  {n:"Grand Hyatt Sanya Haitang Bay Resort",c:"Sanya, China",r:"AP",lat:18.274,lng:109.751,o:4,nw:3},
  {n:"Grand Hyatt Shenzhou Peninsula",c:"Hainan, China",r:"AP",lat:19.170,lng:110.670,o:4,nw:3},
  {n:"Hyatt Centric Hebbal Bengaluru",c:"Bengaluru, India",r:"AP",lat:13.036,lng:77.597,o:1,nw:2},
  {n:"Hyatt Centric MG Road Bangalore",c:"Bangalore, India",r:"AP",lat:12.976,lng:77.609,o:1,nw:2},
  {n:"Hyatt House Tokyo Shibuya",c:"Tokyo, Japan",r:"AP",lat:35.660,lng:139.701,o:5,nw:6},
  {n:"Hyatt Place Chongli",c:"Chongli, China",r:"AP",lat:40.970,lng:115.270,o:2,nw:1},
  {n:"Hyatt Place Goa Candolim",c:"Goa, India",r:"AP",lat:15.512,lng:73.762,o:1,nw:2},
  {n:"Hyatt Place Kyoto",c:"Kyoto, Japan",r:"AP",lat:35.008,lng:135.762,o:2,nw:3},
  {n:"Hyatt Regency Beijing Shiyuan",c:"Beijing, China",r:"AP",lat:39.970,lng:116.300,o:2,nw:1},
  {n:"Hyatt Regency Dehradun Resort & Spa",c:"Dehradun, India",r:"AP",lat:30.317,lng:78.032,o:2,nw:3},
  {n:"Hyatt Regency Dharamshala Resort",c:"Dharamshala, India",r:"AP",lat:32.219,lng:76.323,o:5,nw:4},
  {n:"Hyatt Regency Kuantan Resort",c:"Kuantan, Malaysia",r:"AP",lat:3.902,lng:103.418,o:1,nw:2},
  {n:"Hyatt Regency Sanya Tianli Bay",c:"Sanya, China",r:"AP",lat:18.290,lng:109.530,o:3,nw:2},
  {n:"Hyatt Regency Tokyo Bay",c:"Tokyo, Japan",r:"AP",lat:35.632,lng:139.907,o:3,nw:4},
  {n:"Park Hyatt Sanya Sunny Bay Resort",c:"Sanya, China",r:"AP",lat:18.410,lng:109.550,o:7,nw:6},
  {n:"Ronil Goa",c:"Goa, India",r:"AP",lat:15.553,lng:73.748,o:1,nw:2},
  {n:"The Standard, Singapore",c:"Singapore",r:"AP",lat:1.303,lng:103.835,o:5,nw:4},
  {n:"Andaz Pattaya Jomtien Beach",c:"Pattaya, Thailand",r:"AP",lat:12.883,lng:100.883,o:4,nw:5,early:true},
  {n:"Grand Hyatt Incheon",c:"Incheon, South Korea",r:"AP",lat:37.449,lng:126.450,o:3,nw:4,early:true},
  // ===== Europe =====
  {n:"Grand Hyatt Athens",c:"Athens, Greece",r:"EU",lat:37.970,lng:23.727,o:3,nw:4},
  {n:"Hotel Fluela Davos",c:"Davos, Switzerland",r:"EU",lat:46.800,lng:9.835,o:7,nw:8},
  {n:"H\u00f4tel du Louvre",c:"Paris, France",r:"EU",lat:48.863,lng:2.338,o:7,nw:8},
  {n:"Hyatt Place London City East",c:"London, UK",r:"EU",lat:51.516,lng:-0.070,o:4,nw:3},
  {n:"Hyatt Place Rouen",c:"Rouen, France",r:"EU",lat:49.443,lng:1.099,o:1,nw:2},
  {n:"Hyatt Regency Hesperia Madrid",c:"Madrid, Spain",r:"EU",lat:40.440,lng:-3.690,o:4,nw:5},
  {n:"Hyatt Regency Lisbon",c:"Lisbon, Portugal",r:"EU",lat:38.737,lng:-9.150,o:4,nw:5},
  {n:"Hyatt Regency Thessaloniki",c:"Thessaloniki, Greece",r:"EU",lat:40.613,lng:22.960,o:2,nw:3},
  {n:"Me and All Hotel Ulm",c:"Ulm, Germany",r:"EU",lat:48.400,lng:9.987,o:1,nw:2},
  {n:"Park Hyatt London River Thames",c:"London, UK",r:"EU",lat:51.490,lng:-0.008,o:7,nw:8},
  {n:"Story Hotel Stockholm North",c:"Stockholm, Sweden",r:"EU",lat:59.346,lng:18.044,o:1,nw:2},
  {n:"The Standard, Ibiza",c:"Ibiza, Spain",r:"EU",lat:38.910,lng:1.435,o:6,nw:7},
  {n:"AluaSoul Ibiza",c:"Ibiza, Spain",r:"EU",lat:38.911,lng:1.440,ai:true,oc:"A",nc:"B"},
  {n:"Dreams Jardin Tropical Resort & Spa",c:"Tenerife, Spain",r:"EU",lat:28.082,lng:-16.733,ai:true,oc:"B",nc:"C"},
  {n:"Dreams Lanzarote Playa Dorada",c:"Lanzarote, Spain",r:"EU",lat:28.840,lng:-13.770,ai:true,oc:"B",nc:"C"},
  {n:"Secrets Lanzarote Resort & Spa",c:"Lanzarote, Spain",r:"EU",lat:28.852,lng:-13.772,ai:true,oc:"B",nc:"C"},
  {n:"Hyatt Centric Malta",c:"St. Julian's, Malta",r:"EU",lat:35.922,lng:14.490,o:2,nw:3,early:true},
  {n:"Hyatt Regency Kotor Bay Resort",c:"Kotor, Montenegro",r:"EU",lat:42.452,lng:18.770,o:4,nw:5,early:true},
  // ===== Latin America / Caribbean / Canada =====
  {n:"Alila Mayakoba",c:"Riviera Maya, Mexico",r:"LA",lat:20.696,lng:-87.081,o:6,nw:7},
  {n:"Hyatt Centric Guatemala City",c:"Guatemala City, Guatemala",r:"LA",lat:14.602,lng:-90.507,o:2,nw:3},
  {n:"Hyatt Centric Las Condes Santiago",c:"Santiago, Chile",r:"LA",lat:-33.406,lng:-70.580,o:2,nw:3},
  {n:"Hyatt Centric Playa Del Carmen",c:"Playa Del Carmen, Mexico",r:"LA",lat:20.628,lng:-87.075,o:4,nw:3},
  {n:"Hyatt House Monterrey Valle/San Pedro",c:"Monterrey, Mexico",r:"LA",lat:25.666,lng:-100.300,o:1,nw:2},
  {n:"Hyatt Place Edmonton-West",c:"Edmonton, Canada",r:"LA",lat:53.544,lng:-113.580,o:1,nw:2},
  {n:"Hyatt Place Moncton/Downtown",c:"Moncton, Canada",r:"LA",lat:46.090,lng:-64.780,o:1,nw:2},
  {n:"Hyatt Place Monterrey Valle",c:"Monterrey, Mexico",r:"LA",lat:25.650,lng:-100.330,o:1,nw:2},
  {n:"Hyatt Place Saltillo",c:"Saltillo, Mexico",r:"LA",lat:25.423,lng:-101.005,o:1,nw:2},
  {n:"Hyatt Place San Jose/Pinares",c:"San Jose, Costa Rica",r:"LA",lat:9.934,lng:-84.050,o:1,nw:2},
  {n:"Hyatt Place San Pedro Sula",c:"San Pedro Sula, Honduras",r:"LA",lat:15.504,lng:-88.025,o:1,nw:2},
  {n:"Hyatt Place Santiago/Vitacura",c:"Santiago, Chile",r:"LA",lat:-33.400,lng:-70.580,o:1,nw:2},
  {n:"Hyatt Place Tegucigalpa",c:"Tegucigalpa, Honduras",r:"LA",lat:14.090,lng:-87.207,o:1,nw:2},
  {n:"Hyatt Place Windsor",c:"Windsor, Canada",r:"LA",lat:42.300,lng:-83.020,o:1,nw:2},
  {n:"Hyatt Regency Aruba Resort Spa and Casino",c:"Aruba",r:"LA",lat:12.578,lng:-70.042,o:7,nw:8},
  {n:"Secrets St. Lucia Resort & Spa",c:"St. Lucia",r:"LA",lat:14.000,lng:-60.950,ai:true,oc:"C",nc:"D"},
  {n:"Grand Hyatt Grand Cayman Resort & Spa",c:"Grand Cayman",r:"LA",lat:19.290,lng:-81.380,o:6,nw:8,early:true},
  // ===== Africa / Middle East =====
  {n:"Andaz Capital Gate, Abu Dhabi",c:"Abu Dhabi, UAE",r:"ME",lat:24.499,lng:54.391,o:3,nw:4},
  {n:"Grand Hyatt Kuwait Residences",c:"Kuwait City, Kuwait",r:"ME",lat:29.376,lng:47.977,o:4,nw:5},
  {n:"Grand Hyatt The Red Sea",c:"Red Sea, Saudi Arabia",r:"ME",lat:25.070,lng:36.900,o:7,nw:6},
  {n:"Hyatt Place Dubai Jumeirah",c:"Dubai, UAE",r:"ME",lat:25.085,lng:55.140,o:1,nw:2},
  {n:"Hyatt Place Riyadh Al Sulaimania",c:"Riyadh, Saudi Arabia",r:"ME",lat:24.710,lng:46.680,o:2,nw:3},
  {n:"Hyatt Regency Addis Ababa",c:"Addis Ababa, Ethiopia",r:"ME",lat:9.008,lng:38.760,o:3,nw:4},
  {n:"Hyatt Regency Al Kout Mall",c:"Kuwait City, Kuwait",r:"ME",lat:29.090,lng:48.130,o:4,nw:3},
  {n:"Hyatt Regency Cape Town",c:"Cape Town, South Africa",r:"ME",lat:-33.927,lng:18.415,o:1,nw:2},
  {n:"Hyatt Regency Riyadh Olaya",c:"Riyadh, Saudi Arabia",r:"ME",lat:24.694,lng:46.680,o:4,nw:5},
  {n:"Jabal Omar Hyatt Regency Makkah",c:"Mecca, Saudi Arabia",r:"ME",lat:21.422,lng:39.826,o:4,nw:5},
];

// Append ", US" to US hotel cities
hotels.forEach(h => { if(h.r === 'US') h.c += ', US'; });

// Brand extraction from hotel name
const BRAND_RE = [
  [/^Park Hyatt/i,'PH'],[/^Grand Hyatt/i,'GH'],[/^Hyatt Regency/i,'HR'],
  [/^Hyatt Centric/i,'HC'],[/^Hyatt Place/i,'HP'],[/^Hyatt House/i,'HH'],
  [/^Hyatt Lodge/i,'HL'],[/^Andaz/i,'AZ'],[/Thompson/i,'TH'],
  [/JdV|Barnett|Laurel Inn|Carolina Inn/i,'JV'],[/^Caption/i,'CB'],
  [/^Alila/i,'AL'],[/^The Standard/i,'TS'],[/^Dream/i,'DR'],
  [/^Secrets/i,'SE'],[/^Hotel F(igueroa|luela)/i,'JV'],[/^Hôtel du Louvre/i,'JV'],
  [/^Commune/i,'JV'],[/^Ronil/i,'JV'],[/^Story Hotel/i,'JV'],
  [/^Me and All/i,'JV'],[/^AluaSoul/i,'AI'],[/^Dreams /i,'AI'],
];

// Assign stable index, extract country and brand
hotels.forEach((h, i) => {
  h._i = i;
  const parts = h.c.split(', ');
  h._country = parts[parts.length - 1];
  h._brand = BRAND_RE.find(([r]) => r.test(h.n))?.[1] || 'OT';
});
