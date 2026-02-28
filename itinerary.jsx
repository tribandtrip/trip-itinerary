import React, { useState, useEffect, useRef } from 'react';
import { Plane, Calendar, Users, Map, Clock, Home, CheckCircle2, Battery, Wallet, Heart, Sparkles, ArrowRight, RefreshCcw } from 'lucide-react';

const INITIAL_DATA = {
  destino: '',
  fechas: '',
  acompanantes: 'Solo',
  estructura: 'Base única',
  vuelos: '',
  alojamiento: '',
  reservas: '',
  energia: 'Media',
  tipoViaje: 'Cultural/Naturaleza',
  integracion: 'Sí, quiero conectar',
  presupuesto: '',
  estadoEmocional: 'Necesito desconectar'
};

export default function App() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(INITIAL_DATA);
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [step]);

  const updateData = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const generateItinerary = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setStep(5); // Final result step
    }, 2500);
  };

  const restart = () => {
    setData(INITIAL_DATA);
    setStep(0);
  };

  const renderStep = () => {
    switch (step) {
      case 0: // INTRODUCCIÓN
        return (
          <div className="animate-fadeIn space-y-6 max-w-2xl mx-auto text-center mt-10" ref={scrollRef}>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-stone-800 text-stone-50 rounded-full flex items-center justify-center">
                <Sparkles size={40} />
              </div>
            </div>
            <h1 className="text-4xl font-light text-stone-800 tracking-tight">MÁS QUE UN VIAJE</h1>
            <h2 className="text-xl text-stone-600 font-medium tracking-widest uppercase mb-8">Diseña tu camino</h2>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 text-left space-y-4">
              <p className="text-lg text-stone-700 leading-relaxed">
                Vamos a diseñar tu viaje de forma <strong>consciente</strong>.
                No vamos a hacer una lista turística. Vamos a crear algo que encaje contigo.
              </p>
              <p className="text-lg text-stone-700 leading-relaxed">
                Te haré algunas preguntas rápidas. Respóndelas con naturalidad.
              </p>
              <div className="pt-6 flex justify-center">
                <button 
                  onClick={handleNext}
                  className="bg-stone-800 text-stone-50 px-8 py-3 rounded-full flex items-center gap-2 hover:bg-stone-700 transition-colors"
                >
                  Empezar <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        );

      case 1: // BLOQUE 1
        return (
          <div className="animate-fadeIn max-w-2xl mx-auto space-y-8" ref={scrollRef}>
            <h3 className="text-2xl font-light text-stone-800">Lo básico de tu camino</h3>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 space-y-6">
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-stone-700 font-medium"><Map size={18} /> ¿Cuál es tu destino?</label>
                <input 
                  type="text" 
                  value={data.destino} 
                  onChange={(e) => updateData('destino', e.target.value)}
                  placeholder="Ej: Kioto, Japón" 
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-400 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-stone-700 font-medium"><Calendar size={18} /> ¿En qué fechas viajas?</label>
                <input 
                  type="text" 
                  value={data.fechas} 
                  onChange={(e) => updateData('fechas', e.target.value)}
                  placeholder="Ej: 15 al 30 de Octubre" 
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-400 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-stone-700 font-medium"><Users size={18} /> ¿Viajas solo o acompañado?</label>
                <select value={data.acompanantes} onChange={(e) => updateData('acompanantes', e.target.value)} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none">
                  <option>Solo</option>
                  <option>En pareja</option>
                  <option>Con amigos</option>
                  <option>En familia</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-stone-700 font-medium"><Plane size={18} /> Estructura del viaje</label>
                <select value={data.estructura} onChange={(e) => updateData('estructura', e.target.value)} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none">
                  <option>Base única (desde donde me muevo)</option>
                  <option>Ruta definida (varias paradas marcadas)</option>
                  <option>Ruta abierta (fluyendo sobre la marcha)</option>
                </select>
              </div>

            </div>
            <div className="flex justify-between">
              <button onClick={handleBack} className="text-stone-500 hover:text-stone-800 px-4 py-2">Atrás</button>
              <button onClick={handleNext} disabled={!data.destino} className="bg-stone-800 text-stone-50 px-8 py-3 rounded-full flex items-center gap-2 hover:bg-stone-700 transition-colors disabled:opacity-50">
                Siguiente <ArrowRight size={18} />
              </button>
            </div>
          </div>
        );

      case 2: // BLOQUE 2
        return (
          <div className="animate-fadeIn max-w-2xl mx-auto space-y-8" ref={scrollRef}>
            <h3 className="text-2xl font-light text-stone-800">Tus anclajes</h3>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 space-y-6">
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-stone-700 font-medium"><Clock size={18} /> ¿Tienes vuelos u horarios ya definidos?</label>
                <textarea 
                  value={data.vuelos} 
                  onChange={(e) => updateData('vuelos', e.target.value)}
                  placeholder="Ej: Llego el 15 a las 10:00 AM, salgo el 30 a las 20:00" 
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-400 outline-none h-24 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-stone-700 font-medium"><Home size={18} /> ¿Dónde te alojas o en qué zona?</label>
                <input 
                  type="text" 
                  value={data.alojamiento} 
                  onChange={(e) => updateData('alojamiento', e.target.value)}
                  placeholder="Ej: Barrio central, aún por definir..." 
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-400 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-stone-700 font-medium"><CheckCircle2 size={18} /> ¿Hay reservas ya cerradas sí o sí?</label>
                <textarea 
                  value={data.reservas} 
                  onChange={(e) => updateData('reservas', e.target.value)}
                  placeholder="Ej: Entrada al museo el día 18..." 
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-400 outline-none h-24 resize-none"
                />
              </div>

            </div>
            <div className="flex justify-between">
              <button onClick={handleBack} className="text-stone-500 hover:text-stone-800 px-4 py-2">Atrás</button>
              <button onClick={handleNext} className="bg-stone-800 text-stone-50 px-8 py-3 rounded-full flex items-center gap-2 hover:bg-stone-700 transition-colors">
                Siguiente <ArrowRight size={18} />
              </button>
            </div>
          </div>
        );

      case 3: // BLOQUE 3
        return (
          <div className="animate-fadeIn max-w-2xl mx-auto space-y-8" ref={scrollRef}>
            <h3 className="text-2xl font-light text-stone-800">Tu energía e intención</h3>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 space-y-6">
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-stone-700 font-medium"><Battery size={18} /> Nivel de energía deseado</label>
                <div className="flex gap-4">
                  {['Bajo (Relax)', 'Medio (Equilibrado)', 'Alto (Exploración)'].map(lvl => (
                    <button 
                      key={lvl}
                      onClick={() => updateData('energia', lvl)}
                      className={`flex-1 py-3 rounded-xl border transition-all ${data.energia === lvl ? 'bg-stone-800 text-stone-50 border-stone-800' : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'}`}
                    >
                      {lvl.split(' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-stone-700 font-medium"><Wallet size={18} /> Presupuesto aproximado en destino (diario)</label>
                <input 
                  type="text" 
                  value={data.presupuesto} 
                  onChange={(e) => updateData('presupuesto', e.target.value)}
                  placeholder="Ej: 50€/día, Mochilero, Lujo..." 
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-400 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-stone-700 font-medium"><Users size={18} /> ¿Quieres integración local real?</label>
                <select value={data.integracion} onChange={(e) => updateData('integracion', e.target.value)} className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none">
                  <option>Sí, quiero conectar con locales y su vida diaria</option>
                  <option>A medias, turismo con toques locales</option>
                  <option>No, prefiero mantenerme a mi aire</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-stone-700 font-medium"><Heart size={18} /> ¿Cómo estás emocionalmente antes de este viaje?</label>
                <textarea 
                  value={data.estadoEmocional} 
                  onChange={(e) => updateData('estadoEmocional', e.target.value)}
                  placeholder="Ej: Agotado por el trabajo, necesito paz... o eufórico con ganas de aventura." 
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-400 outline-none h-24 resize-none"
                />
              </div>

            </div>
            <div className="flex justify-between">
              <button onClick={handleBack} className="text-stone-500 hover:text-stone-800 px-4 py-2">Atrás</button>
              <button onClick={handleNext} className="bg-stone-800 text-stone-50 px-8 py-3 rounded-full flex items-center gap-2 hover:bg-stone-700 transition-colors">
                Revisar <ArrowRight size={18} />
              </button>
            </div>
          </div>
        );

      case 4: // CONFIRMACIÓN
        return (
          <div className="animate-fadeIn max-w-2xl mx-auto space-y-8" ref={scrollRef}>
            <h3 className="text-2xl font-light text-stone-800 text-center">He entendido que...</h3>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 space-y-4">
              <ul className="space-y-4 text-stone-700">
                <li className="flex gap-3"><Map className="text-stone-400" /> <strong>Destino:</strong> {data.destino} ({data.fechas})</li>
                <li className="flex gap-3"><Users className="text-stone-400" /> <strong>Viajas:</strong> {data.acompanantes} - {data.estructura}</li>
                <li className="flex gap-3"><Battery className="text-stone-400" /> <strong>Energía:</strong> {data.energia} | Emoción: {data.estadoEmocional}</li>
                <li className="flex gap-3"><Wallet className="text-stone-400" /> <strong>Presupuesto:</strong> {data.presupuesto || 'No definido'}</li>
                <li className="flex gap-3"><CheckCircle2 className="text-stone-400" /> <strong>Compromisos fijos:</strong> {data.reservas ? 'Sí' : 'Ninguno marcado'}</li>
              </ul>
              <div className="pt-6 mt-6 border-t border-stone-100 text-center">
                <p className="text-lg font-medium text-stone-800 mb-6">¿Es correcto?</p>
                <div className="flex justify-center gap-4">
                  <button onClick={() => setStep(1)} className="px-6 py-3 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors">
                    Corregir algo
                  </button>
                  <button 
                    onClick={generateItinerary} 
                    disabled={isGenerating}
                    className="bg-stone-800 text-stone-50 px-8 py-3 rounded-full flex items-center gap-2 hover:bg-stone-700 transition-colors disabled:opacity-70"
                  >
                    {isGenerating ? 'Diseñando camino...' : 'Sí, generar mi viaje'} <Sparkles size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 5: // RESULTADO / ITINERARIO
        return (
          <div className="animate-fadeIn max-w-4xl mx-auto space-y-8 pb-12" ref={scrollRef}>
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-light text-stone-800">Tu Camino en {data.destino}</h2>
              <p className="text-stone-500 italic max-w-xl mx-auto">
                "Un viaje {data.energia.toLowerCase()} diseñado para tu necesidad de: {data.estadoEmocional.substring(0,30)}..."
              </p>
            </div>

            {/* Enfoque General */}
            <section className="bg-stone-800 text-stone-50 p-8 rounded-3xl shadow-lg">
              <h3 className="text-xl font-medium mb-4 flex items-center gap-2"><Heart size={20} /> Enfoque del Viaje</h3>
              <p className="leading-relaxed text-stone-300">
                Este no es un viaje para tachar lugares de una lista. Al viajar {data.acompanantes.toLowerCase()} con una estructura de {data.estructura.toLowerCase()}, 
                el objetivo es abrazar el ritmo del lugar. Hemos equilibrado momentos de descubrimiento con espacios de pausa obligatoria para honrar tu estado actual.
              </p>
            </section>

            {/* Días Ejemplo */}
            <section className="space-y-6">
              <h3 className="text-2xl font-light text-stone-800 border-b border-stone-200 pb-2">Itinerario Consciente (Ejemplo Día 1)</h3>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold text-lg text-stone-800">Llegada y Aterrizaje</h4>
                  <span className="bg-stone-100 text-stone-600 px-3 py-1 rounded-full text-sm">Medio día</span>
                </div>
                
                <div className="space-y-4 text-stone-700">
                  <div className="flex gap-3">
                    <div className="w-1 bg-green-500 rounded-full"></div>
                    <div>
                      <strong className="block text-stone-900">Plan Base Equilibrado:</strong>
                      Check-in tranquilo. Caminata sin rumbo fijo por los alrededores de tu alojamiento para situarte.
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="w-1 bg-stone-300 rounded-full"></div>
                    <div>
                      <strong className="block text-stone-900">Espacio de calma:</strong>
                      1 hora en una cafetería local cercana. Solo observar, sin planificar el resto del día.
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-1 bg-orange-300 rounded-full"></div>
                    <div>
                      <strong className="block text-stone-900">Plan Alternativo (Lluvia/Cansancio extremo):</strong>
                      Quedarse en el alojamiento con provisiones locales, descansar y recuperar energía del viaje.
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-stone-100 flex gap-4 text-sm text-stone-500">
                    <span className="flex items-center gap-1"><Wallet size={14} /> Gasto est.: Bajo</span>
                    <span className="flex items-center gap-1 text-amber-600"><Clock size={14} /> Sin reservas</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Estimación Económica & Checklist */}
            <div className="grid md:grid-cols-2 gap-6">
              <section className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                <h3 className="font-semibold text-stone-800 mb-4 flex items-center gap-2"><Wallet size={18} /> Estimación Diaria</h3>
                <ul className="space-y-2 text-stone-600">
                  <li className="flex justify-between"><span>Comida:</span> <span>30%</span></li>
                  <li className="flex justify-between"><span>Transporte local:</span> <span>15%</span></li>
                  <li className="flex justify-between"><span>Actividades:</span> <span>40%</span></li>
                  <li className="flex justify-between"><span>Margen/Imprevistos:</span> <span>15%</span></li>
                  <li className="pt-2 mt-2 border-t border-stone-100 font-medium text-stone-800 flex justify-between">
                    <span>Target Total:</span> <span>{data.presupuesto || 'A calcular'}</span>
                  </li>
                </ul>
              </section>

              <section className="bg-stone-50 p-6 rounded-2xl shadow-sm border border-stone-200">
                <h3 className="font-semibold text-stone-800 mb-4 flex items-center gap-2"><CheckCircle2 size={18} /> Checklist Previo</h3>
                <ul className="space-y-2 text-stone-600 text-sm">
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full border border-stone-400"></div> Seguro médico activo</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full border border-stone-400"></div> Copias digitales doc.</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full border border-stone-400"></div> Solución SIM / Datos</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full border border-stone-400"></div> Botiquín personal</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full border border-stone-400"></div> Ruta aeropuerto-hotel guardada offline</li>
                </ul>
              </section>
            </div>

            {/* Cierre Humano */}
            <section className="text-center mt-12 bg-white p-8 rounded-3xl border border-stone-100">
              <Sparkles className="mx-auto text-stone-300 mb-4" size={32} />
              <p className="text-lg text-stone-700 italic mb-2">Este plan es una guía. No es una obligación.</p>
              <p className="text-stone-600 mb-6">Si algo no vibra contigo una vez allí, cámbialo. Permítete sorprenderte.</p>
              <p className="font-semibold text-stone-800 uppercase tracking-widest text-sm">Más que un viaje, es el camino.</p>
              
              <button onClick={restart} className="mt-8 flex items-center justify-center gap-2 mx-auto text-stone-500 hover:text-stone-800 transition-colors">
                <RefreshCcw size={16} /> Diseñar otro camino
              </button>
            </section>

          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] font-sans selection:bg-stone-200 p-4 md:p-8">
      {/* Progress Bar */}
      {step > 0 && step < 5 && (
        <div className="max-w-2xl mx-auto mb-8 h-1 bg-stone-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-stone-800 transition-all duration-500 ease-out" 
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      )}
      
      {renderStep()}
    </div>
  );
}
