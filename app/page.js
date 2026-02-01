'use client';

import React, { useState, useEffect } from 'react';
import {
  CAMERAS,
  LENSES,
  FOCAL_LENGTHS,
  APERTURES,
  COLOR_GRADINGS,
  TYPE_FILM,
  PREFIX_FILM,
  PREFIX_DIGITAL,
  SUFFIX_FILM,
  SUFFIX_DIGITAL
} from '@/utils/CinematicConstants';
import VerticalRoller from '@/components/VerticalRoller';
import { Copy, Clapperboard } from 'lucide-react';

export default function CinematicStudio() {
  const [mode, setMode] = useState('Original Shot');

  // Selections
  const [selectedCamera, setSelectedCamera] = useState(CAMERAS[1]);
  const [selectedLens, setSelectedLens] = useState(LENSES[3]);
  const [selectedFocalLength, setSelectedFocalLength] = useState(FOCAL_LENGTHS[3]);
  const [selectedAperture, setSelectedAperture] = useState(APERTURES[4]);
  const [selectedColorGrading, setSelectedColorGrading] = useState(COLOR_GRADINGS[0]);

  const [mainPrompt, setMainPrompt] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Prompt Generation Logic
  useEffect(() => {
    if (!selectedCamera || !selectedLens || !selectedFocalLength || !selectedAperture) {
      setGeneratedPrompt('');
      return;
    }

    const globalPrefix = selectedCamera.type === TYPE_FILM ? PREFIX_FILM : PREFIX_DIGITAL;
    const styleSuffix = selectedCamera.type === TYPE_FILM ? SUFFIX_FILM : SUFFIX_DIGITAL;

    const cameraText = selectedCamera.prompt;
    const lensText = selectedLens.prompt;
    const focalText = selectedFocalLength.prompt;
    const apertureText = selectedAperture.prompt;
    const colorGradingText = selectedColorGrading ? selectedColorGrading.prompt + " " : "";

    let final = "";

    if (mode === 'Original Shot') {
      final =
        globalPrefix +
        cameraText + " " +
        lensText + " " +
        focalText + " " +
        apertureText +
        "\n\n" + (mainPrompt ? mainPrompt.trim() : "[Scene Description]") + "\n\n" +
        colorGradingText +
        styleSuffix;
    } else {
      const reshootPrefix = "Reshoot the reference scene with 100% fidelity: lock subject identity, pose, props and background details. For aspect ratio changes, outpaint edges to fit. ";
      final =
        reshootPrefix +
        globalPrefix +
        cameraText + " " +
        lensText + " " +
        focalText + " " +
        apertureText + " " +
        colorGradingText +
        styleSuffix;
    }
    setGeneratedPrompt(final);
  }, [mode, selectedCamera, selectedLens, selectedFocalLength, selectedAperture, selectedColorGrading, mainPrompt]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="h-screen w-screen text-slate-200 font-sans overflow-hidden flex flex-col">

      {/* Navbar with 32px top margin */}
      <nav className="mt-8 mx-auto z-50 flex items-center gap-8 bg-[#111]/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 shadow-2xl shrink-0">
        <div className="flex items-center gap-2 text-white font-bold tracking-tighter">
          <img src="/images/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
          <span>CineArt Studio</span>
        </div>
        <div className="w-px h-6 bg-white/10" />
        <div className="flex gap-1">
          {['Original Shot', 'Reshoot'].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${mode === m ? 'bg-white text-black' : 'text-[#666] hover:text-[#999] hover:bg-white/5'}`}
            >
              {m}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col px-8 max-w-[1600px] mx-auto w-full min-h-0">

        {/* Container 1: Rollers - 32px top margin */}
        <div className="mt-8 flex-1 min-h-0 grid grid-cols-4 gap-4">
          <VerticalRoller
            label="CAMERA"
            items={CAMERAS}
            selectedItem={selectedCamera}
            onSelect={setSelectedCamera}
            fallbackImage="/images/camera-mockup.png"
          />
          <VerticalRoller
            label="LENS"
            items={LENSES}
            selectedItem={selectedLens}
            onSelect={setSelectedLens}
            fallbackImage="/images/lens-mockup.png"
          />
          <VerticalRoller
            label="FOCAL LENGTH"
            items={FOCAL_LENGTHS}
            selectedItem={selectedFocalLength}
            onSelect={setSelectedFocalLength}
            typeArg="focal"
          />
          <VerticalRoller
            label="APERTURE"
            items={APERTURES}
            selectedItem={selectedAperture}
            onSelect={setSelectedAperture}
            typeArg="aperture"
            fallbackImage="/images/aperture-mockup.png"
          />
        </div>

        {/* Container 2: Input/Output/Color - 32px top margin, 32px bottom margin */}
        <div className="mt-8 mb-8 flex-1 min-h-0 grid grid-cols-12 gap-4">

          {/* Col 1: User Prompt */}
          <div className="col-span-4 bg-[#0a0a0a] rounded-2xl border border-white/10 p-4 flex flex-col group focus-within:border-white/20 transition-colors overflow-hidden h-full">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1 shrink-0">SCENE DESCRIPTION</span>
            <textarea
              value={mainPrompt}
              onChange={(e) => setMainPrompt(e.target.value)}
              placeholder="Describe your scene detail..."
              disabled={mode === 'Reshoot'}
              className={`flex-1 bg-transparent resize-none focus:outline-none text-sm text-slate-300 placeholder:text-slate-700 leading-relaxed overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent transition-opacity duration-300 ${mode === 'Reshoot' ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
          </div>

          {/* Col 2: Color Grading Roller */}
          <div className="col-span-3 overflow-hidden h-full">
            <VerticalRoller
              label="COLOR GRADING"
              items={COLOR_GRADINGS}
              selectedItem={selectedColorGrading}
              onSelect={setSelectedColorGrading}
              typeArg="color"
            />
          </div>

          {/* Col 3: Output Prompt */}
          <div className="col-span-5 bg-[#0a0a0a] rounded-2xl border border-white/10 p-4 flex flex-col relative group overflow-hidden h-full">
            <div className="flex justify-between items-center mb-2 px-1 shrink-0">
              <span className="text-[10px] font-bold text-teal-500/80 uppercase tracking-widest">GENERATED PROMPT</span>
              <button
                onClick={copyToClipboard}
                className="h-6 flex items-center gap-1.5 px-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all active:scale-95 cursor-pointer"
              >
                {copySuccess ? (
                  <span className="text-[9px] font-bold text-green-400">COPIED</span>
                ) : (
                  <>
                    <Copy size={10} className="text-slate-400" />
                    <span className="text-[9px] font-bold text-slate-300">COPY</span>
                  </>
                )}
              </button>
            </div>
            <textarea
              readOnly
              value={generatedPrompt}
              className="flex-1 w-full bg-transparent resize-none focus:outline-none text-xs text-slate-400 leading-relaxed font-mono overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
            />
          </div>

        </div>

      </div>
    </div>
  );
}
