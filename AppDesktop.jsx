import { useState } from "react";
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
  bg:"#060a10", surface:"#0c1019", card:"#111827", border:"#1a2235",
  acc:"#f5a623", blue:"#38bdf8", green:"#34d399", red:"#f87171",
  purple:"#a78bfa", teal:"#2dd4bf", pink:"#f472b6", orange:"#fb923c",
  text:"#e2e8f4", muted:"#4a5570", mutedL:"#7a8aaa",
  cric:"#38bdf8", arar:"#f472b6", side:"#080d16",
};

// ═══════════════════════════════════════════════════════════
//  DADOS — 100% verificados contra planilha fonte
// ═══════════════════════════════════════════════════════════
const PV = [
  {w:"12/12",leads:39,qual:16,taxaQ:41.0,brSem:0},
  {w:"19/12",leads:27,qual:15,taxaQ:55.6,brSem:0},
  {w:"09/01",leads:24,qual:9, taxaQ:37.5,brSem:0},
  {w:"16/01",leads:25,qual:11,taxaQ:44.0,brSem:0},
  {w:"23/01",leads:31,qual:5, taxaQ:16.1,brSem:4},
  {w:"30/01",leads:47,qual:17,taxaQ:36.2,brSem:5},
  {w:"06/02",leads:28,qual:7, taxaQ:25.0,brSem:7},
  {w:"13/02",leads:56,qual:21,taxaQ:37.5,brSem:2},
  {w:"20/02",leads:66,qual:20,taxaQ:30.3,brSem:1},
  {w:"01/03",leads:76,qual:13,taxaQ:17.1,brSem:0},
];
const PV_C=[
  {w:"12/12",leads:39,qual:16},
  {w:"19/12",leads:27,qual:15},
  {w:"09/01",leads:24,qual:9},
  {w:"16/01",leads:25,qual:11},
  {w:"23/01",leads:31,qual:5},
  {w:"30/01",leads:47,qual:17},
  {w:"06/02",leads:28,qual:7},
  {w:"13/02",leads:48,qual:17},
  {w:"20/02",leads:42,qual:8},
  {w:"01/03",leads:56,qual:8},
];
const PV_A=[
  {w:"13/02",leads:8, qual:4},
  {w:"20/02",leads:24,qual:12},
  {w:"01/03",leads:20,qual:5},
];

const VD = [
  {w:"12/12",cS:0, vS:0,      cM:0,  vM:0,      nQ:10,nR:404350,   pipe:0,  cart:0          },
  {w:"19/12",cS:2, vS:54700,  cM:0,  vM:0,      nQ:7, nR:116370,   pipe:0,  cart:0          },
  {w:"09/01",cS:1, vS:2900,   cM:1,  vM:2900,   nQ:5, nR:48840,    pipe:14, cart:1157160    },
  {w:"16/01",cS:2, vS:82389,  cM:3,  vM:85289,  nQ:17,nR:196380,   pipe:20, cart:1156580    },
  {w:"23/01",cS:2, vS:18420,  cM:5,  vM:103709, nQ:19,nR:327447,   pipe:45, cart:1735049    },
  {w:"30/01",cS:8, vS:107902, cM:13, vM:211611, nQ:23,nR:266083,   pipe:51, cart:1787764    },
  {w:"06/02",cS:2, vS:12210,  cM:2,  vM:12210,  nQ:27,nR:371175,   pipe:76, cart:2040994    },
  {w:"13/02",cS:2, vS:50000,  cM:4,  vM:62210,  nQ:11,nR:97380,    pipe:62, cart:2116056    },
  {w:"20/02",cS:3, vS:68836,  cM:7,  vM:131046, nQ:8, nR:142260,   pipe:69, cart:2186056    },
  {w:"01/03",cS:6, vS:245885, cM:13, vM:376931, nQ:13,nR:416628,   pipe:71, cart:2485305    },
];
const VD_C=[
  {w:"12/12",vS:0,      cart:null    },
  {w:"19/12",vS:54700,  cart:null    },
  {w:"09/01",vS:2900,   cart:1157160 },
  {w:"16/01",vS:82389,  cart:1156580 },
  {w:"23/01",vS:4420,   cart:1364865 },
  {w:"30/01",vS:91099,  cart:1402580 },
  {w:"06/02",vS:0,      cart:1703840 },
  {w:"13/02",vS:15000,  cart:1745220 },
  {w:"20/02",vS:56210,  cart:1795220 },
  {w:"01/03",vS:245885, cart:1807468 },
];
const VD_A=[
  {w:"23/01",vS:14000, cart:370184 },
  {w:"30/01",vS:16803, cart:385184 },
  {w:"06/02",vS:12210, cart:337154 },
  {w:"13/02",vS:35000, cart:370836 },
  {w:"20/02",vS:12626, cart:390836 },
  {w:"01/03",vS:0,     cart:677836 },
];

const CF = [
  {w:"12/12",conf:15,aConf:67,atr:5, val:45500  },
  {w:"19/12",conf:9, aConf:78,atr:11,val:143050 },
  {w:"09/01",conf:2, aConf:76,atr:32,val:315370 },
  {w:"16/01",conf:2, aConf:78,atr:33,val:317427 },
  {w:"23/01",conf:13,aConf:62,atr:34,val:330977 },
  {w:"30/01",conf:4, aConf:78,atr:38,val:267177 },
  {w:"06/02",conf:4, aConf:90,atr:35,val:203607 },
  {w:"13/02",conf:10,aConf:94,atr:24,val:183357 },
  {w:"20/02",conf:15,aConf:88,atr:11,val:47125  },
  {w:"01/03",conf:12,aConf:86,atr:9, val:58073  },
];

const PROD = [
  {w:"12/12",ini:5, fin:3, tmed:3},
  {w:"19/12",ini:1, fin:2, tmed:5},
  {w:"09/01",ini:7, fin:0, tmed:0},
  {w:"16/01",ini:0, fin:7, tmed:5},
  {w:"23/01",ini:5, fin:5, tmed:4},
  {w:"30/01",ini:1, fin:1, tmed:2},
  {w:"06/02",ini:9, fin:9, tmed:2},
  {w:"13/02",ini:3, fin:3, tmed:4},
  {w:"20/02",ini:10,fin:10,tmed:4},
  {w:"01/03",ini:4, fin:4, tmed:4},
];
const PREMONT=[
  {w:"16/01",ini:6, fin:2, tmed:null},{w:"23/01",ini:5, fin:2, tmed:1},
  {w:"30/01",ini:1, fin:2, tmed:1},  {w:"06/02",ini:7, fin:3, tmed:1},
  {w:"13/02",ini:2, fin:1, tmed:2},  {w:"20/02",ini:4, fin:2, tmed:2},
  {w:"01/03",ini:15,fin:14,tmed:2},
];

const MONT = [
  {w:"12/12",ini:5, conc:1, pend:null},
  {w:"19/12",ini:5, conc:0, pend:null},
  {w:"09/01",ini:0, conc:0, pend:null},
  {w:"16/01",ini:2, conc:1, pend:null},
  {w:"23/01",ini:2, conc:1, pend:null},
  {w:"30/01",ini:9, conc:2, pend:null},
  {w:"06/02",ini:0, conc:0, pend:8   },
  {w:"13/02",ini:8, conc:5, pend:5   },
  {w:"20/02",ini:1, conc:1, pend:10  },
  {w:"01/03",ini:3, conc:3, pend:10  },
];

const AT = [
  {w:"12/12",aberto:43,cham:0, ini:0, fin:4},
  {w:"19/12",aberto:34,cham:0, ini:0, fin:9},
  {w:"09/01",aberto:34,cham:0, ini:2, fin:0},
  {w:"16/01",aberto:30,cham:2, ini:6, fin:6},
  {w:"23/01",aberto:26,cham:1, ini:8, fin:5},
  {w:"30/01",aberto:22,cham:0, ini:6, fin:4},
  {w:"06/02",aberto:18,cham:1, ini:8, fin:5},
  {w:"13/02",aberto:14,cham:1, ini:9, fin:5},
  {w:"20/02",aberto:15,cham:5, ini:4, fin:4},
  {w:"01/03",aberto:24,cham:14,ini:7, fin:5},
];

const SAC = [
  {w:"12/12",cobr:2, cont:3, ra:2,goo:3,resol:0,ret:0,nps:null,nota:null},
  {w:"19/12",cobr:13,cont:11,ra:0,goo:0,resol:0,ret:0,nps:null,nota:null},
  {w:"09/01",cobr:13,cont:13,ra:0,goo:0,resol:0,ret:0,nps:null,nota:null},
  {w:"16/01",cobr:5, cont:7, ra:1,goo:1,resol:0,ret:0,nps:null,nota:null},
  {w:"23/01",cobr:5, cont:5, ra:0,goo:0,resol:0,ret:0,nps:null,nota:null},
  {w:"30/01",cobr:15,cont:15,ra:0,goo:0,resol:0,ret:5,nps:null,nota:null},
  {w:"06/02",cobr:21,cont:21,ra:0,goo:1,resol:0,ret:0,nps:null,nota:null},
  {w:"13/02",cobr:18,cont:18,ra:0,goo:0,resol:3,ret:0,nps:60,  nota:8.8 },
  {w:"20/02",cobr:17,cont:17,ra:0,goo:0,resol:1,ret:0,nps:null,nota:null},
  {w:"01/03",cobr:29,cont:29,ra:0,goo:0,resol:1,ret:0,nps:null,nota:null},
];

const FIN = [
  {w:"12/12",mg:0,   cond100:false},
  {w:"19/12",mg:0,   cond100:false},
  {w:"09/01",mg:81.8,cond100:true },
  {w:"16/01",mg:70.9,cond100:true },
  {w:"23/01",mg:79.4,cond100:true },
  {w:"30/01",mg:68.3,cond100:true },
  {w:"06/02",mg:71.9,cond100:true },
  {w:"13/02",mg:64.1,cond100:true },
  {w:"20/02",mg:70.3,cond100:true },
  {w:"01/03",mg:59.2,cond100:true },
];
const MIX_PAG=[
  {name:"Aymoré",value:50.3,fill:"#38bdf8"},
  {name:"Saldo Entrega",value:25.3,fill:"#a78bfa"},
  {name:"Entrada",value:13.6,fill:"#f5a623"},
  {name:"Parcelamento",value:10.8,fill:"#34d399"},
];

const RH = [
  {w:"12/12",total:0, loja:null,fab:null,abs:15.92,turn:0,   hexLoja:null, hexFab:null, hexTotal:67.93},
  {w:"19/12",total:0, loja:null,fab:null,abs:13.1, turn:2.7, hexLoja:null, hexFab:null, hexTotal:48.0 },
  {w:"09/01",total:34,loja:17,  fab:17,  abs:10.1, turn:5.6, hexLoja:14.23,hexFab:9.77, hexTotal:24.0 },
  {w:"16/01",total:34,loja:17,  fab:17,  abs:11.05,turn:2.94,hexLoja:14.53,hexFab:56.1, hexTotal:70.63},
  {w:"23/01",total:35,loja:17,  fab:18,  abs:8.6,  turn:4.29,hexLoja:20.63,hexFab:40.1, hexTotal:60.73},
  {w:"30/01",total:35,loja:17,  fab:18,  abs:0,    turn:5.71,hexLoja:27.07,hexFab:65.83,hexTotal:92.9 },
  {w:"06/02",total:36,loja:17,  fab:19,  abs:3.76, turn:4.17,hexLoja:26.18,hexFab:64.05,hexTotal:90.23},
  {w:"13/02",total:37,loja:16,  fab:21,  abs:3.67, turn:4.05,hexLoja:18.8, hexFab:24.77,hexTotal:43.57},
  {w:"20/02",total:36,loja:16,  fab:20,  abs:2.39, turn:1.39,hexLoja:11.52,hexFab:40.78,hexTotal:52.3 },
  {w:"01/03",total:35,loja:16,  fab:19,  abs:3.41, turn:1.43,hexLoja:39.77,hexFab:75.4, hexTotal:115.17},
];

const MKT=[
  {w:"13/02",ennInv:2084,ennRoas:7.19, ennCpc:.47,ennAc:885, seg:10709,ideInv:320,ideRoas:109.43,ideCpc:1.24,ideRejeicao:57.5,ennRejeicao:92.1},
  {w:"20/02",ennInv:2226,ennRoas:32.46,ennCpc:.41,ennAc:1238,seg:10738,ideInv:512,ideRoas:0,     ideCpc:1.22,ideRejeicao:56.2,ennRejeicao:91.2},
  {w:"01/03",ennInv:1896,ennRoas:71.05,ennCpc:.19,ennAc:2253,seg:10813,ideInv:373,ideRoas:0,     ideCpc:1.28,ideRejeicao:57.0,ennRejeicao:93.3},
];

// PCP Data
const PCP_LOJA=[
  {loja:"Criciúma",ambientes:187,pct:52.5,fill:"#38bdf8"},
  {loja:"Torres",  ambientes:159,pct:44.7,fill:"#a78bfa"},
  {loja:"Araranguá",ambientes:10,pct:2.8, fill:"#f472b6"},
];
const PCP_CORTE_STATUS=[
  {status:"Finalizado",v:80, fill:"#34d399"},
  {status:"Na Fila",   v:205,fill:"#f5a623"},
  {status:"Atrasado",  v:2,  fill:"#f87171"},
  {status:"Urgente",   v:8,  fill:"#fb923c"},
];
const PCP_COMPRA_STATUS=[
  {status:"Compra OK",      v:39,fill:"#34d399"},
  {status:"Aguard. Compra", v:67,fill:"#f5a623"},
  {status:"Aguard. P.Corte",v:5, fill:"#f87171"},
  {status:"Atenção",        v:1, fill:"#fb923c"},
  {status:"Com Aditivo",    v:12,fill:"#a78bfa"},
];
const PCP_CUSTOS_SEM=[
  {sem:"26/01",mp:14424,acs:5386, agt:6898, total:26709},
  {sem:"02/02",mp:6213, acs:2865, agt:4128, total:13206},
  {sem:"09/02",mp:26837,acs:14686,agt:12819,total:54342},
  {sem:"23/02",mp:51199,acs:22302,agt:23956,total:86696},
  {sem:"09/03",mp:10459,acs:10856,agt:4221, total:25536},
  {sem:"16/03",mp:7753, acs:2827, agt:1922, total:12502},
];
const PCP_MIX_CUSTO=[
  {name:"Movelaria", value:184584,pct:62.5,fill:"#38bdf8"},
  {name:"Agratto",   value:87534, pct:29.7,fill:"#a78bfa"},
  {name:"Acessórios",value:23011, pct:7.8, fill:"#f472b6"},
];
const PCP_ADITIVOS_STATUS=[
  {status:"Plano OK",      v:36,fill:"#34d399"},
  {status:"Plano NOK",     v:31,fill:"#f87171"},
  {status:"Sem data def.", v:4, fill:"#f5a623"},
];
const PCP_ADITIVOS_RESP=[
  {resp:"GUSTAVO",v:5,fill:"#a78bfa"},
  {resp:"TAINAN", v:4,fill:"#38bdf8"},
  {resp:"CAMILA", v:2,fill:"#f472b6"},
  {resp:"ALINE",  v:2,fill:"#fb923c"},
];
const PCP_PROJ_REAL=[
  {cliente:"Paulo Beise/Nivalda",proj:9927, real:7862,dif:-2065,pct:20.8},
  {cliente:"SESC",               proj:6938, real:4400,dif:-2538,pct:36.6},
  {cliente:"Leonardo",           proj:4899, real:4516,dif:-383, pct:7.8},
];
const PCP_TIMELINE=[
  {sem:"26/01",amb:8, custo:26709},{sem:"02/02",amb:5, custo:13206},
  {sem:"09/02",amb:12,custo:52312},{sem:"16/02",amb:13,custo:34005},
  {sem:"23/02",amb:16,custo:49920},{sem:"02/03",amb:12,custo:44319},
  {sem:"09/03",amb:15,custo:25635},{sem:"16/03",amb:13,custo:49021},
  {sem:"23/03",amb:11,custo:0},   {sem:"30/03",amb:7, custo:0},
];

// ═══════════════════════════════════════════════════════════
//  HELPERS VISUAIS
// ═══════════════════════════════════════════════════════════
function Tip(){
  return ({active,payload,label})=>{
    if(!active||!payload?.length) return null;
    return (
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px",fontSize:11}}>
        {label&&<div style={{color:C.mutedL,marginBottom:6,fontWeight:600}}>{label}</div>}
        {payload.map((p,i)=>(
          <div key={i} style={{color:p.color||C.text,display:"flex",gap:8,justifyContent:"space-between",marginBottom:2}}>
            <span>{p.name}</span>
            <span style={{fontWeight:700}}>{typeof p.value==="number"&&p.value>1000?p.value.toLocaleString("pt-BR"):p.value}</span>
          </div>
        ))}
      </div>
    );
  };
}
const TIP = Tip();

function Badge({v,inv=false}){
  if(v==null) return null;
  const n=parseFloat(v); const good=inv?n<0:n>0;
  const col=n===0?C.muted:good?C.green:C.red;
  return <span style={{fontSize:10,color:col,fontWeight:700,marginLeft:4}}>{n>0?"▲":"▼"} {Math.abs(n)}%</span>;
}

// KPI Card (desktop size)
function K({label,val,unit,sub,tp,inv=false,color=C.acc,icon}){
  return (
    <div style={{background:C.card,borderRadius:12,padding:"18px 20px",
      borderLeft:`3px solid ${color}`,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",right:16,top:16,fontSize:24,opacity:.15}}>{icon}</div>
      <div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>{label}</div>
      <div style={{display:"flex",alignItems:"baseline",gap:4,flexWrap:"wrap"}}>
        <span style={{fontSize:26,fontWeight:800,color:C.text,lineHeight:1}}>{val??'–'}</span>
        {unit&&<span style={{fontSize:12,color:C.muted}}>{unit}</span>}
        <Badge v={tp} inv={inv}/>
      </div>
      {sub&&<div style={{fontSize:11,color:C.muted,marginTop:4}}>{sub}</div>}
    </div>
  );
}

// Card container com título
function Box({title,children,note,style={}}){
  return (
    <div style={{background:C.card,borderRadius:12,padding:"18px 20px",...style}}>
      {title&&<div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:.8,marginBottom:14,fontWeight:700,display:"flex",alignItems:"center",gap:6}}>
        <div style={{width:3,height:12,background:C.acc,borderRadius:2}}/>
        {title}
      </div>}
      {children}
      {note&&<div style={{fontSize:10,color:C.muted,marginTop:10,fontStyle:"italic",lineHeight:1.5}}>{note}</div>}
    </div>
  );
}

// Grid de 2/3/4 colunas
const G=(cols,gap=14)=>({display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap});
const SEC=({title,icon,children})=>(
  <div style={{marginBottom:28}}>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,paddingBottom:10,borderBottom:`1px solid ${C.border}`}}>
      <span style={{fontSize:18}}>{icon}</span>
      <span style={{fontSize:14,fontWeight:800,color:C.text,letterSpacing:.3}}>{title}</span>
    </div>
    {children}
  </div>
);

function GoalBar({label,val,goal,unit,color=C.acc,rev=false}){
  const ok=rev?val<=goal:val>=goal;
  return (
    <div style={{marginBottom:12}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
        <span style={{fontSize:12,color:C.text}}>{label}</span>
        <span style={{fontSize:12,fontWeight:700,color:ok?C.green:C.red}}>{val}{unit} <span style={{color:C.muted,fontWeight:400}}>/ meta {goal}{unit}</span></span>
      </div>
      <div style={{background:"#1a1f30",borderRadius:4,height:6}}>
        <div style={{width:`${Math.min((val/goal)*100,100)}%`,height:6,borderRadius:4,background:ok?C.green:color}}/>
      </div>
    </div>
  );
}

// Pie label
const REND=({cx,cy,midAngle,innerRadius,outerRadius,percent,value})=>{
  const R=Math.PI/180;
  const r=innerRadius+(outerRadius-innerRadius)*.55;
  const x=cx+r*Math.cos(-midAngle*R), y=cy+r*Math.sin(-midAngle*R);
  if(percent<.07) return null;
  return <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" style={{fontSize:10,fontWeight:700}}>{`${(percent*100).toFixed(0)}%`}</text>;
};

// ═══════════════════════════════════════════════════════════
//  PÁGINAS
// ═══════════════════════════════════════════════════════════

function PgInicio(){
  const lv=VD.at(-1),lp=PV.at(-1),lc=CF.at(-1),lf=FIN.at(-1),
        lr=RH.at(-1),lat=AT.at(-1),lm=MONT.at(-1);
  const radar=[
    {a:"MKT",v:72},{a:"Pré-Venda",v:68},{a:"Vendas",v:80},
    {a:"Conferência",v:58},{a:"Produção",v:75},{a:"Montagem",v:55},
    {a:"AT",v:85},{a:"SAC",v:62},{a:"Financeiro",v:70},
  ];
  return (
    <div>
      <SEC title="Visão Geral — Sem. 01/03/2026" icon="📊">
        <div style={G(5,12)}>
          <K label="Carteira Total"   val={`R$${(lv.cart/1000000).toFixed(2)}M`} sub="acumulada mês" color={C.acc} icon="💼"/>
          <K label="Pipeline Clientes" val={lv.pipe} sub="em negociação" color={C.blue} icon="🔄"/>
          <K label="Contratos/Sem"    val={`${lv.cS}`} sub="ambientes vendidos" color={C.green} icon="✅"/>
          <K label="AT em Aberto"     val={lat.aberto} sub="vs 43 em dez/25" color={C.red} icon="🔧"/>
          <K label="Margem Bruta"     val={`${lf.mg}%`} sub="meta >70%" color={lf.mg>=70?C.green:C.red} icon="📈"/>
        </div>
        <div style={{...G(5,12),marginTop:12}}>
          <K label="Leads Semana"     val={lp.leads} sub="taxa qual. 30.3%" color={C.purple} icon="📩"/>
          <K label="Conferidos"       val={lc.conf}  sub="atrasados: 11" color={C.teal} icon="✔️"/>
          <K label="Produção Ini."    val={PROD.at(-1).ini} sub="finalizados: 10" color={C.orange} icon="⚙️"/>
          <K label="Pend. Finaliz."   val={lm.pend}  sub="montagem" color={C.red} icon="🏗️"/>
          <K label="Colaboradores"    val={lr.total} sub="absenteísmo 2.4%" color={C.blue} icon="👥"/>
        </div>
      </SEC>

      <div style={G(2,16)}>
        {/* Funil comercial */}
        <Box title="Funil Comercial — Semana 01/03">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart layout="vertical"
              data={[
                {e:"Leads",v:66},{e:"Qualificados",v:20},{e:"Briefings",v:1},
                {e:"Negociações",v:8},{e:"Contratos",v:4},
              ]} margin={{left:20,right:30,top:4,bottom:4}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false}/>
              <XAxis type="number" tick={{fill:C.muted,fontSize:10}}/>
              <YAxis type="category" dataKey="e" tick={{fill:C.mutedL,fontSize:11}} width={90}/>
              <Tooltip content={<TIP/>}/>
              <Bar dataKey="v" name="Quantidade" radius={[0,6,6,0]} barSize={22}>
                {[C.blue,C.purple,C.orange,C.teal,C.green].map((c,i)=><Cell key={i} fill={c}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Radar saúde */}
        <Box title="Score de Saúde por Área">
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radar} cx="50%" cy="50%">
              <PolarGrid stroke={C.border}/>
              <PolarAngleAxis dataKey="a" tick={{fill:C.mutedL,fontSize:10}}/>
              <PolarRadiusAxis angle={30} domain={[0,100]} tick={false}/>
              <Radar dataKey="v" stroke={C.acc} fill={C.acc} fillOpacity={.25} strokeWidth={2}/>
              <Tooltip content={<TIP/>}/>
            </RadarChart>
          </ResponsiveContainer>
        </Box>
      </div>

      <div style={{...G(3,16),marginTop:16}}>
        {/* Carteira acumulada */}
        <Box title="Carteira Acumulada (Criciúma + Araranguá)">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={VD} margin={{top:4,right:8,left:-10,bottom:0}}>
              <defs>
                <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.acc} stopOpacity={.3}/>
                  <stop offset="95%" stopColor={C.acc} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
              <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
              <YAxis tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${(v/1e6).toFixed(1)}M`}/>
              <Tooltip content={<TIP/>} formatter={v=>`R$${(v/1000).toFixed(0)}K`}/>
              <Area type="monotone" dataKey="cart" name="Carteira R$" stroke={C.acc} fill="url(#gc)" strokeWidth={2.5}/>
            </AreaChart>
          </ResponsiveContainer>
        </Box>

        {/* AT aberto */}
        <Box title="AT em Aberto — Redução 65%">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={AT} margin={{top:4,right:8,left:-10,bottom:0}}>
              <defs>
                <linearGradient id="gat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.red} stopOpacity={.3}/>
                  <stop offset="95%" stopColor={C.red} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
              <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
              <YAxis tick={{fill:C.muted,fontSize:9}}/>
              <Tooltip content={<TIP/>}/>
              <Area type="monotone" dataKey="aberto" name="AT em Aberto" stroke={C.red} fill="url(#gat)" strokeWidth={2.5}/>
            </AreaChart>
          </ResponsiveContainer>
        </Box>

        {/* Margem bruta */}
        <Box title="Margem Bruta (%) — meta 70%">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={FIN} margin={{top:4,right:8,left:-10,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
              <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
              <YAxis domain={[65,85]} tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${v}%`}/>
              <Tooltip content={<TIP/>}/>
              <ReferenceLine y={70} stroke={C.green} strokeDasharray="4 4" label={{value:"Meta 70%",fill:C.green,fontSize:9}}/>
              <Line type="monotone" dataKey="mg" name="Margem %" stroke={C.purple} strokeWidth={2.5} dot={{r:4,fill:C.purple}}/>
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </div>
    </div>
  );
}

function PgComercial(){
  return (
    <div>
      <SEC title="Pré-Venda" icon="📩">
        <div style={G(4,12)}>
          <K label="Leads Sem. 20/02" val={PV.at(-1).leads} sub="(+15% vs anterior)" color={C.blue} icon="📩"/>
          <K label="Qualificados"     val={PV.at(-1).qual}  sub={`taxa ${PV.at(-1).taxaQ}%`} color={C.purple} icon="✅"/>
          <K label="Briefings Sem"    val={PV.at(-1).brSem} sub="na semana" color={C.teal} icon="📋"/>
          <K label="Taxa Qualif."     val={`${PV.at(-1).taxaQ}%`} sub="meta >35%" color={PV.at(-1).taxaQ>=35?C.green:C.orange} icon="📊"/>
        </div>
        <div style={{...G(2,16),marginTop:14}}>
          <Box title="Leads Totais vs Qualificados por Semana">
            <ResponsiveContainer width="100%" height={240}>
              <ComposedChart data={PV} margin={{top:4,right:8,left:-10,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                <XAxis dataKey="w" tick={{fill:C.muted,fontSize:10}}/>
                <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:9}}/>
                <YAxis yAxisId="r" orientation="right" tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${v}%`}/>
                <Tooltip content={<TIP/>}/>
                <Legend wrapperStyle={{fontSize:11}}/>
                <Bar yAxisId="l" dataKey="leads" name="Leads" fill={C.blue} radius={[3,3,0,0]} barSize={12} opacity={.8}/>
                <Bar yAxisId="l" dataKey="qual" name="Qualificados" fill={C.purple} radius={[3,3,0,0]} barSize={12}/>
                <Line yAxisId="r" type="monotone" dataKey="taxaQ" name="Taxa Qual.%" stroke={C.acc} strokeWidth={2.5} dot={{r:4}}/>
              </ComposedChart>
            </ResponsiveContainer>
          </Box>

          <Box title="Criciúma vs Araranguá — Leads (a partir 13/02)">
            <div style={{marginBottom:14}}>
              <div style={{display:"flex",gap:12}}>
                {[
                  {label:"Criciúma 01/03",leads:56,qual:8,c:C.cric},
                  {label:"Araranguá 01/03",leads:20,qual:5,c:C.arar},
                ].map(l=>(
                  <div key={l.label} style={{flex:1,background:C.surface,borderRadius:10,padding:"14px 16px",
                    border:`1px solid ${l.c}40`}}>
                    <div style={{fontSize:10,color:l.c,fontWeight:700,marginBottom:8}}>{l.label}</div>
                    <div style={{fontSize:26,fontWeight:800,color:l.c}}>{l.leads}</div>
                    <div style={{fontSize:11,color:C.muted}}>leads · {l.qual} qualificados</div>
                  </div>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={185}>
              <BarChart data={[
                {w:"13/02",cric:48,arar:8},{w:"20/02",cric:42,arar:24},
              ]} margin={{top:4,right:8,left:-10,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                <XAxis dataKey="w" tick={{fill:C.muted,fontSize:10}}/>
                <YAxis tick={{fill:C.muted,fontSize:9}}/>
                <Tooltip content={<TIP/>}/>
                <Legend wrapperStyle={{fontSize:11}}/>
                <Bar dataKey="cric" name="Criciúma" fill={C.cric} radius={[4,4,0,0]} barSize={18}/>
                <Bar dataKey="arar" name="Araranguá" fill={C.arar} radius={[4,4,0,0]} barSize={18}/>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </div>
      </SEC>

      <SEC title="Vendas" icon="💰">
        <div style={G(4,12)}>
          <K label="Contratos Sem."   val={VD.at(-1).cS} sub="20/02" color={C.green} icon="📝"/>
          <K label="Valor Semanal"    val={`R$${(VD.at(-1).vS/1000).toFixed(0)}K`} sub="semana" color={C.acc} icon="💲"/>
          <K label="Carteira Total"   val={`R$${(VD.at(-1).cart/1e6).toFixed(2)}M`} sub="acumulada" color={C.blue} icon="📦"/>
          <K label="Pipeline"         val={VD.at(-1).pipe} sub="clientes" color={C.purple} icon="🔄"/>
        </div>
        <div style={{...G(3,16),marginTop:14}}>
          <Box title="Contratos por Semana">
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={VD} margin={{top:4,right:8,left:-10,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
                <YAxis tick={{fill:C.muted,fontSize:9}}/>
                <Tooltip content={<TIP/>}/>
                <Legend wrapperStyle={{fontSize:11}}/>
                <Bar dataKey="cS" name="Contratos Sem." fill={C.green} radius={[4,4,0,0]} barSize={14}/>
                <Bar dataKey="cM" name="Contratos Mês"  fill={C.teal}  radius={[4,4,0,0]} barSize={14} opacity={.7}/>
              </BarChart>
            </ResponsiveContainer>
          </Box>
          <Box title="Valor Contratos — Criciúma vs Araranguá">
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={[
                {w:"23/01",c:4420,a:14000},{w:"30/01",c:91099,a:16803},
                {w:"06/02",c:0,   a:12210},{w:"13/02",c:15000,a:35000},
                {w:"20/02",c:71260,a:12626},
              ]} margin={{top:4,right:8,left:-10,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
                <YAxis tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${(v/1000).toFixed(0)}K`}/>
                <Tooltip content={<TIP/>} formatter={v=>`R$${v.toLocaleString("pt-BR")}`}/>
                <Legend wrapperStyle={{fontSize:11}}/>
                <Bar dataKey="c" name="Criciúma" fill={C.cric} radius={[4,4,0,0]} barSize={14}/>
                <Bar dataKey="a" name="Araranguá" fill={C.arar} radius={[4,4,0,0]} barSize={14}/>
              </BarChart>
            </ResponsiveContainer>
          </Box>
          <Box title="Carteira Acumulada por Loja">
            <ResponsiveContainer width="100%" height={210}>
              <LineChart margin={{top:4,right:8,left:-10,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                <XAxis dataKey="w" allowDuplicatedCategory={false} tick={{fill:C.muted,fontSize:9}}/>
                <YAxis tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${(v/1000).toFixed(0)}K`}/>
                <Tooltip content={<TIP/>}/>
                <Legend wrapperStyle={{fontSize:11}}/>
                <Line data={VD_C.filter(d=>d.cart)} dataKey="cart" name="Criciúma" stroke={C.cric} strokeWidth={2.5} dot={{r:3}}/>
                <Line data={VD_A} dataKey="cart" name="Araranguá" stroke={C.arar} strokeWidth={2.5} dot={{r:3}}/>
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </div>
      </SEC>
    </div>
  );
}

function PgOperacional(){
  return (
    <div>
      <SEC title="Conferência" icon="✔️">
        <div style={G(4,12)}>
          <K label="Conferidos"   val={CF.at(-1).conf} sub="esta semana" color={C.green} icon="✅"/>
          <K label="Atrasados"    val={CF.at(-1).atr}  sub="(pico 38 em jan)" color={C.red} icon="⚠️"/>
          <K label="Valor em Risco" val={`R$${(CF.at(-1).val/1000).toFixed(1)}K`} sub="ambiente atrasado" color={C.orange} icon="💸"/>
          <K label="A Conferir"   val={CF.at(-1).aConf} sub="pendentes" color={C.blue} icon="📋"/>
        </div>
        <Box title="Conferidos vs Atrasados + Valor em Risco" style={{marginTop:14}}>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={CF} margin={{top:4,right:30,left:-10,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
              <XAxis dataKey="w" tick={{fill:C.muted,fontSize:10}}/>
              <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:9}}/>
              <YAxis yAxisId="r" orientation="right" tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${(v/1000).toFixed(0)}K`}/>
              <Tooltip content={<TIP/>}/>
              <Legend wrapperStyle={{fontSize:11}}/>
              <Bar  yAxisId="l" dataKey="conf" name="Conferidos" fill={C.green} radius={[3,3,0,0]} barSize={14} opacity={.8}/>
              <Bar  yAxisId="l" dataKey="atr"  name="Atrasados"  fill={C.red}   radius={[3,3,0,0]} barSize={14} opacity={.8}/>
              <Line yAxisId="r" type="monotone" dataKey="val"  name="Val. Risco R$" stroke={C.orange} strokeWidth={2.5} dot={{r:3}}/>
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
      </SEC>

      <div style={G(2,16)}>
        <SEC title="Produção" icon="⚙️">
          <div style={G(3,10)}>
            <K label="Iniciados"   val={PROD.at(-1).ini} sub="esta semana" color={C.blue} icon="▶️"/>
            <K label="Finalizados" val={PROD.at(-1).fin} sub="esta semana" color={C.green} icon="✅"/>
            <K label="Tempo Médio" val={`${PROD.at(-1).tmed}d`} sub="produção" color={C.purple} icon="⏱"/>
          </div>
          <Box title="Iniciados vs Finalizados + Tempo Médio" style={{marginTop:12}}>
            <ResponsiveContainer width="100%" height={220}>
              <ComposedChart data={PROD} margin={{top:4,right:30,left:-10,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
                <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:9}}/>
                <YAxis yAxisId="r" orientation="right" tick={{fill:C.muted,fontSize:9}}/>
                <Tooltip content={<TIP/>}/>
                <Legend wrapperStyle={{fontSize:11}}/>
                <Bar  yAxisId="l" dataKey="ini" name="Iniciados"   fill={C.blue}   radius={[3,3,0,0]} barSize={14}/>
                <Bar  yAxisId="l" dataKey="fin" name="Finalizados" fill={C.green}  radius={[3,3,0,0]} barSize={14}/>
                <Line yAxisId="r" type="monotone" dataKey="tmed" name="T. Médio (d)" stroke={C.acc} strokeWidth={2.5} dot={{r:3}}/>
              </ComposedChart>
            </ResponsiveContainer>
          </Box>
        </SEC>

        <SEC title="Montagem + AT" icon="🏗️">
          <div style={G(3,10)}>
            <K label="Mont. Iniciados" val={MONT.at(-1).ini}  sub="esta semana" color={C.blue} icon="🏗️"/>
            <K label="Pend. Finaliz." val={MONT.at(-1).pend} sub="fev/26" color={C.red} icon="⚠️"/>
            <K label="AT em Aberto"   val={AT.at(-1).aberto} sub="-65% desde dez" color={C.green} icon="🔧"/>
          </div>
          <Box title="AT em Aberto vs Montagem Iniciada" style={{marginTop:12}}>
            <ResponsiveContainer width="100%" height={220}>
              <ComposedChart data={AT.map((a,i)=>({...a,montIni:MONT[i].ini}))}
                margin={{top:4,right:30,left:-10,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
                <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:9}}/>
                <YAxis yAxisId="r" orientation="right" tick={{fill:C.muted,fontSize:9}}/>
                <Tooltip content={<TIP/>}/>
                <Legend wrapperStyle={{fontSize:11}}/>
                <Area yAxisId="l" type="monotone" dataKey="aberto" name="AT em Aberto" stroke={C.red} fill={`${C.red}20`} strokeWidth={2}/>
                <Bar  yAxisId="r" dataKey="montIni" name="Mont. Ini." fill={C.blue} radius={[3,3,0,0]} barSize={14} opacity={.8}/>
              </ComposedChart>
            </ResponsiveContainer>
          </Box>
        </SEC>
      </div>
    </div>
  );
}

function PgFinanceiro(){
  return (
    <div>
      <SEC title="Financeiro" icon="📈">
        <div style={G(4,12)}>
          <K label="Margem Bruta"    val={`${FIN.at(-1).mg}%`} sub="meta >70%" color={FIN.at(-1).mg>=70?C.green:C.red} icon="📊"/>
          <K label="Cond. Pagamento" val="100%" sub="desde 09/01" color={C.green} icon="✅"/>
          <K label="Mix Aymoré"      val="63.7%" sub="financiado" color={C.blue} icon="🏦"/>
          <K label="Mix Cartão"      val="34.2%" sub="à vista/parcelado" color={C.purple} icon="💳"/>
        </div>
        <div style={{...G(2,16),marginTop:14}}>
          <Box title="Margem Bruta (%) — Evolução + Meta 70%">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={FIN} margin={{top:4,right:8,left:-10,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                <XAxis dataKey="w" tick={{fill:C.muted,fontSize:10}}/>
                <YAxis domain={[65,85]} tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${v}%`}/>
                <Tooltip content={<TIP/>}/>
                <ReferenceLine y={70} stroke={C.green} strokeDasharray="4 4" label={{value:"Meta 70%",fill:C.green,fontSize:10,position:"right"}}/>
                <Line type="monotone" dataKey="mg" name="Margem %" stroke={C.purple} strokeWidth={2.5} dot={{r:5,fill:C.purple}}/>
              </LineChart>
            </ResponsiveContainer>
          </Box>
          <Box title="Mix de Pagamento — 20/02/2026">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={MIX_PAG} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                  dataKey="value" nameKey="name" labelLine={false} label={REND}>
                  {MIX_PAG.map((e,i)=><Cell key={i} fill={e.fill}/>)}
                </Pie>
                <Tooltip formatter={(v,n)=>[`${v}%`,n]} contentStyle={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
                <Legend wrapperStyle={{fontSize:11}}/>
              </PieChart>
            </ResponsiveContainer>
            <div style={{background:C.surface,borderRadius:8,padding:"10px 14px",border:`1px solid ${C.border}40`,marginTop:8}}>
              <div style={{fontSize:10,color:C.muted,marginBottom:6}}>METAS SOBERANOS</div>
              <GoalBar label="Backlog" val={13.75} goal={4} unit=" meses" color={C.red} rev={true}/>
              <GoalBar label="Entrega no Prazo" val={83.3} goal={90} unit="%" color={C.orange}/>
              <GoalBar label="Margem Contribuição" val={49} goal={45} unit="%" color={C.green}/>
            </div>
          </Box>
        </div>
      </SEC>

      <SEC title="Recursos Humanos" icon="👥">
        <div style={G(5,12)}>
          <K label="Colaboradores"  val={RH.at(-1).total} sub={`Loja ${RH.at(-1).loja} · Fáb ${RH.at(-1).fab}`} color={C.blue} icon="👥"/>
          <K label="Absenteísmo"   val={`${RH.at(-1).abs}%`} sub="vs 15.9% em dez" color={RH.at(-1).abs<5?C.green:C.orange} icon="📉"/>
          <K label="Turn Over"     val={`${RH.at(-1).turn}%`} sub="semana" color={RH.at(-1).turn>0?C.orange:C.green} icon="🔁"/>
          <K label="H. Extras Total" val={`${RH.at(-1).hexTotal}h`} sub="semana" color={C.purple} icon="⏰"/>
          <K label="H. Ext. Fábrica" val={`${RH.at(-1).hexFab}h`} sub="+317% desde dez" color={C.red} icon="🏭"/>
        </div>
        <div style={{...G(2,16),marginTop:14}}>
          <Box title="Absenteísmo (%) — Total / Loja / Fábrica">
            <ResponsiveContainer width="100%" height={230}>
              <LineChart data={RH} margin={{top:4,right:8,left:-10,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                <XAxis dataKey="w" tick={{fill:C.muted,fontSize:10}}/>
                <YAxis tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${v}%`}/>
                <Tooltip content={<TIP/>}/>
                <Legend wrapperStyle={{fontSize:11}}/>
                <Line type="monotone" dataKey="abs" name="Absenteísmo Total%" stroke={C.red}    strokeWidth={2.5} dot={{r:4}}/>
              </LineChart>
            </ResponsiveContainer>
          </Box>
          <Box title="Horas Extras — Total / Loja / Fábrica">
            <ResponsiveContainer width="100%" height={230}>
              <ComposedChart data={RH} margin={{top:4,right:8,left:-10,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                <XAxis dataKey="w" tick={{fill:C.muted,fontSize:10}}/>
                <YAxis tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${v}h`}/>
                <Tooltip content={<TIP/>}/>
                <Legend wrapperStyle={{fontSize:11}}/>
                <Bar dataKey="hexLoja" name="H.Ext. Loja" fill={C.cric}   stackId="a" radius={[0,0,0,0]} barSize={16}/>
                <Bar dataKey="hexFab"  name="H.Ext. Fáb." fill={C.purple} stackId="a" radius={[4,4,0,0]} barSize={16}/>
                <Line type="monotone" dataKey="hexTotal" name="Total h" stroke={C.acc} strokeWidth={2.5} dot={{r:4}}/>
              </ComposedChart>
            </ResponsiveContainer>
          </Box>
        </div>
      </SEC>
    </div>
  );
}

function PgMkt(){
  return (
    <div>
      <div style={{background:`#f5a62312`,border:`1px solid ${C.acc}40`,borderRadius:10,padding:"10px 16px",marginBottom:18,fontSize:11,color:C.acc}}>
        ⚠️ Dados de Marketing e SAC disponíveis apenas a partir de 13/02/2026 (2 semanas de histórico)
      </div>
      <div style={G(2,16)}>
        <SEC title="Marketing Digital" icon="📣">
          <div style={G(3,10)}>
            <K label="ROAS Ennebê"   val={`${MKT.at(-1).ennRoas}×`} sub="retorno sobre invest." color={C.green} icon="📈"/>
            <K label="Invest. Sem."  val={`R$${MKT.at(-1).ennInv}`} sub="ennebê" color={C.acc} icon="💰"/>
            <K label="CPC Google"    val={`R$${MKT.at(-1).ennCpc}`} sub="custo por clique" color={C.blue} icon="🖱️"/>
          </div>
          <Box title="ROAS Ennebê vs Idealle" style={{marginTop:12}}>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                {sem:"13/02",ennebê:7.19, idealle:109.43},
                {sem:"20/02",ennebê:32.46,idealle:0},
              ]} margin={{top:4,right:8,left:-10,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                <XAxis dataKey="sem" tick={{fill:C.muted,fontSize:10}}/>
                <YAxis tick={{fill:C.muted,fontSize:9}}/>
                <Tooltip content={<TIP/>}/>
                <Legend wrapperStyle={{fontSize:11}}/>
                <Bar dataKey="ennebê"  fill={C.acc}    radius={[4,4,0,0]} barSize={28}/>
                <Bar dataKey="idealle" fill={C.purple} radius={[4,4,0,0]} barSize={28}/>
              </BarChart>
            </ResponsiveContainer>
          </Box>
          <Box title="Taxa de Rejeição — Alerta" style={{marginTop:12}}>
            <div style={{display:"flex",gap:12}}>
              {[
                {marca:"Ennebê",v:91.2,c:C.red,alerta:"CRÍTICO — muito alta"},
                {marca:"Idealle",v:56.2,c:C.orange,alerta:"MODERADO"},
              ].map(r=>(
                <div key={r.marca} style={{flex:1,background:C.surface,borderRadius:10,padding:"14px 16px",
                  border:`1px solid ${r.c}40`,textAlign:"center"}}>
                  <div style={{fontSize:11,fontWeight:700,color:r.c,marginBottom:6}}>{r.marca}</div>
                  <div style={{fontSize:32,fontWeight:800,color:r.c}}>{r.v}%</div>
                  <div style={{fontSize:10,color:C.muted,marginTop:4}}>{r.alerta}</div>
                </div>
              ))}
            </div>
          </Box>
        </SEC>

        <SEC title="SAC" icon="🎧">
          <div style={G(3,10)}>
            <K label="Cobranças"  val={SAC.at(-1).cobr} sub="esta semana" color={C.red} icon="📞"/>
            <K label="NPS"        val={`${SAC.at(-1).nps}%`} sub="13/02 e 20/02" color={C.acc} icon="⭐"/>
            <K label="Nota Mont." val={`${SAC.at(-1).nota}`} sub="/10 montagem" color={C.green} icon="🏆"/>
          </div>
          <Box title="Cobranças SAC por Semana" style={{marginTop:12}}>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={SAC} margin={{top:4,right:8,left:-10,bottom:0}}>
                <defs>
                  <linearGradient id="gsac" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.red} stopOpacity={.3}/>
                    <stop offset="95%" stopColor={C.red} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
                <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
                <YAxis tick={{fill:C.muted,fontSize:9}}/>
                <Tooltip content={<TIP/>}/>
                <Area type="monotone" dataKey="cobr" name="Cobranças" stroke={C.red} fill="url(#gsac)" strokeWidth={2}/>
              </AreaChart>
            </ResponsiveContainer>
          </Box>
          <Box title="Reclame Aqui + Google" style={{marginTop:12}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[
                {label:"Reclame Aqui",v:"2",sub:"avaliações",c:C.orange},
                {label:"Google Maps", v:"4",sub:"avaliações",c:C.blue},
                {label:"Resol./Retiradas",v:"5",sub:"jan/26",c:C.green},
                {label:"Contatados",  v:"3",sub:"semana 20/02",c:C.purple},
              ].map(k=>(
                <div key={k.label} style={{background:C.surface,borderRadius:8,padding:"12px 14px",border:`1px solid ${k.c}30`}}>
                  <div style={{fontSize:9,color:C.muted,marginBottom:4}}>{k.label}</div>
                  <div style={{fontSize:22,fontWeight:800,color:k.c}}>{k.v}</div>
                  <div style={{fontSize:9,color:C.muted}}>{k.sub}</div>
                </div>
              ))}
            </div>
          </Box>
        </SEC>
      </div>
    </div>
  );
}

function PgCorrelacoes(){
  return (
    <div>
      {/* Cadeia de valor */}
      <Box title="Cadeia de Valor — Ennebê Planejados" style={{marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
          {["MKT","Pré-Venda","Vendas","Conferência","Produção","Pré-Mont.","Montagem","AT","SAC"].map((s,i,arr)=>(
            <div key={s} style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{background:`linear-gradient(135deg,${C.acc}cc,#d9760688)`,borderRadius:8,padding:"8px 14px",
                fontSize:11,fontWeight:700,color:"#000",whiteSpace:"nowrap"}}>{s}</div>
              {i<arr.length-1&&<span style={{color:C.acc,fontSize:16}}>→</span>}
            </div>
          ))}
        </div>
      </Box>

      <div style={G(3,16)}>
        <Box title="Funil Semanal — Leads → Contratos">
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={PV.map((p,i)=>({...p,cont:VD[i].cS}))} margin={{top:4,right:8,left:-10,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
              <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
              <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:9}}/>
              <YAxis yAxisId="r" orientation="right" tick={{fill:C.muted,fontSize:9}}/>
              <Tooltip content={<TIP/>}/>
              <Legend wrapperStyle={{fontSize:10}}/>
              <Bar yAxisId="l" dataKey="leads" name="Leads" fill={C.blue} radius={[3,3,0,0]} barSize={10}/>
              <Bar yAxisId="l" dataKey="qual"  name="Qualif." fill={C.purple} radius={[3,3,0,0]} barSize={10}/>
              <Line yAxisId="r" type="monotone" dataKey="cont" name="Contratos" stroke={C.green} strokeWidth={2.5} dot={{r:4}}/>
            </ComposedChart>
          </ResponsiveContainer>
        </Box>

        <Box title="Leads (T) → Contratos (T+1)" note="Ciclo venda ~1 semana">
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={PV.slice(0,-1).map((p,i)=>({w:PV[i+1].w,leads:p.leads,cont:VD[i+1].cS}))}
              margin={{top:4,right:8,left:-10,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
              <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
              <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:9}}/>
              <YAxis yAxisId="r" orientation="right" tick={{fill:C.muted,fontSize:9}}/>
              <Tooltip content={<TIP/>}/>
              <Legend wrapperStyle={{fontSize:10}}/>
              <Bar yAxisId="l" dataKey="leads" name="Leads (T)" fill={C.blue} radius={[3,3,0,0]} barSize={12}/>
              <Line yAxisId="r" type="monotone" dataKey="cont" name="Contratos (T+1)" stroke={C.green} strokeWidth={2.5} dot={{r:4}}/>
            </ComposedChart>
          </ResponsiveContainer>
        </Box>

        <Box title="Conferidos (T) → Montagem (T+1)" note="Lead time conferência→montagem">
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={CF.slice(0,-1).map((c,i)=>({w:CF[i+1].w,conf:c.conf,mont:MONT[i+1].ini}))}
              margin={{top:4,right:8,left:-10,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
              <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
              <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:9}}/>
              <YAxis yAxisId="r" orientation="right" tick={{fill:C.muted,fontSize:9}}/>
              <Tooltip content={<TIP/>}/>
              <Legend wrapperStyle={{fontSize:10}}/>
              <Bar yAxisId="l" dataKey="conf" name="Conferidos (T)" fill={C.teal} radius={[3,3,0,0]} barSize={12}/>
              <Line yAxisId="r" type="monotone" dataKey="mont" name="Mont. (T+1)" stroke={C.acc} strokeWidth={2.5} dot={{r:4}}/>
            </ComposedChart>
          </ResponsiveContainer>
        </Box>

        <Box title="Absenteísmo RH vs Produção Finalizada" note="Impacto ausência na produção">
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={RH.map((r,i)=>({w:r.w,abs:r.abs,fin:PROD[i].fin}))}
              margin={{top:4,right:30,left:-10,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
              <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
              <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${v}%`}/>
              <YAxis yAxisId="r" orientation="right" tick={{fill:C.muted,fontSize:9}}/>
              <Tooltip content={<TIP/>}/>
              <Legend wrapperStyle={{fontSize:10}}/>
              <Line yAxisId="l" type="monotone" dataKey="abs" name="Absenteísmo %" stroke={C.red}   strokeWidth={2.5} dot={{r:3}}/>
              <Bar  yAxisId="r" dataKey="fin" name="Prod. Finalizados" fill={C.green} radius={[3,3,0,0]} barSize={12} opacity={.8}/>
            </ComposedChart>
          </ResponsiveContainer>
        </Box>

        <Box title="AT em Aberto vs Cobranças SAC" note="Relação inversa esperada">
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={AT.map((a,i)=>({w:a.w,at:a.aberto,sac:SAC[i].cobr}))}
              margin={{top:4,right:30,left:-10,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
              <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
              <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:9}}/>
              <YAxis yAxisId="r" orientation="right" tick={{fill:C.muted,fontSize:9}}/>
              <Tooltip content={<TIP/>}/>
              <Legend wrapperStyle={{fontSize:10}}/>
              <Area yAxisId="l" type="monotone" dataKey="at"  name="AT Aberto" stroke={C.red}    fill={`${C.red}20`} strokeWidth={2}/>
              <Line yAxisId="r" type="monotone" dataKey="sac" name="Cobranças SAC" stroke={C.orange} strokeWidth={2.5} dot={{r:4}}/>
            </ComposedChart>
          </ResponsiveContainer>
        </Box>

        <Box title="Margem vs Valor Contratos" note="Rentabilidade × volume de vendas">
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={FIN.map((f,i)=>({w:f.w,mg:f.mg,vS:VD[i].vS}))}
              margin={{top:4,right:30,left:-10,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
              <XAxis dataKey="w" tick={{fill:C.muted,fontSize:9}}/>
              <YAxis yAxisId="l" domain={[65,85]} tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${v}%`}/>
              <YAxis yAxisId="r" orientation="right" tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${(v/1000).toFixed(0)}K`}/>
              <Tooltip content={<TIP/>}/>
              <Legend wrapperStyle={{fontSize:10}}/>
              <Line yAxisId="l" type="monotone" dataKey="mg" name="Margem %" stroke={C.purple} strokeWidth={2.5} dot={{r:3}}/>
              <Bar  yAxisId="r" dataKey="vS" name="Val. Contratos" fill={C.acc} radius={[3,3,0,0]} barSize={10} opacity={.8}/>
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
      </div>
    </div>
  );
}

function PgPCP(){
  return (
    <div>
      {/* Header PCP */}
      <div style={{background:`linear-gradient(135deg,#0f1a35,#080d16)`,border:`1px solid ${C.acc}30`,
        borderRadius:14,padding:"18px 22px",marginBottom:22}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <div style={{fontSize:18,fontWeight:800,color:C.acc,marginBottom:4}}>🏭 PCP — Sequenciamento de Produção</div>
            <div style={{fontSize:12,color:C.muted}}>Lista de Prioridades · Ref. 20/02/2026 · 6 abas analisadas</div>
          </div>
          <div style={{display:"flex",gap:16,alignItems:"center"}}>
            {[{l:"Pedidos",v:"68",c:C.acc},{l:"Ambientes",v:"356",c:C.blue},{l:"Em Prod.",v:"114",c:C.green},{l:"Aditivos NOK",v:"31",c:C.red}].map(k=>(
              <div key={k.l} style={{textAlign:"center"}}>
                <div style={{fontSize:22,fontWeight:800,color:k.c}}>{k.v}</div>
                <div style={{fontSize:9,color:C.muted}}>{k.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 1: Funil + Corte status */}
      <div style={{...G(3,16),marginBottom:16}}>
        <Box title="Funil de Produção — 3 Etapas">
          {[
            {etapa:"1 · MACRO (Backlog)",     total:356,ok:55, fila:241,neutro:60,
             ok_l:"Plano OK",fila_l:"Plano NOK",neu_l:"Sem Data"},
            {etapa:"2 · FAZER PLANO DE CORTE",total:288,ok:80, fila:205,neutro:3,
             ok_l:"Finalizado",fila_l:"Na Fila",neu_l:"Atras./Urgente"},
            {etapa:"3 · PRODUZIR (Compras)",  total:114,ok:39, fila:67, neutro:8,
             ok_l:"Compra OK",fila_l:"Aguardando",neu_l:"Atenção"},
          ].map((e,i)=>{
            const wOK=(e.ok/e.total*100).toFixed(0);
            const wF=(e.fila/e.total*100).toFixed(0);
            const wN=(e.neutro/e.total*100).toFixed(0);
            return (
              <div key={i} style={{background:C.surface,borderRadius:10,padding:"14px",border:`1px solid ${C.border}`,marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <span style={{fontSize:11,fontWeight:700,color:C.text}}>{e.etapa}</span>
                  <span style={{fontSize:11,fontWeight:700,color:C.acc}}>{e.total}</span>
                </div>
                <div style={{display:"flex",borderRadius:6,overflow:"hidden",height:16,marginBottom:8}}>
                  <div style={{width:`${wOK}%`,background:C.green,height:"100%"}}/>
                  <div style={{width:`${wF}%`,background:C.orange,height:"100%"}}/>
                  <div style={{width:`${wN}%`,background:C.red,height:"100%",opacity:.8}}/>
                </div>
                <div style={{display:"flex",gap:16}}>
                  {[{l:e.ok_l,v:e.ok,c:C.green},{l:e.fila_l,v:e.fila,c:C.orange},{l:e.neu_l,v:e.neutro,c:C.red}].map(b=>(
                    <div key={b.l} style={{display:"flex",gap:5,alignItems:"center"}}>
                      <div style={{width:8,height:8,borderRadius:2,background:b.c}}/>
                      <span style={{fontSize:9,color:C.muted}}>{b.l}:</span>
                      <span style={{fontSize:11,fontWeight:700,color:b.c}}>{b.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </Box>

        <Box title="Status Planos de Corte (288 amb.)">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={PCP_CORTE_STATUS} cx="50%" cy="50%" innerRadius={55} outerRadius={90}
                dataKey="v" nameKey="status" labelLine={false} label={REND}>
                {PCP_CORTE_STATUS.map((e,i)=><Cell key={i} fill={e.fill}/>)}
              </Pie>
              <Tooltip formatter={(v,n)=>[`${v} amb.`,n]} contentStyle={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:10}}>
            {PCP_CORTE_STATUS.map(s=>(
              <div key={s.status} style={{display:"flex",alignItems:"center",gap:8,background:C.surface,borderRadius:8,padding:"10px 12px"}}>
                <div style={{width:10,height:10,borderRadius:3,background:s.fill}}/>
                <div>
                  <div style={{fontSize:9,color:C.muted}}>{s.status}</div>
                  <div style={{fontSize:16,fontWeight:800,color:s.fill}}>{s.v}</div>
                </div>
                <div style={{marginLeft:"auto",fontSize:10,color:C.muted}}>{(s.v/288*100).toFixed(0)}%</div>
              </div>
            ))}
          </div>
        </Box>

        <Box title="Status de Compras (114 amb.)">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={PCP_COMPRA_STATUS} cx="50%" cy="50%" innerRadius={55} outerRadius={90}
                dataKey="v" nameKey="status" labelLine={false} label={REND}>
                {PCP_COMPRA_STATUS.map((e,i)=><Cell key={i} fill={e.fill}/>)}
              </Pie>
              <Tooltip formatter={(v,n)=>[`${v} amb.`,n]} contentStyle={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,fontSize:11}}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{display:"flex",flexDirection:"column",gap:6,marginTop:10}}>
            {PCP_COMPRA_STATUS.map(s=>(
              <div key={s.status} style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:8,height:8,borderRadius:2,background:s.fill}}/>
                <span style={{fontSize:10,color:C.muted,flex:1}}>{s.status}</span>
                <span style={{fontSize:13,fontWeight:700,color:s.fill}}>{s.v}</span>
                <span style={{fontSize:9,color:C.muted,width:28,textAlign:"right"}}>{(s.v/114*100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </Box>
      </div>

      {/* Row 2: Custos semanais + Mix custo + Timeline */}
      <div style={{...G(2,16),marginBottom:16}}>
        <Box title="Custos Semanais Projetados — Empilhado por Categoria">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={PCP_CUSTOS_SEM} margin={{top:4,right:8,left:-10,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
              <XAxis dataKey="sem" tick={{fill:C.muted,fontSize:10}}/>
              <YAxis tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${(v/1000).toFixed(0)}K`}/>
              <Tooltip content={<TIP/>} formatter={v=>`R$${v.toLocaleString("pt-BR")}`}/>
              <Legend wrapperStyle={{fontSize:11}}/>
              <Bar dataKey="mp"  name="Movelaria"  stackId="a" fill={C.blue}   radius={[0,0,0,0]}/>
              <Bar dataKey="acs" name="Acessórios" stackId="a" fill={C.pink}   radius={[0,0,0,0]}/>
              <Bar dataKey="agt" name="Agratto"    stackId="a" fill={C.purple} radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginTop:12}}>
            {PCP_MIX_CUSTO.map(m=>(
              <div key={m.name} style={{background:C.surface,borderRadius:8,padding:"10px 12px",textAlign:"center"}}>
                <div style={{fontSize:9,color:C.muted,marginBottom:4}}>{m.name}</div>
                <div style={{fontSize:18,fontWeight:800,color:m.fill}}>{m.pct}%</div>
                <div style={{fontSize:10,color:C.muted}}>R${(m.value/1000).toFixed(0)}K</div>
              </div>
            ))}
          </div>
        </Box>

        <Box title="Timeline de Pré-Montagem — Ambientes + Custo por Semana">
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={PCP_TIMELINE} margin={{top:4,right:30,left:-10,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
              <XAxis dataKey="sem" tick={{fill:C.muted,fontSize:9}} angle={-20} textAnchor="end" height={32}/>
              <YAxis yAxisId="l" tick={{fill:C.muted,fontSize:9}}/>
              <YAxis yAxisId="r" orientation="right" tick={{fill:C.muted,fontSize:9}} tickFormatter={v=>`${(v/1000).toFixed(0)}K`}/>
              <Tooltip content={<TIP/>}/>
              <Legend wrapperStyle={{fontSize:11}}/>
              <Bar yAxisId="l" dataKey="amb" name="Ambientes" fill={C.acc} radius={[4,4,0,0]} barSize={18}/>
              <Line yAxisId="r" type="monotone" dataKey="custo" name="Custo R$" stroke={C.purple} strokeWidth={2.5} dot={{r:4}}/>
            </ComposedChart>
          </ResponsiveContainer>
          <div style={{background:`${C.orange}18`,border:`1px solid ${C.orange}40`,borderRadius:8,padding:"10px 14px",marginTop:12,fontSize:11,color:C.orange}}>
            📌 Semanas 23/03 e 30/03 com custo R$0 = pedidos novos sem cotação finalizada. Demandam atenção para não gerar ruptura.
          </div>
        </Box>
      </div>

      {/* Row 3: Aditivos + Projetado x Realizado + Risco */}
      <div style={{...G(3,16),marginBottom:16}}>
        <Box title="Aditivos — Status e Responsáveis">
          <div style={{marginBottom:14}}>
            <div style={{display:"flex",gap:10}}>
              {PCP_ADITIVOS_STATUS.map(s=>(
                <div key={s.status} style={{flex:1,background:C.surface,borderRadius:8,padding:"12px",textAlign:"center",border:`1px solid ${s.fill}30`}}>
                  <div style={{fontSize:9,color:C.muted,marginBottom:4}}>{s.status}</div>
                  <div style={{fontSize:24,fontWeight:800,color:s.fill}}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <Box title="Pendências NOK por Responsável">
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={PCP_ADITIVOS_RESP} layout="vertical" margin={{top:4,right:30,left:0,bottom:0}}>
                <XAxis type="number" tick={{fill:C.muted,fontSize:9}} domain={[0,6]}/>
                <YAxis type="category" dataKey="resp" tick={{fill:C.muted,fontSize:10}} width={58}/>
                <Tooltip content={<TIP/>}/>
                <Bar dataKey="v" name="Pendências" radius={[0,4,4,0]} barSize={18}>
                  {PCP_ADITIVOS_RESP.map((e,i)=><Cell key={i} fill={e.fill}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        <Box title="Projetado × Realizado (Custos)">
          <div style={{marginBottom:12,fontSize:10,color:C.muted}}>Total projetado: R$21.764 → realizado: R$16.778 · Economia média: 22.9%</div>
          {PCP_PROJ_REAL.map((r,i)=>(
            <div key={i} style={{background:C.surface,borderRadius:10,padding:"14px",border:`1px solid ${C.border}`,marginBottom:10}}>
              <div style={{fontSize:11,fontWeight:700,color:C.text,marginBottom:10}}>{r.cliente}</div>
              <div style={{display:"flex",gap:10,marginBottom:8}}>
                {[{l:"Projetado",v:`R$${r.proj.toLocaleString("pt-BR")}`,c:C.blue},
                  {l:"Realizado",v:`R$${r.real.toLocaleString("pt-BR")}`,c:C.green},
                  {l:"Economia",v:`R$${Math.abs(r.dif).toLocaleString("pt-BR")}`,c:C.acc},
                  {l:"Desvio",v:`${r.pct}%↓`,c:C.red},
                ].map(k=>(
                  <div key={k.l} style={{flex:1,textAlign:"center"}}>
                    <div style={{fontSize:8,color:C.muted,marginBottom:2}}>{k.l}</div>
                    <div style={{fontSize:12,fontWeight:800,color:k.c}}>{k.v}</div>
                  </div>
                ))}
              </div>
              <div style={{background:C.border,borderRadius:4,height:5}}>
                <div style={{width:`${100-r.pct}%`,height:"100%",background:C.green,borderRadius:4}}/>
              </div>
            </div>
          ))}
        </Box>

        <Box title="Análise de Risco PCP">
          {[
            {nivel:"🔴 CRÍTICO",titulo:"Planos de Corte NOK",
             desc:"241/356 ambientes (67.7%) sem plano OK. Risco alto de atrasos em cascata.",c:C.red,bg:"#f8717118"},
            {nivel:"🟠 ATENÇÃO",titulo:"Compras Pendentes",
             desc:"67 ambientes aguardando compra. Pico 23/02 (R$86.7K) pode gerar pressão financeira.",c:C.orange,bg:"#fb923c18"},
            {nivel:"🟡 ALERTA",titulo:"Aditivos sem Plano",
             desc:"31 aditivos NOK. Gustavo (5), Tainan (4), Camila (2), Aline (2) pendentes.",c:C.acc,bg:"#f5a62318"},
            {nivel:"🟢 POSITIVO",titulo:"Eficiência de Custo",
             desc:"3 clientes acompanhados: economia de R$4.986 (22.9%) vs. projetado.",c:C.green,bg:"#34d39918"},
          ].map(a=>(
            <div key={a.titulo} style={{background:a.bg,border:`1px solid ${a.c}30`,
              borderRadius:10,padding:"12px 14px",marginBottom:10}}>
              <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:4}}>
                <span style={{fontSize:10,fontWeight:800,color:a.c}}>{a.nivel}</span>
                <span style={{fontSize:11,fontWeight:700,color:C.text}}>{a.titulo}</span>
              </div>
              <div style={{fontSize:10,color:"#94a3b8",lineHeight:1.5}}>{a.desc}</div>
            </div>
          ))}
        </Box>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  APP — LAYOUT DESKTOP (sidebar + main)
// ═══════════════════════════════════════════════════════════
const TABS=[
  {id:"home",icon:"🏠",label:"Início",       sub:"Visão Geral"},
  {id:"com", icon:"💰",label:"Comercial",     sub:"Pré-Venda · Vendas"},
  {id:"oper",icon:"⚙️",label:"Operacional",   sub:"Conf · Prod · Mont · AT"},
  {id:"fin", icon:"📈",label:"Fin / RH",      sub:"Financeiro · Pessoas"},
  {id:"mkt", icon:"📣",label:"Mkt / SAC",     sub:"Marketing · Atendimento"},
  {id:"corr",icon:"🔗",label:"Correlações",   sub:"Análise Cruzada"},
  {id:"pcp", icon:"🏭",label:"PCP",           sub:"Sequenciamento · Custos"},
];

export default function AppDesktop(){
  const [tab,setTab]=useState("home");
  const pages={home:<PgInicio/>,com:<PgComercial/>,oper:<PgOperacional/>,
               fin:<PgFinanceiro/>,mkt:<PgMkt/>,corr:<PgCorrelacoes/>,pcp:<PgPCP/>};

  return (
    <div style={{display:"flex",minHeight:"100vh",background:C.bg,
      color:C.text,fontFamily:"'DM Sans','Segoe UI',system-ui,sans-serif"}}>

      {/* ── SIDEBAR ────────────────────────────────── */}
      <aside style={{width:220,flexShrink:0,background:C.side,
        borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",
        position:"sticky",top:0,height:"100vh",overflowY:"auto"}}>

        {/* Logo */}
        <div style={{padding:"24px 20px 20px",borderBottom:`1px solid ${C.border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:38,height:38,borderRadius:10,
              background:`linear-gradient(135deg,${C.acc},#d97706)`,
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:18,fontWeight:900,color:"#000",flexShrink:0}}>N</div>
            <div>
              <div style={{fontSize:13,fontWeight:800,letterSpacing:.2,lineHeight:1.2}}>Ennebê</div>
              <div style={{fontSize:9,color:C.muted,letterSpacing:.8,textTransform:"uppercase"}}>Planejados</div>
            </div>
          </div>
          <div style={{marginTop:14,background:C.card,borderRadius:8,padding:"8px 10px",
            border:`1px solid ${C.border}`}}>
            <div style={{fontSize:9,color:C.muted,marginBottom:2}}>Referência</div>
            <div style={{fontSize:12,fontWeight:700,color:C.acc}}>Sem. 01/03/2026</div>
            <div style={{fontSize:9,color:C.muted}}>Dez/25 — Fev/26</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{flex:1,padding:"14px 10px"}}>
          <div style={{fontSize:8,color:C.muted,letterSpacing:1.2,textTransform:"uppercase",
            padding:"0 10px",marginBottom:8}}>Módulos</div>
          {TABS.map(t=>{
            const active=tab===t.id;
            return (
              <button key={t.id} onClick={()=>setTab(t.id)} style={{
                width:"100%",background:active?`${C.acc}18`:"none",
                border:`1px solid ${active?C.acc+"50":"transparent"}`,
                cursor:"pointer",fontFamily:"inherit",
                padding:"10px 12px",borderRadius:10,marginBottom:4,
                display:"flex",alignItems:"center",gap:10,textAlign:"left",
                transition:"all .15s",
              }}>
                <span style={{fontSize:18,flexShrink:0}}>{t.icon}</span>
                <div>
                  <div style={{fontSize:12,fontWeight:active?700:500,
                    color:active?C.acc:C.text,lineHeight:1.2}}>{t.label}</div>
                  <div style={{fontSize:9,color:C.muted,marginTop:1}}>{t.sub}</div>
                </div>
                {active&&<div style={{width:3,height:3,borderRadius:"50%",background:C.acc,marginLeft:"auto"}}/>}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{padding:"14px 20px",borderTop:`1px solid ${C.border}`,fontSize:9,color:C.muted,lineHeight:1.6}}>
          <div style={{fontWeight:600,color:C.mutedL,marginBottom:2}}>Dashboard v5 · Desktop</div>
          <div>Dados verificados</div>
          <div>9 semanas · 2 lojas</div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ────────────────────────────── */}
      <div style={{flex:1,display:"flex",flexDirection:"column",minWidth:0}}>
        {/* Top bar */}
        <header style={{background:C.surface,borderBottom:`1px solid ${C.border}`,
          padding:"14px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",
          position:"sticky",top:0,zIndex:40}}>
          <div>
            <div style={{fontSize:16,fontWeight:800,color:C.text,letterSpacing:.2}}>
              {TABS.find(t=>t.id===tab)?.icon} {TABS.find(t=>t.id===tab)?.label}
            </div>
            <div style={{fontSize:10,color:C.muted,marginTop:2}}>{TABS.find(t=>t.id===tab)?.sub}</div>
          </div>
          <div style={{display:"flex",gap:20,alignItems:"center"}}>
            {[
              {l:"Carteira",v:"R$2.19M",c:C.acc},
              {l:"Pipeline",v:"69 clientes",c:C.blue},
              {l:"AT",v:"15 abertos",c:C.red},
              {l:"Margem",v:"70.3%",c:C.green},
            ].map(k=>(
              <div key={k.l} style={{textAlign:"center"}}>
                <div style={{fontSize:9,color:C.muted}}>{k.l}</div>
                <div style={{fontSize:12,fontWeight:700,color:k.c}}>{k.v}</div>
              </div>
            ))}
          </div>
        </header>

        {/* Page content */}
        <main style={{flex:1,overflowY:"auto",padding:"24px 28px 40px"}}>
          {pages[tab]}
        </main>
      </div>
    </div>
  );
}
