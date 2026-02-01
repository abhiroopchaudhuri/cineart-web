
'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from './GlassCard';

/* 
   Adjusted dimensions:
   Desktop: Item Height 160px
   Mobile: Item Width 120px (Horizontal)
*/
const ITEM_HEIGHT_DESKTOP = 160;
const ITEM_WIDTH_MOBILE = 120;

const VerticalRoller = ({
    items,
    selectedItem,
    onSelect,
    label,
    height, // Deprecated, calculated dynamically
    typeArg = "name",
    fallbackImage = null,
    titleAlign = "center",
    headerAction = null,
    disabled = false
}) => {
    const containerRef = useRef(null);
    const scrollTimeout = useRef(null);
    const [spacerSize, setSpacerSize] = useState(100);
    const [isMobile, setIsMobile] = useState(false);

    // Detect Mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Dynamic spacer calculation using ResizeObserver
    useEffect(() => {
        if (!containerRef.current) return;

        const updateSpacer = () => {
            if (containerRef.current) {
                if (isMobile) {
                    const w = containerRef.current.offsetWidth;
                    setSpacerSize((w / 2) - (ITEM_WIDTH_MOBILE / 2));
                } else {
                    const h = containerRef.current.offsetHeight;
                    setSpacerSize((h / 2) - (ITEM_HEIGHT_DESKTOP / 2));
                }
            }
        };

        // Initial calc
        updateSpacer();

        const observer = new ResizeObserver(updateSpacer);
        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, [isMobile]);

    // Scroll selected item to center on mount or mode change
    useEffect(() => {
        if (selectedItem && containerRef.current) {
            const index = items.findIndex(i => i.name === selectedItem.name);
            if (index !== -1) {
                if (isMobile) {
                    const scrollTo = index * ITEM_WIDTH_MOBILE;
                    containerRef.current.scrollLeft = scrollTo;
                } else {
                    const scrollTo = index * ITEM_HEIGHT_DESKTOP;
                    containerRef.current.scrollTop = scrollTo;
                }
            }
        }
    }, [spacerSize, isMobile, selectedItem?.name]); // Re-run when layout changes

    const handleScroll = () => {
        if (!containerRef.current) return;

        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

        scrollTimeout.current = setTimeout(() => {
            const container = containerRef.current;
            if (!container) return;

            let index = 0;
            if (isMobile) {
                const scrollLeft = container.scrollLeft;
                index = Math.round(scrollLeft / ITEM_WIDTH_MOBILE);
            } else {
                const scrollTop = container.scrollTop;
                index = Math.round(scrollTop / ITEM_HEIGHT_DESKTOP);
            }

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
        <div className="flex flex-col h-full bg-[#0a0a0a] rounded-2xl overflow-hidden relative border border-white/10">
            {/* Header Label */}
            <div className={cn(
                "absolute top-0 left-0 right-0 z-20 py-2 md:py-3 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a] to-transparent flex items-center px-4",
                titleAlign === 'left' ? "justify-between" : "justify-center"
            )}>
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{label}</span>
                {headerAction && (
                    <div className="pointer-events-auto">
                        {headerAction}
                    </div>
                )}
            </div>

            {/* Center Selection Indicator */}
            {/* Desktop: Horizontal bar. Mobile: Vertical bar (or box frame)? 
                Actually, simpler to keep "Center" logic.
                Desktop: top-1/2, h-[160px], w-full.
                Mobile: left-1/2, w-[120px], h-full.
            */}
            <div className={cn(
                "absolute border-white/10 pointer-events-none z-10 bg-white/[0.02] transition-opacity duration-300",
                disabled ? "opacity-0" : "opacity-100",
                isMobile
                    ? "top-0 bottom-0 left-1/2 -translate-x-1/2 w-[120px] border-x" // Mobile: Vertical slice
                    : "top-1/2 left-0 right-0 h-[160px] -translate-y-1/2 border-y" // Desktop: Horizontal slice
            )} />

            <div
                ref={containerRef}
                onScroll={handleScroll}
                className={cn(
                    "flex-1 scrollbar-hide transition-opacity duration-300",
                    isMobile
                        ? "flex flex-row overflow-x-auto snap-x snap-mandatory items-center"
                        : "flex flex-col overflow-y-auto snap-y snap-mandatory",
                    disabled ? "opacity-30 pointer-events-none grayscale" : "opacity-100"
                )}
                style={{ scrollBehavior: 'smooth' }}
            >
                {/* Spacer */}
                <div
                    style={isMobile ? { width: `${spacerSize}px` } : { height: `${spacerSize}px` }}
                    className="shrink-0"
                />

                {items.map((item, idx) => {
                    const isSelected = selectedItem?.name === item.name;
                    const isNameType = typeArg === 'name';

                    return (
                        <div
                            key={item.name}
                            onClick={() => {
                                if (containerRef.current) {
                                    if (isMobile) {
                                        containerRef.current.scrollTo({
                                            left: idx * ITEM_WIDTH_MOBILE,
                                            behavior: 'smooth'
                                        });
                                    } else {
                                        containerRef.current.scrollTo({
                                            top: idx * ITEM_HEIGHT_DESKTOP,
                                            behavior: 'smooth'
                                        });
                                    }
                                }
                            }}
                            className={cn(
                                "snap-center shrink-0 flex items-center cursor-pointer transition-all duration-300 px-4",
                                isMobile ? "justify-center flex-col h-full" : "w-full", // Mobile items
                                !isMobile && (isNameType ? "justify-start" : "justify-center"), // Desktop items
                                isSelected ? "opacity-100 scale-100" : "opacity-30 scale-95 blur-[1px]"
                            )}
                            style={isMobile
                                ? { width: `${ITEM_WIDTH_MOBILE}px` }
                                : { height: `${ITEM_HEIGHT_DESKTOP}px` }
                            }
                        >
                            {/* Layout specific content */}
                            {isNameType ? (
                                <div className={cn("flex items-center gap-4", isMobile ? "flex-col w-full text-center gap-2" : "w-full")}>
                                    {/* Image */}
                                    <div className={cn("shrink-0 flex items-center justify-center", isMobile ? "w-[60px] h-[60px]" : "w-[100px] h-[100px]")}>
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

                                    {/* Text Info */}
                                    <div className={cn("flex flex-col items-center min-w-0", !isMobile && "items-start")}>
                                        <span className={cn("font-bold text-slate-100 leading-tight", isMobile ? "text-xs" : "text-lg")}>
                                            {item.name.split('(')[0].trim()}
                                        </span>
                                        <div className="flex flex-wrap gap-1 mt-1 justify-center">
                                            {item.type && (
                                                <span className="text-[9px] font-bold text-[#666] uppercase tracking-wider bg-[#1a1a1a] px-2 py-0.5 rounded">
                                                    {item.type === 'TYPE_DIGITAL' ? 'DIG' : 'FILM'}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : typeArg === 'color' ? (
                                <div className="flex flex-col items-center gap-2 w-full px-2">
                                    <div className={cn("font-bold text-slate-100 leading-tight text-center", isMobile ? "text-xs" : "text-lg")}>
                                        {item.name}
                                    </div>
                                    {/* Palette Bubbles */}
                                    <div className={cn("flex gap-1 mt-1 justify-center", isMobile ? "grid grid-cols-5 gap-1.5" : "flex-wrap")}>
                                        {item.palette && item.palette.map((color, cIdx) => (
                                            <div
                                                key={cIdx}
                                                className={cn("rounded-full ring-1 ring-white/10 shadow-lg", isMobile ? "w-3 h-3" : "w-6 h-6")}
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                /* Layout for Focal / Aperture */
                                <div className="flex flex-col items-center gap-2">
                                    {/* Focal Length Display */}
                                    {typeArg === 'focal' && (
                                        <div className="flex flex-col items-center">
                                            <span className={cn("font-bold text-white tracking-tighter", isMobile ? "text-3xl" : "text-5xl")}>{getFocalDisplay(item.name)}</span>
                                            <span className="text-sm text-slate-500 font-medium">mm</span>
                                        </div>
                                    )}

                                    {/* Aperture Display */}
                                    {typeArg === 'aperture' && (
                                        <div className={cn("relative flex items-center justify-center", isMobile ? "w-20 h-20" : "w-32 h-32")}>
                                            {(item.image || fallbackImage) && (
                                                <Image
                                                    src={item.image || fallbackImage}
                                                    alt={item.name}
                                                    fill
                                                    className="absolute inset-0 object-contain opacity-100"
                                                />
                                            )}
                                            <span className={cn("relative z-10 font-bold text-white tracking-tighter drop-shadow-md", isMobile ? "text-xl" : "text-3xl")}>
                                                {getApertureDisplay(item.name)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    );
                })}

                {/* Spacer */}
                <div
                    style={isMobile ? { width: `${spacerSize}px` } : { height: `${spacerSize}px` }}
                    className="shrink-0"
                />
            </div>

            {/* Inspiration Badge (Static position, dynamic content) */}
            {(() => {
                const getBadgeText = (item) => {
                    if (!item) return null;
                    if (item.inspiration) return item.inspiration;
                    const match = item.name.match(/\(([^)]+)\)/);
                    if (match) return match[1];
                    return null;
                };

                const badgeText = getBadgeText(selectedItem);

                return badgeText ? (
                    <InspirationBadge text={badgeText} isMobile={isMobile} />
                ) : null;
            })()}

            {/* Fade overlays */}
            <div className={cn(
                "pointer-events-none z-10 absolute",
                isMobile
                    ? "top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-[#0a0a0a] to-transparent"
                    : "top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent"
            )} />
            <div className={cn(
                "pointer-events-none z-10 absolute",
                isMobile
                    ? "top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-[#0a0a0a] to-transparent"
                    : "bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent"
            )} />
        </div>
    );
};

const InspirationBadge = ({ text, isMobile }) => {
    // If mobile, hide or simplify? Requirements didn't specify, but "less whitespace" implies compact.
    // I'll keep it but small.
    const textRef = useRef(null);
    const [isTruncated, setIsTruncated] = useState(false);

    useEffect(() => {
        if (textRef.current) {
            setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
        }
    }, [text]);

    return (
        <div className={cn("absolute z-20 group", isMobile ? "bottom-2 right-2" : "bottom-3 right-4")}>
            {/* Tooltip logic simplified for brevity, keeping existing if desktop */}
            {isTruncated && !isMobile && (
                <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-30 w-max max-w-[250px]">
                    <div className="bg-[#1a1a1a] text-[#999] text-[10px] font-medium px-3 py-2 rounded-lg border border-white/10 shadow-2xl relative">
                        {text}
                        <div className="absolute right-4 bottom-[-4px] w-2 h-2 bg-[#1a1a1a] border-r border-b border-white/10 rotate-45"></div>
                    </div>
                </div>
            )}

            <span
                ref={textRef}
                className={cn(
                    "font-bold text-[#666] uppercase tracking-wider bg-[#1a1a1a] px-2 py-1 rounded border border-white/5 truncate block shadow-lg",
                    isMobile ? "text-[8px] max-w-[100px]" : "text-[9px] max-w-[180px]"
                )}
            >
                {text}
            </span>
        </div>
    );
};

export default VerticalRoller;
