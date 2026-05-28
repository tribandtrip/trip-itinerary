// TRIB & TRIP — Generador de Itinerario v2
// Opción A: Prompt generator mejorado. Sin backend, sin API key, sin costes.
// El formulario construye un prompt rico que el usuario usa en cualquier IA.

const { useState, useRef } = React;

// ─── Paleta ───────────────────────────────────────────────────────────────────
const C = {
  sand:  "#F0EBE1",
  terra: "#C96A38",
  tl:    "#E8855A",
  ink:   "#1C1A17",
  mist:  "#8B8179",
  cream: "#FAF7F2",
  moss:  "#4A6741",
  line:  "#E0D9CF",
  ok:    "#4A6741",
};

// ─── Estilos ──────────────────────────────────────────────────────────────────
const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body,#root{background:${C.sand};font-family:'DM Sans',sans-serif;color:${C.ink};min-height:100vh}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:${C.mist};border-radius:2px}

@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes pop{0%{transform:scale(.94)}60%{transform:scale(1.03)}100%{transform:scale(1)}}
@keyframes shine{0%{background-position:200% center}100%{background-position:-200% center}}

.fu{animation:fadeUp .4s ease both}
.d1{animation-delay:.07s}.d2{animation-delay:.14s}.d3{animation-delay:.21s}.d4{animation-delay:.28s}

/* ── Layout ── */
.wrap{max-width:700px;margin:0 auto;padding:16px 14px 72px}

/* ── Header ── */
.logo{text-align:center;padding:36px 0 28px}
.logo-t{
  font-family:'DM Serif Display',serif;
  font-size:clamp(24px,7vw,38px);
  color:${C.terra};
  letter-spacing:-.5px;
  line-height:1
}
.logo-s{font-size:12px;color:${C.mist};margin-top:7px;letter-spacing:.5px}

/* ── Progress ── */
.prog{display:flex;gap:7px;align-items:center;margin-bottom:24px}
.pg{flex:1;height:3px;border-radius:2px;background:#D5CEC4;transition:background .35s}
.pg.done{background:${C.terra}}.pg.act{background:${C.tl}}
.pgl{font-size:11px;color:${C.mist};white-space:nowrap;min-width:32px;text-align:right}

/* ── Card ── */
.card{background:${C.cream};border-radius:20px;padding:28px 24px;box-shadow:0 2px 22px rgba(28,26,23,.07);margin-bottom:14px}

/* ── Step typography ── */
.st{font-family:'DM Serif Display',serif;font-size:clamp(19px,5vw,26px);margin-bottom:5px;line-height:1.2}
.sd{font-size:13px;color:${C.mist};margin-bottom:24px;line-height:1.65}

/* ── Fields ── */
.fi{margin-bottom:18px}
.lb{display:block;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.9px;color:${C.mist};margin-bottom:6px}
.inp,.sel,.ta{
  width:100%;background:${C.sand};border:1.5px solid ${C.line};
  border-radius:11px;padding:11px 14px;
  font-family:'DM Sans',sans-serif;font-size:14px;color:${C.ink};
  outline:none;transition:border-color .2s,box-shadow .2s;appearance:none
}
.inp:focus,.sel:focus,.ta:focus{border-color:${C.terra};box-shadow:0 0 0 3px rgba(201,106,56,.12)}
.ta{resize:vertical;min-height:80px;line-height:1.65}

/* ── 2-col grid ── */
.row2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media(max-width:480px){.row2{grid-template-columns:1fr}}

/* ── Chips ── */
.chips{display:flex;flex-wrap:wrap;gap:7px}
.chip{
  padding:7px 13px;border-radius:50px;
  border:1.5px solid ${C.line};background:transparent;
  font-family:'DM Sans',sans-serif;font-size:12.5px;color:${C.ink};
  cursor:pointer;transition:all .17s;user-select:none;-webkit-user-select:none
}
.chip:hover{border-color:${C.tl};color:${C.terra}}
.chip.on{background:${C.terra};border-color:${C.terra};color:#fff;animation:pop .25s ease}

/* ── Nav ── */
.br{display:flex;justify-content:space-between;align-items:center;margin-top:24px;gap:10px}
.btn{padding:12px 22px;border-radius:50px;border:none;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:7px}
.bp{background:${C.terra};color:#fff;flex:1;justify-content:center}
.bp:hover{background:#B55C2E;transform:translateY(-1px);box-shadow:0 4px 14px rgba(201,106,56,.3)}
.bp:disabled{background:#D5CEC4;cursor:not-allowed;transform:none;box-shadow:none}
.bg{background:transparent;color:${C.mist};padding:12px 16px}
.bg:hover{color:${C.ink}}

/* ── Prompt result ── */
.result-card{background:${C.cream};border-radius:20px;padding:28px 24px;box-shadow:0 2px 22px rgba(28,26,23,.07)}
.result-header{margin-bottom:20px}
.result-title{font-family:'DM Serif Display',serif;font-size:clamp(17px,4vw,22px);margin-bottom:4px}
.result-sub{font-size:12px;color:${C.mist};line-height:1.6}
.result-actions{display:flex;gap:7px;flex-wrap:wrap;margin-top:14px}

.sm{
  padding:8px 14px;border-radius:50px;
  border:1.5px solid ${C.line};background:transparent;
  font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;
  color:${C.mist};cursor:pointer;transition:all .18s;display:flex;align-items:center;gap:5px
}
.sm:hover{border-color:${C.terra};color:${C.terra}}
.sm.active-ia{background:${C.terra};border-color:${C.terra};color:#fff}

/* ── Prompt box ── */
.pbox{
  background:${C.sand};border:1.5px solid ${C.line};border-radius:12px;
  padding:18px 16px;font-family:'DM Sans',sans-serif;
  font-size:13px;line-height:1.75;color:${C.ink};
  white-space:pre-wrap;word-break:break-word;
  max-height:440px;overflow-y:auto;margin-top:16px
}
.pbox strong{color:${C.terra};font-weight:600}

/* ── IA buttons ── */
.ia-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin-top:14px}
.ia-btn{
  display:flex;align-items:center;gap:8px;
  padding:10px 14px;border-radius:12px;
  border:1.5px solid ${C.line};background:transparent;
  font-family:'DM Sans',sans-serif;font-size:12.5px;font-weight:500;
  color:${C.ink};cursor:pointer;transition:all .18s;text-decoration:none
}
.ia-btn:hover{border-color:${C.terra};background:rgba(201,106,56,.05);color:${C.terra}}
.ia-icon{font-size:18px;flex-shrink:0}

/* ── Copy feedback ── */
.copy-ok{
  display:inline-flex;align-items:center;gap:5px;
  font-size:12px;color:${C.ok};font-weight:600;
  opacity:0;transition:opacity .2s
}
.copy-ok.show{opacity:1}

/* ── Footer ── */
.ft{text-align:center;margin-top:32px;font-size:11px;color:${C.mist};opacity:.6}
.ft a{color:${C.mist};text-decoration:none}
.ft a:hover{color:${C.terra}}

/* ── Toast ── */
.toast{
  position:fixed;bottom:20px;left:50%;
  transform:translateX(-50%) translateY(60px);
  background:${C.ink};color:#fff;
  padding:10px 18px;border-radius:50px;
  font-size:12.5px;font-weight:500;
  transition:transform .25s ease;z-index:99;
  white-space:nowrap;pointer-events:none
}
.toast.show{transform:translateX(-50%) translateY(0)}

/* ── Divider ── */
.div-line{height:1px;background:${C.line};margin:20px 0}
`;

// ─── Config ───────────────────────────────────────────────────────────────────
const STEPS   = ["Destino","Viajero","Ritmo","Detalles"];
const ESTILOS = ["Cultural","Naturaleza","Gastronomía","Descanso","Aventura","Urbano","Espiritual","Fotografía","Historia","Vida nocturna"];
const RITMOS  = ["Muy tranquilo","Pausado","Equilibrado","Activo","Intenso"];
const TIPOS   = ["Solo/a","En pareja","Familia con niños","Grupo de amigos","Trabajo + viaje"];
const ALOJ    = ["Hotel boutique","Hotel urbano","Hostel","Airbnb / apartamento","Casa rural","Camping","Sin preferencia"];
const PRESUP  = ["Ajustado (económico)","Medio","Confortable","Sin límite especial"];

// IAs donde pegar el prompt
const IA_LINKS = [
  { name:"ChatGPT",    icon:"🟢", url:"https://chat.openai.com" },
  { name:"Claude",     icon:"🟠", url:"https://claude.ai" },
  { name:"Gemini",     icon:"🔵", url:"https://gemini.google.com" },
  { name:"Copilot",    icon:"⚪", url:"https://copilot.microsoft.com" },
  { name:"Perplexity", icon:"🟣", url:"https://www.perplexity.ai" },
  { name:"Le Chat",    icon:"🟡", url:"https://chat.mistral.ai" },
];

// ─── Prompt builder ───────────────────────────────────────────────────────────
function buildPrompt(f) {
  const estilos = f.estilos.length ? f.estilos.join(", ") : "viaje general sin preferencia temática";
  const dias    = parseInt(f.dias, 10);

  return `Eres un experto planificador de viajes con alma. Conoces los destinos en profundidad y sabes adaptarte al perfil real del viajero. Tu tono es cercano, humano y honesto — como un amigo que ha estado allí y quiere que disfrutes de verdad.

Crea un itinerario de viaje completo y detallado para la siguiente persona:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PERFIL DEL VIAJERO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Destino: ${f.destino}
Duración: ${dias} días${f.fechas ? ` (${f.fechas})` : ""}
Tipo de viajero: ${f.tipo}
Intereses y estilos: ${estilos}
Ritmo deseado: ${f.ritmo}
Alojamiento preferido: ${f.alojamiento || "sin preferencia"}
Presupuesto: ${f.presupuesto || "no especificado"}
Restricciones / necesidades especiales: ${f.restricciones || "ninguna"}
Información adicional: ${f.notas || "ninguna"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ESTRUCTURA DEL ITINERARIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Organiza el itinerario con esta estructura para cada uno de los ${dias} días:

📅 Día N — [Título evocador que capture el espíritu del día]

🌅 Mañana
[Descripción narrativa de 2-3 actividades. No solo listes, explica por qué merece la pena, qué ambiente tiene, qué hora es ideal para ir, si conviene reservar, etc.]

☀️ Tarde
[Continuación natural. Respeta el ritmo "${f.ritmo}" del viajero.]

🌙 Noche
[Propuesta de cena con contexto local + ambiente nocturno. Si el ritmo es tranquilo, que sea pausado.]

---

Al final del itinerario añade estas secciones:

🧭 Consejos prácticos
[5 consejos reales y concretos adaptados al perfil: transporte, costumbres locales, apps útiles, mejor momento para visitar cada lugar, etc.]

🍽️ No te pierdas
[3-4 recomendaciones gastronómicas imprescindibles del destino, con contexto — qué son, dónde encontrarlas, por qué son especiales]

💰 Orientación de costes
[Estimación realista del rango de gasto diario según el presupuesto indicado: alojamiento, comidas, actividades, transporte]

💬 Nota para ${f.tipo === "Solo/a" ? "el viajero en solitario" : "el viajero"}
[Párrafo personalizado según el tipo de viaje: para solo/a incluye dónde conocer gente y consejos de seguridad; para pareja sugiere momentos especiales; para familia con niños indica qué lugares son más amigables; etc.]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INSTRUCCIONES DE TONO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Habla como un amigo que conoce bien el destino, no como una guía de turismo
- No exageres ni uses lenguaje de marketing. Sé honesto si algo tiene mucha cola o no merece la pena
- Adapta el ritmo real: con ritmo "${f.ritmo}", el día no puede estar sobrecargado de actividades
- Usa emojis solo en los encabezados de sección, no en el texto corrido
- Responde en español
- Si hay fechas especificadas, ten en cuenta la temporada (clima, festividades, afluencia)`;
}

// ─── Componentes auxiliares ───────────────────────────────────────────────────
function Chip({ label, sel, onClick }) {
  return (
    <button className={"chip" + (sel ? " on" : "")} onClick={onClick}>
      {label}
    </button>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [step, setStep]     = useState(0);
  const [form, setForm]     = useState({
    destino: "", fechas: "", dias: "7",
    tipo: "", estilos: [], ritmo: "Equilibrado",
    alojamiento: "", presupuesto: "", restricciones: "", notas: "",
  });
  const [prompt, setPrompt] = useState(null);
  const [copied, setCopied] = useState(false);
  const [toast,  setToast]  = useState("");
  const [toastOn,setToastOn]= useState(false);
  const resultRef           = useRef(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const tog = (k, v) => setForm(f => ({
    ...f, [k]: f[k].includes(v) ? f[k].filter(x => x !== v) : [...f[k], v]
  }));

  const showToast = msg => {
    setToast(msg); setToastOn(true);
    setTimeout(() => setToastOn(false), 2400);
  };

  const canNext = () => {
    if (step === 0) return form.destino.trim() && form.dias;
    if (step === 1) return form.tipo;
    return true;
  };

  const generate = () => {
    const p = buildPrompt(form);
    setPrompt(p);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const copy = () => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      showToast("✓ Prompt copiado — pégalo en tu IA favorita");
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const reset = () => {
    setStep(0); setPrompt(null); setCopied(false);
    setForm({ destino:"", fechas:"", dias:"7", tipo:"", estilos:[], ritmo:"Equilibrado", alojamiento:"", presupuesto:"", restricciones:"", notas:"" });
  };

  // Render de cada paso
  const stepContent = () => {
    if (step === 0) return (
      <>
        <p className="st">¿A dónde quieres ir?</p>
        <p className="sd">El destino y el tiempo disponible. Con eso ya podemos empezar.</p>
        <div className="fi">
          <label className="lb">Destino o zona</label>
          <input className="inp"
            placeholder="p.ej. Kioto, Japón · Costa Amalfitana · Marruecos del norte · Islandia"
            value={form.destino}
            onChange={e => set("destino", e.target.value)}
            autoFocus
          />
        </div>
        <div className="row2">
          <div className="fi">
            <label className="lb">Número de días</label>
            <select className="sel" value={form.dias} onChange={e => set("dias", e.target.value)}>
              {[2,3,4,5,6,7,8,9,10,12,14,21,28].map(n =>
                <option key={n} value={n}>{n} días</option>
              )}
            </select>
          </div>
          <div className="fi">
            <label className="lb">Fechas aproximadas (opcional)</label>
            <input className="inp"
              placeholder="p.ej. Agosto 2025"
              value={form.fechas}
              onChange={e => set("fechas", e.target.value)}
            />
          </div>
        </div>
      </>
    );

    if (step === 1) return (
      <>
        <p className="st">¿Cómo viajas esta vez?</p>
        <p className="sd">Tu compañía y el tipo de experiencias que buscas.</p>
        <div className="fi">
          <label className="lb">Viajo…</label>
          <div className="chips">
            {TIPOS.map(t =>
              <Chip key={t} label={t} sel={form.tipo === t} onClick={() => set("tipo", t)} />
            )}
          </div>
        </div>
        <div className="fi" style={{ marginTop: 16 }}>
          <label className="lb">Me interesa sobre todo… (puedes marcar varios)</label>
          <div className="chips">
            {ESTILOS.map(e =>
              <Chip key={e} label={e} sel={form.estilos.includes(e)} onClick={() => tog("estilos", e)} />
            )}
          </div>
        </div>
      </>
    );

    if (step === 2) return (
      <>
        <p className="st">¿Cuál es tu ritmo?</p>
        <p className="sd">Aquí no corremos. Tú decides si quieres más pausa o más intensidad.</p>
        <div className="fi">
          <label className="lb">Ritmo del viaje</label>
          <div className="chips">
            {RITMOS.map(r =>
              <Chip key={r} label={r} sel={form.ritmo === r} onClick={() => set("ritmo", r)} />
            )}
          </div>
        </div>
        <div className="fi" style={{ marginTop: 16 }}>
          <label className="lb">Alojamiento preferido</label>
          <div className="chips">
            {ALOJ.map(a =>
              <Chip key={a} label={a} sel={form.alojamiento === a} onClick={() => set("alojamiento", a)} />
            )}
          </div>
        </div>
      </>
    );

    if (step === 3) return (
      <>
        <p className="st">Últimos detalles</p>
        <p className="sd">Cuanto más nos cuentes, más preciso será el itinerario.</p>
        <div className="fi">
          <label className="lb">Presupuesto aproximado</label>
          <div className="chips">
            {PRESUP.map(p =>
              <Chip key={p} label={p} sel={form.presupuesto === p} onClick={() => set("presupuesto", p)} />
            )}
          </div>
        </div>
        <div className="fi" style={{ marginTop: 16 }}>
          <label className="lb">Restricciones, alergias o necesidades especiales</label>
          <input className="inp"
            placeholder="p.ej. Vegano · Movilidad reducida · Sin gluten · Con mascota"
            value={form.restricciones}
            onChange={e => set("restricciones", e.target.value)}
          />
        </div>
        <div className="fi">
          <label className="lb">¿Algo más que quieras añadir?</label>
          <textarea className="ta"
            placeholder="p.ej. Es mi primer viaje solo/a. Me encanta el jazz. Prefiero evitar las zonas muy turísticas. Tengo un presupuesto ajustado para comer."
            value={form.notas}
            onChange={e => set("notas", e.target.value)}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="wrap">

        {/* Header */}
        <div className="logo fu">
          <div className="logo-t">TRIB &amp; TRIP</div>
          <div className="logo-s">Generador de itinerario · Aquí no corremos. Aquí escuchamos.</div>
        </div>

        {/* Progress */}
        {!prompt && (
          <div className="prog fu d1">
            {STEPS.map((s, i) => (
              <div key={i} className={"pg" + (i < step ? " done" : i === step ? " act" : "")} />
            ))}
            <span className="pgl">{step + 1}/{STEPS.length}</span>
          </div>
        )}

        {/* Resultado: prompt generado */}
        {prompt && (
          <div className="result-card fu" ref={resultRef}>
            <div className="result-header">
              <div className="result-title">Tu prompt para {form.destino} está listo ✦</div>
              <div className="result-sub">
                Copia el texto y pégalo en tu asistente de IA favorito.<br/>
                Cuanto mejor sea la IA que uses, mejor será el itinerario.
              </div>
              <div className="result-actions">
                <button className="sm" onClick={copy}>
                  {copied ? "✓ Copiado" : "📋 Copiar prompt"}
                </button>
                <button className="sm" onClick={reset}>← Nuevo viaje</button>
              </div>
            </div>

            <div className="div-line"/>

            <p className="lb" style={{ marginBottom: 10 }}>Abre una de estas IAs y pega el prompt:</p>
            <div className="ia-grid">
              {IA_LINKS.map(ia => (
                <a key={ia.name} href={ia.url} target="_blank" rel="noopener noreferrer" className="ia-btn"
                   onClick={copy}>
                  <span className="ia-icon">{ia.icon}</span>
                  <span>{ia.name}</span>
                </a>
              ))}
            </div>

            <div className="div-line"/>

            <p className="lb" style={{ marginBottom: 8 }}>Vista previa del prompt:</p>
            <div className="pbox">{prompt}</div>

            <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
              <button className="sm" onClick={copy}>{copied ? "✓ Copiado" : "📋 Copiar prompt"}</button>
            </div>
          </div>
        )}

        {/* Formulario */}
        {!prompt && (
          <div className="card fu d2">
            {stepContent()}
            <div className="br">
              {step > 0
                ? <button className="btn bg" onClick={() => setStep(s => s - 1)}>← Atrás</button>
                : <div />
              }
              {step < STEPS.length - 1
                ? <button className="btn bp" disabled={!canNext()} onClick={() => setStep(s => s + 1)}>
                    Siguiente →
                  </button>
                : <button className="btn bp" disabled={!form.destino || !form.tipo} onClick={generate}>
                    Generar prompt ✦
                  </button>
              }
            </div>
          </div>
        )}

        {/* Hint card solo en el paso final antes de generar */}
        {!prompt && step === STEPS.length - 1 && (
          <div className="card fu d3" style={{ padding: "16px 20px", opacity: .85 }}>
            <p style={{ fontSize: 12, color: C.mist, lineHeight: 1.6 }}>
              💡 <strong style={{ color: C.ink }}>¿Cómo funciona?</strong> Rellenamos tu perfil de viaje y generamos un prompt detallado que puedes pegar en ChatGPT, Claude, Gemini o cualquier IA. El resultado será un itinerario personalizado basado en tu forma de viajar.
            </p>
          </div>
        )}

        <div className="ft fu d4">
          Sin cookies · Sin datos guardados · Tu viaje, tuyo.<br/>
          <a href="https://tribandtrip.github.io" target="_blank" rel="noopener noreferrer">TRIB &amp; TRIP</a>
        </div>
      </div>

      <div className={"toast" + (toastOn ? " show" : "")}>{toast}</div>
    </>
  );
}

ReactDOM.render(React.createElement(App), document.getElementById("root"));
