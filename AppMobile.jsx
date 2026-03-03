import { useState, useRef } from "react";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, PieChart, Pie, Cell, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, ComposedChart,
  ReferenceLine
} from "recharts";

// ═══════════════════════════════════════════════════════════
//  PALETA
// ═══════════════════════════════════════════════════════════
const C = {
  bg:"#080b12", surface:"#0f1320", card:"#141928", border:"#1e2438",
  acc:"#f5a623", blue:"#38bdf8", green:"#34d399", red:"#f87171",
  purple:"#a78bfa", teal:"#2dd4bf", pink:"#f472b6", orange:"#fb923c",
  text:"#e2e8f4", muted:"#5a6480",
  cric:"#38bdf8", arar:"#f472b6",
};

// ═══════════════════════════════════════════════════════════
//  DADOS — 100% verificados contra planilha fonte
//  Semanas: ["12/12","19/12","09/01","16/01","23/01","30/01","06/02","13/02","20/02"]
// ═══════════════════════════════════════════════════════════

// ── Pré-Venda ─────────────────────────────────────────────
const PV = [
  {w:"12/12",leads:39,qual:16,taxaQ:41.0,brSem:8, brNaSem:null,brMes:null},
  {w:"19/12",leads:27,qual:15,taxaQ:55.6,brSem:14,brNaSem:null,brMes:null},
  {w:"09/01",leads:24,qual:9, taxaQ:37.5,brSem:3, brNaSem:null,brMes:null},
  {w:"16/01",leads:25,qual:11,taxaQ:44.0,brSem:7, brNaSem:null,brMes:null},
  {w:"23/01",leads:31,qual:5, taxaQ:16.1,brSem:11,brNaSem:4,   brMes:20  },
  {w:"30/01",leads:47,qual:17,taxaQ:36.2,brSem:2, brNaSem:5,   brMes:28  },
  {w:"06/02",leads:28,qual:7, taxaQ:25.0,brSem:2, brNaSem:7,   brMes:9   },
  {w:"13/02",leads:56,qual:21,taxaQ:37.5,brSem:2, brNaSem:2,   brMes:16  },
  {w:"20/02",leads:66,qual:20,taxaQ:30.3,brSem:1, brNaSem:1,   brMes:18  },
  {w:"01/03",leads:76,qual:13,taxaQ:17.1,brSem:0, brNaSem:7,   brMes:30  },
];
const PV_C = [ // Criciúma
  {w:"12/12",leads:39,qual:16,taxaQ:41.0,brSem:8},
  {w:"19/12",leads:27,qual:15,taxaQ:55.6,brSem:14},
  {w:"09/01",leads:24,qual:9, taxaQ:37.5,brSem:3},
  {w:"16/01",leads:25,qual:11,taxaQ:44.0,brSem:7},
  {w:"23/01",leads:31,qual:5, taxaQ:16.1,brSem:4,brMes:20},
  {w:"30/01",leads:47,qual:17,taxaQ:36.2,brSem:5,brMes:28},
  {w:"06/02",leads:28,qual:7, taxaQ:25.0,brSem:7,brMes:9},
  {w:"13/02",leads:48,qual:17,taxaQ:35.4,brSem:1,brMes:12},
  {w:"20/02",leads:42,qual:8, taxaQ:19.0,brSem:1,brMes:14},
  {w:"01/03",leads:56,qual:8, taxaQ:14.3,brSem:0,brMes:25},
];
const PV_A = [ // Araranguá — dados a partir de 13/02
  {w:"13/02",leads:8, qual:4, taxaQ:50.0,brSem:1,brMes:4},
  {w:"20/02",leads:24,qual:12,taxaQ:50.0,brSem:0,brMes:4},
  {w:"01/03",leads:20,qual:5, taxaQ:25.0,brSem:0,brMes:5},
];

// ── Vendas Total ──────────────────────────────────────────
const VD = [
  {w:"12/12",cS:0, aS:0,  vS:0,      cM:0,  aM:0,  vM:0,      nQ:10,nA:27,nR:404350, pipe:0,  cart:0       },
  {w:"19/12",cS:2, aS:6,  vS:54700,  cM:0,  aM:0,  vM:0,      nQ:7, nA:9, nR:116370, pipe:0,  cart:0       },
  {w:"09/01",cS:1, aS:1,  vS:2900,   cM:1,  aM:1,  vM:2900,   nQ:5, nA:5, nR:48840,  pipe:14, cart:1157160 },
  {w:"16/01",cS:2, aS:6,  vS:82389,  cM:3,  aM:7,  vM:85289,  nQ:17,nA:18,nR:196380, pipe:20, cart:1156580 },
  {w:"23/01",cS:2, aS:2,  vS:18420,  cM:5,  aM:9,  vM:103709, nQ:19,nA:39,nR:327447, pipe:45, cart:1735049 },
  {w:"30/01",cS:8, aS:10, vS:107902, cM:13, aM:19, vM:211611, nQ:23,nA:24,nR:266083, pipe:51, cart:1787764 },
  {w:"06/02",cS:2, aS:4,  vS:12210,  cM:2,  aM:4,  vM:12210,  nQ:27,nA:35,nR:371175, pipe:76, cart:2040994 },
  {w:"13/02",cS:2, aS:7,  vS:50000,  cM:4,  aM:11, vM:62210,  nQ:11,nA:11,nR:97380,  pipe:62, cart:2116056 },
  {w:"20/02",cS:4, aS:13, vS:83886,  cM:8,  aM:24, vM:146096, nQ:8, nA:8, nR:142260, pipe:69, cart:2186056 },
  {w:"01/03",cS:6, aS:25, vS:245885, cM:13, aM:48, vM:376931, nQ:13,nA:14,nR:416628, pipe:71, cart:2485305 },
];
// Criciúma
const VD_C = [
  {w:"12/12",cS:0,aS:0,  vS:0,     cM:null,aM:null,vM:null,  nQ:10,nA:27,nR:404350, pipe:null,cart:null   },
  {w:"19/12",cS:2,aS:6,  vS:54700, cM:null,aM:null,vM:null,  nQ:7, nA:9, nR:116370, pipe:null,cart:null   },
  {w:"09/01",cS:1,aS:1,  vS:2900,  cM:1,   aM:1,   vM:2900,  nQ:5, nA:5, nR:48840,  pipe:14,  cart:1157160},
  {w:"16/01",cS:2,aS:6,  vS:82389, cM:3,   aM:7,   vM:85289, nQ:17,nA:18,nR:196380, pipe:20,  cart:1156580},
  {w:"23/01",cS:1,aS:1,  vS:4420,  cM:4,   aM:8,   vM:89709, nQ:8, nA:21,nR:208285, pipe:27,  cart:1364865},
  {w:"30/01",cS:7,aS:9,  vS:91099, cM:11,  aM:17,  vM:180808,nQ:22,nA:23,nR:251083, pipe:32,  cart:1402580},
  {w:"06/02",cS:0,aS:0,  vS:0,     cM:0,   aM:0,   vM:0,     nQ:16,nA:24,nR:294980, pipe:39,  cart:1703840},
  {w:"13/02",cS:1,aS:1,  vS:15000, cM:1,   aM:1,   vM:15000, nQ:8, nA:8, nR:67380,  pipe:44,  cart:1745220},
  {w:"20/02",cS:3,aS:12, vS:71260, cM:4,   aM:13,  vM:86260, nQ:6, nA:6, nR:122260, pipe:49,  cart:1795220},
  {w:"01/03",cS:6,aS:25, vS:245885,cM:9,  aM:37,  vM:317095,nQ:9, nA:9, nR:129628, pipe:48,  cart:1807468},
];
// Araranguá
const VD_A = [
  {w:"23/01",cS:1,aS:1,vS:14000, cM:1, aM:1, vM:14000, nQ:11,nA:18,nR:119162,pipe:18,cart:370184},
  {w:"30/01",cS:1,aS:1,vS:16803, cM:2, aM:2, vM:30803, nQ:1, nA:1, nR:15000, pipe:19,cart:385184},
  {w:"06/02",cS:2,aS:4,vS:12210, cM:2, aM:4, vM:12210, nQ:11,nA:11,nR:76195, pipe:37,cart:337154},
  {w:"13/02",cS:1,aS:6,vS:35000, cM:3, aM:10,vM:47210, nQ:3, nA:3, nR:30000, pipe:18,cart:370836},
  {w:"20/02",cS:1,aS:1,vS:12626, cM:4, aM:11,vM:59836, nQ:2, nA:2, nR:20000, pipe:20,cart:390836},
  {w:"01/03",cS:0,aS:0, vS:0,     cM:4, aM:11,vM:59836, nQ:4, nA:5, nR:287000,pipe:23,cart:677836},
];

// ── Conferência ───────────────────────────────────────────
const CF = [
  {w:"12/12",conf:15,vConf:182540, aConf:67,vaConf:708389,atr:5, vAtr:45500  },
  {w:"19/12",conf:9, vConf:76012,  aConf:78,vaConf:632377,atr:11,vAtr:143050 },
  {w:"09/01",conf:2, vConf:10562,  aConf:76,vaConf:621815,atr:32,vAtr:315370 },
  {w:"16/01",conf:2, vConf:29300,  aConf:78,vaConf:592515,atr:33,vAtr:317427 },
  {w:"23/01",conf:13,vConf:128850, aConf:62,vaConf:463665,atr:34,vAtr:330977 },
  {w:"30/01",conf:4, vConf:62154,  aConf:78,vaConf:577182,atr:38,vAtr:267177 },
  {w:"06/02",conf:4, vConf:63570,  aConf:90,vaConf:588827,atr:35,vAtr:203607 },
  {w:"13/02",conf:10,vConf:102925, aConf:94,vaConf:956305,atr:24,vAtr:183357 },
  {w:"20/02",conf:15,vConf:80435,  aConf:88,vaConf:511200,atr:11,vAtr:47125  },
  {w:"01/03",conf:12,vConf:20541,  aConf:86,vaConf:479363,atr:9, vAtr:58073  },
];

// ── Produção ──────────────────────────────────────────────
const PROD = [
  {w:"12/12",iniS:5, finS:3, tmp:3, iniM:null,finM:null},
  {w:"19/12",iniS:1, finS:2, tmp:5, iniM:null,finM:null},
  {w:"09/01",iniS:7, finS:0, tmp:0, iniM:7,   finM:0  },
  {w:"16/01",iniS:0, finS:7, tmp:5, iniM:7,   finM:7  },
  {w:"23/01",iniS:5, finS:5, tmp:4, iniM:12,  finM:12 },
  {w:"30/01",iniS:1, finS:1, tmp:2, iniM:13,  finM:13 },
  {w:"06/02",iniS:9, finS:9, tmp:2, iniM:9,   finM:9  },
  {w:"13/02",iniS:3, finS:3, tmp:4, iniM:12,  finM:12 },
  {w:"20/02",iniS:10,finS:10,tmp:4, iniM:22,  finM:22 },
  {w:"01/03",iniS:4, finS:4, tmp:4, iniM:26,  finM:26 },
];

// ── Pré-Montagem ──────────────────────────────────────────
const PM = [
  {w:"16/01",iniS:6,finS:2,tmp:null,iniM:6, finM:2},
  {w:"23/01",iniS:5,finS:2,tmp:1,   iniM:11,finM:4},
  {w:"30/01",iniS:1,finS:2,tmp:1,   iniM:12,finM:6},
  {w:"06/02",iniS:7,finS:3,tmp:1,   iniM:7, finM:3},
  {w:"13/02",iniS:2,finS:1,tmp:2,   iniM:9, finM:4},
  {w:"20/02",iniS:3,finS:2,tmp:2,   iniM:12,finM:6},
  {w:"01/03",iniS:15,finS:14,tmp:2,  iniM:28,finM:20},
];

// ── Montagem ──────────────────────────────────────────────
const MONT = [
  {w:"12/12",iniS:5,concS:1,iniM:null,concM:null,pend:null},
  {w:"19/12",iniS:5,concS:0,iniM:null,concM:null,pend:null},
  {w:"09/01",iniS:0,concS:0,iniM:0,   concM:0,   pend:null},
  {w:"16/01",iniS:2,concS:1,iniM:2,   concM:1,   pend:null},
  {w:"23/01",iniS:2,concS:1,iniM:4,   concM:2,   pend:null},
  {w:"30/01",iniS:9,concS:2,iniM:13,  concM:4,   pend:null},
  {w:"06/02",iniS:0,concS:0,iniM:0,   concM:0,   pend:8  },
  {w:"13/02",iniS:8,concS:5,iniM:8,   concM:5,   pend:5  },
  {w:"20/02",iniS:1,concS:1,iniM:9,   concM:6,   pend:10 },
  {w:"01/03",iniS:3,concS:3,iniM:12,  concM:9,   pend:10 },
];

// ── Assistência Técnica ───────────────────────────────────
// Criciúma = Total (Araranguá sem dados registrados)
const AT = [
  {w:"12/12",cham:0,ini:0,fin:4,aberto:43},
  {w:"19/12",cham:0,ini:0,fin:9,aberto:34},
  {w:"09/01",cham:0,ini:2,fin:0,aberto:34},
  {w:"16/01",cham:2,ini:6,fin:6,aberto:30},
  {w:"23/01",cham:1,ini:8,fin:5,aberto:26},
  {w:"30/01",cham:0,ini:6,fin:4,aberto:22},
  {w:"06/02",cham:1,ini:8,fin:5,aberto:18},
  {w:"13/02",cham:1,ini:9,fin:5,aberto:14},
  {w:"20/02",cham:5,ini:4,fin:4,aberto:15},
  {w:"01/03",cham:14,ini:7,fin:5,aberto:24},
];

// ── SAC ───────────────────────────────────────────────────
const SAC = [
  {w:"12/12",cobr:2, recl:2,google:3,clt:3, resol:0,   pubRet:0,cham:0,nps:null,nota:null},
  {w:"19/12",cobr:13,recl:0,google:0,clt:11,resol:0,   pubRet:0,cham:0,nps:null,nota:null},
  {w:"09/01",cobr:13,recl:0,google:0,clt:13,resol:0,   pubRet:0,cham:0,nps:null,nota:null},
  {w:"16/01",cobr:5, recl:1,google:1,clt:7, resol:0,   pubRet:0,cham:2,nps:null,nota:null},
  {w:"23/01",cobr:5, recl:0,google:0,clt:5, resol:0,   pubRet:0,cham:1,nps:null,nota:null},
  {w:"30/01",cobr:15,recl:0,google:0,clt:15,resol:0,   pubRet:5,cham:0,nps:null,nota:null},
  {w:"06/02",cobr:21,recl:0,google:1,clt:21,resol:0,   pubRet:0,cham:1,nps:null,nota:null},
  {w:"13/02",cobr:18,recl:0,google:0,clt:18,resol:3,   pubRet:0,cham:1,nps:60,  nota:8.8 },
  {w:"20/02",cobr:17,recl:0,google:0,clt:17,resol:null,pubRet:0,cham:5,nps:null,nota:null},
  {w:"01/03",cobr:29,recl:0,google:0,clt:29,resol:1,   pubRet:0,cham:14,nps:null,nota:null},
];

// ── Financeiro ────────────────────────────────────────────
const FIN = [
  {w:"12/12",mg:null, cond:0,   vCont:0,     ent:null,  parc:null, aym:null,  cart:null, saldo:null},
  {w:"19/12",mg:null, cond:50,  vCont:54700, ent:null,  parc:null, aym:null,  cart:null, saldo:null},
  {w:"09/01",mg:81.8, cond:100, vCont:2900,  ent:0,     parc:2900, aym:0,     cart:0,    saldo:0   },
  {w:"16/01",mg:70.9, cond:100, vCont:76420, ent:24500, parc:0,    aym:51920, cart:0,    saldo:0   },
  {w:"23/01",mg:79.4, cond:100, vCont:4420,  ent:0,     parc:0,    aym:0,     cart:4420, saldo:0   },
  {w:"30/01",mg:68.3, cond:100, vCont:91099, ent:39582, parc:0,    aym:27087, cart:17710,saldo:6721},
  {w:"06/02",mg:71.9, cond:100, vCont:12210, ent:6900,  parc:0,    aym:5310,  cart:0,    saldo:0   },
  {w:"13/02",mg:64.1, cond:100, vCont:50000, ent:23800, parc:0,    aym:17500, cart:0,    saldo:8700},
  {w:"20/02",mg:70.3, cond:100, vCont:83886, ent:2750,  parc:0,    aym:53460, cart:28676,saldo:0   },
  {w:"01/03",mg:59.2, cond:100, vCont:245885,ent:33500, parc:26449,aym:123616,cart:0,    saldo:62320},
];
// % mix pagamento por semana
const FIN_PAY = [
  {w:"09/01",ent:0,   parc:100, aym:0,    cart:0,    saldo:0  },
  {w:"16/01",ent:32.1,parc:0,   aym:67.9, cart:0,    saldo:0  },
  {w:"23/01",ent:0,   parc:0,   aym:0,    cart:100,  saldo:0  },
  {w:"30/01",ent:43.4,parc:0,   aym:29.7, cart:19.4, saldo:7.4},
  {w:"06/02",ent:56.5,parc:0,   aym:43.5, cart:0,    saldo:0  },
  {w:"13/02",ent:47.6,parc:0,   aym:35.0, cart:0,    saldo:17.4},
  {w:"20/02",ent:3.3, parc:0,   aym:63.7, cart:34.2, saldo:0  },
  {w:"01/03",ent:13.6,parc:10.8, aym:50.3, cart:0,    saldo:25.3},
];

// ── RH ────────────────────────────────────────────────────
// Horas extras convertidas de timedelta para horas decimais:
// 1 day, 0:00:00 = 24h | 2 days, 22:38:00 = 70.63h | etc.
const RH = [
  {w:"12/12",abs:15.9,to:0.0,  hExt:67.93,admT:0,demT:0,total:null,loja:null,fab:null,abL:null,abF:null,toF:0,   hExtL:null, hExtF:null},
  {w:"19/12",abs:13.1,to:2.7,  hExt:48.0, admT:0,demT:0,total:null,loja:null,fab:null,abL:null,abF:null,toF:null,hExtL:null, hExtF:null},
  {w:"09/01",abs:10.1,to:5.6,  hExt:24.0, admT:0,demT:0,total:34,  loja:17,  fab:17,  abL:7.2, abF:13.0,toF:5.6, hExtL:14.23,hExtF:9.77},
  {w:"16/01",abs:11.1,to:2.9,  hExt:70.63,admT:1,demT:1,total:34,  loja:17,  fab:17,  abL:6.5, abF:15.6,toF:5.9, hExtL:14.53,hExtF:56.1},
  {w:"23/01",abs:8.6, to:4.3,  hExt:60.73,admT:2,demT:1,total:35,  loja:17,  fab:18,  abL:8.5, abF:8.7, toF:8.3, hExtL:20.63,hExtF:40.1},
  {w:"30/01",abs:0.0, to:5.7,  hExt:92.9, admT:2,demT:2,total:35,  loja:17,  fab:18,  abL:null,abF:null,toF:11.1,hExtL:27.07,hExtF:65.83},
  {w:"06/02",abs:3.8, to:4.2,  hExt:90.23,admT:2,demT:1,total:36,  loja:17,  fab:19,  abL:1.55,abF:5.96,toF:7.9, hExtL:26.18,hExtF:64.05},
  {w:"13/02",abs:3.7, to:4.1,  hExt:43.57,admT:2,demT:1,total:37,  loja:16,  fab:21,  abL:2.17,abF:5.17,toF:4.8, hExtL:18.8, hExtF:24.77},
  {w:"20/02",abs:2.4, to:1.4,  hExt:52.3, admT:0,demT:1,total:36,  loja:16,  fab:20,  abL:0.51,abF:4.27,toF:2.5, hExtL:11.52,hExtF:40.78},
  {w:"01/03",abs:3.41,to:1.43, hExt:115.17,admT:0,demT:1,total:35,  loja:16,  fab:19,  abL:1.2, abF:5.62,toF:2.63,hExtL:39.77,hExtF:75.40},
];
// Perda de produção por absenteísmo (apenas 09/01 e 16/01 têm dados)
const RH_PERDA = [
  {w:"09/01",hFalta:97.24, perdaPecas:243.1,perdaAmbSem:1.62,perdaAmbMes:6.48},
  {w:"16/01",hFalta:116.69,perdaPecas:291.7,perdaAmbSem:1.94,perdaAmbMes:7.78},
];

// ── Marketing ─────────────────────────────────────────────
const MKT_E = [ // Ennebê — apenas 2 semanas
  {w:"13/02",inv:2084.44,invM:3880.27,cpcG:0.47,cpcM:0.87,rej:92.1,roasS:7.19, roasM:3.86, acS:885, acM:1675,seg:10709,eng:1.06},
  {w:"20/02",inv:2225.99,invM:6781.28,cpcG:0.41,cpcM:0.77,rej:91.2,roasS:32.46,roasM:10.65,acS:1238,acM:2883,seg:10738,eng:1.40},
  {w:"01/03",inv:1896.19,invM:8117.87,cpcG:0.19,cpcM:0.85,rej:93.3,roasS:71.05,roasM:25.36,acS:2253,acM:5104,seg:10813,eng:1.30},
];
const MKT_I = [ // Idealle
  {w:"13/02",inv:319.83,invM:516.74,cpcG:1.24,cpcM:1.00,rej:57.5,roasS:109.43,roasM:67.73,acS:111,acM:310,seg:6258,eng:0.40},
  {w:"20/02",inv:511.57,invM:990.81,cpcG:1.22,cpcM:0.75,rej:56.2,roasS:0,     roasM:0,    acS:115,acM:359,seg:6265,eng:0.60},
  {w:"01/03",inv:372.62, invM:1325.95,cpcG:1.28,cpcM:1.10,rej:57.1,roasS:0,    roasM:0,    acS:77, acM:401,seg:6278,eng:0},
];

// ── Soberanos ─────────────────────────────────────────────
const SOB = {
  backlog:13.75,metaBack:4,entPrazo:83.3,metaEnt:90,margContr:49,metaMarg:45,
  ambAEntregar:275,capProd:20,ambEntregues:18,ambNoPrazo:15,
  fat:360000,impostos:36000,cv:75600,dv:72000,contratos:10,ambientes:30,
  tickContFat:36000,tickAmbFat:12000,
};

// ═══════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════
const brl = v => {
  if (v==null||isNaN(v)) return "–";
  if (Math.abs(v)>=1e6) return `R$ ${(v/1e6).toFixed(2)}M`;
  if (Math.abs(v)>=1e3) return `R$ ${(v/1e3).toFixed(1)}K`;
  return `R$ ${v}`;
};
const trend = (arr,key) => {
  const vs = arr.map(d=>d[key]).filter(v=>v!=null&&!isNaN(v));
  if (vs.length<2) return null;
  const [p,c]=[vs.at(-2),vs.at(-1)];
  if (!p) return null;
  return ((c-p)/Math.abs(p)*100).toFixed(1);
};
const pct2str = v => v==null?'–':`${(v*100).toFixed(1)}%`;

// ═══════════════════════════════════════════════════════════
//  UI ATOMS
// ═══════════════════════════════════════════════════════════
const Tip = ({active,payload,label,fmt})=>{
  if(!active||!payload?.length) return null;
  return (
    <div style={{background:"#1a1f30",border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 12px"}}>
      <div style={{color:C.muted,fontSize:11,marginBottom:4}}>{label}</div>
      {payload.map((p,i)=>(
        <div key={i} style={{fontSize:12,color:p.color}}>
          {p.name}: <b>{fmt?fmt(p.value):p.value}</b>
        </div>
      ))}
    </div>
  );
};

function Badge({v,inv=false}){
  if(v==null) return null;
  const n=parseFloat(v);
  const good=inv?n<0:n>0;
  const col=n===0?C.muted:good?C.green:C.red;
  return <span style={{fontSize:10,color:col,fontWeight:700,marginLeft:4}}>{n>0?"▲":"▼"} {Math.abs(n)}%</span>;
}

function K({label,val,unit,sub,tp,inv=false,color=C.acc,full=false}){
  return (
    <div style={{background:C.card,borderRadius:12,padding:"14px 16px",
      borderLeft:`3px solid ${color}`,flex:full?'none':1,minWidth:0,
      width:full?'100%':'auto',boxSizing:'border-box'}}>
      <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:.8,marginBottom:4}}>{label}</div>
      <div style={{display:"flex",alignItems:"baseline",gap:3,flexWrap:"wrap"}}>
        <span style={{fontSize:21,fontWeight:700,color:C.text,lineHeight:1}}>{val??'–'}</span>
        {unit&&<span style={{fontSize:11,color:C.muted}}>{unit}</span>}
        <Badge v={tp} inv={inv}/>
      </div>
      {sub&&<div style={{fontSize:11,color:C.muted,marginTop:3}}>{sub}</div>}
    </div>
  );
}

const R2 = ({children,gap=10,mb=10})=>(
  <div style={{display:"flex",gap,marginBottom:mb}}>{children}</div>
);

function Box({title,children,mb=12,note}){
  return (
    <div style={{background:C.card,borderRadius:12,padding:"14px 16px",marginBottom:mb}}>
      {title&&<div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:.7,marginBottom:12,fontWeight:600}}>{title}</div>}
      {children}
      {note&&<div style={{fontSize:10,color:C.muted,marginTop:8,fontStyle:'italic'}}>{note}</div>}
    </div>
  );
}

const H2 = ({icon,title})=>(
  <div style={{display:"flex",alignItems:"center",gap:8,margin:"16px 0 12px"}}>
    <span style={{fontSize:18}}>{icon}</span>
    <span style={{fontSize:13,fontWeight:700,color:C.text}}>{title}</span>
  </div>
);

const HR = ()=><div style={{height:1,background:C.border,margin:"20px 0"}}/>;

function GoalBar({label,val,goal,unit,color,rev=false}){
  const ok=rev?val<=goal:val>=goal;
  return (
    <div style={{marginBottom:10}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
        <span style={{fontSize:12,color:C.text}}>{label}</span>
        <span style={{fontSize:12,fontWeight:700,color:ok?C.green:C.red}}>
          {val}{unit} <span style={{color:C.muted,fontWeight:400}}>/ {goal}{unit}</span>
        </span>
      </div>
      <div style={{background:"#1a1f30",borderRadius:4,height:5}}>
        <div style={{width:`${Math.min((val/goal)*100,100)}%`,height:5,borderRadius:4,background:ok?C.green:color}}/>
      </div>
    </div>
  );
}

function CmpChip({label,vc,va,fmt,unit}){
  const f=fmt||(v=>v==null?'–':String(v));
  const vs=(v)=>v!=null?`${f(v)}${unit?' '+unit:''}`:f(null);
  return (
    <div style={{background:C.card,borderRadius:10,padding:"10px 14px",marginBottom:8}}>
      <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:.8,marginBottom:7}}>{label}</div>
      <div style={{display:"flex"}}>
        <div style={{flex:1,borderRight:`1px solid ${C.border}`,paddingRight:10}}>
          <div style={{fontSize:8,color:C.cric,marginBottom:2}}>🔵 CRICIÚMA</div>
          <div style={{fontSize:18,fontWeight:700,color:C.cric}}>{vs(vc)}</div>
        </div>
        <div style={{flex:1,paddingLeft:10}}>
          <div style={{fontSize:8,color:C.arar,marginBottom:2}}>🩷 ARARANGUÁ</div>
          <div style={{fontSize:18,fontWeight:700,color:C.arar}}>{vs(va)}</div>
        </div>
      </div>
    </div>
  );
}

function InfoTag({color=C.acc,icon,text}){
  return (
    <div style={{background:C.surface,border:`1px solid ${color}`,borderRadius:8,
      padding:"8px 12px",marginBottom:12,fontSize:11,color,display:"flex",gap:6,alignItems:"flex-start"}}>
      <span>{icon}</span><span>{text}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  PÁGINAS
// ═══════════════════════════════════════════════════════════

function PgInicio(){
  const lv=VD.at(-1),lp=PV.at(-1),lc=CF.at(-1),lf=FIN.at(-1),
        lr=RH.at(-1),lat=AT.at(-1),lm=MONT.at(-1);
  const radar=[
    {a:"MKT",v:72},
    {a:"Pré-Venda",v:Math.round(lp.taxaQ)},
    {a:"Vendas",v:lv.cart>2000000?90:75},
    {a:"Conferência",v:Math.round((1-lc.atr/lc.aConf)*100)},
    {a:"Produção",v:88},
    {a:"Montagem",v:Math.round((1-lat.aberto/43)*100)},
    {a:"SAC",v:63},
    {a:"RH",v:Math.round((1-lr.abs/20)*100)},
    {a:"Financeiro",v:Math.round(lf.mg||0)},
  ];
  return (
    <div>
      <div style={{textAlign:"center",marginBottom:14,padding:"10px",
        background:C.surface,borderRadius:12,border:`1px solid ${C.border}`}}>
        <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Semana de Referência</div>
        <div style={{fontSize:18,fontWeight:800,color:C.acc}}>20 de Fevereiro de 2026</div>
        <div style={{fontSize:10,color:C.muted}}>Série histórica: dez/2025 → fev/2026 (9 semanas)</div>
      </div>

      <Box title="Funil Comercial — Semana 20/02">
        <div style={{display:"flex",gap:0}}>
          {[
            {l:"Leads",v:lp.leads,c:C.blue},
            {l:"Qualif.",v:lp.qual,c:C.teal},
            {l:"Brief.",v:lp.brSem,c:C.purple},
            {l:"Negoc.",v:lv.nQ,c:C.acc},
            {l:"Contr.",v:lv.cS,c:C.green},
          ].map((it,i,a)=>(
            <div key={i} style={{flex:1,textAlign:"center",position:"relative"}}>
              <div style={{fontSize:i===0?19:18,fontWeight:800,color:it.c}}>{it.v}</div>
              <div style={{fontSize:8,color:C.muted,marginTop:1}}>{it.l}</div>
              {i<a.length-1&&<div style={{position:"absolute",right:-5,top:"28%",color:C.border,fontSize:14}}>›</div>}
            </div>
          ))}
        </div>
        <div style={{marginTop:8,display:"flex",justifyContent:"center",gap:16}}>
          {[
            {l:"Leads→Qual",v:`${lp.taxaQ}%`,c:C.blue},
            {l:"Qual→Cont",v:`${((lv.cS/Math.max(lp.qual,1))*100).toFixed(0)}%`,c:C.green},
            {l:"Leads→Cont",v:`${((lv.cS/lp.leads)*100).toFixed(1)}%`,c:C.acc},
          ].map((it,i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <div style={{fontSize:13,fontWeight:700,color:it.c}}>{it.v}</div>
              <div style={{fontSize:8,color:C.muted}}>{it.l}</div>
            </div>
          ))}
        </div>
      </Box>

      <H2 icon="💰" title="Comercial"/>
      <R2><K label="Carteira Total" val={brl(lv.cart)} tp={trend(VD,"cart")} color={C.green}/>
          <K label="Pipeline" val={lv.pipe} unit="clientes" tp={trend(VD,"pipe")} color={C.blue}/></R2>
      <R2><K label="Contratos (sem.)" val={lv.cS} tp={trend(VD,"cS")} color={C.acc} sub={brl(lv.vS)}/>
          <K label="Contratos (mês)" val={lv.cM} color={C.purple} sub={brl(lv.vM)}/></R2>

      <HR/>
      <H2 icon="⚙️" title="Operacional"/>
      <R2><K label="Atrasados" val={lc.atr} tp={trend(CF,"atr")} inv color={C.red} sub={brl(lc.vAtr)}/>
          <K label="Conferidos" val={lc.conf} tp={trend(CF,"conf")} color={C.green} sub={brl(lc.vConf)}/></R2>
      <R2><K label="Prod. Finalizados" val={PROD.at(-1).finS} unit="amb" tp={trend(PROD,"finS")} color={C.blue}/>
          <K label="Mont. Pendentes" val={lm.pend} color={C.orange}/></R2>
      <R2><K label="AT em Aberto" val={lat.aberto} tp={trend(AT,"aberto")} inv color={C.red}/>
          <K label="Chamados SAC" val={SAC.at(-1).cobr} tp={trend(SAC,"cobr")} inv color={C.acc}/></R2>

      <HR/>
      <H2 icon="📊" title="Saúde por Área (score estimado)"/>
      <Box>
        <ResponsiveContainer width="100%" height={260}>
          <RadarChart data={radar}>
            <PolarGrid stroke={C.border}/>
            <PolarAngleAxis dataKey="a" tick={{fill:C.muted,fontSize:9}}/>
            <PolarRadiusAxis angle={30} domain={[0,100]} tick={{fill:C.muted,fontSize:8}} tickCount={4}/>
            <Radar name="Score" dataKey="v" stroke={C.acc} fill={C.acc} fillOpacity={0.2} strokeWidth={2}/>
            <Tooltip content={<Tip fmt={v=>`${v}/100`}/>}/>
          </RadarChart>
        </ResponsiveContainer>
        <div style={{fontSize:9,color:C.muted,textAlign:"center"}}>Score 0-100 baseado nos KPIs disponíveis</div>
      </Box>

      <HR/>
      <H2 icon="📈" title="Financeiro & RH"/>
      <R2><K label="Margem Bruta" val={`${lf.mg}%`} tp={trend(FIN.filter(d=>d.mg),"mg")} color={C.purple}/>
          <K label="Absenteísmo" val={`${lr.abs}%`} tp={trend(RH,"abs")} inv color={C.red}/></R2>
      <R2><K label="Turn Over" val={`${lr.to}%`} tp={trend(RH,"to")} inv color={C.acc}/>
          <K label="Colaboradores" val={lr.total} unit="pessoas" color={C.blue} sub={`Loja ${lr.loja} | Fab. ${lr.fab}`}/></R2>
    </div>
  );
}

function PgComercial(){
  const lpT=PV.at(-1),lpC=PV_C.at(-1),lpA=PV_A.at(-1);
  const lvT=VD.at(-1),lvC=VD_C.at(-1),lvA=VD_A.at(-1);

  const compLeads=[
    ...PV_C.slice(0,7).map(d=>({w:d.w,cric:d.leads,arar:0})),
    {w:"13/02",cric:48,arar:8},
    {w:"20/02",cric:42,arar:24},
  ];
  const compContratos=[
    {w:"12/12",cric:0,    arar:0},
    {w:"19/12",cric:54700,arar:0},
    {w:"09/01",cric:2900, arar:0},
    {w:"16/01",cric:82389,arar:0},
    {w:"23/01",cric:4420, arar:14000},
    {w:"30/01",cric:91099,arar:16803},
    {w:"06/02",cric:0,    arar:12210},
    {w:"13/02",cric:15000,arar:35000},
    {w:"20/02",cric:71260,arar:12626},
  ];
  const compCarteira=[
    {w:"23/01",cric:1364865,arar:370184},
    {w:"30/01",cric:1402580,arar:385184},
    {w:"06/02",cric:1703840,arar:337154},
    {w:"13/02",cric:1745220,arar:370836},
    {w:"20/02",cric:1795220,arar:390836},
  ];
  const compPipe=[
    {w:"09/01",cric:14,arar:0},
    {w:"16/01",cric:20,arar:0},
    {w:"23/01",cric:27,arar:18},
    {w:"30/01",cric:32,arar:19},
    {w:"06/02",cric:39,arar:37},
    {w:"13/02",cric:44,arar:18},
    {w:"20/02",cric:49,arar:20},
  ];

  return (
    <div>
      <H2 icon="🎯" title="Pré-Venda — Total"/>
      <R2><K label="Leads" val={lpT.leads} tp={trend(PV,"leads")} color={C.blue}/>
          <K label="Qualificados" val={lpT.qual} tp={trend(PV,"qual")} color={C.acc}/></R2>
      <R2><K label="Taxa Qualif." val={`${lpT.taxaQ}%`} tp={trend(PV,"taxaQ")} color={C.green}/>
          <K label="Brief. Semana" val={lpT.brSem} tp={trend(PV,"brSem")} color={C.purple}/></R2>
      <R2><K label="Brief. na Semana" val={lpT.brNaSem} tp={trend(PV,"brNaSem")} color={C.teal}/>
          <K label="Brief. no Mês" val={lpT.brMes} color={C.orange}/></R2>

      <Box title="Leads vs Qualificados vs Brief. Semana">
        <ResponsiveContainer width="100%" height={190}>
          <BarChart data={PV} barSize={8}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis tick={{fill:C.muted,fontSize:9}}/>
            <Tooltip content={<Tip/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Bar dataKey="leads" name="Leads" fill={C.blue} radius={[3,3,0,0]}/>
            <Bar dataKey="qual"  name="Qualif." fill={C.acc} radius={[3,3,0,0]}/>
            <Bar dataKey="brSem" name="Brief." fill={C.purple} radius={[3,3,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Box title="Taxa de Qualificação (%)">
        <ResponsiveContainer width="100%" height={150}>
          <AreaChart data={PV}>
            <defs><linearGradient id="gTQ" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={C.acc} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={C.acc} stopOpacity={0}/>
            </linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${v}%`}/>
            <Tooltip content={<Tip fmt={v=>`${v}%`}/>}/>
            <Area type="monotone" dataKey="taxaQ" name="Taxa Qual." stroke={C.acc} fill="url(#gTQ)" strokeWidth={2}/>
          </AreaChart>
        </ResponsiveContainer>
      </Box>

      <HR/>
      <H2 icon="🔵🩷" title="Pré-Venda: Criciúma vs Araranguá"/>
      <InfoTag color={C.arar} icon="ℹ️" text="Araranguá começou a registrar leads em 13/02. Dados anteriores sem separação."/>
      <CmpChip label="Leads — Semana 20/02" vc={42} va={24}/>
      <CmpChip label="Qualificados" vc={8} va={12}/>
      <CmpChip label="Taxa de Qualificação" vc={19.0} va={50.0} unit="%"/>
      <CmpChip label="Briefings no Mês" vc={14} va={4}/>

      <Box title="Leads Criciúma vs Araranguá por Semana">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={compLeads} barSize={10}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis tick={{fill:C.muted,fontSize:9}}/>
            <Tooltip content={<Tip/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Bar dataKey="cric" name="Criciúma" fill={C.cric} radius={[3,3,0,0]}/>
            <Bar dataKey="arar" name="Araranguá" fill={C.arar} radius={[3,3,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <HR/>
      <H2 icon="💰" title="Vendas — Total"/>
      <R2><K label="Contratos Sem." val={lvT.cS} tp={trend(VD,"cS")} color={C.acc} sub={`${lvT.aS} amb • ${brl(lvT.vS)}`}/>
          <K label="Contratos Mês" val={lvT.cM} color={C.purple} sub={`${lvT.aM} amb • ${brl(lvT.vM)}`}/></R2>
      <R2><K label="Negoc. Ativas" val={lvT.nQ} tp={trend(VD,"nQ")} inv color={C.blue} sub={`${lvT.nA} amb • ${brl(lvT.nR)}`}/>
          <K label="Pipeline" val={lvT.pipe} tp={trend(VD,"pipe")} color={C.green}/></R2>
      <K label="Carteira de Negociações" val={brl(lvT.cart)} tp={trend(VD,"cart")} color={C.green} full/>
      <div style={{marginBottom:10}}/>

      <Box title="Valor Contratos por Semana (R$)">
        <ResponsiveContainer width="100%" height={170}>
          <ComposedChart data={VD}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${(v/1000).toFixed(0)}K`}/>
            <YAxis yAxisId="r" orientation="right" tick={{fill:C.muted,fontSize:9}}/>
            <Tooltip content={<Tip fmt={brl}/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Bar yAxisId="l" dataKey="vS" name="Val. Semana" fill={C.acc} radius={[3,3,0,0]} barSize={10}/>
            <Line yAxisId="r" type="monotone" dataKey="cS" name="Contratos" stroke={C.green} strokeWidth={2.5} dot={{r:3,fill:C.green}}/>
          </ComposedChart>
        </ResponsiveContainer>
      </Box>

      <Box title="Carteira Acumulada de Negociações (R$)">
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={VD.filter(d=>d.cart>0)}>
            <defs><linearGradient id="gCart" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={C.green} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={C.green} stopOpacity={0}/>
            </linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${(v/1e6).toFixed(1)}M`}/>
            <Tooltip content={<Tip fmt={brl}/>}/>
            <Area type="monotone" dataKey="cart" name="Carteira" stroke={C.green} fill="url(#gCart)" strokeWidth={2}/>
          </AreaChart>
        </ResponsiveContainer>
      </Box>

      <Box title="Pipeline de Clientes em Negociação">
        <ResponsiveContainer width="100%" height={150}>
          <AreaChart data={VD.filter(d=>d.pipe>0)}>
            <defs><linearGradient id="gPipe" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={C.blue} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={C.blue} stopOpacity={0}/>
            </linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis tick={{fill:C.muted,fontSize:9}}/>
            <Tooltip content={<Tip/>}/>
            <Area type="monotone" dataKey="pipe" name="Clientes Pipeline" stroke={C.blue} fill="url(#gPipe)" strokeWidth={2}/>
          </AreaChart>
        </ResponsiveContainer>
      </Box>

      <HR/>
      <H2 icon="🔵🩷" title="Vendas: Criciúma vs Araranguá"/>
      <CmpChip label="Contratos Semana" vc={lvC.cS} va={lvA.cS}/>
      <CmpChip label="Valor Contratos (sem.)" vc={lvC.vS} va={lvA.vS} fmt={brl}/>
      <CmpChip label="Contratos no Mês" vc={lvC.cM} va={lvA.cM}/>
      <CmpChip label="Valor no Mês" vc={lvC.vM} va={lvA.vM} fmt={brl}/>
      <CmpChip label="Pipeline (clientes)" vc={lvC.pipe} va={lvA.pipe}/>
      <CmpChip label="Carteira Acumulada" vc={lvC.cart} va={lvA.cart} fmt={brl}/>

      <Box title="Valor Contratos Semana — Criciúma vs Araranguá">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={compContratos} barSize={10}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${(v/1000).toFixed(0)}K`}/>
            <Tooltip content={<Tip fmt={brl}/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Bar dataKey="cric" name="Criciúma" fill={C.cric} radius={[3,3,0,0]}/>
            <Bar dataKey="arar" name="Araranguá" fill={C.arar} radius={[3,3,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Box title="Carteira — Criciúma vs Araranguá (R$)">
        <ResponsiveContainer width="100%" height={170}>
          <LineChart data={compCarteira}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${(v/1e6).toFixed(1)}M`}/>
            <Tooltip content={<Tip fmt={brl}/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Line type="monotone" dataKey="cric" name="Criciúma" stroke={C.cric} strokeWidth={2.5} dot={{r:3}}/>
            <Line type="monotone" dataKey="arar" name="Araranguá" stroke={C.arar} strokeWidth={2.5} dot={{r:3}}/>
          </LineChart>
        </ResponsiveContainer>
      </Box>

      <Box title="Pipeline de Clientes — Criciúma vs Araranguá">
        <ResponsiveContainer width="100%" height={170}>
          <LineChart data={compPipe}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis tick={{fill:C.muted,fontSize:9}}/>
            <Tooltip content={<Tip/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Line type="monotone" dataKey="cric" name="Criciúma" stroke={C.cric} strokeWidth={2} dot={{r:3}}/>
            <Line type="monotone" dataKey="arar" name="Araranguá" stroke={C.arar} strokeWidth={2} dot={{r:3}}/>
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </div>
  );
}

function PgOperacional(){
  const lc=CF.at(-1),lp=PROD.at(-1),lpm=PM.at(-1),lm=MONT.at(-1),lat=AT.at(-1);
  return (
    <div>
      <H2 icon="📋" title="Conferência"/>
      <R2><K label="Conferidos (sem.)" val={lc.conf} tp={trend(CF,"conf")} color={C.green} sub={brl(lc.vConf)}/>
          <K label="A Conferir" val={lc.aConf} tp={trend(CF,"aConf")} inv color={C.blue} sub={brl(lc.vaConf)}/></R2>
      <K label="Ambientes Atrasados" val={lc.atr} tp={trend(CF,"atr")} inv color={C.red} sub={`Valor em risco: ${brl(lc.vAtr)}`} full/>
      <div style={{marginBottom:10}}/>

      <Box title="Conferidos / Atrasados por Semana">
        <ResponsiveContainer width="100%" height={190}>
          <ComposedChart data={CF}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="r" orientation="right" tick={{fill:C.muted,fontSize:9}}/>
            <Tooltip content={<Tip/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Bar yAxisId="l" dataKey="conf"  name="Conferidos"  fill={C.green} radius={[3,3,0,0]} barSize={9}/>
            <Bar yAxisId="l" dataKey="atr"   name="Atrasados"   fill={C.red}   radius={[3,3,0,0]} barSize={9}/>
            <Line yAxisId="r" type="monotone" dataKey="aConf" name="A Conferir" stroke={C.blue} strokeWidth={2} dot={{r:2}}/>
          </ComposedChart>
        </ResponsiveContainer>
      </Box>

      <Box title="Valor a Conferir vs Valor em Risco (R$)">
        <ResponsiveContainer width="100%" height={170}>
          <LineChart data={CF}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${(v/1000).toFixed(0)}K`}/>
            <Tooltip content={<Tip fmt={brl}/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Line type="monotone" dataKey="vaConf" name="Val. a Conferir" stroke={C.blue}  strokeWidth={2} dot={{r:2}}/>
            <Line type="monotone" dataKey="vAtr"   name="Val. em Risco"   stroke={C.red}   strokeWidth={2} dot={{r:2}}/>
            <Line type="monotone" dataKey="vConf"  name="Val. Conferido"  stroke={C.green} strokeWidth={2} dot={{r:2}}/>
          </LineChart>
        </ResponsiveContainer>
      </Box>

      <HR/>
      <H2 icon="🏭" title="Produção"/>
      <R2><K label="Iniciados Sem." val={lp.iniS} tp={trend(PROD,"iniS")} color={C.blue}/>
          <K label="Finalizados Sem." val={lp.finS} tp={trend(PROD,"finS")} color={C.green}/></R2>
      <R2><K label="Tempo Médio" val={lp.tmp} unit="dias/amb" tp={trend(PROD,"tmp")} inv color={C.acc}/>
          <K label="Finalizados Mês" val={lp.finM} color={C.purple}/></R2>

      <Box title="Produção: Iniciados + Finalizados + Tempo Médio">
        <ResponsiveContainer width="100%" height={190}>
          <ComposedChart data={PROD}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="r" orientation="right" tick={{fill:C.muted,fontSize:9}} domain={[0,7]}/>
            <Tooltip content={<Tip/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Bar yAxisId="l" dataKey="iniS" name="Iniciados"   fill={C.blue}  radius={[3,3,0,0]} barSize={10}/>
            <Bar yAxisId="l" dataKey="finS" name="Finalizados" fill={C.green} radius={[3,3,0,0]} barSize={10}/>
            <Line yAxisId="r" type="monotone" dataKey="tmp" name="Tempo Médio(d)" stroke={C.acc} strokeWidth={2} dot={{r:3}}/>
          </ComposedChart>
        </ResponsiveContainer>
      </Box>

      <Box title="Acumulado Mensal — Produção">
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={PROD.filter(d=>d.finM!=null)}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis tick={{fill:C.muted,fontSize:9}}/>
            <Tooltip content={<Tip/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Line type="monotone" dataKey="iniM" name="Inic. Mês" stroke={C.blue}  strokeWidth={2} dot={{r:3}}/>
            <Line type="monotone" dataKey="finM" name="Fin. Mês"  stroke={C.green} strokeWidth={2} dot={{r:3}}/>
          </LineChart>
        </ResponsiveContainer>
      </Box>

      <HR/>
      <H2 icon="🔨" title="Pré-Montagem"/>
      <R2><K label="Iniciados Sem." val={lpm.iniS} tp={trend(PM,"iniS")} color={C.blue}/>
          <K label="Finalizados Sem." val={lpm.finS} tp={trend(PM,"finS")} color={C.green}/></R2>
      <R2><K label="Tempo Médio" val={lpm.tmp} unit="dias" tp={trend(PM,"tmp")} inv color={C.acc}/>
          <K label="Finalizados Mês" val={lpm.finM} color={C.purple}/></R2>

      <Box title="Pré-Montagem: Iniciados vs Finalizados">
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={PM} barSize={12}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis tick={{fill:C.muted,fontSize:9}}/>
            <Tooltip content={<Tip/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Bar dataKey="iniS" name="Iniciados"   fill={C.blue}  radius={[3,3,0,0]}/>
            <Bar dataKey="finS" name="Finalizados" fill={C.green} radius={[3,3,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <HR/>
      <H2 icon="🔧" title="Montagem"/>
      <R2><K label="Iniciados Sem." val={lm.iniS} tp={trend(MONT,"iniS")} color={C.blue}/>
          <K label="Concluídos Sem." val={lm.concS} tp={trend(MONT,"concS")} color={C.green}/></R2>
      <R2><K label="Pend. Finalização" val={lm.pend} tp={trend(MONT.filter(d=>d.pend!=null),"pend")} inv color={C.orange}/>
          <K label="Concluídos Mês" val={lm.concM} color={C.purple}/></R2>

      <Box title="Montagem: Iniciados + Concluídos + Pendentes">
        <ResponsiveContainer width="100%" height={190}>
          <ComposedChart data={MONT}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="r" orientation="right" domain={[0,15]} tick={{fill:C.muted,fontSize:9}}/>
            <Tooltip content={<Tip/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Bar yAxisId="l" dataKey="iniS"  name="Iniciados"  fill={C.blue}   radius={[3,3,0,0]} barSize={10}/>
            <Bar yAxisId="l" dataKey="concS" name="Concluídos" fill={C.green}  radius={[3,3,0,0]} barSize={10}/>
            <Line yAxisId="r" type="monotone" dataKey="pend" name="Pendentes" stroke={C.orange} strokeWidth={2} dot={{r:3}}/>
          </ComposedChart>
        </ResponsiveContainer>
      </Box>

      <HR/>
      <H2 icon="🛠️" title="Assistência Técnica"/>
      <InfoTag color={C.muted} icon="ℹ️" text="Araranguá: sem dados de AT registrados. Números abaixo referem-se ao total (=Criciúma)."/>
      <R2><K label="AT em Aberto" val={lat.aberto} tp={trend(AT,"aberto")} inv color={C.red}/>
          <K label="Chamados Sem." val={lat.cham} tp={trend(AT,"cham")} inv color={C.acc}/></R2>
      <R2><K label="AT Iniciadas" val={lat.ini} tp={trend(AT,"ini")} color={C.blue}/>
          <K label="AT Finalizadas" val={lat.fin} tp={trend(AT,"fin")} color={C.green}/></R2>

      <Box title="AT em Aberto — Evolução (de 43 para 15)">
        <ResponsiveContainer width="100%" height={170}>
          <ComposedChart data={AT}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="r" orientation="right" tick={{fill:C.muted,fontSize:9}}/>
            <Tooltip content={<Tip/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Area yAxisId="l" type="monotone" dataKey="aberto" name="Em Aberto" stroke={C.red} fill={C.red} fillOpacity={0.15} strokeWidth={2}/>
            <Bar yAxisId="r" dataKey="ini" name="Iniciadas" fill={C.blue} radius={[3,3,0,0]} barSize={8}/>
            <Bar yAxisId="r" dataKey="fin" name="Finalizadas" fill={C.green} radius={[3,3,0,0]} barSize={8}/>
          </ComposedChart>
        </ResponsiveContainer>
        <div style={{fontSize:10,color:C.green,marginTop:4}}>✅ Redução de 65% desde dez/25 (43→15 em aberto)</div>
      </Box>
    </div>
  );
}

function PgFinanceiro(){
  const lf=FIN.at(-1),lr=RH.at(-1),ls=SAC.at(-1);
  const rhAbsSplit=RH.filter(d=>d.abL!=null).map(d=>({w:d.w,total:d.abs,loja:d.abL,fab:d.abF}));
  const rhTO=RH.filter(d=>d.toF!=null).map(d=>({w:d.w,total:+(d.to*100).toFixed(1),fab:+(d.toF*100).toFixed(1)}));
  const rhHExt=RH.filter(d=>d.hExtL!=null).map(d=>({w:d.w,total:d.hExt,loja:d.hExtL,fab:d.hExtF}));

  return (
    <div>
      <H2 icon="💹" title="Financeiro"/>
      <R2><K label="Margem Bruta" val={`${lf.mg}%`} tp={trend(FIN.filter(d=>d.mg),"mg")} color={C.purple}/>
          <K label="Cond. Pagamento" val="100%" unit="padrão" color={C.green} sub="Desde 09/01 ininterrupto"/></R2>

      <Box title="Margem Bruta Semanal (%)">
        <ResponsiveContainer width="100%" height={165}>
          <LineChart data={FIN.filter(d=>d.mg)}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis tick={{fill:C.muted,fontSize:9}} domain={[60,90]} tickFormatter={v=>`${v}%`}/>
            <Tooltip content={<Tip fmt={v=>`${v}%`}/>}/>
            <ReferenceLine y={70} stroke={C.acc} strokeDasharray="4 4"/>
            <Line type="monotone" dataKey="mg" name="Margem Bruta" stroke={C.purple} strokeWidth={2.5} dot={{fill:C.purple,r:4}}/>
          </LineChart>
        </ResponsiveContainer>
        <div style={{fontSize:9,color:C.muted}}>--- Linha de referência: 70%</div>
      </Box>

      <Box title="Valor Contratos por Forma de Pagamento (R$)">
        <ResponsiveContainer width="100%" height={170}>
          <BarChart data={FIN.filter(d=>d.vCont>0)} barSize={9}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${(v/1000).toFixed(0)}K`}/>
            <Tooltip content={<Tip fmt={brl}/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Bar dataKey="ent"   name="Entrada"    fill={C.blue}   stackId="a"/>
            <Bar dataKey="aym"   name="Aymoré"     fill={C.acc}    stackId="a"/>
            <Bar dataKey="cart"  name="Cartão"     fill={C.purple} stackId="a"/>
            <Bar dataKey="parc"  name="Parc.Direto"fill={C.teal}   stackId="a"/>
            <Bar dataKey="saldo" name="Saldo Entr." fill={C.green} stackId="a" radius={[3,3,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Box title="Mix de Pagamento (%) — 20/02">
        <div style={{display:"flex",gap:12,alignItems:"center"}}>
          <ResponsiveContainer width={120} height={120}>
            <PieChart>
              <Pie data={[
                {name:"Entrada",v:3.3,  color:C.blue},
                {name:"Aymoré", v:63.7, color:C.acc},
                {name:"Cartão", v:34.2, color:C.purple},
              ]} dataKey="v" innerRadius={30} outerRadius={54}>
                {[C.blue,C.acc,C.purple].map((c,i)=><Cell key={i} fill={c}/>)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div style={{flex:1}}>
            {[["Entrada",3.3,C.blue],["Aymoré",63.7,C.acc],["Cartão",34.2,C.purple]].map(([l,v,co],i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <div style={{width:8,height:8,borderRadius:2,background:co}}/>
                  <span style={{fontSize:12,color:C.text}}>{l}</span>
                </div>
                <span style={{fontSize:14,fontWeight:700,color:co}}>{v}%</span>
              </div>
            ))}
          </div>
        </div>
      </Box>

      <Box title="Evolução Mix de Pagamento — % por Semana">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={FIN_PAY} barSize={9} stackOffset="expand">
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${(v*100).toFixed(0)}%`}/>
            <Tooltip content={<Tip fmt={v=>`${v}%`}/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Bar dataKey="ent"   name="Entrada"     fill={C.blue}   stackId="a"/>
            <Bar dataKey="aym"   name="Aymoré"      fill={C.acc}    stackId="a"/>
            <Bar dataKey="cart"  name="Cartão"      fill={C.purple} stackId="a"/>
            <Bar dataKey="parc"  name="Parc.Direto" fill={C.teal}   stackId="a"/>
            <Bar dataKey="saldo" name="Saldo Entr." fill={C.green}  stackId="a" radius={[3,3,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <HR/>
      <H2 icon="⭐" title="Soberanos — Indicadores Globais (ref. 12/12)"/>
      <Box>
        <GoalBar label="Backlog" val={SOB.backlog} goal={SOB.metaBack} unit=" meses" color={C.red} rev/>
        <GoalBar label="Entrega no Prazo" val={SOB.entregaPrazo} goal={SOB.metaEnt} unit="%" color={C.acc}/>
        <GoalBar label="Margem de Contribuição" val={SOB.margContr} goal={SOB.metaMarg} unit="%" color={C.green}/>
        <div style={{height:1,background:C.border,margin:"10px 0"}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {[
            ["Amb. a Entregar",SOB.ambAEntregar],
            ["Cap. Produtiva",`${SOB.capProd}/sem`],
            ["Amb. Entregues",SOB.ambEntregues],
            ["No Prazo",SOB.ambNoPrazo],
            ["Contratos",SOB.contratos],
            ["Ticket Médio/Cont.",brl(SOB.tickContFat)],
            ["Ticket Médio/Amb.", brl(SOB.tickAmbFat)],
            ["Faturamento",brl(SOB.fat)],
          ].map(([k,v])=>(
            <div key={k} style={{background:"#1a1f30",borderRadius:8,padding:"8px 10px"}}>
              <div style={{fontSize:9,color:C.muted}}>{k}</div>
              <div style={{fontSize:15,fontWeight:700,color:C.text}}>{v}</div>
            </div>
          ))}
        </div>
      </Box>

      <HR/>
      <H2 icon="👥" title="Recursos Humanos"/>
      <R2><K label="Total" val={lr.total} unit="pessoas" color={C.blue} sub={`Loja ${lr.loja} | Fab. ${lr.fab}`}/>
          <K label="Absenteísmo" val={`${lr.abs}%`} tp={trend(RH,"abs")} inv color={C.red}/></R2>
      <R2><K label="Turn Over" val={`${lr.to}%`} tp={trend(RH,"to")} inv color={C.acc}/>
          <K label="Horas Extras" val={lr.hExt} unit="h/sem" tp={trend(RH,"hExt")} inv color={C.purple}/></R2>
      <R2><K label="Admissões" val={lr.admT} color={C.green}/>
          <K label="Demissões" val={lr.demT} color={C.red}/></R2>

      <Box title="Absenteísmo: Total / Loja / Fábrica (%)">
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={rhAbsSplit}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${v}%`}/>
            <Tooltip content={<Tip fmt={v=>`${v}%`}/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Line type="monotone" dataKey="total" name="Total"    stroke={C.acc}  strokeWidth={2.5} dot={{r:3}}/>
            <Line type="monotone" dataKey="loja"  name="Loja"     stroke={C.cric} strokeWidth={2}   dot={{r:3}}/>
            <Line type="monotone" dataKey="fab"   name="Fábrica"  stroke={C.arar} strokeWidth={2}   dot={{r:3}}/>
          </LineChart>
        </ResponsiveContainer>
      </Box>

      <Box title="Turn Over — Total vs Fábrica (%)">
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={rhTO}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${v}%`}/>
            <Tooltip content={<Tip fmt={v=>`${v}%`}/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Line type="monotone" dataKey="total" name="Total"   stroke={C.acc}  strokeWidth={2.5} dot={{r:3}}/>
            <Line type="monotone" dataKey="fab"   name="Fábrica" stroke={C.arar} strokeWidth={2}   dot={{r:3}}/>
          </LineChart>
        </ResponsiveContainer>
      </Box>

      <Box title="Horas Extras Semanais — Total / Loja / Fábrica (h)">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={rhHExt} barSize={9}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${v}h`}/>
            <Tooltip content={<Tip fmt={v=>`${v}h`}/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Bar dataKey="loja"  name="Loja"    fill={C.cric} radius={[3,3,0,0]}/>
            <Bar dataKey="fab"   name="Fábrica" fill={C.arar} radius={[3,3,0,0]}/>
            <Line type="monotone" dataKey="total" name="Total" stroke={C.acc} strokeWidth={2.5} dot={{r:3}}/>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Box title="Quadro de Pessoas — Loja vs Fábrica">
        <ResponsiveContainer width="100%" height={155}>
          <BarChart data={RH.filter(d=>d.loja!=null)} barSize={11}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis tick={{fill:C.muted,fontSize:9}}/>
            <Tooltip content={<Tip/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Bar dataKey="loja" name="Loja"    fill={C.cric} radius={[3,3,0,0]}/>
            <Bar dataKey="fab"  name="Fábrica" fill={C.arar} radius={[3,3,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Box title="⚠️ Perda de Produção por Absenteísmo (dados disponíveis 09/01–16/01)">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {RH_PERDA.map((d,i)=>(
            <div key={i} style={{background:"#1a1f30",borderRadius:8,padding:"10px 12px"}}>
              <div style={{fontSize:10,color:C.acc,fontWeight:700,marginBottom:6}}>{d.w}</div>
              {[
                ["Horas Falta",`${d.hFalta}h`],
                ["Perda Peças",d.perdaPecas],
                ["Perda Amb/Sem",d.perdaAmbSem],
                ["Perda Amb/Mês",d.perdaAmbMes],
              ].map(([k,v])=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontSize:10,color:C.muted}}>{k}</span>
                  <span style={{fontSize:11,fontWeight:600,color:C.red}}>{v}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Box>

      <HR/>
      <H2 icon="📞" title="SAC — Atendimento"/>
      <R2><K label="Cobranças WPP" val={ls.cobr} tp={trend(SAC,"cobr")} inv color={C.red}/>
          <K label="Clientes Contat." val={ls.clt} tp={trend(SAC,"clt")} inv color={C.acc}/></R2>
      <R2><K label="Reclame Aqui" val={ls.recl} tp={trend(SAC,"recl")} inv color={C.red}/>
          <K label="Google Aval." val={ls.google} tp={trend(SAC,"google")} inv color={C.blue}/></R2>
      <R2><K label="Chamados AT" val={ls.cham} tp={trend(SAC,"cham")} inv color={C.purple}/>
          <K label="Recl. Públicas Ret." val={ls.pubRet} color={C.green}/></R2>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
        {[["NPS Geral","60%",C.green,"13/02"],["Nota Montagem","8,8",C.green,"13/02"]].map(([l,v,co,d])=>(
          <div key={l} style={{background:C.card,borderRadius:12,padding:"14px 16px",borderLeft:`3px solid ${co}`}}>
            <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:.8}}>{l}</div>
            <div style={{fontSize:26,fontWeight:700,color:co,marginTop:4}}>{v}</div>
            <div style={{fontSize:10,color:C.muted}}>Última: {d}</div>
          </div>
        ))}
      </div>
      <Box title="SAC — Todos Indicadores por Semana">
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={SAC}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis tick={{fill:C.muted,fontSize:9}}/>
            <Tooltip content={<Tip/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Line type="monotone" dataKey="cobr"   name="Cobranças" stroke={C.red}    strokeWidth={2}   dot={{r:2}}/>
            <Line type="monotone" dataKey="clt"    name="Clientes"  stroke={C.acc}    strokeWidth={2}   dot={{r:2}}/>
            <Line type="monotone" dataKey="cham"   name="Cham. AT"  stroke={C.purple} strokeWidth={1.5} dot={{r:2}}/>
            <Line type="monotone" dataKey="pubRet" name="Recl.Pub.Ret" stroke={C.green} strokeWidth={1.5} dot={{r:2}}/>
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </div>
  );
}

function PgMkt(){
  return (
    <div>
      <InfoTag color={C.acc} icon="⚠️" text="Dados de marketing disponíveis apenas a partir de 13/02/2026 (2 semanas)."/>

      <H2 icon="📣" title="Ennebê — Marketing Digital"/>
      <R2><K label="Invest. Semana" val={`R$ 2.226`} tp="6.8" color={C.acc} sub="Mês acum.: R$ 6.781"/>
          <K label="ROAS Semana" val="32.46×" tp="351.2" color={C.green} sub="ROAS Mês: 10.65×"/></R2>
      <R2><K label="CPC Google" val="R$ 0,41" tp="-12.8" color={C.green}/>
          <K label="CPC Meta" val="R$ 0,77" tp="-11.5" color={C.green}/></R2>
      <R2><K label="Acessos/Sem." val="1.238" tp="39.9" color={C.blue} sub="Mês: 2.883"/>
          <K label="Seguidores IG" val="10.738" tp="0.3" color={C.purple} sub="Engaj. 1,4%"/></R2>

      <Box title="CPC Comparativo — Ennebê vs Idealle (R$)">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {[
            {l:"Ennebê Google",  s1:"0,47", s2:"0,41", c:C.acc},
            {l:"Ennebê Meta",    s1:"0,87", s2:"0,77", c:C.acc},
            {l:"Idealle Google", s1:"1,24", s2:"1,22", c:C.pink},
            {l:"Idealle Meta",   s1:"1,00", s2:"0,75", c:C.pink},
          ].map((d,i)=>(
            <div key={i} style={{background:"#1a1f30",borderRadius:8,padding:"10px 12px",borderLeft:`2px solid ${d.c}`}}>
              <div style={{fontSize:9,color:C.muted}}>{d.l}</div>
              <div style={{fontSize:17,fontWeight:700,color:d.c,margin:"3px 0"}}>R$ {d.s2}</div>
              <div style={{fontSize:9,color:C.muted}}>13/02: R$ {d.s1}</div>
            </div>
          ))}
        </div>
      </Box>

      <Box title="Investimento Semanal — Ennebê vs Idealle (R$)">
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={[
            {w:"13/02", ennebe:2084.44, idealle:319.83},
            {w:"20/02", ennebe:2225.99, idealle:511.57},
          ]} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:10}}/>
            <YAxis tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`R$${(v/1000).toFixed(1)}K`}/>
            <Tooltip content={<Tip fmt={brl}/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Bar dataKey="ennebe"  name="Ennebê"  fill={C.acc}  radius={[4,4,0,0]}/>
            <Bar dataKey="idealle" name="Idealle" fill={C.pink} radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Box title="ROAS — Ennebê vs Idealle (semana)">
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={[
            {w:"13/02",ennebe:7.19, idealle:109.43},
            {w:"20/02",ennebe:32.46,idealle:0},
          ]} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:10}}/>
            <YAxis tick={{fill:C.muted,fontSize:9}}/>
            <Tooltip content={<Tip fmt={v=>`${v}×`}/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Bar dataKey="ennebe"  name="Ennebê"  fill={C.acc}  radius={[4,4,0,0]}/>
            <Bar dataKey="idealle" name="Idealle" fill={C.pink} radius={[4,4,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
        <div style={{fontSize:10,color:C.muted,marginTop:4}}>Idealle 20/02 zerado — dado pendente de retroação</div>
      </Box>

      <Box title="Taxa de Rejeição do Site (%) — 13/02 vs 20/02">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {[
            {l:"Ennebê 13/02",v:"92,1%",c:C.red},
            {l:"Ennebê 20/02",v:"91,2%",c:C.red},
            {l:"Idealle 13/02",v:"57,5%",c:C.acc},
            {l:"Idealle 20/02",v:"56,2%",c:C.acc},
          ].map((d,i)=>(
            <div key={i} style={{background:"#1a1f30",borderRadius:8,padding:"10px 12px",borderLeft:`2px solid ${d.c}`}}>
              <div style={{fontSize:9,color:C.muted}}>{d.l}</div>
              <div style={{fontSize:20,fontWeight:700,color:d.c,margin:"4px 0"}}>{d.v}</div>
            </div>
          ))}
        </div>
        <div style={{fontSize:10,color:C.red,marginTop:8}}>⚠️ Ennebê acima de 90% — ideal: abaixo de 40%</div>
      </Box>

      <Box title="Seguidores e Engajamento Instagram">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
          {[
            {l:"Ennebê — Seg.",   s1:10709,s2:10738,e:"1,4%",c:C.acc},
            {l:"Idealle — Seg.",  s1:6258, s2:6265, e:"0,6%",c:C.pink},
          ].map((d,i)=>(
            <div key={i} style={{background:"#1a1f30",borderRadius:8,padding:"10px 12px"}}>
              <div style={{fontSize:9,color:C.muted}}>{d.l}</div>
              <div style={{fontSize:16,fontWeight:700,color:d.c,margin:"3px 0"}}>{d.s2.toLocaleString("pt-BR")}</div>
              <div style={{fontSize:9,color:C.green}}>+{d.s2-d.s1}/sem</div>
              <div style={{fontSize:9,color:C.muted}}>Engaj: {d.e}</div>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
}

function PgCorrelacoes(){
  // Dados de correlação (semana a semana)
  const funil = [0,1,2,3,4,5,6,7,8].map(i=>({
    w:PV[i].w, leads:PV[i].leads, qual:PV[i].qual, contr:VD[i].cS,
    cobr:SAC[i]?.cobr||0, atr:CF[i]?.atr||0
  }));
  const corrLeadsCont1 = PV.slice(0,-1).map((d,i)=>({
    w:VD[i+1].w, leads:d.leads, contProx:VD[i+1].cS
  }));
  const corrAbsProd = RH.map((d,i)=>({
    w:d.w, abs:d.abs, finS:PROD[i]?.finS??0
  }));
  const corrMargCont = FIN.filter(d=>d.mg).map(d=>{
    const v=VD.find(x=>x.w===d.w);
    return {w:d.w,mg:d.mg,vS:v?.vS||0,cS:v?.cS||0};
  });
  const corrATSAC = AT.map((d,i)=>({
    w:d.w,aberto:d.aberto,cobr:SAC[i]?.cobr||0
  }));
  const corrConfMont = CF.slice(0,-1).map((d,i)=>({
    w:MONT[i+1]?.w||d.w, confAtual:d.conf, montProx:MONT[i+1]?.iniS||0
  }));
  const corrPVContr = PV.slice(0,-2).map((d,i)=>({
    w:VD[i+2]?.w||'–', leads:d.leads, cont2Sem:VD[i+2]?.cS||0
  }));

  return (
    <div>
      <InfoTag color={C.blue} icon="🔗" text="Correlações mostram como indicadores de diferentes áreas se influenciam ao longo da cadeia operacional."/>

      {/* Cadeia */}
      <Box title="Cadeia de Valor — Ennebê">
        <div style={{display:"flex",flexWrap:"wrap",gap:3,justifyContent:"center",marginBottom:6}}>
          {[
            ["📣","MKT"],["›",""],[" 🎯","Pré-Venda"],["›",""],["💰","Vendas"],["›",""],
            ["📋","Conferência"],["›",""],["🏭","Produção"],["›",""],
            ["🔨","Pré-Mont."],["›",""],["🔧","Montagem"],["›",""],
            ["🛠️","AT"],["›",""],["📞","SAC/NPS"],
          ].map(([emoji,label],i)=>
            emoji==="›" ? (
              <div key={i} style={{color:C.border,fontSize:14,alignSelf:"center"}}>›</div>
            ) : (
              <div key={i} style={{textAlign:"center",padding:"5px 7px",background:"#1a1f30",borderRadius:8,minWidth:46}}>
                <div style={{fontSize:15}}>{emoji}</div>
                <div style={{fontSize:7,color:C.muted,fontWeight:600,marginTop:1}}>{label}</div>
              </div>
            )
          )}
        </div>
        <div style={{fontSize:9,color:C.muted,textAlign:"center"}}>
          MKT → Leads → Briefings → Contrato → Conferência → Produção → Pré-Mont. → Mont. → AT/SAC
        </div>
      </Box>

      <H2 icon="1️⃣" title="Marketing → Leads → Contratos"/>
      <Box title="Funil Semanal: Leads / Qualificados / Contratos" note="📈 Semana 20/02: maior volume de leads (66) coincide com 4 contratos — acima da média.">
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={funil}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="r" orientation="right" domain={[0,10]} tick={{fill:C.muted,fontSize:9}}/>
            <Tooltip content={<Tip/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Bar yAxisId="l" dataKey="leads" name="Leads"       fill={C.blue}   radius={[3,3,0,0]} barSize={9} opacity={0.8}/>
            <Bar yAxisId="l" dataKey="qual"  name="Qualificados"fill={C.teal}   radius={[3,3,0,0]} barSize={9}/>
            <Line yAxisId="r" type="monotone" dataKey="contr" name="Contratos" stroke={C.acc} strokeWidth={2.5} dot={{r:4,fill:C.acc}}/>
          </ComposedChart>
        </ResponsiveContainer>
      </Box>

      <Box title="Leads (sem. atual) → Contratos (sem. seguinte)" note="🔎 Volumes altos de leads tendem a converter na semana seguinte — lag de ~1 semana.">
        <ResponsiveContainer width="100%" height={190}>
          <ComposedChart data={corrLeadsCont1}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="r" orientation="right" domain={[0,10]} tick={{fill:C.muted,fontSize:9}}/>
            <Tooltip content={<Tip/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Bar yAxisId="l" dataKey="leads" name="Leads Sem. Atual" fill={C.blue} radius={[3,3,0,0]} barSize={10} opacity={0.7}/>
            <Line yAxisId="r" type="monotone" dataKey="contProx" name="Contratos Próxima Sem." stroke={C.acc} strokeWidth={2.5} dot={{r:4}}/>
          </ComposedChart>
        </ResponsiveContainer>
      </Box>

      <Box title="Leads (T) → Contratos (T+2 semanas)" note="📌 Ciclo de venda: briefing + negociação pode levar 2 semanas desde o lead.">
        <ResponsiveContainer width="100%" height={190}>
          <ComposedChart data={corrPVContr}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="r" orientation="right" domain={[0,10]} tick={{fill:C.muted,fontSize:9}}/>
            <Tooltip content={<Tip/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Bar yAxisId="l" dataKey="leads" name="Leads T"    fill={C.blue} radius={[3,3,0,0]} barSize={10} opacity={0.7}/>
            <Line yAxisId="r" type="monotone" dataKey="cont2Sem" name="Contratos T+2" stroke={C.green} strokeWidth={2.5} dot={{r:4}}/>
          </ComposedChart>
        </ResponsiveContainer>
      </Box>

      <HR/>
      <H2 icon="2️⃣" title="Absenteísmo (RH) → Produção"/>
      <Box title="Absenteísmo % vs Ambientes Finalizados" note="📉 Jan/26: absenteísmo alto (>10%) coincidiu com produções baixas. Desde fev, absenteísmo caiu e produção subiu.">
        <ResponsiveContainer width="100%" height={190}>
          <ComposedChart data={corrAbsProd}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${v}%`}/>
            <YAxis yAxisId="r" orientation="right" tick={{fill:C.muted,fontSize:9}}/>
            <Tooltip content={<Tip/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Line yAxisId="l" type="monotone" dataKey="abs" name="Absenteísmo" stroke={C.red}   strokeWidth={2.5} dot={{r:3}}/>
            <Bar   yAxisId="r"                 dataKey="finS" name="Prod. Fin." fill={C.green}  radius={[3,3,0,0]} barSize={10} opacity={0.8}/>
          </ComposedChart>
        </ResponsiveContainer>
      </Box>

      <HR/>
      <H2 icon="3️⃣" title="AT em Aberto → SAC (Cobranças)"/>
      <Box title="AT em Aberto vs Cobranças via WhatsApp" note="🔎 Redução de AT não elimina cobranças — são clientes com outros pendências financeiras. Correlação não-linear.">
        <ResponsiveContainer width="100%" height={190}>
          <ComposedChart data={corrATSAC}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="r" orientation="right" tick={{fill:C.muted,fontSize:9}}/>
            <Tooltip content={<Tip/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Area yAxisId="l" type="monotone" dataKey="aberto" name="AT em Aberto" stroke={C.red}    fill={C.red}    fillOpacity={0.15} strokeWidth={2}/>
            <Line yAxisId="r" type="monotone" dataKey="cobr"   name="Cobranças SAC" stroke={C.purple} strokeWidth={2} dot={{r:3}}/>
          </ComposedChart>
        </ResponsiveContainer>
      </Box>

      <HR/>
      <H2 icon="4️⃣" title="Conferência → Montagem"/>
      <Box title="Amb. Conferidos (semana) → Montagem Iniciada (semana seguinte)" note="⚙️ Ambientes conferidos viram montagens na semana seguinte — ciclo conferência→montagem = ~7 dias.">
        <ResponsiveContainer width="100%" height={190}>
          <ComposedChart data={corrConfMont}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="r" orientation="right" tick={{fill:C.muted,fontSize:9}}/>
            <Tooltip content={<Tip/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Bar   yAxisId="l" dataKey="confAtual" name="Conf. Atual" fill={C.green} radius={[3,3,0,0]} barSize={10} opacity={0.8}/>
            <Line yAxisId="r" type="monotone" dataKey="montProx" name="Mont. Próx. Sem." stroke={C.blue} strokeWidth={2.5} dot={{r:4}}/>
          </ComposedChart>
        </ResponsiveContainer>
      </Box>

      <HR/>
      <H2 icon="5️⃣" title="Margem vs Volume Comercial"/>
      <Box title="Margem Bruta % vs Valor de Contratos (R$)" note="💡 Semana com maior volume (30/01: R$91K) teve margem abaixo de 70%. Semana de baixo volume (09/01) teve maior margem (81,8%). Mix de produto importa.">
        <ResponsiveContainer width="100%" height={190}>
          <ComposedChart data={corrMargCont}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:9}} domain={[60,90]} tickFormatter={v=>`${v}%`}/>
            <YAxis yAxisId="r" orientation="right" tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${(v/1000).toFixed(0)}K`}/>
            <Tooltip content={<Tip/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Line yAxisId="l" type="monotone" dataKey="mg" name="Margem %" stroke={C.purple} strokeWidth={2.5} dot={{r:4}}/>
            <Bar  yAxisId="r" dataKey="vS" name="Val. Contratos" fill={C.acc} radius={[3,3,0,0]} barSize={10} opacity={0.7}/>
          </ComposedChart>
        </ResponsiveContainer>
      </Box>

      <HR/>
      <H2 icon="6️⃣" title="Atrasados → Cobranças → NPS"/>
      <Box title="Amb. Atrasados vs Cobranças SAC" note="📌 Pico de atrasos em jan/26 (38 amb.) coincide com aumento de cobranças (15-21). Conferência melhorou em fev e cobranças reduziram.">
        <ResponsiveContainer width="100%" height={190}>
          <ComposedChart data={[0,1,2,3,4,5,6,7,8].map(i=>({
            w:CF[i].w, atr:CF[i].atr, cobr:SAC[i]?.cobr||0
          }))}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="r" orientation="right" tick={{fill:C.muted,fontSize:9}}/>
            <Tooltip content={<Tip/>}/>
            <Legend wrapperStyle={{fontSize:10}}/>
            <Bar  yAxisId="l" dataKey="atr"  name="Amb. Atrasados" fill={C.red}    radius={[3,3,0,0]} barSize={10} opacity={0.8}/>
            <Line yAxisId="r" type="monotone" dataKey="cobr" name="Cobranças SAC" stroke={C.orange} strokeWidth={2.5} dot={{r:4}}/>
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  PCP — DADOS  (Planilha 01/03/2026)
// ═══════════════════════════════════════════════════════════
// Backlog MACRO: 68 pedidos únicos · 356 ambientes totais
const PCP_LOJA = [
  {loja:"Criciúma", ambientes:187, pct:52.5, fill:"#38bdf8"},
  {loja:"Torres",   ambientes:159, pct:44.7, fill:"#a78bfa"},
  {loja:"Araranguá",ambientes:10,  pct:2.8,  fill:"#f472b6"},
];

// Funil PCP: estados dos ambientes
const PCP_FUNIL = [
  {etapa:"MACRO\nBacklog",      total:356, ok:55,  nok:241, neutro:60, label:"356 amb."},
  {etapa:"FAZER P.\nCORTE",     total:288, ok:80,  nok:0,   neutro:205,label:"288 amb."},
  {etapa:"PRODUZIR\nCompras",   total:114, ok:39,  nok:67,  neutro:8,  label:"114 amb."},
];

// Status FAZER P. CORTE
const PCP_CORTE_STATUS = [
  {status:"Finalizado", v:80,  fill:"#34d399"},
  {status:"Na Fila",    v:205, fill:"#f5a623"},
  {status:"Atrasado",   v:2,   fill:"#f87171"},
  {status:"Urgente",    v:8,   fill:"#fb923c"},
];

// Status compra PRODUZIR
const PCP_COMPRA_STATUS = [
  {status:"Compra OK",        v:39, fill:"#34d399"},
  {status:"Aguard. Compra",   v:67, fill:"#f5a623"},
  {status:"Aguard. P.Corte",  v:5,  fill:"#f87171"},
  {status:"Atenção",          v:1,  fill:"#fb923c"},
  {status:"Com Aditivo",      v:12, fill:"#a78bfa"},
];

// Custos semanais projetados (aba CUSTOS PRÓX SEMANAS)
const PCP_CUSTOS_SEM = [
  {sem:"26/01", mp:14424, acs:5386,  agt:6898,  total:26709},
  {sem:"02/02", mp:6213,  acs:2865,  agt:4128,  total:13206},
  {sem:"09/02", mp:26837, acs:14686, agt:12819, total:54342},
  {sem:"23/02", mp:51199, acs:22302, agt:23956, total:86696},
  {sem:"09/03", mp:10459, acs:10856, agt:4221,  total:25536},
  {sem:"16/03", mp:7753,  acs:2827,  agt:1922,  total:12502},
];

// Mix de custos total em produção (aba PRODUZIR)
const PCP_MIX_CUSTO = [
  {name:"Movelaria",  value:184584, pct:62.5, fill:"#38bdf8"},
  {name:"Agratto",    value:87534,  pct:29.7, fill:"#a78bfa"},
  {name:"Acessórios", value:23011,  pct:7.8,  fill:"#f472b6"},
];

// Aditivos
const PCP_ADITIVOS_STATUS = [
  {status:"Plano OK",       v:36, fill:"#34d399"},
  {status:"Plano NOK",      v:31, fill:"#f87171"},
  {status:"Sem data def.",  v:4,  fill:"#f5a623"},
];
const PCP_ADITIVOS_RESP = [
  {resp:"TAINAN",  v:4, fill:"#38bdf8"},
  {resp:"GUSTAVO", v:5, fill:"#a78bfa"},
  {resp:"CAMILA",  v:2, fill:"#f472b6"},
  {resp:"ALINE",   v:2, fill:"#fb923c"},
];

// Projetado x Realizado
const PCP_PROJ_REAL = [
  {cliente:"Paulo Beise/Nivalda", proj:9927,  real:7862, dif:-2065, pct:20.8},
  {cliente:"SESC",                proj:6938,  real:4400, dif:-2538, pct:36.6},
  {cliente:"Leonardo",            proj:4899,  real:4516, dif:-383,  pct:7.8},
];

// Timeline de entregas PRODUZIR (deadlines de pré-montagem)
const PCP_TIMELINE = [
  {sem:"26/01", amb:8,  custo:26709},
  {sem:"02/02", amb:5,  custo:13206},
  {sem:"09/02", amb:12, custo:52312},
  {sem:"16/02", amb:13, custo:34005},
  {sem:"23/02", amb:16, custo:49920},
  {sem:"02/03", amb:12, custo:44319},
  {sem:"09/03", amb:15, custo:25635},
  {sem:"16/03", amb:13, custo:49021},
  {sem:"23/03", amb:11, custo:0},
  {sem:"30/03", amb:7,  custo:0},
];

// ═══════════════════════════════════════════════════════════
//  PCP — COMPONENTE
// ═══════════════════════════════════════════════════════════
function PgPCP(){
  const REND = ({cx,cy,midAngle,innerRadius,outerRadius,percent,name,value})=>{
    const RADIAN=Math.PI/180;
    const r=innerRadius+(outerRadius-innerRadius)*0.55;
    const x=cx+r*Math.cos(-midAngle*RADIAN);
    const y=cy+r*Math.sin(-midAngle*RADIAN);
    if(percent<0.06) return null;
    return <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" style={{fontSize:9,fontWeight:700}}>{`${(percent*100).toFixed(0)}%`}</text>;
  };

  return (
    <div>
      {/* Cabeçalho da seção */}
      <div style={{background:`linear-gradient(135deg,#1a2040,#0f1320)`,
        border:`1px solid #f5a62340`,borderRadius:12,padding:"14px 16px",marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
          <span style={{fontSize:22}}>🏭</span>
          <div>
            <div style={{fontSize:15,fontWeight:800,color:C.acc,letterSpacing:.3}}>PCP — Sequenciamento de Produção</div>
            <div style={{fontSize:10,color:C.muted}}>Planilha Lista Prioridades · Ref. 01/03/2026</div>
          </div>
        </div>
        <div style={{fontSize:10,color:"#94a3b8",lineHeight:1.5}}>
          Controle de backlog, planos de corte, compras e custos projetados por semana.
        </div>
      </div>

      {/* KPIs rápidos */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
        {[
          {label:"Pedidos em Carteira", v:"68",    sub:"sequências únicas",   c:C.acc,   icon:"📋"},
          {label:"Ambientes Totais",    v:"356",   sub:"backlog macro",        c:C.blue,  icon:"🗂️"},
          {label:"Em Produção",         v:"114",   sub:"amb. com compra",      c:C.green, icon:"⚙️"},
          {label:"Aditivos Abertos",    v:"31",    sub:"plano NOK pendente",   c:C.red,   icon:"⚠️"},
        ].map(k=>(
          <div key={k.label} style={{background:C.card,borderRadius:10,padding:"12px 14px",
            border:`1px solid ${C.border}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div style={{fontSize:10,color:C.muted,lineHeight:1.3,maxWidth:120}}>{k.label}</div>
              <span style={{fontSize:16}}>{k.icon}</span>
            </div>
            <div style={{fontSize:26,fontWeight:800,color:k.c,marginTop:4}}>{k.v}</div>
            <div style={{fontSize:9,color:C.muted,marginTop:2}}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Linha extra de KPIs */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
        {[
          {label:"Custo Total\nProjetado", v:"R$295K", sub:"em produção",   c:C.purple},
          {label:"Urgentes\nCorte",        v:"8",       sub:"na fila",       c:C.orange},
          {label:"Planos\nAtrasados",      v:"2",       sub:"FAZER P.CORTE", c:C.red},
        ].map(k=>(
          <div key={k.label} style={{background:C.card,borderRadius:10,padding:"10px 12px",
            border:`1px solid ${C.border}`,textAlign:"center"}}>
            <div style={{fontSize:9,color:C.muted,marginBottom:4,whiteSpace:"pre-line"}}>{k.label}</div>
            <div style={{fontSize:20,fontWeight:800,color:k.c}}>{k.v}</div>
            <div style={{fontSize:9,color:C.muted}}>{k.sub}</div>
          </div>
        ))}
      </div>

      <HR/>
      <H2 icon="📦" title="Backlog por Loja"/>

      {/* Backlog por loja — barras horizontais */}
      <Box title="Ambientes em Carteira por Loja" note="📌 Criciúma 52.5% · Torres 44.7% · Araranguá 2.8%">
        {PCP_LOJA.map(l=>(
          <div key={l.loja} style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <span style={{fontSize:11,color:C.text,fontWeight:600}}>{l.loja}</span>
              <span style={{fontSize:11,color:l.fill,fontWeight:700}}>{l.ambientes} amb. ({l.pct}%)</span>
            </div>
            <div style={{background:C.border,borderRadius:6,height:12,overflow:"hidden"}}>
              <div style={{width:`${l.pct}%`,height:"100%",
                background:`linear-gradient(90deg,${l.fill}cc,${l.fill})`,borderRadius:6,
                transition:"width .8s ease"}}/>
            </div>
          </div>
        ))}
        <div style={{marginTop:14}}>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={PCP_LOJA} margin={{top:4,right:8,left:-20,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
              <XAxis dataKey="loja" tick={{fill:C.muted,fontSize:9}}/>
              <YAxis tick={{fill:C.muted,fontSize:9}}/>
              <Tooltip content={<Tip/>}/>
              <Bar dataKey="ambientes" name="Ambientes" radius={[4,4,0,0]} barSize={40}>
                {PCP_LOJA.map((e,i)=><Cell key={i} fill={e.fill}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Box>

      <HR/>
      <H2 icon="🔄" title="Funil de Produção"/>

      {/* Funil visual */}
      <Box title="Status por Etapa do Fluxo PCP">
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {[
            {etapa:"1 · MACRO (Backlog)",       total:356, ok:55,  fila:241, neutro:60,  ok_label:"Plano OK", fila_label:"Plano NOK", neutro_label:"Sem Data"},
            {etapa:"2 · FAZER PLANO DE CORTE",  total:288, ok:80,  fila:205, neutro:3,   ok_label:"Finalizado",fila_label:"Na Fila",  neutro_label:"Atrasado+Urgente"},
            {etapa:"3 · PRODUZIR (Compras)",    total:114, ok:39,  fila:67,  neutro:8,   ok_label:"Compra OK",fila_label:"Aguard.",   neutro_label:"Atenção/Aguard.PC"},
          ].map((e,i)=>{
            const wOK=(e.ok/e.total*100).toFixed(0);
            const wFila=(e.fila/e.total*100).toFixed(0);
            const wNeu=(e.neutro/e.total*100).toFixed(0);
            return (
              <div key={i} style={{background:C.surface,borderRadius:10,padding:"12px 14px",
                border:`1px solid ${C.border}`}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <span style={{fontSize:10,fontWeight:700,color:C.text}}>{e.etapa}</span>
                  <span style={{fontSize:10,color:C.muted,fontWeight:600}}>{e.total} amb.</span>
                </div>
                {/* stacked progress */}
                <div style={{display:"flex",borderRadius:6,overflow:"hidden",height:14,marginBottom:8}}>
                  <div style={{width:`${wOK}%`,background:C.green,height:"100%"}} title={e.ok_label}/>
                  <div style={{width:`${wFila}%`,background:C.orange,height:"100%"}} title={e.fila_label}/>
                  <div style={{width:`${wNeu}%`,background:C.red,height:"100%",opacity:.8}} title={e.neutro_label}/>
                </div>
                <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                  {[
                    {l:e.ok_label,    v:e.ok,    c:C.green},
                    {l:e.fila_label,  v:e.fila,  c:C.orange},
                    {l:e.neutro_label,v:e.neutro,c:C.red},
                  ].map(b=>(
                    <div key={b.l} style={{display:"flex",alignItems:"center",gap:4}}>
                      <div style={{width:8,height:8,borderRadius:2,background:b.c}}/>
                      <span style={{fontSize:9,color:C.muted}}>{b.l}: </span>
                      <span style={{fontSize:10,fontWeight:700,color:b.c}}>{b.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Box>

      <HR/>
      <H2 icon="✂️" title="Fila de Corte (FAZER P. CORTE)"/>

      <Box title="Distribuição de Status — Planos de Corte" note="📌 80 finalizados · 205 na fila · 2 atrasados · 8 urgentes">
        <div style={{display:"flex",gap:10}}>
          <div style={{flex:1}}>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={PCP_CORTE_STATUS} cx="50%" cy="50%"
                  innerRadius={40} outerRadius={72}
                  dataKey="v" nameKey="status" labelLine={false} label={REND}>
                  {PCP_CORTE_STATUS.map((e,i)=><Cell key={i} fill={e.fill}/>)}
                </Pie>
                <Tooltip formatter={(v,n)=>[v+" amb.",n]} contentStyle={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",gap:10}}>
            {PCP_CORTE_STATUS.map(s=>(
              <div key={s.status} style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:10,height:10,borderRadius:3,background:s.fill,flexShrink:0}}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:9,color:C.muted}}>{s.status}</div>
                  <div style={{fontSize:15,fontWeight:800,color:s.fill}}>{s.v}</div>
                </div>
                <div style={{fontSize:9,color:C.muted}}>{(s.v/288*100).toFixed(0)}%</div>
              </div>
            ))}
          </div>
        </div>
      </Box>

      <HR/>
      <H2 icon="🛒" title="Status de Compras (PRODUZIR)"/>

      <Box title="Status das Compras por Ambiente" note="📌 114 ambientes com plano de corte finalizado. Compra NOK = aguardando aprovação/fornecedor.">
        <div style={{display:"flex",gap:10}}>
          <div style={{flex:1}}>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={PCP_COMPRA_STATUS} cx="50%" cy="50%"
                  innerRadius={40} outerRadius={72}
                  dataKey="v" nameKey="status" labelLine={false} label={REND}>
                  {PCP_COMPRA_STATUS.map((e,i)=><Cell key={i} fill={e.fill}/>)}
                </Pie>
                <Tooltip formatter={(v,n)=>[v+" amb.",n]} contentStyle={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",gap:8}}>
            {PCP_COMPRA_STATUS.map(s=>(
              <div key={s.status} style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:10,height:10,borderRadius:3,background:s.fill,flexShrink:0}}/>
                <div style={{flex:1}}>
                  <div style={{fontSize:9,color:C.muted}}>{s.status}</div>
                  <div style={{fontSize:14,fontWeight:800,color:s.fill}}>{s.v}</div>
                </div>
                <div style={{fontSize:9,color:C.muted}}>{(s.v/114*100).toFixed(0)}%</div>
              </div>
            ))}
          </div>
        </div>
      </Box>

      {/* Compras por loja */}
      <Box title="Ambientes em Produção · Criciúma vs Torres">
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={[{loja:"Criciúma",v:67},{loja:"Torres",v:45}]}
            margin={{top:4,right:8,left:-20,bottom:0}}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="loja" tick={{fill:C.muted,fontSize:10}}/>
            <YAxis tick={{fill:C.muted,fontSize:9}}/>
            <Tooltip content={<Tip/>}/>
            <Bar dataKey="v" name="Ambientes" radius={[4,4,0,0]} barSize={50}>
              <Cell fill={C.cric}/>
              <Cell fill={C.purple}/>
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <HR/>
      <H2 icon="💸" title="Custos Projetados por Semana"/>

      <Box title="Custo Total Semanal (R$)" note="📌 Pico na sem. 23/02: R$86.7K. Total acumulado em produção: R$218,991.">
        <ResponsiveContainer width="100%" height={180}>
          <ComposedChart data={PCP_CUSTOS_SEM} margin={{top:4,right:8,left:-10,bottom:0}}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="sem" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${(v/1000).toFixed(0)}K`}/>
            <Tooltip content={<Tip/>} formatter={v=>`R$${v.toLocaleString("pt-BR")}`}/>
            <Legend wrapperStyle={{fontSize:9}}/>
            <Bar dataKey="mp"  name="Movelaria"  stackId="a" fill={C.blue}   radius={[0,0,0,0]}/>
            <Bar dataKey="acs" name="Acessórios" stackId="a" fill={C.pink}   radius={[0,0,0,0]}/>
            <Bar dataKey="agt" name="Agratto"    stackId="a" fill={C.purple} radius={[4,4,0,0]}/>
          </ComposedChart>
        </ResponsiveContainer>
      </Box>

      {/* Mix de custos pie */}
      <Box title="Mix de Custos — Total em Produção (R$295K)" note="📌 Movelaria representa 62.5% do custo. Agratto 29.7%. Acessórios 7.8%.">
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <div style={{flex:1}}>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={PCP_MIX_CUSTO} cx="50%" cy="50%"
                  innerRadius={35} outerRadius={68}
                  dataKey="value" nameKey="name" labelLine={false} label={REND}>
                  {PCP_MIX_CUSTO.map((e,i)=><Cell key={i} fill={e.fill}/>)}
                </Pie>
                <Tooltip formatter={(v,n)=>[`R$${v.toLocaleString("pt-BR")}`,n]}
                  contentStyle={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:12}}>
            {PCP_MIX_CUSTO.map(m=>(
              <div key={m.name}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                  <span style={{fontSize:10,color:m.fill,fontWeight:700}}>{m.name}</span>
                  <span style={{fontSize:10,color:m.fill,fontWeight:700}}>{m.pct}%</span>
                </div>
                <div style={{background:C.border,borderRadius:4,height:6}}>
                  <div style={{width:`${m.pct}%`,height:"100%",background:m.fill,borderRadius:4}}/>
                </div>
                <div style={{fontSize:9,color:C.muted,marginTop:2}}>R${(m.value/1000).toFixed(1)}K</div>
              </div>
            ))}
          </div>
        </div>
      </Box>

      <HR/>
      <H2 icon="📅" title="Timeline de Pré-Montagem"/>

      <Box title="Ambientes por Semana de Início Pré-Montagem" note="📌 Volumes maiores em fev/26. Semanas de março/abril com custo R$0 = pedidos novos sem cotação finalizada.">
        <ResponsiveContainer width="100%" height={190}>
          <ComposedChart data={PCP_TIMELINE} margin={{top:4,right:8,left:-10,bottom:0}}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="sem" tick={{fill:C.muted,fontSize:8}} angle={-30} textAnchor="end" height={32}/>
            <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="r" orientation="right" tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${(v/1000).toFixed(0)}K`}/>
            <Tooltip content={<Tip/>}/>
            <Legend wrapperStyle={{fontSize:9}}/>
            <Bar yAxisId="l" dataKey="amb"   name="Ambientes"    fill={C.acc}    radius={[4,4,0,0]} barSize={14}/>
            <Line yAxisId="r" type="monotone" dataKey="custo" name="Custo R$" stroke={C.purple} strokeWidth={2} dot={{r:3}}/>
          </ComposedChart>
        </ResponsiveContainer>
      </Box>

      <HR/>
      <H2 icon="⚠️" title="Aditivos"/>

      <Box title="Status dos Aditivos (71 ambientes)" note="📌 Aditivos = alterações/complementos após venda. 31 planos NOK aguardando atualização.">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {/* Status pie */}
          <div>
            <div style={{fontSize:10,color:C.muted,textAlign:"center",marginBottom:4}}>Por Status</div>
            <ResponsiveContainer width="100%" height={130}>
              <PieChart>
                <Pie data={PCP_ADITIVOS_STATUS} cx="50%" cy="50%"
                  innerRadius={30} outerRadius={56}
                  dataKey="v" nameKey="status" labelLine={false} label={REND}>
                  {PCP_ADITIVOS_STATUS.map((e,i)=><Cell key={i} fill={e.fill}/>)}
                </Pie>
                <Tooltip formatter={(v,n)=>[v+" amb.",n]}
                  contentStyle={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,fontSize:10}}/>
              </PieChart>
            </ResponsiveContainer>
            <div style={{display:"flex",flexDirection:"column",gap:4,marginTop:4}}>
              {PCP_ADITIVOS_STATUS.map(s=>(
                <div key={s.status} style={{display:"flex",alignItems:"center",gap:6}}>
                  <div style={{width:8,height:8,borderRadius:2,background:s.fill}}/>
                  <span style={{fontSize:9,color:C.muted,flex:1}}>{s.status}</span>
                  <span style={{fontSize:10,fontWeight:700,color:s.fill}}>{s.v}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Responsáveis bar */}
          <div>
            <div style={{fontSize:10,color:C.muted,textAlign:"center",marginBottom:4}}>Resp. NOK</div>
            <ResponsiveContainer width="100%" height={130}>
              <BarChart data={PCP_ADITIVOS_RESP} layout="vertical"
                margin={{top:4,right:16,left:0,bottom:0}}>
                <XAxis type="number" tick={{fill:C.muted,fontSize:8}} domain={[0,6]}/>
                <YAxis type="category" dataKey="resp" tick={{fill:C.muted,fontSize:9}} width={48}/>
                <Tooltip content={<Tip/>}/>
                <Bar dataKey="v" name="Pendências" radius={[0,4,4,0]} barSize={14}>
                  {PCP_ADITIVOS_RESP.map((e,i)=><Cell key={i} fill={e.fill}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Box>

      <HR/>
      <H2 icon="📊" title="Projetado × Realizado (Custos)"/>

      <Box title="Desvio entre Custo Projetado e Realizado" note="📌 Total: projetado R$21,764 → realizado R$16,778. Economia média de 22.9% — indica que materiais saíram mais baratos ou ambientes simplificados.">
        {PCP_PROJ_REAL.map((r,i)=>(
          <div key={i} style={{background:C.surface,borderRadius:10,padding:"12px 14px",
            border:`1px solid ${C.border}`,marginBottom:8}}>
            <div style={{fontSize:11,fontWeight:700,color:C.text,marginBottom:8}}>{r.cliente}</div>
            <div style={{display:"flex",gap:8,marginBottom:6}}>
              <div style={{flex:1,textAlign:"center"}}>
                <div style={{fontSize:9,color:C.muted}}>Projetado</div>
                <div style={{fontSize:16,fontWeight:800,color:C.blue}}>R${r.proj.toLocaleString("pt-BR")}</div>
              </div>
              <div style={{width:1,background:C.border}}/>
              <div style={{flex:1,textAlign:"center"}}>
                <div style={{fontSize:9,color:C.muted}}>Realizado</div>
                <div style={{fontSize:16,fontWeight:800,color:C.green}}>R${r.real.toLocaleString("pt-BR")}</div>
              </div>
              <div style={{width:1,background:C.border}}/>
              <div style={{flex:1,textAlign:"center"}}>
                <div style={{fontSize:9,color:C.muted}}>Desvio</div>
                <div style={{fontSize:16,fontWeight:800,color:C.red}}>{r.pct.toFixed(1)}%↓</div>
              </div>
            </div>
            {/* progress bar desvio */}
            <div style={{background:C.border,borderRadius:4,height:6}}>
              <div style={{width:`${100-r.pct}%`,height:"100%",
                background:`linear-gradient(90deg,${C.green},${C.teal})`,borderRadius:4}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:3}}>
              <span style={{fontSize:8,color:C.muted}}>Realizado: {(100-r.pct).toFixed(0)}%</span>
              <span style={{fontSize:8,color:C.red}}>Economia: R${Math.abs(r.dif).toLocaleString("pt-BR")}</span>
            </div>
          </div>
        ))}
        {/* Total */}
        <div style={{background:`linear-gradient(135deg,#1a2040,#0f1320)`,
          border:`1px solid ${C.acc}40`,borderRadius:10,padding:"12px 14px"}}>
          <div style={{fontSize:10,color:C.muted,marginBottom:6,fontWeight:600}}>TOTAL ACOMPANHADO</div>
          <div style={{display:"flex",gap:8}}>
            {[
              {l:"Projetado",v:"R$21.764",c:C.blue},
              {l:"Realizado",v:"R$16.778",c:C.green},
              {l:"Economia",v:"R$4.986",c:C.acc},
              {l:"Desvio",v:"22.9%",c:C.red},
            ].map(k=>(
              <div key={k.l} style={{flex:1,textAlign:"center"}}>
                <div style={{fontSize:8,color:C.muted}}>{k.l}</div>
                <div style={{fontSize:12,fontWeight:800,color:k.c}}>{k.v}</div>
              </div>
            ))}
          </div>
        </div>
      </Box>

      <HR/>
      <H2 icon="🔬" title="Análise de Risco PCP"/>

      {/* Cards de alertas */}
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
        {[
          {nivel:"🔴 CRÍTICO", titulo:"Planos de Corte NOK",
           desc:"241 de 356 ambientes (67.7%) ainda sem plano de corte OK no MACRO. Risco alto de atrasos em cadeia.",
           c:C.red, bg:"#f8717118"},
          {nivel:"🟠 ATENÇÃO", titulo:"Compras Pendentes",
           desc:"67 ambientes em PRODUZIR aguardando compra (58.8%). Pico de custo semana 23/02 (R$86.7K) pode gerar gargalo financeiro.",
           c:C.orange, bg:"#fb923c18"},
          {nivel:"🟡 ALERTA", titulo:"Aditivos sem Plano",
           desc:"31 aditivos com plano NOK. Responsáveis: Tainan (4), Gustavo (5), Camila (2), Aline (2). Necessita regularização urgente.",
           c:C.acc, bg:"#f5a62318"},
          {nivel:"🟢 POSITIVO", titulo:"Eficiência de Custo",
           desc:"3 clientes acompanhados mostraram economia média de 22.9% vs. projetado. Indica boa gestão de fornecedores e compras.",
           c:C.green, bg:"#34d39918"},
        ].map(a=>(
          <div key={a.titulo} style={{background:a.bg,border:`1px solid ${a.c}40`,
            borderRadius:10,padding:"12px 14px"}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
              <span style={{fontSize:10,fontWeight:800,color:a.c}}>{a.nivel}</span>
              <span style={{fontSize:11,fontWeight:700,color:C.text}}>{a.titulo}</span>
            </div>
            <div style={{fontSize:10,color:"#94a3b8",lineHeight:1.5}}>{a.desc}</div>
          </div>
        ))}
      </div>

    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  APP
// ═══════════════════════════════════════════════════════════
const TABS=[
  {id:"home",  icon:"🏠",label:"Início"},
  {id:"com",   icon:"💰",label:"Comercial"},
  {id:"oper",  icon:"⚙️",label:"Operac."},
  {id:"fin",   icon:"📈",label:"Fin/RH"},
  {id:"mkt",   icon:"📣",label:"Mkt/SAC"},
  {id:"corr",  icon:"🔗",label:"Correlações"},
  {id:"pcp",   icon:"🏭",label:"PCP"},
];

export default function AppMobile(){
  const [tab,setTab]=useState("home");
  const ref=useRef(null);
  const go=(id)=>{setTab(id);if(ref.current)ref.current.scrollTop=0;};
  const pages={home:<PgInicio/>,com:<PgComercial/>,oper:<PgOperacional/>,fin:<PgFinanceiro/>,mkt:<PgMkt/>,corr:<PgCorrelacoes/>,pcp:<PgPCP/>};
  return (
    <div style={{maxWidth:430,margin:"0 auto",minHeight:"100vh",background:C.bg,
      color:C.text,fontFamily:"'SF Pro Display','Segoe UI',system-ui,sans-serif",
      display:"flex",flexDirection:"column"}}>

      {/* Header */}
      <div style={{background:C.surface,borderBottom:`1px solid ${C.border}`,
        padding:"10px 16px",position:"sticky",top:0,zIndex:60,
        display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:34,height:34,borderRadius:9,
            background:`linear-gradient(135deg,${C.acc},#d97706)`,
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:16,fontWeight:900,color:"#000"}}>N</div>
          <div>
            <div style={{fontSize:14,fontWeight:700,letterSpacing:.2}}>Ennebê Planejados</div>
            <div style={{fontSize:9,color:C.muted,letterSpacing:.8,textTransform:"uppercase"}}>Dashboard de Indicadores · v5</div>
          </div>
        </div>
        <div style={{fontSize:9,color:C.muted,textAlign:"right",lineHeight:1.5}}>
          <div style={{color:C.acc,fontWeight:700,fontSize:11}}>Sem. 20/02</div>
          <div>Dez/25–Fev/26</div>
        </div>
      </div>

      {/* Tab bar — horizontal scroll */}
      <div style={{background:C.surface,borderBottom:`1px solid ${C.border}`,
        display:"flex",overflowX:"auto",scrollbarWidth:"none",
        WebkitOverflowScrolling:"touch",position:"sticky",top:56,zIndex:50}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>go(t.id)} style={{
            background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",
            padding:"10px 14px",display:"flex",flexDirection:"column",alignItems:"center",gap:2,
            borderBottom:tab===t.id?`2px solid ${C.acc}`:"2px solid transparent",
            color:tab===t.id?C.acc:C.muted,whiteSpace:"nowrap",flexShrink:0,minWidth:62,
          }}>
            <span style={{fontSize:16,lineHeight:1}}>{t.icon}</span>
            <span style={{fontSize:9,fontWeight:tab===t.id?700:400,letterSpacing:.3}}>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      <div ref={ref} style={{flex:1,overflowY:"auto",padding:"16px 14px 28px"}}>
        {pages[tab]}
      </div>
    </div>
  );
}
