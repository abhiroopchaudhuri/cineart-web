
'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from './GlassCard';

/* 
   Adjusted dimensions:
   Container Height: Dynamic
   Item Height: 160px
   Spacer = (Container / 2) - (Item / 2)
*/
const ITEM_HEIGHT = 160;

const VerticalRoller = ({
    items,
    selectedItem,
    onSelect,
    label,
    height, // Deprecated, calculated dynamically
    typeArg = "name",
    fallbackImage = null
}) => {
    const containerRef = useRef(null);
    const scrollTimeout = useRef(null);
    const [spacerHeight, setSpacerHeight] = useState(100); // Default start

    // Dynamic spacer calculation using ResizeObserver
    useEffect(() => {
        if (!containerRef.current) return;

        const updateSpacer = () => {
            if (containerRef.current) {
                const h = containerRef.current.offsetHeight;
                setSpacerHeight((h / 2) - (ITEM_HEIGHT / 2));
            }
        };

        // Initial calc
        updateSpacer();

        const observer = new ResizeObserver(updateSpacer);
        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    // Scroll selected item to center on mount
    useEffect(() => {
        if (selectedItem && containerRef.current) {
            const index = items.findIndex(i => i.name === selectedItem.name);
            if (index !== -1) {
                // Calculate scroll position to center the item
                const scrollTo = index * ITEM_HEIGHT;
                containerRef.current.scrollTop = scrollTo;
            }
        }
    }, [spacerHeight]); // Re-run when spacer changes to ensuring correct centering

    const handleScroll = () => {
        if (!containerRef.current) return;

        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

        scrollTimeout.current = setTimeout(() => {
            const container = containerRef.current;
            if (!container) return;

            // Find which item is closest to center
            const scrollTop = container.scrollTop;
            const index = Math.round(scrollTop / ITEM_HEIGHT);
            const clampedIndex = Math.max(0, Math.min(index, items.length - 1));

            if (items[clampedIndex] && items[clampedIndex].name !== selectedItem?.name) {
                onSelect(items[clampedIndex]);
            }
        }, 80);
    };

    // Parse focal length: "14mm (Ultra Wide)" -> "14"
    const getFocalDisplay = (name) => {
        const match = name.match(/^(\d+)/);
        return match ? match[1] : name;
    };

    // Parse aperture: "f/0.95 (Dreamlike)" -> "f/0.95"
    const getApertureDisplay = (name) => {
        const match = name.match(/^(f\/[\d.]+)/);
        return match ? match[1] : name.split(' ')[0];
    };

    return (
        <div className="flex flex-col h-full bg-[#0a0a0a] rounded-2xl overflow-hidden relative border border-white/5">
            {/* Header Label */}
            <div className="absolute top-0 left-0 right-0 z-20 text-center py-3 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-transparent pointer-events-none">
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{label}</span>
            </div>

            {/* Center Selection Indicator */}
            <div className="absolute top-1/2 left-0 right-0 h-[160px] -translate-y-1/2 border-y border-white/5 pointer-events-none z-10 bg-white/[0.02]" />

            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto snap-y snap-mandatory scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
                style={{ scrollBehavior: 'smooth' }}
            >
                {/* Top Spacer */}
                <div style={{ height: `${spacerHeight}px` }} className="shrink-0" />

                {items.map((item, idx) => {
                    const isSelected = selectedItem?.name === item.name;
                    const isNameType = typeArg === 'name';

                    return (
                        <div
                            key={item.name}
                            onClick={() => {
                                if (containerRef.current) {
                                    containerRef.current.scrollTo({
                                        top: idx * ITEM_HEIGHT,
                                        behavior: 'smooth'
                                    });
                                }
                            }}
                            className={cn(
                                "snap-center shrink-0 w-full flex items-center cursor-pointer transition-all duration-300 px-4",
                                isNameType ? "justify-start" : "justify-center", // Left align for camera/lens, center for others
                                isSelected ? "opacity-100 scale-100" : "opacity-30 scale-95 blur-[1px]"
                            )}
                            style={{ height: `${ITEM_HEIGHT}px` }}
                        >
                            {/* Layout for Camera / Lens: Side by Side */}
                            {isNameType ? (
                                <div className="flex items-center gap-4 w-full">
                                    {/* Left: Image */}
                                    <div className="w-[100px] h-[100px] shrink-0 flex items-center justify-center">
                                        {(item.image || fallbackImage) && (
                                            <Image
                                                src={item.image || fallbackImage}
                                                alt={item.name}
                                                width={100}
                                                height={100}
                                                className="w-full h-full object-contain drop-shadow-lg"
                                            />
                                        )}
                                    </div>

                                    {/* Right: Text Info */}
                                    <div className="flex flex-col items-start min-w-0">
                                        <span className="text-lg font-bold text-slate-100 leading-tight">
                                            {item.name.split('(')[0].trim()}
                                        </span>
                                        {item.type && (
                                            <span className="text-[10px] font-bold text-[#666] uppercase mt-1 tracking-wider bg-[#1a1a1a] px-2 py-0.5 rounded">
                                                {item.type === 'TYPE_DIGITAL' ? 'DIGITAL' : 'FILM'}
                                            </span>
                                        )}
                                        {!item.type && label === 'LENS' && (
                                            <span className="text-[10px] font-bold text-[#666] uppercase mt-1 tracking-wider bg-[#1a1a1a] px-2 py-0.5 rounded">
                                                {item.name.includes("Anamorphic") ? "ANAMORPHIC" : "SPHERICAL"}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ) : typeArg === 'color' ? (
                                /* Layout for Color Grading: Centered with Palette */
                                <div className="flex flex-col items-center gap-3 w-full px-4">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-slate-100 leading-tight">
                                            {item.name}
                                        </div>
                                    </div>
                                    {/* Palette Bubbles */}
                                    <div className="flex gap-1">
                                        {item.palette && item.palette.map((color, cIdx) => (
                                            <div
                                                key={cIdx}
                                                className="w-6 h-6 rounded-full ring-1 ring-white/10 shadow-lg"
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                /* Layout for Focal / Aperture: Centered Stack */
                                <div className="flex flex-col items-center gap-2">
                                    {/* Focal Length Display */}
                                    {typeArg === 'focal' && (
                                        <div className="flex flex-col items-center">
                                            <span className="text-5xl font-bold text-white tracking-tighter">{getFocalDisplay(item.name)}</span>
                                            <span className="text-sm text-slate-500 font-medium">mm</span>
                                        </div>
                                    )}

                                    {/* Aperture Display (Text Overlay) */}
                                    {typeArg === 'aperture' && (
                                        <div className="relative w-32 h-32 flex items-center justify-center">
                                            {(item.image || fallbackImage) && (
                                                <Image
                                                    src={item.image || fallbackImage}
                                                    alt={item.name}
                                                    fill
                                                    className="absolute inset-0 object-contain opacity-100"
                                                />
                                            )}
                                            {/* Text Overlay */}
                                            <span className="relative z-10 text-3xl font-bold text-white tracking-tighter drop-shadow-md">
                                                {getApertureDisplay(item.name)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Bottom Spacer */}
                <div style={{ height: `${spacerHeight}px` }} className="shrink-0" />
            </div>

            {/* Fade overlays */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent pointer-events-none z-10" />
        </div>
    );
};

export default VerticalRoller;
