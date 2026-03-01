/* itinerary.jsx */
/* GitHub Pages-ready (sin bundler). No lucide-react. Render incluido. */

const { useEffect, useMemo, useRef, useState } = React;

const INITIAL_DATA = {
  destino: "",
  fechas: "",
  acompanantes: "Solo",
  estructura: "Base única (desde donde me muevo)",
  vuelos: "",
  alojamiento: "",
  reservas: "",
  energia: "Medio (Equilibrado)",
  tipoViaje: "Cultural/Naturaleza",
  integracion: "Sí, quiero conectar",
  presupuesto: "",
  estadoEmocional: "",
};

// Colores marca
const BRAND = {
  tierra: "#54614A",
  arena: "#F0EBE1",
  carbon: "#3C3C3B",
  ocre: "#C5A869",
  blanco: "#FFFFFF",
};

// Iconos simples (emoji) para evitar dependencias
const ICON = {
  sparkles: "✨",
  map: "🗺️",
  calendar: "📅",
  users: "👤",
  plane: "✈️",
  clock: "⏰",
  home: "🏠",
  check: "✅",
  battery: "🔋",
  wallet: "💳",
  heart: "❤️",
  shield: "🛡️",
  copy: "📋",
  link: "🔗",
  arrow: "➡️",
  refresh: "🔄",
};

function App() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(INITIAL_DATA);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const updateData = (field, value) => setData((prev) => ({ ...prev, [field]: value }));
  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => Math.max(0, prev - 1));

  const canProceedStep1 = Boolean(data.destino?.trim()) && Boolean(data.fechas?.trim());

  const buildPrompt = () => {
    const DESTINO = data.destino || "";
    const FECHAS = data.fechas || "";
    const ACOMPANANTES = data.acompanantes || "Solo";
    const ESTRUCTURA = data.estructura || "Base única (desde donde me muevo)";
    const VUELOS = data.vuelos?.trim() ? data.vuelos.trim() : "No definidos";
    const ALOJAMIENTO = data.alojamiento?.trim() ? data.alojamiento.trim() : "No definido";
    const RESERVAS = data.reservas?.trim() ? data.reservas.trim() : "Ninguno";
    const ENERGIA = data.energia || "Medio (Equilibrado)";
    const INTEGRACION = data.integracion || "Sí, quiero conectar";
    const PRESUPUESTO = data.presupuesto?.trim() ? data.presupuesto.trim() : "No definido";
    const ESTADO_EMOCIONAL = data.estadoEmocional?.trim() ? data.estadoEmocional.trim() : "No especificado";

    return `INICIO DEL PROMPT
Quiero que actúes como mi asistente de viaje personal con el estilo TRIB & TRIP.

Filosofía (obligatoria):
	•	“Más que un viaje”: no busco tachar lugares, busco vivir el lugar con calma.
	•	No por hacer más será mejor. Prioriza energía, salud y disfrute.
	•	Agrupa por barrios/zona para no estar saltando de un lado a otro.
	•	Máximo 1 evento fuerte por día. El resto suave.
	•	Incluye tiempo muerto intencional (cafés, bancos, paseos, observar vida local).
	•	Si surge una oportunidad humana valiosa, priorízala sobre el plan.
	•	Cierre con: “Ser dueño de ti mismo”.

Datos del viaje (usar exactamente estos datos):
	•	Destino: ${DESTINO}
	•	Fechas: ${FECHAS}
	•	Viajo: ${ACOMPANANTES}
	•	Estructura: ${ESTRUCTURA}
	•	Horarios/Vuelos: ${VUELOS}
	•	Alojamiento/zona: ${ALOJAMIENTO}
	•	Reservas y anclajes (sí o sí): ${RESERVAS}
	•	Nivel de energía: ${ENERGIA}
	•	Integración local: ${INTEGRACION}
	•	Presupuesto diario aproximado en destino (sin vuelos/alojamiento): ${PRESUPUESTO}
	•	Estado emocional previo: ${ESTADO_EMOCIONAL}

Objetivo:
Diseña un itinerario realista y flexible. Quiero vivir el destino “desde dentro”: cafés locales, pubs auténticos, librerías, campus/universidad si aplica, barrios reales, mercados y paseos. Mezcla imprescindibles con vida local. Evita recomendaciones genéricas.

Entrega en este formato (obligatorio):
	1.	Enfoque del viaje (2–4 líneas) alineado con mi estado emocional.
	2.	Itinerario día a día (con bloques por zona: mañana/tarde/noche). Horas solo cuando importen (vuelos, tours, reservas, partido, etc.).
	•	Para cada día:
	•	Plan Base
	•	Plan B si llueve/frío
	•	Opción social (hostel, pub, evento local)
	•	Espacio de calma (banco, café, paseo)
	•	2–3 sugerencias de comida (local + algo internacional bueno)
	•	1 spot para grabar contenido auténtico
	3.	Recomendaciones por categorías (sin lujo, precio medio):
	•	Comida típica local imprescindible
	•	Cafés / chocolate / bakery
	•	Pubs con ambiente local
	•	Pizza / italiano / mexicano (si aplica)
	•	Compras rápidas sin dedicar un día entero (zonas y momentos)
	4.	Coste estimado en destino:
	•	Estimación diaria y total (comida, transporte, entradas, extras, margen 15%)
	5.	Checklist previo al viaje (seguro, documentación, requisitos entrada oficiales, SIM, banco, copias digitales, botiquín, clima 5 días antes).
	6.	Cierre humano breve recordando: “Más que un viaje, es el camino” + “Ser dueño de ti mismo”.

Restricciones:
	•	No inventes horarios si no los he dado.
	•	Si propones eventos/horarios concretos (partidos, tours, reservas, etc.), solo confirma lo que está en mis datos. Si no, márcalo como “a confirmar” y sugiere verificar en fuentes oficiales.
	•	Si algo es incierto, da rangos y di que hay que verificar.
	•	Evita listas interminables: prioriza calidad y coherencia.
FIN DEL PROMPT`;
  };

  const generatePromptAndGo = () => {
    const prompt = buildPrompt();
    setGeneratedPrompt(prompt);
    setStep(5);
  };

  // Copia “clásica” (funciona incluso cuando writeText está bloqueado por Permissions-Policy)
  const copyToClipboard = () => {
    const textArea = document.createElement("textarea");
    textArea.value = generatedPrompt;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Error copiando al portapapeles:", err);
      setCopied(false);
    }

    document.body.removeChild(textArea);
  };

  const restart = () => {
    setData(INITIAL_DATA);
    setGeneratedPrompt("");
    setCopied(false);
    setStep(0);
  };

  const openChatGPT = () => window.open("https://chat.openai.com/", "_blank", "noopener,noreferrer");
  const openGemini = () => window.open("https://gemini.google.com/", "_blank", "noopener,noreferrer");

  const styles = useMemo(() => {
    return {
      page: {
        minHeight: "100vh",
        background: BRAND.arena,
        padding: "16px",
        fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        color: BRAND.carbon,
      },
      container: {
        maxWidth: 860,
        margin: "0 auto",
        padding: "8px 0 32px",
      },
      progressWrap: {
        maxWidth: 720,
        margin: "0 auto 22px",
        height: 8,
        background: BRAND.blanco,
        borderRadius: 999,
        overflow: "hidden",
        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.08)",
      },
      progressBar: (pct) => ({
        width: `${pct}%`,
        height: "100%",
        background: BRAND.ocre,
        transition: "width 300ms ease",
      }),
      brandTitle: {
        fontFamily: "'DM Sans', Inter, system-ui, sans-serif",
        fontWeight: 900,
        letterSpacing: "-0.04em",
        color: BRAND.tierra,
        margin: 0,
        lineHeight: 1,
      },
      brandSub: {
        fontFamily: "Inter, system-ui, sans-serif",
        fontWeight: 600,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: BRAND.tierra,
        margin: 0,
      },
      card: {
        background: BRAND.blanco,
        border: `1px solid ${BRAND.arena}`,
        borderRadius: 24,
        padding: 22,
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
      },
      h3: {
        fontFamily: "'DM Sans', Inter, system-ui, sans-serif",
        fontWeight: 900,
        color: BRAND.tierra,
        textAlign: "center",
        margin: "8px 0 14px",
        fontSize: 30,
      },
      label: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontFamily: "'DM Sans', Inter, system-ui, sans-serif",
        fontWeight: 600,
        color: BRAND.carbon,
        fontSize: 18,
        marginBottom: 8,
      },
      input: {
        width: "100%",
        padding: "14px 14px",
        borderRadius: 16,
        border: `1px solid ${BRAND.arena}`,
        background: "rgba(240,235,225,0.35)",
        outline: "none",
        fontSize: 15,
      },
      textarea: {
        width: "100%",
        padding: "14px 14px",
        borderRadius: 16,
        border: `1px solid ${BRAND.arena}`,
        background: "rgba(240,235,225,0.35)",
        outline: "none",
        fontSize: 15,
        minHeight: 96,
        resize: "vertical",
      },
      buttonPrimary: {
        background: BRAND.tierra,
        color: "#fff",
        border: "none",
        padding: "12px 18px",
        borderRadius: 999,
        fontFamily: "'DM Sans', Inter, system-ui, sans-serif",
        fontWeight: 600,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        boxShadow: "0 6px 18px rgba(0,0,0,0.10)",
      },
      buttonPrimaryDisabled: {
        opacity: 0.45,
        cursor: "not-allowed",
      },
      buttonGhost: {
        background: "transparent",
        color: BRAND.carbon,
        border: "none",
        padding: "10px 10px",
        borderRadius: 12,
        fontFamily: "'DM Sans', Inter, system-ui, sans-serif",
        fontWeight: 600,
        cursor: "pointer",
      },
      buttonSecondary: {
        background: BRAND.blanco,
        color: BRAND.carbon,
        border: `1px solid ${BRAND.arena}`,
        padding: "12px 18px",
        borderRadius: 999,
        fontFamily: "'DM Sans', Inter, system-ui, sans-serif",
        fontWeight: 600,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
      },
      rowBetween: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        marginTop: 14,
      },
      infoBox: {
        background: "rgba(240,235,225,0.55)",
        border: `1px solid ${BRAND.arena}`,
        borderRadius: 18,
        padding: 14,
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
      },
      monoArea: {
        width: "100%",
        minHeight: 340,
        padding: 14,
        borderRadius: 18,
        border: `1px solid ${BRAND.arena}`,
        background: "rgba(240,235,225,0.25)",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
        fontSize: 12.5,
        color: BRAND.carbon,
        outline: "none",
        resize: "vertical",
      },
      smallNote: {
        fontSize: 12.5,
        opacity: 0.75,
        lineHeight: 1.35,
      },
      stepIcon: {
        width: 56,
        height: 56,
        borderRadius: 14,
        objectFit: "cover",
        boxShadow: "0 6px 18px rgba(0,0,0,0.10)",
      },
      iconChip: {
        width: 28,
        height: 28,
        borderRadius: 10,
        background: "rgba(197,168,105,0.20)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "0 0 auto",
        marginTop: 2,
      },
      iconTxt: {
        fontSize: 16,
      },
    };
  }, []);

  const StepHeaderIcon = () => (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
      <img src="./icon-tblanco-bgverde.jpg" alt="TRIB & TRIP" style={styles.stepIcon} />
    </div>
  );

  const Icon = ({ name }) => (
    <span style={styles.iconChip} aria-hidden="true">
      <span style={styles.iconTxt}>{ICON[name]}</span>
    </span>
  );

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div ref={scrollRef} style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", paddingTop: 10 }}>
            <div style={{ padding: "18px 0 8px" }}>
              <h1 style={{ ...styles.brandTitle, fontSize: 68 }}>TRIB & TRIP</h1>
              <p style={{ ...styles.brandSub, fontSize: 18, marginTop: 8 }}>Más que un viaje</p>
            </div>

            <div style={{ ...styles.card, textAlign: "left", marginTop: 18 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
                <Icon name="sparkles" />
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55 }}>
                  <strong style={{ color: BRAND.tierra, fontFamily: "'DM Sans', Inter, system-ui, sans-serif" }}>
                    No vamos a planear un viaje.
                  </strong>{" "}
                  Vamos a diseñar cómo quieres vivirlo.
                  <br />
                  No es una lista turística. Es tu energía, tus barrios, tu ritmo y tu forma de estar en el mundo.
                </p>
              </div>

              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
                <Icon name="map" />
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55 }}>
                  Te haré unas preguntas rápidas y, al final, la app creará un{" "}
                  <strong style={{ color: BRAND.tierra, fontFamily: "'DM Sans', Inter, system-ui, sans-serif" }}>
                    prompt TRIB & TRIP
                  </strong>{" "}
                  listo para pegar en ChatGPT o Gemini.
                </p>
              </div>

              <div style={styles.infoBox}>
                <Icon name="shield" />
                <p style={{ margin: 0, lineHeight: 1.55 }}>
                  <strong style={{ color: BRAND.tierra, fontFamily: "'DM Sans', Inter, system-ui, sans-serif" }}>
                    Privacidad:
                  </strong>{" "}
                  esta mini-app no guarda nada. Tus respuestas se quedan en tu navegador. Solo genera texto (el prompt)
                  para que tú decidas si lo copias y lo usas.
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "center", marginTop: 18 }}>
                <button
                  onClick={handleNext}
                  style={styles.buttonPrimary}
                  onMouseEnter={(e) => (e.currentTarget.style.background = BRAND.carbon)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = BRAND.tierra)}
                >
                  Empezar tu diseño <span aria-hidden="true">{ICON.arrow}</span>
                </button>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div ref={scrollRef} style={{ maxWidth: 720, margin: "0 auto" }}>
            <StepHeaderIcon />
            <h3 style={styles.h3}>Lo básico de tu camino</h3>

            <div style={styles.card}>
              <div style={{ marginBottom: 18 }}>
                <div style={styles.label}>
                  <Icon name="map" /> ¿Cuál es tu destino?
                </div>
                <input
                  value={data.destino}
                  onChange={(e) => updateData("destino", e.target.value)}
                  placeholder="Ej: Boston, Estados Unidos"
                  style={styles.input}
                />
              </div>

              <div style={{ marginBottom: 18 }}>
                <div style={styles.label}>
                  <Icon name="calendar" /> ¿En qué fechas viajas?
                </div>
                <input
                  value={data.fechas}
                  onChange={(e) => updateData("fechas", e.target.value)}
                  placeholder="Ej: 14 al 19 de Marzo"
                  style={styles.input}
                />
                {(!data.destino?.trim() || !data.fechas?.trim()) && (
                  <div style={{ marginTop: 8, ...styles.smallNote }}>
                    * Para seguir, necesitamos <strong>destino</strong> y <strong>fechas</strong>.
                  </div>
                )}
              </div>

              <div style={{ marginBottom: 18 }}>
                <div style={styles.label}>
                  <Icon name="users" /> ¿Viajas solo o acompañado?
                </div>
                <select
                  value={data.acompanantes}
                  onChange={(e) => updateData("acompanantes", e.target.value)}
                  style={styles.input}
                >
                  <option>Solo</option>
                  <option>En pareja</option>
                  <option>Con amigos</option>
                  <option>En familia</option>
                </select>
              </div>

              <div>
                <div style={styles.label}>
                  <Icon name="plane" /> Estructura del viaje
                </div>
                <select
                  value={data.estructura}
                  onChange={(e) => updateData("estructura", e.target.value)}
                  style={styles.input}
                >
                  <option>Base única (desde donde me muevo)</option>
                  <option>Ruta definida (varias paradas marcadas)</option>
                  <option>Ruta abierta (fluyendo sobre la marcha)</option>
                </select>
              </div>
            </div>

            <div style={styles.rowBetween}>
              <button style={styles.buttonGhost} onClick={handleBack}>
                Atrás
              </button>

              <button
                onClick={handleNext}
                disabled={!canProceedStep1}
                style={{
                  ...styles.buttonPrimary,
                  ...(canProceedStep1 ? null : styles.buttonPrimaryDisabled),
                }}
                onMouseEnter={(e) => {
                  if (canProceedStep1) e.currentTarget.style.background = BRAND.carbon;
                }}
                onMouseLeave={(e) => {
                  if (canProceedStep1) e.currentTarget.style.background = BRAND.tierra;
                }}
              >
                Siguiente paso <span aria-hidden="true">{ICON.arrow}</span>
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div ref={scrollRef} style={{ maxWidth: 720, margin: "0 auto" }}>
            <StepHeaderIcon />
            <h3 style={styles.h3}>Tus anclajes fijos</h3>

            <div style={styles.card}>
              <div style={{ marginBottom: 18 }}>
                <div style={styles.label}>
                  <Icon name="clock" /> Vuelos u horarios ya definidos
                </div>
                <textarea
                  value={data.vuelos}
                  onChange={(e) => updateData("vuelos", e.target.value)}
                  placeholder="Ej: Llego el 14 a las 10:00, regreso el 19 a las 20:00"
                  style={styles.textarea}
                />
              </div>

              <div style={{ marginBottom: 18 }}>
                <div style={styles.label}>
                  <Icon name="home" /> Alojamiento o zona prevista
                </div>
                <input
                  value={data.alojamiento}
                  onChange={(e) => updateData("alojamiento", e.target.value)}
                  placeholder="Ej: Centro / Back Bay / hostel..."
                  style={styles.input}
                />
              </div>

              <div>
                <div style={styles.label}>
                  <Icon name="check" /> Reservas cerradas sí o sí
                </div>
                <textarea
                  value={data.reservas}
                  onChange={(e) => updateData("reservas", e.target.value)}
                  placeholder="Ej: Partido / museo / tour..."
                  style={styles.textarea}
                />
              </div>
            </div>

            <div style={styles.rowBetween}>
              <button style={styles.buttonGhost} onClick={handleBack}>
                Atrás
              </button>

              <button
                onClick={handleNext}
                style={styles.buttonPrimary}
                onMouseEnter={(e) => (e.currentTarget.style.background = BRAND.carbon)}
                onMouseLeave={(e) => (e.currentTarget.style.background = BRAND.tierra)}
              >
                Siguiente paso <span aria-hidden="true">{ICON.arrow}</span>
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div ref={scrollRef} style={{ maxWidth: 720, margin: "0 auto" }}>
            <StepHeaderIcon />
            <h3 style={styles.h3}>Tu energía e intención</h3>

            <div style={styles.card}>
              <div style={{ marginBottom: 18 }}>
                <div style={styles.label}>
                  <Icon name="battery" /> Nivel de energía deseado
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {["Bajo (Relax)", "Medio (Equilibrado)", "Alto (Exploración)"].map((lvl) => {
                    const active = data.energia === lvl;
                    return (
                      <button
                        key={lvl}
                        onClick={() => updateData("energia", lvl)}
                        style={{
                          flex: "1 1 180px",
                          padding: "12px 14px",
                          borderRadius: 16,
                          border: `1px solid ${active ? BRAND.tierra : BRAND.arena}`,
                          background: active ? BRAND.tierra : "rgba(240,235,225,0.35)",
                          color: active ? "#fff" : BRAND.carbon,
                          fontFamily: "'DM Sans', Inter, system-ui, sans-serif",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        {lvl}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginBottom: 18 }}>
                <div style={styles.label}>
                  <Icon name="wallet" /> Presupuesto diario (en destino)
                </div>
                <input
                  value={data.presupuesto}
                  onChange={(e) => updateData("presupuesto", e.target.value)}
                  placeholder="Ej: 50€/día, mochilero, medio..."
                  style={styles.input}
                />
              </div>

              <div style={{ marginBottom: 18 }}>
                <div style={styles.label}>
                  <Icon name="users" /> ¿Quieres integración local?
                </div>
                <select
                  value={data.integracion}
                  onChange={(e) => updateData("integracion", e.target.value)}
                  style={styles.input}
                >
                  <option>Sí, quiero conectar con locales y su vida diaria</option>
                  <option>A medias, turismo con toques locales</option>
                  <option>No, prefiero mantenerme a mi aire</option>
                </select>
              </div>

              <div>
                <div style={styles.label}>
                  <Icon name="heart" /> ¿Cómo estás emocionalmente ahora?
                </div>
                <textarea
                  value={data.estadoEmocional}
                  onChange={(e) => updateData("estadoEmocional", e.target.value)}
                  placeholder="Ej: agotado por el trabajo, necesito paz..."
                  style={styles.textarea}
                />
              </div>
            </div>

            <div style={styles.rowBetween}>
              <button style={styles.buttonGhost} onClick={handleBack}>
                Atrás
              </button>

              <button
                onClick={handleNext}
                style={styles.buttonPrimary}
                onMouseEnter={(e) => (e.currentTarget.style.background = BRAND.carbon)}
                onMouseLeave={(e) => (e.currentTarget.style.background = BRAND.tierra)}
              >
                Revisar resumen <span aria-hidden="true">{ICON.arrow}</span>
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div ref={scrollRef} style={{ maxWidth: 720, margin: "0 auto" }}>
            <StepHeaderIcon />
            <h3 style={styles.h3}>Así entendemos tu viaje</h3>

            <div style={styles.card}>
              <div style={{ display: "grid", gap: 12 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <Icon name="map" />
                  <div>
                    <div style={{ fontFamily: "'DM Sans', Inter, system-ui, sans-serif", fontWeight: 700, color: BRAND.tierra }}>
                      Destino y fechas:
                    </div>
                    <div>{data.destino} ({data.fechas})</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <Icon name="users" />
                  <div>
                    <div style={{ fontFamily: "'DM Sans', Inter, system-ui, sans-serif", fontWeight: 700, color: BRAND.tierra }}>
                      Compañía y formato:
                    </div>
                    <div>{data.acompanantes} — {data.estructura}</div>
                  </div>
                </div>

                {data.vuelos?.trim() && (
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <Icon name="clock" />
                    <div>
                      <div style={{ fontFamily: "'DM Sans', Inter, system-ui, sans-serif", fontWeight: 700, color: BRAND.tierra }}>
                        Vuelos / horarios:
                      </div>
                      <div>{data.vuelos}</div>
                    </div>
                  </div>
                )}

                {data.alojamiento?.trim() && (
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <Icon name="home" />
                    <div>
                      <div style={{ fontFamily: "'DM Sans', Inter, system-ui, sans-serif", fontWeight: 700, color: BRAND.tierra }}>
                        Alojamiento / zona:
                      </div>
                      <div>{data.alojamiento}</div>
                    </div>
                  </div>
                )}

                {data.reservas?.trim() && (
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <Icon name="check" />
                    <div>
                      <div style={{ fontFamily: "'DM Sans', Inter, system-ui, sans-serif", fontWeight: 700, color: BRAND.tierra }}>
                        Anclajes fijos:
                      </div>
                      <div>{data.reservas}</div>
                    </div>
                  </div>
                )}

                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <Icon name="battery" />
                  <div>
                    <div style={{ fontFamily: "'DM Sans', Inter, system-ui, sans-serif", fontWeight: 700, color: BRAND.tierra }}>
                      Energía y estado:
                    </div>
                    <div>
                      {data.energia}
                      {data.estadoEmocional?.trim() ? ` — ${data.estadoEmocional}` : ""}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <Icon name="wallet" />
                  <div>
                    <div style={{ fontFamily: "'DM Sans', Inter, system-ui, sans-serif", fontWeight: 700, color: BRAND.tierra }}>
                      Presupuesto e integración:
                    </div>
                    <div>{data.presupuesto?.trim() ? data.presupuesto : "No definido"} — {data.integracion}</div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 18, paddingTop: 16, borderTop: `1px solid ${BRAND.arena}`, textAlign: "center" }}>
                <p style={{ margin: 0, fontSize: 18, fontFamily: "'DM Sans', Inter, system-ui, sans-serif", fontWeight: 700 }}>
                  Perfecto. Ahora voy a generar tu <span style={{ color: BRAND.tierra }}>prompt TRIB & TRIP</span>.
                </p>
                <p style={{ margin: "10px 0 0", lineHeight: 1.55 }}>
                  Ese texto es lo que pegarás en ChatGPT o Gemini para que te devuelvan un itinerario realista, por zonas,
                  con calma, y con planes alternativos.
                </p>

                <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 14 }}>
                  <button
                    onClick={() => setStep(1)}
                    style={{
                      ...styles.buttonSecondary,
                      background: "rgba(240,235,225,0.60)",
                    }}
                  >
                    Modificar datos
                  </button>

                  <button
                    onClick={generatePromptAndGo}
                    style={styles.buttonPrimary}
                    onMouseEnter={(e) => (e.currentTarget.style.background = BRAND.carbon)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = BRAND.tierra)}
                  >
                    Sí, generar mi Prompt <span aria-hidden="true">{ICON.sparkles}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div ref={scrollRef} style={{ maxWidth: 860, margin: "0 auto" }}>
            <StepHeaderIcon />

            <div style={{ textAlign: "center", marginBottom: 14 }}>
              <h3 style={{ ...styles.h3, marginBottom: 8 }}>Tu prompt personalizado</h3>
              <p style={{ margin: 0, maxWidth: 760, marginInline: "auto", lineHeight: 1.55 }}>
                Este texto{" "}
                <strong style={{ color: BRAND.tierra, fontFamily: "'DM Sans', Inter, system-ui, sans-serif" }}>
                  no es tu itinerario
                </strong>
                . Es el prompt que vas a pegar en una IA para que te lo construya.
                <br />
                <span style={{ opacity: 0.8 }}>
                  Consejo: genera el itinerario en <strong>ChatGPT</strong> y en <strong>Gemini</strong>, compara y quédate con lo mejor.
                </span>
              </p>
            </div>

            <div style={{ ...styles.card, padding: 18 }}>
              <div style={styles.infoBox}>
                <Icon name="shield" />
                <p style={{ margin: 0, lineHeight: 1.55 }}>
                  <strong style={{ color: BRAND.tierra, fontFamily: "'DM Sans', Inter, system-ui, sans-serif" }}>
                    Privacidad:
                  </strong>{" "}
                  aquí no se guarda nada. Si cierras esta pestaña, se pierde el contenido. Si quieres conservarlo, copia el prompt.
                </p>
              </div>

              <div style={{ marginTop: 14 }}>
                <textarea readOnly value={generatedPrompt} style={styles.monoArea} />
              </div>

              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 12 }}>
                <button
                  onClick={copyToClipboard}
                  style={{
                    ...styles.buttonPrimary,
                    background: copied ? BRAND.ocre : BRAND.tierra,
                    transform: copied ? "scale(1.01)" : "none",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = copied ? BRAND.ocre : BRAND.carbon)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = copied ? BRAND.ocre : BRAND.tierra)}
                >
                  <span aria-hidden="true">{copied ? ICON.check : ICON.copy}</span>
                  {copied ? "¡Copiado!" : "Copiar prompt"}
                </button>

                <button onClick={openChatGPT} style={styles.buttonSecondary}>
                  Abrir ChatGPT <span aria-hidden="true">{ICON.link}</span>
                </button>

                <button onClick={openGemini} style={styles.buttonSecondary}>
                  Abrir Gemini <span aria-hidden="true">{ICON.link}</span>
                </button>
              </div>

              <div style={{ marginTop: 10, textAlign: "center", ...styles.smallNote }}>
                Nota: por límites de cada plataforma, no siempre se puede “autoponer” el prompt al abrir la web.
                Por eso aquí tienes <strong>copiar</strong> + <strong>abrir</strong> en 2 clics.
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 18, marginTop: 16, flexWrap: "wrap" }}>
              <button style={styles.buttonGhost} onClick={() => setStep(4)}>
                Volver atrás
              </button>
              <button style={styles.buttonGhost} onClick={restart}>
                <span aria-hidden="true">{ICON.refresh}</span> Diseñar otro camino
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const progressPct = step > 0 && step < 5 ? (step / 4) * 100 : 0;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {step > 0 && step < 5 && (
          <div style={styles.progressWrap}>
            <div style={styles.progressBar(progressPct)} />
          </div>
        )}
        {renderStep()}
      </div>
    </div>
  );
}

// Montaje (esto es lo que te faltará si copias a Pages sin bundler)
const rootEl = document.getElementById("root");
const root = ReactDOM.createRoot(rootEl);
root.render(<App />);
