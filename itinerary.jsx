// TRIB & TRIP — Generador de Itinerario v3
// Sin backend · Sin API key · Sin costes
// Prompt generator inteligente con autooptimización

const { useState, useRef } = React;

const C = {
  sand:"#F0EBE1", terra:"#C96A38", tl:"#E8855A",
  ink:"#1C1A17", mist:"#8B8179", cream:"#FAF7F2",
  moss:"#4A6741", line:"#E0D9CF",
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body,#root{background:#F0EBE1;font-family:'DM Sans',sans-serif;color:#1C1A17;min-height:100vh}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#8B8179;border-radius:2px}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes pop{0%{transform:scale(.94)}60%{transform:scale(1.04)}100%{transform:scale(1)}}
.fu{animation:fadeUp .38s ease both}
.d1{animation-delay:.07s}.d2{animation-delay:.14s}.d3{animation-delay:.21s}.d4{animation-delay:.28s}
.wrap{max-width:700px;margin:0 auto;padding:16px 14px 72px}
.logo{text-align:center;padding:36px 0 28px}
.logo-t{font-family:'DM Serif Display',serif;font-size:clamp(24px,7vw,38px);color:#C96A38;letter-spacing:-.5px;line-height:1}
.logo-s{font-size:12px;color:#8B8179;margin-top:7px;letter-spacing:.5px}
.prog{display:flex;gap:5px;align-items:center;margin-bottom:24px}
.pg{flex:1;height:3px;border-radius:2px;background:#D5CEC4;transition:background .35s}
.pg.done{background:#C96A38}.pg.act{background:#E8855A}
.pgl{font-size:11px;color:#8B8179;white-space:nowrap;min-width:36px;text-align:right}
.card{background:#FAF7F2;border-radius:20px;padding:28px 24px;box-shadow:0 2px 22px rgba(28,26,23,.07);margin-bottom:12px}
.st{font-family:'DM Serif Display',serif;font-size:clamp(19px,5vw,26px);margin-bottom:5px;line-height:1.2}
.sd{font-size:13px;color:#8B8179;margin-bottom:22px;line-height:1.65}
.fi{margin-bottom:18px}
.lb{display:block;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.9px;color:#8B8179;margin-bottom:7px}
.inp,.sel,.ta{width:100%;background:#F0EBE1;border:1.5px solid #E0D9CF;border-radius:11px;padding:11px 14px;font-family:'DM Sans',sans-serif;font-size:14px;color:#1C1A17;outline:none;transition:border-color .2s,box-shadow .2s;appearance:none}
.inp:focus,.sel:focus,.ta:focus{border-color:#C96A38;box-shadow:0 0 0 3px rgba(201,106,56,.12)}
.ta{resize:vertical;min-height:78px;line-height:1.65}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media(max-width:480px){.row2{grid-template-columns:1fr}}
.chips{display:flex;flex-wrap:wrap;gap:7px}
.chip{padding:7px 12px;border-radius:50px;border:1.5px solid #E0D9CF;background:transparent;font-family:'DM Sans',sans-serif;font-size:12.5px;color:#1C1A17;cursor:pointer;transition:all .17s;user-select:none;-webkit-user-select:none;display:flex;align-items:center;gap:5px}
.chip:hover{border-color:#E8855A;color:#C96A38}
.chip.on{background:#C96A38;border-color:#C96A38;color:#fff;animation:pop .22s ease}
.chip-icon{font-size:15px;line-height:1}
.chip-full{border-radius:12px;padding:10px 14px;justify-content:flex-start;width:100%}
.chip-desc{font-size:11px;opacity:.72;display:block;margin-top:1px}
.br{display:flex;justify-content:space-between;align-items:center;margin-top:24px;gap:10px}
.btn{padding:12px 22px;border-radius:50px;border:none;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:7px}
.bp{background:#C96A38;color:#fff;flex:1;justify-content:center}
.bp:hover{background:#B55C2E;transform:translateY(-1px);box-shadow:0 4px 14px rgba(201,106,56,.3)}
.bp:disabled{background:#D5CEC4;cursor:not-allowed;transform:none;box-shadow:none}
.bg{background:transparent;color:#8B8179;padding:12px 16px}
.bg:hover{color:#1C1A17}
.result-card{background:#FAF7F2;border-radius:20px;padding:28px 24px;box-shadow:0 2px 22px rgba(28,26,23,.07)}
.rt{font-family:'DM Serif Display',serif;font-size:clamp(17px,4vw,22px);margin-bottom:4px}
.rs{font-size:12px;color:#8B8179;line-height:1.65;margin-bottom:16px}
.rac{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:20px}
.sm{padding:8px 14px;border-radius:50px;border:1.5px solid #E0D9CF;background:transparent;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;color:#8B8179;cursor:pointer;transition:all .18s;display:flex;align-items:center;gap:5px}
.sm:hover{border-color:#C96A38;color:#C96A38}
.sm.ok{background:#4A6741;border-color:#4A6741;color:#fff}
.div-line{height:1px;background:#E0D9CF;margin:18px 0}
.ia-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;margin-top:10px}
.ia-btn{display:flex;align-items:center;gap:8px;padding:10px 13px;border-radius:12px;border:1.5px solid #E0D9CF;background:transparent;font-family:'DM Sans',sans-serif;font-size:12.5px;font-weight:500;color:#1C1A17;cursor:pointer;transition:all .18s;text-decoration:none}
.ia-btn:hover{border-color:#C96A38;background:rgba(201,106,56,.05);color:#C96A38}
.pbox{background:#F0EBE1;border:1.5px solid #E0D9CF;border-radius:12px;padding:18px 16px;font-family:'DM Sans',sans-serif;font-size:12.5px;line-height:1.78;color:#1C1A17;white-space:pre-wrap;word-break:break-word;max-height:420px;overflow-y:auto;margin-top:12px}
.hint{background:rgba(201,106,56,.07);border:1px solid rgba(201,106,56,.2);border-radius:12px;padding:13px 16px;font-size:12.5px;color:#1C1A17;line-height:1.65;margin-top:14px}
.ft{text-align:center;margin-top:32px;font-size:11px;color:#8B8179;opacity:.6;line-height:1.8}
.ft a{color:#8B8179;text-decoration:none}.ft a:hover{color:#C96A38}
.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%) translateY(60px);background:#1C1A17;color:#fff;padding:10px 18px;border-radius:50px;font-size:12.5px;font-weight:500;transition:transform .25s ease;z-index:99;white-space:nowrap;pointer-events:none}
.toast.show{transform:translateX(-50%) translateY(0)}
`;

const TRANSPORTES = [
  {id:"avion",   icon:"✈️",  label:"Avión"},
  {id:"tren",    icon:"🚂",  label:"Tren"},
  {id:"bus",     icon:"🚌",  label:"Bus"},
  {id:"cocheP",  icon:"🚗",  label:"Coche propio"},
  {id:"cocheA",  icon:"🚙",  label:"Coche alquiler"},
  {id:"camper",  icon:"🚐",  label:"Camper / Autocaravana"},
  {id:"moto",    icon:"🏍️",  label:"Moto"},
  {id:"bici",    icon:"🚲",  label:"Bicicleta"},
  {id:"apie",    icon:"🚶",  label:"A pie / Senderismo"},
  {id:"barco",   icon:"🛳️",  label:"Barco / Ferry"},
  {id:"improvi", icon:"🎒",  label:"Improvisado"},
];

const ALOJAMIENTOS = [
  {id:"hotelB",  icon:"🏨", label:"Hotel boutique"},
  {id:"hotelU",  icon:"🏢", label:"Hotel urbano"},
  {id:"resort",  icon:"🏖️", label:"Resort / Todo incluido"},
  {id:"airbnb",  icon:"🏠", label:"Airbnb / Apartamento"},
  {id:"rural",   icon:"🌿", label:"Casa rural"},
  {id:"hostel",  icon:"🛏️", label:"Hostel"},
  {id:"camping", icon:"⛺", label:"Camping"},
  {id:"camperD", icon:"🚐", label:"En la camper"},
  {id:"refugio", icon:"🏔️", label:"Refugio de montaña"},
  {id:"couch",   icon:"🤝", label:"Couchsurfing / Casa de alguien"},
  {id:"intercam",icon:"🔄", label:"Intercambio de casa"},
  {id:"sobre",   icon:"😴", label:"Sobre la marcha"},
];

const TIPOS = [
  {id:"solo",    icon:"🧍", label:"Solo/a"},
  {id:"pareja",  icon:"👫", label:"En pareja"},
  {id:"familia", icon:"👨‍👩‍👧", label:"Familia con niños"},
  {id:"amigos",  icon:"👯", label:"Grupo de amigos"},
  {id:"trabajo", icon:"💼", label:"Trabajo + viaje"},
];

const ESTILOS = [
  {id:"cultural", icon:"🏛️", label:"Cultural"},
  {id:"natura",   icon:"🌲", label:"Naturaleza"},
  {id:"gastro",   icon:"🍽️", label:"Gastronomía"},
  {id:"descanso", icon:"😌", label:"Descanso"},
  {id:"aventura", icon:"🧗", label:"Aventura"},
  {id:"urbano",   icon:"🏙️", label:"Urbano"},
  {id:"espiri",   icon:"🧘", label:"Espiritual"},
  {id:"foto",     icon:"📷", label:"Fotografía"},
  {id:"historia", icon:"📜", label:"Historia"},
  {id:"noche",    icon:"🌙", label:"Vida nocturna"},
  {id:"deporte",  icon:"🏄", label:"Deporte / Activo"},
  {id:"mercados", icon:"🛍️", label:"Mercados locales"},
];

const RITMOS = [
  {id:"muytranq", label:"Muy tranquilo"},
  {id:"pausado",  label:"Pausado"},
  {id:"equilib",  label:"Equilibrado"},
  {id:"activo",   label:"Activo"},
  {id:"intenso",  label:"Intenso"},
];

const PLANIFICACION = [
  {id:"todo",  icon:"📋", label:"Todo organizado",        desc:"Quiero saber qué hago cada día"},
  {id:"base",  icon:"⚖️",  label:"Base + espontaneidad",  desc:"Estructura básica con margen para improvisar"},
  {id:"aprox", icon:"🗺️",  label:"Ruta aproximada",       desc:"Dirección general, decido sobre la marcha"},
  {id:"libre", icon:"🌊",  label:"Total libertad",         desc:"Me dejo llevar, dame opciones abiertas"},
];

const PRESUPUESTO = [
  {id:"eco",     label:"🪙 Ajustado"},
  {id:"medio",   label:"💳 Medio"},
  {id:"confort", label:"💰 Confortable"},
  {id:"libre",   label:"✨ Sin límite"},
];

const EVITAR_CHIPS = [
  "Zonas muy turísticas","Museos","Madrugones","Aglomeraciones",
  "Comida picante","Actividades físicas intensas","Excursiones organizadas",
  "Vida nocturna","Centros comerciales","Comida rápida","Guías turísticos",
  "Monumentos religiosos","Playas masificadas","Rutas largas de senderismo",
];

const IA_LINKS = [
  {name:"ChatGPT",    icon:"🟢", url:"https://chat.openai.com"},
  {name:"Claude",     icon:"🟠", url:"https://claude.ai"},
  {name:"Gemini",     icon:"🔵", url:"https://gemini.google.com"},
  {name:"Copilot",    icon:"⚪", url:"https://copilot.microsoft.com"},
  {name:"Perplexity", icon:"🟣", url:"https://www.perplexity.ai"},
  {name:"Le Chat",    icon:"🟡", url:"https://chat.mistral.ai"},
];

const STEPS = ["Destino","Transporte","Alojamiento","Viajero","Ritmo","Detalles","Evitar"];

function buildPrompt(f) {
  const transportes  = f.transportes.length  ? f.transportes.join(", ")  : "no especificado";
  const alojamientos = f.alojamientos.length ? f.alojamientos.join(", ") : "no especificado";
  const estilos      = f.estilos.length      ? f.estilos.join(", ")      : "general";
  const evitar       = [...f.evitar, f.evitarLibre].filter(Boolean).join(", ") || "nada en particular";
  const tipo         = f.tipo || "no especificado";
  const ritmo        = f.ritmo || "Equilibrado";
  const planif       = f.planificacion || "Base + espontaneidad";

  const esBici   = f.transportes.includes("Bicicleta");
  const esApie   = f.transportes.includes("A pie / Senderismo");
  const esCamper = f.transportes.includes("Camper / Autocaravana") || f.alojamientos.includes("En la camper");
  const esMoto   = f.transportes.includes("Moto");
  const esCouch  = f.alojamientos.some(a => a.includes("Couchsurfing") || a.includes("Intercambio"));
  const esLibre  = planif === "Total libertad" || planif === "Ruta aproximada";
  const esSolo   = tipo.includes("Solo");
  const esFam    = tipo.includes("Familia");

  let instrEsp = "";
  if (esBici)   instrEsp += "\n- BICICLETA: Prioriza rutas ciclistas seguras. Indica desnivel, km diarios realistas según el ritmo, dónde cargar agua, talleres de bici y alojamientos con parking de bici o secadero.";
  if (esApie)   instrEsp += "\n- A PIE / SENDERISMO: Indica distancias reales a pie por día según el ritmo. Señala rutas señalizadas, refugios, puntos de agua y nivel de dificultad.";
  if (esCamper) instrEsp += "\n- CAMPER / AUTOCARAVANA: Incluye áreas de servicio, campings con servicios para autocaravanas, zonas de aparcamiento libre permitido y rutas accesibles para vehículo grande.";
  if (esMoto)   instrEsp += "\n- MOTO: Prioriza carreteras secundarias escénicas. Indica parking seguro, talleres mecánicos y rutas que los motoristas consideran especiales en este destino.";
  if (esCouch)  instrEsp += "\n- COUCHSURFING / INTERCAMBIO: Menciona plataformas activas en este destino, zonas con anfitriones, consejos de etiqueta y cómo aprovechar la red local para conocer el destino desde dentro.";
  if (esSolo)   instrEsp += "\n- VIAJERO SOLO/A: Incluye dónde conocer gente (hostels sociales, free tours, meetups), consejos de seguridad reales y lugares donde la soledad se convierte en ventaja.";
  if (esFam)    instrEsp += "\n- FAMILIA CON NIÑOS: Señala qué lugares son realmente amigables para niños, evita visitas largas y agotadoras, incluye opciones de descanso y alimentación adaptada.";

  const formatoOutput = esLibre
    ? `NO generes un itinerario cerrado día a día. En su lugar crea:
- Un mapa de zonas del destino con lo que ofrece cada una
- Para cada zona: 4-5 opciones clasificadas por tipo (cultura, naturaleza, gastronomía, descanso, aventura...)
- Combinaciones posibles según tiempo disponible y estado de ánimo
- Alternativas si llueve o el plan cambia
El viajero quiere herramientas para decidir, no una agenda.`
    : planif === "Base + espontaneidad"
    ? `Crea una estructura día a día ligera:
- Cada día tiene 1-2 anclas fijas (lo que merece reservar o ir seguro)
- El resto son opciones abiertas según cómo se sienta el viajero
- Incluye siempre una alternativa para si llueve o hay más/menos energía

📅 Día N — [Título evocador]
🌅 Mañana · ☀️ Tarde · 🌙 Noche
---`
    : `Itinerario completo y detallado, día a día:

📅 Día N — [Título evocador que capture el espíritu del día]
🌅 Mañana
[2-3 actividades con contexto narrativo: por qué merece la pena, hora ideal, si conviene reservar, consejo personal]
☀️ Tarde
[Continuación natural. Respeta el ritmo "${ritmo}".]
🌙 Noche
[Cena con contexto local + ambiente nocturno]
---
[Repite para cada uno de los ${f.dias} días]`;

  return `Eres un experto planificador de viajes con alma. Conoces los destinos en profundidad y te adaptas al perfil real del viajero. Hablas como un amigo que ha estado allí: cercano, honesto, sin exagerar ni vender.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASO 1 — ANALIZA Y OPTIMIZA ESTE PERFIL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Antes de generar, revisa internamente:
1. ¿Hay contradicciones? (ritmo muy tranquilo + muchos intereses + pocos días → ajusta la densidad)
2. ¿El transporte condiciona el formato? (camper, bici, a pie → adapta estructura y distancias)
3. ¿Falta algún dato crítico para este destino y perfil? Si es así, pregunta antes de continuar
4. ¿Hay algo en "qué evitar" que afecte a opciones típicas del destino? Tenlo muy presente
5. Prioriza autenticidad sobre exhaustividad. Menos opciones, mejor explicadas.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PERFIL DEL VIAJERO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Destino: ${f.destino}
Duración: ${f.dias} días${f.fechas ? ` (${f.fechas})` : ""}
Tipo de viajero: ${tipo}
Cómo se mueve: ${transportes}
Dónde duerme: ${alojamientos}
Intereses: ${estilos}
Ritmo: ${ritmo}
Estilo de planificación: ${planif}
Presupuesto: ${f.presupuesto || "no especificado"}
Restricciones / necesidades: ${f.restricciones || "ninguna"}
Quiere evitar: ${evitar}
Notas adicionales: ${f.notas || "ninguna"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASO 2 — INSTRUCCIONES ESPECÍFICAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${instrEsp || "Perfil estándar — aplica criterio general de calidad y honestidad."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASO 3 — GENERA EL ITINERARIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formatoOutput}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASO 4 — SECCIONES FINALES (incluir siempre)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🧭 Consejos prácticos
[5 consejos reales y concretos: transporte local, costumbres, apps útiles, cuándo ir a cada lugar, qué evitar]

🍽️ No te pierdas
[3-4 recomendaciones gastronómicas con contexto: qué son, dónde, por qué son especiales]

💰 Orientación de costes
[Estimación realista de gasto diario según presupuesto "${f.presupuesto || "no especificado"}": alojamiento, comidas, transporte, actividades]

💬 Nota para este viajero
[Párrafo personalizado que sienta que este itinerario es suyo, basado en su perfil completo]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TONO Y RESTRICCIONES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Habla como un amigo que conoce el destino, no como una guía de turismo
- Sé honesto: si algo tiene mucha cola, no merece la pena o hay mejor alternativa — dilo
- Respeta ESTRICTAMENTE lo que el viajero quiere evitar: ${evitar}
- Emojis solo en encabezados de sección, no en el texto corrido
- Responde en español`;
}

function Chip({ icon, label, sel, onClick, full }) {
  return (
    <button className={"chip" + (sel ? " on" : "") + (full ? " chip-full" : "")} onClick={onClick}>
      {icon && <span className="chip-icon">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}

function App() {
  const [step, setStep]     = useState(0);
  const [form, setForm]     = useState({
    destino:"", fechas:"", dias:"7",
    transportes:[], alojamientos:[],
    tipo:"", estilos:[],
    ritmo:"Equilibrado", planificacion:"Base + espontaneidad",
    presupuesto:"", restricciones:"", notas:"",
    evitar:[], evitarLibre:"",
  });
  const [prompt, setPrompt] = useState(null);
  const [copied, setCopied] = useState(false);
  const [toast,  setToast]  = useState("");
  const [toastOn,setToastOn]= useState(false);
  const resultRef           = useRef(null);

  const set  = (k,v) => setForm(f => ({...f, [k]:v}));
  const togA = (k,v) => setForm(f => ({...f, [k]: f[k].includes(v) ? f[k].filter(x=>x!==v) : [...f[k],v]}));

  const showToast = msg => {
    setToast(msg); setToastOn(true);
    setTimeout(()=>setToastOn(false), 2400);
  };

  const canNext = () => {
    if (step===0) return form.destino.trim() && form.dias;
    if (step===1) return form.transportes.length > 0;
    if (step===2) return form.alojamientos.length > 0;
    if (step===3) return form.tipo;
    return true;
  };

  const generate = () => {
    const p = buildPrompt(form);
    setPrompt(p);
    setTimeout(()=>resultRef.current?.scrollIntoView({behavior:"smooth"}), 100);
  };

  const copy = () => {
    navigator.clipboard.writeText(prompt).then(()=>{
      setCopied(true);
      showToast("✓ Prompt copiado — pégalo en tu IA favorita");
      setTimeout(()=>setCopied(false), 3000);
    });
  };

  const reset = () => {
    setStep(0); setPrompt(null); setCopied(false);
    setForm({destino:"",fechas:"",dias:"7",transportes:[],alojamientos:[],tipo:"",estilos:[],ritmo:"Equilibrado",planificacion:"Base + espontaneidad",presupuesto:"",restricciones:"",notas:"",evitar:[],evitarLibre:""});
  };

  const stepContent = () => {
    if (step===0) return <>
      <p className="st">¿A dónde quieres ir?</p>
      <p className="sd">Destino, duración y fechas si las tienes.</p>
      <div className="fi">
        <label className="lb">Destino o zona</label>
        <input className="inp" autoFocus
          placeholder="p.ej. Kioto · Costa Amalfitana · Camino de Santiago · Islandia"
          value={form.destino} onChange={e=>set("destino",e.target.value)}/>
      </div>
      <div className="row2">
        <div className="fi">
          <label className="lb">Número de días</label>
          <select className="sel" value={form.dias} onChange={e=>set("dias",e.target.value)}>
            {[1,2,3,4,5,6,7,8,9,10,12,14,21,28,30].map(n=>
              <option key={n} value={n}>{n} {n===1?"día":"días"}</option>
            )}
          </select>
        </div>
        <div className="fi">
          <label className="lb">Fechas aproximadas (opcional)</label>
          <input className="inp" placeholder="p.ej. Agosto 2025"
            value={form.fechas} onChange={e=>set("fechas",e.target.value)}/>
        </div>
      </div>
    </>;

    if (step===1) return <>
      <p className="st">¿Cómo te vas a mover?</p>
      <p className="sd">Marca todos los que uses — puedes combinar varios.</p>
      <div className="fi">
        <div className="chips">
          {TRANSPORTES.map(t=>
            <Chip key={t.id} icon={t.icon} label={t.label}
              sel={form.transportes.includes(t.label)}
              onClick={()=>togA("transportes",t.label)}/>
          )}
        </div>
      </div>
      <div className="fi" style={{marginTop:4}}>
        <label className="lb">¿Otro medio? (opcional)</label>
        <input className="inp" placeholder="p.ej. Kayak · Caballo · Tuk-tuk · Velero…"
          value={form.notas} onChange={e=>set("notas",e.target.value)}/>
      </div>
    </>;

    if (step===2) return <>
      <p className="st">¿Dónde vas a dormir?</p>
      <p className="sd">Puedes combinar — p.ej. hostel en ciudad + camping en naturaleza.</p>
      <div className="fi">
        <div className="chips">
          {ALOJAMIENTOS.map(a=>
            <Chip key={a.id} icon={a.icon} label={a.label}
              sel={form.alojamientos.includes(a.label)}
              onClick={()=>togA("alojamientos",a.label)}/>
          )}
        </div>
      </div>
    </>;

    if (step===3) return <>
      <p className="st">¿Con quién y qué buscas?</p>
      <p className="sd">Tu compañía y el tipo de experiencias que te interesan.</p>
      <div className="fi">
        <label className="lb">Viajo…</label>
        <div className="chips">
          {TIPOS.map(t=>
            <Chip key={t.id} icon={t.icon} label={t.label}
              sel={form.tipo===t.label} onClick={()=>set("tipo",t.label)}/>
          )}
        </div>
      </div>
      <div className="fi" style={{marginTop:16}}>
        <label className="lb">Me interesa sobre todo… (puedes elegir varios)</label>
        <div className="chips">
          {ESTILOS.map(e=>
            <Chip key={e.id} icon={e.icon} label={e.label}
              sel={form.estilos.includes(e.label)}
              onClick={()=>togA("estilos",e.label)}/>
          )}
        </div>
      </div>
    </>;

    if (step===4) return <>
      <p className="st">Tu ritmo y forma de planificar</p>
      <p className="sd">Aquí no corremos. Y si prefieres improvisar, también.</p>
      <div className="fi">
        <label className="lb">Ritmo del viaje</label>
        <div className="chips">
          {RITMOS.map(r=>
            <Chip key={r.id} label={r.label}
              sel={form.ritmo===r.label} onClick={()=>set("ritmo",r.label)}/>
          )}
        </div>
      </div>
      <div className="fi" style={{marginTop:16}}>
        <label className="lb">¿Cómo quieres el itinerario?</label>
        <div className="chips" style={{flexDirection:"column",gap:8}}>
          {PLANIFICACION.map(p=>
            <button key={p.id}
              className={"chip chip-full"+(form.planificacion===p.label?" on":"")}
              onClick={()=>set("planificacion",p.label)}>
              <span className="chip-icon">{p.icon}</span>
              <span>
                <strong>{p.label}</strong>
                <span className="chip-desc">{p.desc}</span>
              </span>
            </button>
          )}
        </div>
      </div>
    </>;

    if (step===5) return <>
      <p className="st">Detalles finales</p>
      <p className="sd">Cuanto más nos cuentes, más preciso será el resultado.</p>
      <div className="fi">
        <label className="lb">Presupuesto</label>
        <div className="chips">
          {PRESUPUESTO.map(p=>
            <Chip key={p.id} label={p.label}
              sel={form.presupuesto===p.label} onClick={()=>set("presupuesto",p.label)}/>
          )}
        </div>
      </div>
      <div className="fi" style={{marginTop:16}}>
        <label className="lb">Restricciones, alergias o necesidades especiales</label>
        <input className="inp" placeholder="p.ej. Vegano · Movilidad reducida · Sin gluten · Con mascota"
          value={form.restricciones} onChange={e=>set("restricciones",e.target.value)}/>
      </div>
      <div className="fi">
        <label className="lb">¿Algo más que quieras contarnos?</label>
        <textarea className="ta"
          placeholder="p.ej. Es mi primer viaje solo/a. Quiero desconectar. Me encanta el jazz y los mercados locales."
          value={form.notas} onChange={e=>set("notas",e.target.value)}/>
      </div>
    </>;

    if (step===6) return <>
      <p className="st">¿Qué prefieres evitar?</p>
      <p className="sd">Marca lo que no quieres en tu itinerario. Esto mejora mucho el resultado.</p>
      <div className="fi">
        <div className="chips">
          {EVITAR_CHIPS.map(e=>
            <Chip key={e} label={e}
              sel={form.evitar.includes(e)} onClick={()=>togA("evitar",e)}/>
          )}
        </div>
      </div>
      <div className="fi" style={{marginTop:16}}>
        <label className="lb">Otras cosas que quieres evitar</label>
        <textarea className="ta"
          placeholder="p.ej. Lugares con mucho ruido. Actividades con animales en cautividad. Visitas guiadas largas."
          value={form.evitarLibre} onChange={e=>set("evitarLibre",e.target.value)}/>
      </div>
      <div className="hint">
        💡 <strong>¿Cómo funciona?</strong> Generamos un prompt detallado con tu perfil completo y lo pegas en cualquier IA. Incluye instrucciones para que la IA optimice el resultado antes de generar. Sin datos guardados.
      </div>
    </>;
  };

  return <>
    <style dangerouslySetInnerHTML={{__html:CSS}}/>
    <div className="wrap">

      <div className="logo fu">
        <div className="logo-t">TRIB &amp; TRIP</div>
        <div className="logo-s">Generador de itinerario · Aquí no corremos. Aquí escuchamos.</div>
      </div>

      {!prompt && (
        <div className="prog fu d1">
          {STEPS.map((s,i)=>(
            <div key={i} className={"pg"+(i<step?" done":i===step?" act":"")}/>
          ))}
          <span className="pgl">{step+1}/{STEPS.length}</span>
        </div>
      )}

      {prompt && (
        <div className="result-card fu" ref={resultRef}>
          <div className="rt">Tu prompt para {form.destino} está listo ✦</div>
          <div className="rs">
            Copia el prompt y pégalo en tu IA favorita.<br/>
            Lleva instrucciones de autooptimización para que la IA ajuste el resultado a tu perfil real.
          </div>
          <div className="rac">
            <button className={"sm"+(copied?" ok":"")} onClick={copy}>
              {copied?"✓ Copiado":"📋 Copiar prompt"}
            </button>
            <button className="sm" onClick={reset}>← Nuevo viaje</button>
          </div>
          <div className="div-line"/>
          <p className="lb" style={{marginBottom:10}}>Abre una IA y pega el prompt — el clic copia automáticamente:</p>
          <div className="ia-grid">
            {IA_LINKS.map(ia=>(
              <a key={ia.name} href={ia.url} target="_blank" rel="noopener noreferrer"
                className="ia-btn" onClick={copy}>
                <span style={{fontSize:16}}>{ia.icon}</span>
                <span>{ia.name}</span>
              </a>
            ))}
          </div>
          <div className="div-line"/>
          <p className="lb" style={{marginBottom:8}}>Vista previa del prompt:</p>
          <div className="pbox">{prompt}</div>
          <div style={{marginTop:12,display:"flex",justifyContent:"flex-end"}}>
            <button className={"sm"+(copied?" ok":"")} onClick={copy}>
              {copied?"✓ Copiado":"📋 Copiar prompt"}
            </button>
          </div>
        </div>
      )}

      {!prompt && (
        <div className="card fu d2">
          {stepContent()}
          <div className="br">
            {step>0
              ? <button className="btn bg" onClick={()=>setStep(s=>s-1)}>← Atrás</button>
              : <div/>
            }
            {step<STEPS.length-1
              ? <button className="btn bp" disabled={!canNext()} onClick={()=>setStep(s=>s+1)}>Siguiente →</button>
              : <button className="btn bp" disabled={!form.destino||!form.tipo} onClick={generate}>
                  Generar prompt ✦
                </button>
            }
          </div>
        </div>
      )}

      <div className="ft fu d4">
        Sin cookies · Sin datos guardados · Tu viaje, tuyo.<br/>
        <a href="https://tribandtrip.github.io" target="_blank" rel="noopener noreferrer">TRIB &amp; TRIP</a>
      </div>
    </div>
    <div className={"toast"+(toastOn?" show":"")}>{toast}</div>
  </>;
}

ReactDOM.render(React.createElement(App), document.getElementById("root"));
