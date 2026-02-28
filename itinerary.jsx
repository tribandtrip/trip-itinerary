import React, { useState, useEffect, useRef } from "react";
import {
  Plane,
  Calendar,
  Users,
  Map,
  Clock,
  Home,
  CheckCircle2,
  Battery,
  Wallet,
  Heart,
  Sparkles,
  ArrowRight,
  RefreshCcw,
  Copy,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

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

// Tierra profunda: #54614A
// Arena clara: #F0EBE1
// Carbón suave: #3C3C3B
// Ocre Camino: #C5A869
// Blanco: #FFFFFF

export default function App() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(INITIAL_DATA);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [step]);

  const updateData = (field, value) => setData((prev) => ({ ...prev, [field]: value }));

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => Math.max(0, prev - 1));

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

    const prompt = `INICIO DEL PROMPT
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
	•	Si algo es incierto, da rangos y di que hay que verificar.
	•	Evita listas interminables: prioriza calidad y coherencia.
FIN DEL PROMPT`;

    return prompt;
  };

  const generatePromptAndGo = () => {
    const prompt = buildPrompt();
    setGeneratedPrompt(prompt);
    setStep(5);
  };

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

  const StepHeaderIcon = () => (
    <div className="flex justify-center mb-8">
      <img
        src="icon-tblanco-bgverde.jpg"
        alt="TRIB & TRIP"
        className="w-14 h-14 rounded-xl shadow-sm object-cover"
      />
    </div>
  );

  const canProceedStep1 = Boolean(data.destino?.trim()) && Boolean(data.fechas?.trim());

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="animate-fadeIn space-y-8 max-w-2xl mx-auto text-center mt-6" ref={scrollRef}>
            <div className="flex justify-center mb-4">
              <div className="h-40 md:h-48 flex flex-col items-center justify-center">
                <h1 className="text-6xl md:text-8xl font-brand font-black text-[#54614A] tracking-tighter mb-2">
                  TRIB & TRIP
                </h1>
                <h2 className="text-xl md:text-2xl font-body font-medium text-[#54614A] tracking-widest uppercase">
                  Más que un viaje
                </h2>
              </div>
            </div>

            <div className="bg-[#FFFFFF] p-8 md:p-10 rounded-3xl shadow-sm border border-[#F0EBE1] text-left space-y-6">
              <div className="flex items-start gap-3">
                <Sparkles className="text-[#C5A869] mt-0.5" size={22} />
                <p className="text-lg text-[#3C3C3B] font-body leading-relaxed">
                  Aquí no vas a “montar una ruta perfecta”. Vas a diseñar un viaje que <strong className="font-brand font-medium text-[#54614A]">encaje contigo</strong>:
                  energía, calma, barrios, y vida real.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Map className="text-[#C5A869] mt-0.5" size={22} />
                <p className="text-lg text-[#3C3C3B] font-body leading-relaxed">
                  Te haré unas preguntas rápidas y, al final, la app creará un <strong className="font-brand font-medium text-[#54614A]">prompt TRIB & TRIP</strong> listo para pegar en ChatGPT o Gemini,
                  para que esa IA te devuelva un itinerario realista y flexible.
                </p>
              </div>

              <div className="bg-[#F0EBE1]/40 border border-[#F0EBE1] rounded-2xl p-5 flex gap-3">
                <ShieldCheck className="text-[#54614A] shrink-0 mt-0.5" size={20} />
                <p className="text-[#3C3C3B] font-body leading-relaxed">
                  <strong className="font-brand font-medium text-[#54614A]">Privacidad:</strong> esta mini-app no guarda nada. Tus respuestas se quedan en tu navegador.
                  Solo genera texto (el prompt) para que tú decidas si lo copias y lo usas.
                </p>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={handleNext}
                  className="bg-[#54614A] text-white font-brand font-medium px-8 py-4 rounded-full flex items-center gap-3 hover:bg-[#3C3C3B] transition-colors shadow-md"
                >
                  Empezar tu diseño <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="animate-fadeIn max-w-2xl mx-auto space-y-6" ref={scrollRef}>
            <StepHeaderIcon />
            <h3 className="text-3xl font-brand font-black text-[#54614A] text-center">Lo básico de tu camino</h3>

            <div className="bg-[#FFFFFF] p-6 md:p-8 rounded-3xl shadow-sm border border-[#F0EBE1] space-y-6">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[#3C3C3B] font-brand font-medium text-lg">
                  <Map size={20} className="text-[#54614A]" /> ¿Cuál es tu destino?
                </label>
                <input
                  type="text"
                  value={data.destino}
                  onChange={(e) => updateData("destino", e.target.value)}
                  placeholder="Ej: Boston, Estados Unidos"
                  className="w-full p-4 bg-[#F0EBE1]/30 font-body text-[#3C3C3B] border border-[#F0EBE1] rounded-2xl focus:ring-2 focus:ring-[#C5A869] outline-none transition-all"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[#3C3C3B] font-brand font-medium text-lg">
                  <Calendar size={20} className="text-[#54614A]" /> ¿En qué fechas viajas?
                </label>
                <input
                  type="text"
                  value={data.fechas}
                  onChange={(e) => updateData("fechas", e.target.value)}
                  placeholder="Ej: 14 al 19 de Marzo"
                  className="w-full p-4 bg-[#F0EBE1]/30 font-body text-[#3C3C3B] border border-[#F0EBE1] rounded-2xl focus:ring-2 focus:ring-[#C5A869] outline-none transition-all"
                />
                {(!data.destino?.trim() || !data.fechas?.trim()) && (
                  <p className="text-sm font-body text-[#3C3C3B]/70">
                    * Para seguir, necesitamos <strong>destino</strong> y <strong>fechas</strong>.
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[#3C3C3B] font-brand font-medium text-lg">
                  <Users size={20} className="text-[#54614A]" /> ¿Viajas solo o acompañado?
                </label>
                <select
                  value={data.acompanantes}
                  onChange={(e) => updateData("acompanantes", e.target.value)}
                  className="w-full p-4 bg-[#F0EBE1]/30 font-body text-[#3C3C3B] border border-[#F0EBE1] rounded-2xl outline-none focus:ring-2 focus:ring-[#C5A869]"
                >
                  <option>Solo</option>
                  <option>En pareja</option>
                  <option>Con amigos</option>
                  <option>En familia</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[#3C3C3B] font-brand font-medium text-lg">
                  <Plane size={20} className="text-[#54614A]" /> Estructura del viaje
                </label>
                <select
                  value={data.estructura}
                  onChange={(e) => updateData("estructura", e.target.value)}
                  className="w-full p-4 bg-[#F0EBE1]/30 font-body text-[#3C3C3B] border border-[#F0EBE1] rounded-2xl outline-none focus:ring-2 focus:ring-[#C5A869]"
                >
                  <option>Base única (desde donde me muevo)</option>
                  <option>Ruta definida (varias paradas marcadas)</option>
                  <option>Ruta abierta (fluyendo sobre la marcha)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={handleBack}
                className="text-[#3C3C3B] font-brand font-medium hover:text-[#54614A] px-4 py-2 transition-colors"
              >
                Atrás
              </button>

              <button
                onClick={handleNext}
                disabled={!canProceedStep1}
                className="bg-[#54614A] text-white font-brand font-medium px-8 py-3.5 rounded-full flex items-center gap-2 hover:bg-[#3C3C3B] transition-colors disabled:opacity-50 disabled:hover:bg-[#54614A]"
              >
                Siguiente paso <ArrowRight size={18} />
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="animate-fadeIn max-w-2xl mx-auto space-y-6" ref={scrollRef}>
            <StepHeaderIcon />
            <h3 className="text-3xl font-brand font-black text-[#54614A] text-center">Tus anclajes fijos</h3>

            <div className="bg-[#FFFFFF] p-6 md:p-8 rounded-3xl shadow-sm border border-[#F0EBE1] space-y-6">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[#3C3C3B] font-brand font-medium text-lg">
                  <Clock size={20} className="text-[#54614A]" /> Vuelos u horarios ya definidos
                </label>
                <textarea
                  value={data.vuelos}
                  onChange={(e) => updateData("vuelos", e.target.value)}
                  placeholder="Ej: Llego el 14 a las 10:00, regreso el 19 a las 20:00"
                  className="w-full p-4 bg-[#F0EBE1]/30 font-body text-[#3C3C3B] border border-[#F0EBE1] rounded-2xl focus:ring-2 focus:ring-[#C5A869] outline-none h-24 resize-none transition-all"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[#3C3C3B] font-brand font-medium text-lg">
                  <Home size={20} className="text-[#54614A]" /> Alojamiento o zona prevista
                </label>
                <input
                  type="text"
                  value={data.alojamiento}
                  onChange={(e) => updateData("alojamiento", e.target.value)}
                  placeholder="Ej: Centro / Back Bay / hostel..."
                  className="w-full p-4 bg-[#F0EBE1]/30 font-body text-[#3C3C3B] border border-[#F0EBE1] rounded-2xl focus:ring-2 focus:ring-[#C5A869] outline-none transition-all"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[#3C3C3B] font-brand font-medium text-lg">
                  <CheckCircle2 size={20} className="text-[#54614A]" /> Reservas cerradas sí o sí
                </label>
                <textarea
                  value={data.reservas}
                  onChange={(e) => updateData("reservas", e.target.value)}
                  placeholder="Ej: Partido / museo / tour..."
                  className="w-full p-4 bg-[#F0EBE1]/30 font-body text-[#3C3C3B] border border-[#F0EBE1] rounded-2xl focus:ring-2 focus:ring-[#C5A869] outline-none h-24 resize-none transition-all"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={handleBack}
                className="text-[#3C3C3B] font-brand font-medium hover:text-[#54614A] px-4 py-2 transition-colors"
              >
                Atrás
              </button>
              <button
                onClick={handleNext}
                className="bg-[#54614A] text-white font-brand font-medium px-8 py-3.5 rounded-full flex items-center gap-2 hover:bg-[#3C3C3B] transition-colors"
              >
                Siguiente paso <ArrowRight size={18} />
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="animate-fadeIn max-w-2xl mx-auto space-y-6" ref={scrollRef}>
            <StepHeaderIcon />
            <h3 className="text-3xl font-brand font-black text-[#54614A] text-center">Tu energía e intención</h3>

            <div className="bg-[#FFFFFF] p-6 md:p-8 rounded-3xl shadow-sm border border-[#F0EBE1] space-y-6">
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-[#3C3C3B] font-brand font-medium text-lg">
                  <Battery size={20} className="text-[#54614A]" /> Nivel de energía deseado
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  {["Bajo (Relax)", "Medio (Equilibrado)", "Alto (Exploración)"].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => updateData("energia", lvl)}
                      className={`flex-1 py-3.5 rounded-2xl border font-brand font-medium transition-all ${
                        data.energia === lvl
                          ? "bg-[#54614A] text-white border-[#54614A] shadow-md"
                          : "bg-[#F0EBE1]/30 border-[#F0EBE1] text-[#3C3C3B] hover:bg-[#F0EBE1]"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[#3C3C3B] font-brand font-medium text-lg">
                  <Wallet size={20} className="text-[#54614A]" /> Presupuesto diario (en destino)
                </label>
                <input
                  type="text"
                  value={data.presupuesto}
                  onChange={(e) => updateData("presupuesto", e.target.value)}
                  placeholder="Ej: 50€/día, mochilero, medio..."
                  className="w-full p-4 bg-[#F0EBE1]/30 font-body text-[#3C3C3B] border border-[#F0EBE1] rounded-2xl focus:ring-2 focus:ring-[#C5A869] outline-none transition-all"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[#3C3C3B] font-brand font-medium text-lg">
                  <Users size={20} className="text-[#54614A]" /> ¿Quieres integración local?
                </label>
                <select
                  value={data.integracion}
                  onChange={(e) => updateData("integracion", e.target.value)}
                  className="w-full p-4 bg-[#F0EBE1]/30 font-body text-[#3C3C3B] border border-[#F0EBE1] rounded-2xl outline-none focus:ring-2 focus:ring-[#C5A869]"
                >
                  <option>Sí, quiero conectar con locales y su vida diaria</option>
                  <option>A medias, turismo con toques locales</option>
                  <option>No, prefiero mantenerme a mi aire</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[#3C3C3B] font-brand font-medium text-lg">
                  <Heart size={20} className="text-[#54614A]" /> ¿Cómo estás emocionalmente ahora?
                </label>
                <textarea
                  value={data.estadoEmocional}
                  onChange={(e) => updateData("estadoEmocional", e.target.value)}
                  placeholder="Ej: agotado por el trabajo, necesito paz..."
                  className="w-full p-4 bg-[#F0EBE1]/30 font-body text-[#3C3C3B] border border-[#F0EBE1] rounded-2xl focus:ring-2 focus:ring-[#C5A869] outline-none h-24 resize-none transition-all"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={handleBack}
                className="text-[#3C3C3B] font-brand font-medium hover:text-[#54614A] px-4 py-2 transition-colors"
              >
                Atrás
              </button>
              <button
                onClick={handleNext}
                className="bg-[#54614A] text-white font-brand font-medium px-8 py-3.5 rounded-full flex items-center gap-2 hover:bg-[#3C3C3B] transition-colors"
              >
                Revisar resumen <ArrowRight size={18} />
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="animate-fadeIn max-w-2xl mx-auto space-y-6" ref={scrollRef}>
            <StepHeaderIcon />
            <h3 className="text-3xl font-brand font-black text-[#54614A] text-center">Así entendemos tu viaje</h3>

            <div className="bg-[#FFFFFF] p-8 rounded-3xl shadow-sm border border-[#F0EBE1] space-y-6">
              <ul className="space-y-5 text-[#3C3C3B] font-body">
                <li className="flex gap-4 items-start">
                  <Map className="text-[#C5A869] shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-brand font-medium text-[#54614A]">Destino y fechas:</strong>
                    <br />
                    {data.destino} ({data.fechas})
                  </div>
                </li>

                <li className="flex gap-4 items-start">
                  <Users className="text-[#C5A869] shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-brand font-medium text-[#54614A]">Compañía y formato:</strong>
                    <br />
                    {data.acompanantes} — {data.estructura}
                  </div>
                </li>

                {data.vuelos?.trim() && (
                  <li className="flex gap-4 items-start">
                    <Clock className="text-[#C5A869] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-brand font-medium text-[#54614A]">Vuelos / horarios:</strong>
                      <br />
                      {data.vuelos}
                    </div>
                  </li>
                )}

                {data.alojamiento?.trim() && (
                  <li className="flex gap-4 items-start">
                    <Home className="text-[#C5A869] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-brand font-medium text-[#54614A]">Alojamiento / zona:</strong>
                      <br />
                      {data.alojamiento}
                    </div>
                  </li>
                )}

                {data.reservas?.trim() && (
                  <li className="flex gap-4 items-start">
                    <CheckCircle2 className="text-[#C5A869] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-brand font-medium text-[#54614A]">Anclajes fijos:</strong>
                      <br />
                      {data.reservas}
                    </div>
                  </li>
                )}

                <li className="flex gap-4 items-start">
                  <Battery className="text-[#C5A869] shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-brand font-medium text-[#54614A]">Energía y estado:</strong>
                    <br />
                    {data.energia}
                    {data.estadoEmocional?.trim() ? ` — ${data.estadoEmocional}` : ""}
                  </div>
                </li>

                <li className="flex gap-4 items-start">
                  <Wallet className="text-[#C5A869] shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-brand font-medium text-[#54614A]">Presupuesto e integración:</strong>
                    <br />
                    {data.presupuesto?.trim() ? data.presupuesto : "No definido"} — {data.integracion}
                  </div>
                </li>
              </ul>

              <div className="pt-8 mt-4 border-t border-[#F0EBE1] text-center space-y-5">
                <p className="text-xl font-brand font-medium text-[#3C3C3B]">
                  Perfecto. Ahora voy a generar tu <strong className="text-[#54614A]">prompt TRIB & TRIP</strong>.
                </p>
                <p className="text-[#3C3C3B] font-body leading-relaxed">
                  Ese texto es lo que pegarás en ChatGPT o Gemini para que te devuelvan un itinerario
                  realista, por zonas, con calma, y con planes alternativos.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3.5 rounded-full bg-[#F0EBE1]/60 text-[#3C3C3B] font-brand font-medium hover:bg-[#F0EBE1] transition-colors"
                  >
                    Modificar datos
                  </button>

                  <button
                    onClick={generatePromptAndGo}
                    className="bg-[#54614A] text-white font-brand font-medium px-8 py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-[#3C3C3B] transition-colors shadow-md"
                  >
                    Sí, generar mi Prompt <Sparkles size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="animate-fadeIn max-w-3xl mx-auto space-y-8 pb-12" ref={scrollRef}>
            <StepHeaderIcon />

            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl font-brand font-black text-[#54614A]">Tu prompt personalizado</h2>
              <p className="text-[#3C3C3B] font-body max-w-2xl mx-auto text-lg leading-relaxed">
                Este texto <strong className="font-brand font-medium text-[#54614A]">no es tu itinerario</strong>.
                Es el prompt que vas a pegar en una IA para que te lo construya.
                <br />
                <span className="text-[#3C3C3B]/80">
                  Consejo: genera el itinerario en <strong>ChatGPT</strong> y en <strong>Gemini</strong>, compara y quédate con lo mejor de cada uno.
                </span>
              </p>
            </div>

            <div className="bg-[#FFFFFF] p-6 md:p-8 rounded-3xl shadow-lg border border-[#F0EBE1] relative space-y-6">
              <div className="bg-[#F0EBE1]/40 border border-[#F0EBE1] rounded-2xl p-5 flex gap-3">
                <ShieldCheck className="text-[#54614A] shrink-0 mt-0.5" size={20} />
                <p className="text-[#3C3C3B] font-body leading-relaxed">
                  <strong className="font-brand font-medium text-[#54614A]">Privacidad:</strong> aquí no se guarda nada.
                  Si cierras esta pestaña, se pierde el contenido. Si quieres conservarlo, copia el prompt.
                </p>
              </div>

              <textarea
                readOnly
                value={generatedPrompt}
                className="w-full h-96 p-5 bg-[#F0EBE1]/20 text-[#3C3C3B] font-mono text-sm border border-[#F0EBE1] rounded-2xl focus:outline-none resize-y"
              />

              <div className="flex flex-col md:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={copyToClipboard}
                  className={`px-7 py-3.5 rounded-full font-brand font-medium flex items-center gap-2 transition-all shadow-md ${
                    copied ? "bg-[#C5A869] text-white scale-[1.02]" : "bg-[#54614A] text-white hover:bg-[#3C3C3B]"
                  }`}
                >
                  {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                  {copied ? "¡Copiado!" : "Copiar prompt"}
                </button>

                <button
                  onClick={openChatGPT}
                  className="px-7 py-3.5 rounded-full font-brand font-medium flex items-center gap-2 border border-[#F0EBE1] bg-white text-[#3C3C3B] hover:bg-[#F0EBE1]/40 transition-colors"
                >
                  Abrir ChatGPT <ExternalLink size={18} />
                </button>

                <button
                  onClick={openGemini}
                  className="px-7 py-3.5 rounded-full font-brand font-medium flex items-center gap-2 border border-[#F0EBE1] bg-white text-[#3C3C3B] hover:bg-[#F0EBE1]/40 transition-colors"
                >
                  Abrir Gemini <ExternalLink size={18} />
                </button>
              </div>

              <div className="text-center text-sm font-body text-[#3C3C3B]/70">
                Nota: por límites de cada plataforma, no siempre se puede “autoponer” el prompt al abrir la web.
                Por eso aquí tienes <strong>copiar</strong> + <strong>abrir</strong> en 2 clics.
              </div>
            </div>

            <div className="flex justify-center gap-8 mt-8">
              <button
                onClick={() => setStep(4)}
                className="text-[#54614A] font-brand font-medium hover:text-[#3C3C3B] transition-colors"
              >
                Volver atrás
              </button>
              <button
                onClick={restart}
                className="flex items-center gap-2 text-[#54614A] font-brand font-medium hover:text-[#3C3C3B] transition-colors"
              >
                <RefreshCcw size={18} /> Diseñar otro camino
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,500;9..40,900&family=Inter:wght@400;500;600&display=swap');
        .font-brand { font-family: 'DM Sans', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 220ms ease-out; }
      `}</style>

      <div className="min-h-screen bg-[#F0EBE1] font-body selection:bg-[#C5A869] selection:text-white p-4 md:p-8">
        {step > 0 && step < 5 && (
          <div className="max-w-2xl mx-auto mb-10 h-1.5 bg-[#FFFFFF] rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-[#C5A869] transition-all duration-500 ease-out"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        )}

        {renderStep()}
      </div>
    </>
  );
}
