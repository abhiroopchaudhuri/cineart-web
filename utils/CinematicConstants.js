
export const TYPE_FILM = 'TYPE_FILM';
export const TYPE_DIGITAL = 'TYPE_DIGITAL';

export const CAMERAS = [
    {
        name: "ARRI Alexa 65 (IMAX Digital)",
        type: TYPE_DIGITAL,
        prompt: "Shot on the ARRI Alexa 65 Large Format camera, 6.5k resolution, extremely soft highlight rolloff, ultra-realistic texture, zero digital noise, epic scale cinematography, \"Dune\" cinematic look.",
        inspiration: "Dune: Part Two, The Revenant",
        image: "/images/cameras/arri_alexa65.png",
        description: "Large Format digital flagship. Unmatched resolution and dynamic range."
    },
    {
        name: "RED V-RAPTOR XL",
        type: TYPE_DIGITAL,
        prompt: "Shot on RED V-RAPTOR XL 8K VV, razor sharp modern cinematography, high contrast, deep blacks, clinical details, hyper-realistic, high frame rate smoothness, vibrant saturation.",
        inspiration: "Fincher movies, Squid Game",
        image: "/images/cameras/red_v_raptor_xl.png",
        description: "8K Vista Vision sensor. Clinical sharpness and high frame rates."
    },
    {
        name: "IMAX 70mm Film",
        type: TYPE_FILM,
        prompt: "Shot on IMAX MSM 9802 70mm film, incredible 18k resolution, organic film grain, vivid analog colors, massive dynamic range, tactile feeling, \"Oppenheimer\" cinematic style.",
        inspiration: "Oppenheimer, Interstellar",
        image: "/images/cameras/imax-msm-9802.png",
        description: "The gold standard of analog film. Massive scale and organic detail."
    },
    {
        name: "Kodak Vision3 500T (35mm)",
        type: TYPE_FILM,
        prompt: "Captured on 35mm Kodak Vision3 500T Color Negative Film 5219, prominent stylistic film grain, warm halation around lights, rich shadows, teal and orange color grading, emotional and gritty atmosphere.",
        inspiration: "Succession, Euphoria",
        image: "/images/cameras/kodak_vision3_500t.png",
        description: "Classic motion picture stock. Rich colors with beautiful grain structure."
    },
    {
        name: "Sony Venice 2",
        type: TYPE_DIGITAL,
        prompt: "Filmed on Sony Venice 2, dual base ISO, exceptional low-light performance, clean shadows in dark scenes, modern digital look with a slight filmic curve, natural skin tones.",
        inspiration: "Top Gun: Maverick, Avatar 2",
        image: "/images/cameras/sony_venice2.png",
        description: "Dual Base ISO full-frame sensor. Exceptional low-light performance."
    },
    {
        name: "16mm Arriflex (Indie)",
        type: TYPE_FILM,
        prompt: "Shot on vintage 16mm Arriflex 416, heavy grain, soft image, nostalgic feel, light leaks, desaturated colors, experimental cinema style, rough texture.",
        inspiration: "Black Swan, Carol",
        image: "/images/cameras/arriflex_16mm.png",
        description: "Vintage indie aesthetic. Distinctive heavy grain and soft, gritty texture."
    }
];

export const LENSES = [
    {
        name: "Panavision C-Series Anamorphic",
        prompt: "Panavision C-Series Anamorphic lens, characteristic horizontal blue lens flares, oval bokeh, barrel distortion at the edges, cinematic widescreen aspect ratio, vintage Hollywood feel.",
        inspiration: "Star Wars, Blade Runner"
    },
    {
        name: "Cooke S4/i Primes",
        prompt: "Cooke S4/i Prime lens, the \"Cooke Look\", warm and creamy rendering, smooth focus falloff, extremely flattering on human faces, romantic and soft cinematic atmosphere.",
        inspiration: "Harry Potter, Zero Dark Thirty"
    },
    {
        name: "ARRI Signature Primes",
        prompt: "ARRI Signature Prime lens, modern perfect optics, zero distortion, magnetic skin tones, incredibly creamy out-of-focus areas, crisp but organic, high-end commercial look.",
        inspiration: "Modern Netflix Originals"
    },
    {
        name: "Helios 44-2 (Vintage)",
        prompt: "Vintage Helios 44-2 lens, swirling \"soap bubble\" bokeh, soft dreamy edges, low contrast, interesting optical flaws, erratic light flares, unique indie film character.",
        inspiration: "The Batman (Chase scene)"
    },
    {
        name: "Atlas Orion Anamorphic",
        prompt: "Atlas Orion Anamorphic lens, modern clean anamorphic look, controlled silver-blue flares, painting-like bokeh, sharp subject separation, sci-fi aesthetic.",
        inspiration: "Don't Look Up, Babylon"
    },
    {
        name: "Canon K-35 (1970s)",
        prompt: "Vintage Canon K-35 prime lens, glowing highlights, lower contrast, soft pastel colors, dreamy haze, award-winning vintage glass look.",
        inspiration: "Her, Aliens"
    }
];

export const FOCAL_LENGTHS = [
    {
        name: "14mm (Ultra Wide)",
        prompt: "Extremely wide 14mm rectilinear perspective, expansive environment, exaggerated depth, subject feels distant or distorted, grand architecture scale."
    },
    {
        name: "24mm (Wide)",
        prompt: "Wide 24mm cinema perspective, showing context and environment, dynamic lines, immersive journalism style, viewer feels close to the action."
    },
    {
        name: "35mm (Classic)",
        prompt: "Classic 35mm storytelling focal length, perfect balance between subject and background, natural documentary feel, \"Spielberg\" perspective."
    },
    {
        name: "50mm (Human Eye)",
        prompt: "Natural 50mm perspective, zero distortion, matches human eyesight, neutral field of view, honest and direct composition."
    },
    {
        name: "85mm (Portrait)",
        prompt: "85mm telephoto portrait length, flattering facial compression, subject isolated from background, intimate emotional focus."
    },
    {
        name: "200mm (Telephoto)",
        prompt: "Long 200mm telephoto compression, background appears flat and close to subject, voyeuristic feel, extremely shallow depth of field, abstract background."
    }
];

export const APERTURES = [
    {
        name: "f/0.95 (Dreamlike)",
        prompt: "Aperture f/0.95, razor-thin depth of field, only the eyelashes are sharp, everything else melts into an abstract wash of color, dream sequence look.",
        image: "/images/apertures/f0_95.svg"
    },
    {
        name: "f/1.4 (Cinematic Shallow)",
        prompt: "Wide open aperture f/1.4, very shallow depth of field, beautiful separation between subject and background, soft creamy bokeh, low light masterpiece.",
        image: "/images/apertures/f1_4.svg"
    },
    {
        name: "f/2.8 (Standard)",
        prompt: "Standard cinema aperture f/2.8, balanced focus, subject is clear but background is pleasantly out of focus, professional movie look.",
        image: "/images/apertures/f2_8.svg"
    },
    {
        name: "f/5.6 (Contextual)",
        prompt: "Stopped down aperture f/5.6, medium depth of field, background is identifiable but soft, clear context of the location.",
        image: "/images/apertures/f5_6.svg"
    },
    {
        name: "f/11 (Deep Focus)",
        prompt: "Deep focus aperture f/11, crisp details from foreground to background, everything is sharp, \"Citizen Kane\" style deep staging.",
        image: "/images/apertures/f11.svg"
    }
];

export const COLOR_GRADINGS = [
    {
        name: "Teal & Orange (Action)",
        prompt: "Hollywood blockbuster teal and orange color grading, cyan shadows and warm skin tones, strong color separation, complementary color scheme, punchy contrast, high saturation, dynamic range, Michael Bay aesthetic.",
        inspiration: "Transformers, Mad Max: Fury Road",
        palette: ["#FF9900", "#008080", "#1A2421", "#D97742", "#004545"]
    },
    {
        name: "Bleach Bypass (Gritty)",
        prompt: "Bleach bypass chemical process simulation, crushed blacks, high contrast silver retention, desaturated colors, harsh texture, gritty atmosphere, metallic highlights, \"Saving Private Ryan\" cinematography.",
        inspiration: "Saving Private Ryan, Minority Report",
        palette: ["#C0C0C0", "#2E2E2E", "#545454", "#8B9DA3", "#101010"]
    },
    {
        name: "Fincher (Thriller)",
        prompt: "David Fincher color palette, clinical green-yellow tint in midtones, cool color temperature, low-key lighting, high contrast shadows, moody atmosphere, desaturated reds, psychological thriller aesthetic.",
        inspiration: "The Social Network, Gone Girl",
        palette: ["#B0C48A", "#1C2920", "#2E3B32", "#8C9C80", "#0D110F"]
    },
    {
        name: "Kodachrome (Vintage)",
        prompt: "Kodachrome 64 film stock simulation, dense blacks, rich red and yellow rendition, high contrast, slightly warm vintage bias, iconic National Geographic 1980s editorial look, authentic film colors.",
        inspiration: "Asteroid City, Once Upon a Time in Hollywood",
        palette: ["#D92B2B", "#FFCC00", "#1A1A1A", "#4D7FA2", "#E6D690"]
    },
    {
        name: "Technicolor (1950s)",
        prompt: "Three-strip Technicolor process, hyper-saturated primary red/green/blue, low film grain, glamorous high-key lighting, vivid dreamlike colors, \"Wizard of Oz\" aesthetic, painting-like richness.",
        inspiration: "The Wizard of Oz, Singin' in the Rain",
        palette: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"]
    },
    {
        name: "Neon Noir (Cyberpunk)",
        prompt: "Neon noir color palette, bi-chromatic lighting (magenta vs cyan), deep crushed blacks, wet surface reflections, high contrast night photography, \"Blade Runner 2049\" aesthetic, glowing highlights.",
        inspiration: "Blade Runner 2049, John Wick",
        palette: ["#FF00FF", "#00FFFF", "#0A0A0A", "#330033", "#003333"]
    },
    {
        name: "Wes Anderson (Pastel)",
        prompt: "Pastel color palette, high-key flat lighting, soft pinks and mint greens, low contrast, symmetrical composition, whimsical aesthetic, \"Grand Budapest Hotel\" color grading, illustrative style.",
        inspiration: "The Grand Budapest Hotel, The French Dispatch",
        palette: ["#F7CAC9", "#A2D5C6", "#E0BBE4", "#FFDFD3", "#FFFFB3"]
    },
    {
        name: "Film Noir (B&W)",
        prompt: "Classic film noir black and white photography, orthochromatic film stock simulation, high contrast chiaroscuro lighting, dramatic shadows, silvery highlights, no color, moody crime atmosphere.",
        inspiration: "Sin City, Casablanca",
        palette: ["#FFFFFF", "#000000", "#808080", "#404040", "#C0C0C0"]
    },
    {
        name: "Golden Hour (Dreamy)",
        prompt: "Magic hour lighting, warm golden color temperature, soft backlight halation, low contrast shadows, romantic atmosphere, organic earth tones, \"Terrence Malick\" cinematography.",
        inspiration: "The Tree of Life, The Notebook",
        palette: ["#FFD700", "#FFA500", "#8B4513", "#F4A460", "#FFF8DC"]
    },
    {
        name: "Matrix (Green/Digital)",
        prompt: "Matrix movie color grading, dominant green tint in shadows and midtones, sickly atmosphere, high contrast, digital rain aesthetic, cool metallic tones, sci-fi dystopian look.",
        inspiration: "The Matrix, Fight Club",
        palette: ["#003300", "#336633", "#001100", "#669966", "#0D0D0D"]
    },
    {
        name: "Euphoria (Gen-Z)",
        prompt: "Euphoria TV show cinematography, heavy film grain (Kodak Ektachrome), violet and deep blue ambient lighting, glittery highlights, emotional and moody, mixed color temperatures, A24 aesthetic.",
        inspiration: "Euphoria, Spring Breakers",
        palette: ["#8A2BE2", "#4B0082", "#9370DB", "#FF69B4", "#191970"]
    },
    {
        name: "Day for Night (Blue)",
        prompt: "Cinematic \"Day for Night\" color grading, deep blue cast, underexposed image, artificial moonlight look, cool white balance, high contrast shadows, eerie nocturnal atmosphere.",
        inspiration: "Mad Max: Fury Road (Swamp Scene), Nope",
        palette: ["#000080", "#191970", "#000033", "#4169E1", "#0000CD"]
    },
    {
        name: "Cross Process (Fashion)",
        prompt: "Cross-processed film simulation, unnatural color shifts, high contrast, green/yellow cast in highlights, deep blue shadows, unpredictable artistic chemical look, 90s fashion photography style.",
        inspiration: "Buffalo '66, Domino",
        palette: ["#BDB76B", "#00008B", "#556B2F", "#8B0000", "#FFFFE0"]
    },
    {
        name: "Desaturated (Apocalyptic)",
        prompt: "Post-apocalyptic color grading, heavily desaturated palette, near-monochrome with slight sepia tint, washed out colors, bleak atmosphere, \"The Road\" movie aesthetic, depressing and raw.",
        inspiration: "The Road, Children of Men",
        palette: ["#696969", "#708090", "#2F4F4F", "#778899", "#D3D3D3"]
    }
];

export const PREFIX_FILM = "A high-fidelity analog film still from a cinematic movie, authentic celluloid texture, captured on motion picture film. ";
export const PREFIX_DIGITAL = "A 8k raw still frame from a modern high-end digital cinema camera, pristine and noiseless image quality. ";

export const SUFFIX_FILM = " esthetic of celluloid, photochemical film development, beautiful uneven heavy grain structure, halation around strong lights, rich analog color depth, cinematic masterpiece, color graded by a professional colorist, muddy shadows, vintage texture.";
export const SUFFIX_DIGITAL = " shot on high-end digital cinema sensor, professional color grading, soft highlight rolloff, incredible dynamic range, natural skin texture, clean shadows with minimal sensor noise, realistic studio lighting, highly detailed but organic, neutral color temperature, authentic cinematic composition.";
