
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from '@google/genai';

// Utilitários de codificação/decodificação PCM conforme diretrizes
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const LiveConsultancyView: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());

  const startSession = async () => {
    setIsConnecting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.0-flash-exp',
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);

            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);

            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob: Blob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };

              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
              setTranscript(prev => [...prev, `AI: ${message.serverContent!.outputTranscription!.text}`].slice(-5));
            }

            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              const ctx = audioContextRef.current!;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);

              const buffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => {
            setIsActive(false);
            setIsConnecting(false);
          },
          onerror: (e) => {
            console.error("Live Error:", e);
            setIsActive(false);
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } }
          },
          systemInstruction: 'Você é o Oráculo Haje. Um consultor de elite, direto, brilhante e altamente motivador. Você fala com empresários de sucesso. Seja conciso e impactante.',
          outputAudioTranscription: {}
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (error) {
      console.error(error);
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
    }
    setIsActive(false);
  };

  return (
    <div className="p-8 h-full flex flex-col items-center justify-center max-w-4xl mx-auto">
      <div className="w-full text-center mb-12">
        <h2 className="text-3xl font-display font-black dark:text-white uppercase tracking-tighter mb-4">
          Haje <span className="text-primary">Live Oracle</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Conecte-se instantaneamente com nossa inteligência neural via voz para decisões críticas.
        </p>
      </div>

      <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
        {/* Animação de Pulso */}
        {isActive && (
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
        )}
        <div className={`relative w-48 h-48 rounded-full flex items-center justify-center transition-all duration-700 ${isActive ? 'bg-primary shadow-[0_0_60px_rgba(245,158,11,0.4)]' : 'bg-slate-200 dark:bg-surface-dark'}`}>
          <span className={`material-icons-round text-6xl ${isActive ? 'text-white' : 'text-slate-400'}`}>
            {isActive ? 'mic' : 'mic_none'}
          </span>

          {isActive && (
            <div className="absolute -bottom-4 bg-white dark:bg-card-dark px-4 py-1 rounded-full border border-primary/20 shadow-xl">
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">Conexão Neural Ativa</span>
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-md bg-white dark:bg-card-dark rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl mb-8">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Transcrição Instantânea</h3>
        <div className="space-y-3 min-h-[120px]">
          {transcript.length > 0 ? transcript.map((t, i) => (
            <p key={i} className="text-sm font-medium dark:text-slate-200 animate-fadeIn">{t}</p>
          )) : (
            <p className="text-sm italic text-slate-400">Aguardando interação...</p>
          )}
        </div>
      </div>

      <button
        onClick={isActive ? stopSession : startSession}
        disabled={isConnecting}
        className={`px-12 py-4 rounded-2xl font-black uppercase tracking-widest transition-all transform active:scale-95 shadow-2xl ${isActive
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-primary text-white hover:bg-orange-600 shadow-primary/30'
          } ${isConnecting ? 'opacity-50 cursor-wait' : ''}`}
      >
        {isConnecting ? 'Estabelecendo Link...' : isActive ? 'Encerrar Consultoria' : 'Iniciar Oráculo'}
      </button>

      <p className="mt-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
        Powered by Gemini 2.5 Flash Native Audio
      </p>
    </div>
  );
};
