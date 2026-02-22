
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

interface StudioIAViewProps {
   initialContext?: string | null;
   onClearContext?: () => void;
}

export const StudioIAView: React.FC<StudioIAViewProps> = ({ initialContext, onClearContext }) => {
   const [prompt, setPrompt] = useState('');
   const [response, setResponse] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [useSearch, setUseSearch] = useState(true);
   const [sources, setSources] = useState<{ title: string, uri: string }[]>([]);

   useEffect(() => {
      if (initialContext) {
         setPrompt(initialContext);
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }
   }, [initialContext]);

   const handleGenerateContent = async () => {
      if (!prompt.trim() || isLoading) return;

      setIsLoading(true);
      setResponse('');
      setSources([]);
      if (onClearContext) onClearContext();

      try {
         const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

         const config: any = {
            systemInstruction: 'Você é o Haje Neural Studio. Um consultor de negócios de elite especializado em ShopControl9 e gestão de vanguarda. Você recebeu dados específicos da unidade do cliente. Analise-os com rigor matemático e proponha soluções de alta performance.',
            temperature: 0.7,
         };

         if (useSearch) {
            config.tools = [{ googleSearch: {} }];
         }

         const res = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
            config: config
         });

         setResponse(res.text || 'Processamento concluído sem saída de texto.');

         const chunks = res.candidates?.[0]?.groundingMetadata?.groundingChunks;
         if (chunks) {
            const extractedSources = chunks
               .filter((c: any) => c.web)
               .map((c: any) => ({ title: c.web.title, uri: c.web.uri }));
            setSources(extractedSources);
         }

      } catch (error: any) {
         console.error(error);
         setResponse(`Falha no motor neural: ${error.message}`);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="p-8 h-full flex flex-col max-w-6xl mx-auto gap-8 overflow-hidden">
         <header className="flex justify-between items-end shrink-0">
            <div>
               <h1 className="text-2xl font-display font-black tracking-widest text-slate-900 dark:text-white uppercase flex items-center gap-3">
                  <span className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                     <span className="material-icons-outlined">psychology</span>
                  </span>
                  Haje Neural Studio
               </h1>
               <p className="text-[10px] text-slate-400 uppercase font-black mt-2 tracking-[0.3em]">Advanced Generative Consulting</p>
            </div>
            <div className="flex items-center space-x-4 bg-slate-100 dark:bg-surface-dark p-2 rounded-2xl border border-slate-200 dark:border-slate-800">
               <span className="text-[10px] font-black text-slate-500 uppercase px-2">Market Search</span>
               <button
                  onClick={() => setUseSearch(!useSearch)}
                  className={`w-12 h-6 rounded-full transition-all relative ${useSearch ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}
                  aria-label={useSearch ? 'Desativar pesquisa de mercado' : 'Ativar pesquisa de mercado'}
               >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${useSearch ? 'left-7' : 'left-1'}`}></div>
               </button>
            </div>
         </header>

         <div className="flex-1 grid grid-cols-12 gap-8 overflow-hidden">
            <div className="col-span-12 lg:col-span-8 flex flex-col space-y-6 overflow-hidden">
               <section className="flex flex-col flex-1 min-h-0">
                  <div className="relative flex-1 group">
                     <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full h-full bg-white dark:bg-card-dark border-2 border-slate-200 dark:border-slate-800 rounded-[32px] p-10 text-lg focus:ring-primary focus:border-primary shadow-2xl transition-all duration-500 resize-none placeholder:text-slate-300 dark:placeholder:text-slate-700"
                        placeholder="Qual o próximo passo para sua empresa hoje?"
                     />
                     <button
                        onClick={handleGenerateContent}
                        disabled={isLoading || !prompt.trim()}
                        className="absolute bottom-6 right-6 bg-primary hover:bg-orange-600 text-white w-16 h-16 rounded-[24px] transition-all shadow-2xl shadow-primary/40 flex items-center justify-center disabled:opacity-50 group-active:scale-95"
                     >
                        {isLoading ? (
                           <span className="material-icons-round animate-spin text-3xl">sync</span>
                        ) : (
                           <span className="material-icons-round text-3xl">auto_awesome</span>
                        )}
                     </button>
                  </div>
               </section>

               {response && (
                  <section className="bg-slate-900 text-slate-100 p-10 rounded-[32px] overflow-auto max-h-[400px] shadow-2xl border border-white/5 animate-slideUp">
                     <div className="prose prose-invert max-w-none text-lg font-medium leading-relaxed">
                        {response}
                     </div>
                     {sources.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-white/10">
                           <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">Fontes de Grounding (Google Search)</p>
                           <div className="flex flex-wrap gap-2">
                              {sources.map((s, i) => (
                                 <a key={i} href={s.uri} target="_blank" rel="noreferrer" className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors">
                                    {s.title}
                                 </a>
                              ))}
                           </div>
                        </div>
                     )}
                  </section>
               )}
            </div>

            <div className="col-span-12 lg:col-span-4 space-y-6">
               <div className="bg-gradient-to-br from-primary to-orange-600 p-8 rounded-[32px] text-white shadow-2xl relative overflow-hidden group">
                  <div className="relative z-10">
                     <h3 className="text-lg font-black uppercase tracking-tight mb-4">Haje Neural Cloud</h3>
                     <p className="text-sm opacity-90 leading-relaxed italic">
                        "Utilize o poder de processamento paralelo da Gemini 3 para analisar cenários complexos em segundos."
                     </p>
                  </div>
                  <span className="material-icons-round absolute -bottom-4 -right-4 text-9xl opacity-10 group-hover:scale-110 transition-transform">hub</span>
               </div>

               <div className="bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-800 p-8 rounded-[32px] shadow-sm">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Sugestões de Fluxo</h4>
                  <div className="space-y-3">
                     {[
                        'Analise o mercado de Varejo hoje em SP',
                        'Plano de contenção de Churn via IA',
                        'Roteiro de treinamento para CEOs',
                     ].map((t, i) => (
                        <button
                           key={i}
                           onClick={() => setPrompt(t)}
                           className="w-full text-left p-4 rounded-2xl bg-slate-50 dark:bg-surface-dark border border-slate-100 dark:border-slate-800 hover:border-primary transition text-xs font-bold uppercase tracking-tight"
                        >
                           {t}
                        </button>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
