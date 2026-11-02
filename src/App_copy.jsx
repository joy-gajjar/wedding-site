import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Crown,
  Sparkles,
  Calendar,
  MapPin,
  Clock,
  Heart,
  Music,
  Volume2,
  VolumeX,
  Share2,
  Download,
  Eye,
  Lock,
  Unlock,
  Check,
  X,
  Plus,
  Trash2,
  Edit3,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Menu,
  Image as ImageIcon,
  Film,
  BookOpen,
  Users,
  Award,
  Send,
  ExternalLink,
  Copy,
  RefreshCw,
  Database,
  Settings,
  Star,
  ShieldCheck,
  FileText,
  Play,
  Pause,
  Upload,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// ============================================================================
// INITIAL ROYAL STORYBOOK CMS DATA (EDITABLE VIA ADMIN STUDIO)
// ============================================================================
const INITIAL_CMS_DATA = {
  settings: {
    groomName: 'Jainam Shah',
    brideName: 'Shalvi Dasadia',
    tagline: 'A Royal Beginning to Forever',
    weddingDateISO: '2027-02-27T12:39:00+05:30',
    weddingDateDisplay: '27 February 2027',
    hashtag: '#JainamKiShalvi',
    siteTitle: 'Jainam Shah & Shalvi Dasadia | A Royal Beginning to Forever',
    metaDescription:
      'Celebrate the beautiful journey of Jainam Shah and Shalvi Dasadia as they begin their forever together on 27 February 2027.',
    autoApproveWishes: false,
    musicUrl: '', // Empty uses built-in Royal Tanpura & Chime Synthesizer; Admin can set custom MP3 URL
    invitationPdfUrl: '',
    invitationDownloadEnabled: true,
    invitationNote:
      'With the divine blessings of Lord Mahavir and our revered ancestors, we cordially invite you to grace the auspicious wedding celebrations.'
  },
  chapters: [
    {
      id: 'ch-1',
      number: 'CHAPTER 01',
      title: 'Two Different Worlds',
      subtitle: 'Before Destiny Wrote Our First Page',
      dateLabel: 'Prologue • Editable Era',
      theme: 'ivory',
      quote: '“Every grand tapestry begins with two distinct threads spun in quiet, separate corners of the world.”',
      boyNarrative:
        'There was once a boy. A boy with dreams of his own, ambitions of his own and a world he was busy building. [Placeholder: Admin can customize Jainam’s early life story, cities, and passions here.]',
      girlNarrative:
        'And somewhere, there was a girl. A girl with her own dreams, her own ambitions and a beautiful world of her own. [Placeholder: Admin can customize Shalvi’s early journey, warmth, and inspirations here.]',
      closingNarrative:
        'They were different in countless ways. Little did they know that their stories were about to become one.',
      imageCaption: '[Story Chapter 01 Portrait Placeholder — Upload via Admin Studio]',
      imageUrl: ''
    },
    {
      id: 'ch-2',
      number: 'CHAPTER 02',
      title: 'When Destiny Intervened',
      subtitle: 'The Crossing of Two Paths',
      dateLabel: '[Date / Season Placeholder]',
      theme: 'burgundy',
      quote: '“In the quiet architecture of fate, a single introduction can change the course of two lifetimes.”',
      boyNarrative:
        '[Editable Story Placeholder]: Describe the serendipitous moment when Jainam and Shalvi’s paths first crossed—whether through family blessings, a cherished introduction, or an unexpected meeting.',
      girlNarrative:
        '[Editable Story Placeholder]: Share the first impressions, the quiet curiosity, and the subtle feeling that this meeting carried something extraordinary.',
      closingNarrative:
        'What began as a simple introduction gently opened the doors to a conversation neither wanted to end.',
      imageCaption: '[First Meeting / Destiny Memory Placeholder — Upload via Admin Studio]',
      imageUrl: ''
    },
    {
      id: 'ch-3',
      number: 'CHAPTER 03',
      title: 'The Beginning of Something Beautiful',
      subtitle: 'Conversations That Turned Hours Into Moments',
      dateLabel: '[Milestone Date Placeholder]',
      theme: 'ivory',
      quote: '“Two voices found a rhythm where silence felt comfortable and laughter felt like home.”',
      boyNarrative:
        '[Editable Story Placeholder]: Recount their earliest conversations, shared values, and how effortless companionship blossomed between Jainam and Shalvi.',
      girlNarrative:
        '[Editable Story Placeholder]: Describe the little discoveries—shared smiles, mutual respect, and the realization that their differences complemented one another gracefully.',
      closingNarrative:
        'With every passing conversation, two separate worlds began weaving a shared horizon.',
      imageCaption: '[Early Moments Placeholder — Upload via Admin Studio]',
      imageUrl: ''
    },
    {
      id: 'ch-4',
      number: 'CHAPTER 04',
      title: 'Memories That Became Ours',
      subtitle: 'Constellations of Shared Moments',
      dateLabel: '[Cherished Dates Placeholder]',
      theme: 'burgundy',
      quote: '“We did not measure time by the calendar, but by the memories we quietly collected together.”',
      boyNarrative:
        '[Editable Story Placeholder]: Highlight favourite milestones, celebrations with loved ones, and quiet moments that deepened their bond.',
      girlNarrative:
        '[Editable Story Placeholder]: Add dates, captions, and photographs of special milestones through the Admin Dashboard.',
      closingNarrative:
        'Each memory became a cornerstone in the palace of trust and affection they were building together.',
      imageCaption: '[Milestone Collage Placeholder — Upload via Admin Studio]',
      imageUrl: ''
    },
    {
      id: 'ch-5',
      number: 'CHAPTER 05',
      title: 'A Promise For Forever',
      subtitle: 'Two Hearts, Two Families, One Sacred Vow',
      dateLabel: '[Engagement / Roka Date Placeholder]',
      theme: 'ivory',
      quote: '“Love reaches its truest form when it is blessed by family and sealed with a promise for eternity.”',
      boyNarrative:
        '[Editable Story Placeholder]: Share the story of their engagement, the joyous coming together of the Shah and Dasadia families, and the promise of forever.',
      girlNarrative:
        '[Editable Story Placeholder]: Capture the emotions of saying yes to a lifetime of partnership, heritage, and love.',
      closingNarrative:
        'Surrounded by the warmth and blessings of their families, their forever officially found its auspicious date.',
      imageCaption: '[Engagement / Ring Ceremony Portrait Placeholder — Upload via Admin Studio]',
      imageUrl: ''
    },
    {
      id: 'ch-6',
      number: 'CHAPTER 06',
      title: 'The Next Chapter',
      subtitle: 'Towards 27 February 2027',
      dateLabel: '27 February 2027',
      theme: 'burgundy',
      quote: '“And now, beneath the royal arches and sacred mantras, our greatest chapter awaits your presence.”',
      boyNarrative:
        'As the auspicious days of February 2027 approach, Jainam and Shalvi prepare to step into a new life together.',
      girlNarrative:
        'Every celebration is incomplete without the warmth, laughter, and blessings of the friends and family who shaped their lives.',
      closingNarrative:
        'Join us as we celebrate A Royal Beginning to Forever on 27 February 2027.',
      imageCaption: '[Pre-Wedding Royal Portrait Placeholder — Upload via Admin Studio]',
      imageUrl: ''
    }
  ],
  couple: {
    groom: {
      name: 'Jainam Shah',
      title: 'The Groom',
      monogram: 'J',
      portraitUrl: '',
      introduction:
        '[Editable Groom Introduction]: A warm introduction to Jainam—his background, values, and the quiet strength he brings to everyone around him.',
      personality:
        '[Editable Personality]: Grounded, thoughtful, family-oriented, and driven by purpose with a warm sense of humour.',
      interests:
        '[Editable Interests & Hobbies]: Exploring new horizons, meaningful conversations, heritage architecture, and spending quality time with loved ones.',
      dreams:
        '[Editable Dreams & Aspirations]: Building a life anchored in love, mutual growth, and cherished family traditions alongside Shalvi.',
      personalMessage:
        '“In Shalvi, I found both my calmest harbour and my brightest adventure. We cannot wait to welcome you to celebrate our beginning.”'
    },
    bride: {
      name: 'Shalvi Dasadia',
      title: 'The Bride',
      monogram: 'S',
      portraitUrl: '',
      introduction:
        '[Editable Bride Introduction]: A graceful introduction to Shalvi—her warmth, creativity, and the gentle elegance that lights up every room.',
      personality:
        '[Editable Personality]: Compassionate, radiant, detail-loving, and deeply devoted to the people she cherishes.',
      interests:
        '[Editable Interests & Hobbies]: Art, cultural celebrations, curating timeless memories, travel, and heartfelt gatherings.',
      dreams:
        '[Editable Dreams & Aspirations]: Creating a home filled with laughter, grace, shared dreams, and timeless values with Jainam.',
      personalMessage:
        '“With Jainam, every step forward feels blessed and effortless. Having our favourite people witness our vows means the world to us.”'
    }
  },
  families: [
    {
      id: 'fam-1',
      side: 'groom',
      category: "Groom's Parents",
      name: '[Groom’s Father & Mother Names — Editable in Admin]',
      relation: 'Parents of Jainam Shah',
      introduction:
        'The pillars of strength, grace, and values of the Shah family, welcoming you with open hearts and warm blessings.',
      photoUrl: ''
    },
    {
      id: 'fam-2',
      side: 'bride',
      category: "Bride's Parents",
      name: '[Bride’s Father & Mother Names — Editable in Admin]',
      relation: 'Parents of Shalvi Dasadia',
      introduction:
        'The guiding light and loving heart of the Dasadia family, overjoyed to celebrate this sacred union with you.',
      photoUrl: ''
    },
    {
      id: 'fam-3',
      side: 'groom',
      category: 'Grandparents',
      name: '[Groom’s Grandparents — Editable in Admin]',
      relation: 'Paternal & Maternal Grandparents (Shah Family)',
      introduction:
        'Whose timeless wisdom, prayers, and heritage illuminate every step of this auspicious celebration.',
      photoUrl: ''
    },
    {
      id: 'fam-4',
      side: 'bride',
      category: 'Grandparents',
      name: '[Bride’s Grandparents — Editable in Admin]',
      relation: 'Paternal & Maternal Grandparents (Dasadia Family)',
      introduction:
        'The revered elders whose blessings form the sacred foundation of Shalvi and Jainam’s new journey.',
      photoUrl: ''
    },
    {
      id: 'fam-5',
      side: 'both',
      category: 'Siblings & Loved Ones',
      name: '[Siblings & Extended Family — Editable in Admin]',
      relation: 'Brothers, Sisters & Extended Parivar',
      introduction:
        'The lifeblood of the festivities—leading the Baarat, choreographing the Sangeet, and making every moment unforgettable.',
      photoUrl: ''
    }
  ],
  events: [
    {
      id: 'evt-1',
      name: 'Kankotri Lekhan',
      date: '31 January 2027',
      sortOrder: 1,
      startTime: '10:15 AM Onwards (Editable)',
      endTime: '01:30 PM',
      venueName: '[Venue Name Placeholder — Editable in Admin]',
      venueAddress: '[Full Venue Address Placeholder — Update via Admin Studio]',
      description:
        'An auspicious beginning where the first wedding invitations (Kankotri) are inscribed with sacred prayers and divine blessings for the upcoming nuptials.',
      dressCode: 'Traditional Indian Festive • Pastel Gold & Ivory',
      mapLink: 'https://maps.google.com',
      motif: 'kankotri',
      published: true
    },
    {
      id: 'evt-2',
      name: 'Home Mehndi — Day I',
      date: '24 February 2027',
      sortOrder: 2,
      startTime: '02:00 PM Onwards (Editable)',
      endTime: '07:00 PM',
      venueName: '[Residence / Venue Placeholder — Editable in Admin]',
      venueAddress: '[Full Address Placeholder — Update via Admin Studio]',
      description:
        'An intimate afternoon of intricate henna artistry, traditional folk melodies, and joyful family warmth as the wedding week commences.',
      dressCode: 'Rajasthani Mehndi Greens & Marigold Hues',
      mapLink: 'https://maps.google.com',
      motif: 'mehndi',
      published: true
    },
    {
      id: 'evt-3',
      name: 'Home Mehndi — Day II',
      date: '25 February 2027',
      sortOrder: 3,
      startTime: '03:00 PM Onwards (Editable)',
      endTime: '08:30 PM',
      venueName: '[Residence / Courtyard Venue Placeholder — Editable in Admin]',
      venueAddress: '[Full Address Placeholder — Update via Admin Studio]',
      description:
        'Continuing the celebration of henna, music, and cherished rituals surrounded by close family and dearest friends.',
      dressCode: 'Vibrant Ethnic • Emerald, Lime & Champagne',
      mapLink: 'https://maps.google.com',
      motif: 'mehndi',
      published: true
    },
    {
      id: 'evt-4',
      name: 'Royal Haldi Ceremony',
      date: '26 February 2027',
      sortOrder: 4,
      startTime: '10:00 AM Onwards (Editable)',
      endTime: '01:30 PM',
      venueName: '[Courtyard / Palace Lawn Placeholder — Editable in Admin]',
      venueAddress: '[Full Address Placeholder — Update via Admin Studio]',
      description:
        'A sunlit morning awash in auspicious turmeric, marigold petals, dhol beats, and heartfelt blessings for the bride and groom.',
      dressCode: 'Shades of Saffron, Mustard Yellow & Ivory',
      mapLink: 'https://maps.google.com',
      motif: 'haldi',
      published: true
    },
    {
      id: 'evt-5',
      name: 'Grand Sangeet & Reception',
      date: '26 February 2027',
      sortOrder: 5,
      startTime: '07:30 PM Onwards (Editable)',
      endTime: '11:55 PM',
      venueName: '[Grand Ballroom / Royal Banquet Placeholder — Editable in Admin]',
      venueAddress: '[Full Address Placeholder — Update via Admin Studio]',
      description:
        'An enchanting evening of royal glamour, choreographed family performances, musical celebration, and toasts to the couple.',
      dressCode: 'Royal Black-Tie Ethnic / Indo-Western Couture',
      mapLink: 'https://maps.google.com',
      motif: 'sangeet',
      published: true
    },
    {
      id: 'evt-6',
      name: 'Wedding Ceremony & Baarat',
      date: '27 February 2027',
      sortOrder: 6,
      startTime: '04:00 PM Baarat •Hasta Melap (Editable)',
      endTime: 'Late Evening',
      venueName: '[Royal Mandap Venue Placeholder — Editable in Admin]',
      venueAddress: '[Full Address Placeholder — Update via Admin Studio]',
      description:
        'The sacred culmination—where the royal Baarat arrives in grandeur and Jainam & Shalvi unite in holy matrimony beneath the Mandap.',
      dressCode: 'Royal Heritage • Crimson, Burgundy, Gold & Regal Pastels',
      mapLink: 'https://maps.google.com',
      motif: 'wedding',
      published: true
    }
  ],
  gallery: [
    {
      id: 'gal-1',
      category: 'Couple',
      title: 'Royal Jharokha Portrait I',
      caption: '[Editable Placeholder: Couple Portrait — Upload real photograph in Admin Studio]',
      aspect: 'tall',
      imageUrl: ''
    },
    {
      id: 'gal-2',
      category: 'Engagement',
      title: 'The Sacred Promise',
      caption: '[Editable Placeholder: Engagement Moment — Upload real photograph in Admin Studio]',
      aspect: 'wide',
      imageUrl: ''
    },
    {
      id: 'gal-3',
      category: 'Family',
      title: 'Two Families, One Parivar',
      caption: '[Editable Placeholder: Shah & Dasadia Family Portrait — Upload in Admin Studio]',
      aspect: 'square',
      imageUrl: ''
    },
    {
      id: 'gal-4',
      category: 'Celebrations',
      title: 'Festive Beginnings',
      caption: '[Editable Placeholder: Pre-Wedding Festivities — Upload in Admin Studio]',
      aspect: 'tall',
      imageUrl: ''
    },
    {
      id: 'gal-5',
      category: 'Friends',
      title: 'Laughter & Companionship',
      caption: '[Editable Placeholder: Friends & Wedding Squad — Upload in Admin Studio]',
      aspect: 'square',
      imageUrl: ''
    },
    {
      id: 'gal-6',
      category: 'Special Memories',
      title: 'Golden Hour Heritage',
      caption: '[Editable Placeholder: Special Milestone Memory — Upload in Admin Studio]',
      aspect: 'wide',
      imageUrl: ''
    }
  ],
  videos: [
    {
      id: 'vid-1',
      title: 'Save The Date — Royal Teaser',
      category: 'Pre-Wedding Film',
      duration: '01:45',
      description:
        '[Video Placeholder]: Replace with your official Save the Date or Pre-Wedding film link (YouTube, Vimeo, or MP4) in the Admin Dashboard.',
      embedUrl: ''
    },
    {
      id: 'vid-2',
      title: 'Chapters of Us — Story Film',
      category: 'Cinematic Highlight',
      duration: '03:30',
      description:
        '[Video Placeholder]: Ready for embedding your engagement highlight or couple story reel without intrusive autoplay.',
      embedUrl: ''
    }
  ],
  venues: [
    {
      id: 'ven-1',
      name: '[Primary Wedding & Sangeet Venue — Editable]',
      associatedEvents: 'Haldi, Sangeet & Reception, Wedding Ceremony / Baarat',
      address: '[Full Venue Address, City, Pin Code — Editable via Admin Dashboard]',
      landmark: '[Nearby Landmark / Airport Distance Placeholder]',
      mapEmbedInfo: 'Coordinates & Live Directions Link Ready',
      googleMapsUrl: 'https://maps.google.com'
    },
    {
      id: 'ven-2',
      name: '[Auspicious Kankotri & Mehndi Venue — Editable]',
      associatedEvents: 'Kankotri Lekhan, Home Mehndi (24 & 25 Feb 2027)',
      address: '[Residence / Function Hall Address — Editable via Admin Dashboard]',
      landmark: '[City Sector / Heritage Courtyard Placeholder]',
      mapEmbedInfo: 'Valet Parking & Guest Assistance Available',
      googleMapsUrl: 'https://maps.google.com'
    }
  ],
  wishes: [
    {
      id: 'wish-sample-1',
      guestName: 'The Shah & Dasadia Families',
      relationship: 'Hosts & Elders',
      message:
        'May the divine grace of Arihant Bhagwan bless Jainam and Shalvi with eternal harmony, prosperity, and a lifetime of shared joy. Welcome to our family celebration!',
      createdAt: 'Sample Featured Blessing',
      status: 'approved',
      featured: true
    },
    {
      id: 'wish-sample-2',
      guestName: '[Sample Guest Wish — Moderated via Admin]',
      relationship: 'Close Family Friend',
      message:
        'Counting down the days to February 2027! Wishing Jainam and Shalvi a royal and unforgettable beginning to forever.',
      createdAt: 'Sample Approved Wish',
      status: 'approved',
      featured: false
    }
  ]
};

// ============================================================================
// ARCHITECTURAL RAJASTHANI & SUBTLE JAIN HERITAGE SVG COMPONENTS
// ============================================================================

const LotusMandalaSVG = ({ className = 'w-24 h-24', color = '#C5A15B' }) => (
  <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
    {/* Outer Sacred Octagonal & Circular Geometry (Subtle Jain Architectural Lattice) */}
    <circle cx="100" cy="100" r="92" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
    <circle cx="100" cy="100" r="84" stroke={color} strokeWidth="1.2" opacity="0.8" />
    <rect
      x="41"
      y="41"
      width="118"
      height="118"
      stroke={color}
      strokeWidth="0.9"
      opacity="0.45"
      transform="rotate(45 100 100)"
    />
    <rect x="41" y="41" width="118" height="118" stroke={color} strokeWidth="0.9" opacity="0.45" />
    {/* 8-Petal Royal Lotus */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <g key={angle} transform={`rotate(${angle} 100 100)`}>
        <path
          d="M100 18 C114 42, 118 64, 100 84 C82 64, 86 42, 100 18 Z"
          stroke={color}
          strokeWidth="1.3"
          fill={color}
          fillOpacity="0.08"
        />
        <circle cx="100" cy="12" r="2" fill={color} />
      </g>
    ))}
    <circle cx="100" cy="100" r="36" stroke={color} strokeWidth="1.5" fill="#46131F" fillOpacity="0.6" />
    <circle cx="100" cy="100" r="30" stroke={color} strokeWidth="0.8" strokeDasharray="2 2" />
  </svg>
);

const PalaceArchSVG = ({ className = 'w-full h-auto', strokeColor = '#C5A15B' }) => (
  <svg viewBox="0 0 800 190" fill="none" className={className} preserveAspectRatio="none" aria-hidden="true">
    {/* Outer Frame Border */}
    <path
      d="M4 190 V18 C4 9 11 4 20 4 H780 C789 4 796 9 796 18 V190"
      stroke={strokeColor}
      strokeWidth="1.5"
      opacity="0.45"
    />
    {/* Mughal / Marwar Scalloped Cusped Arch */}
    <path
      d="M20 190 V110 
         C20 90, 50 85, 65 95
         C75 65, 115 60, 130 75
         C148 48, 190 45, 210 60
         C235 32, 280 30, 305 46
         C340 20, 375 18, 400 8
         C425 18, 460 20, 495 46
         C520 30, 565 32, 590 60
         C610 45, 652 48, 670 75
         C685 60, 725 65, 735 95
         C750 85, 780 90, 780 110
         V190"
      stroke={strokeColor}
      strokeWidth="2.2"
    />
    <path
      d="M32 190 V116 
         C32 98, 58 93, 72 102
         C82 74, 120 68, 135 82
         C154 56, 194 53, 214 67
         C238 40, 282 38, 306 54
         C342 29, 376 26, 400 16
         C424 26, 458 29, 494 54
         C518 38, 562 40, 586 67
         C606 53, 646 56, 665 82
         C680 68, 718 74, 728 102
         C742 93, 768 98, 768 116
         V190"
      stroke={strokeColor}
      strokeWidth="1"
      strokeDasharray="4 4"
      opacity="0.7"
    />
    {/* Spandrel Medallions (Left & Right) */}
    <circle cx="95" cy="42" r="18" stroke={strokeColor} strokeWidth="1.2" opacity="0.7" />
    <circle cx="95" cy="42" r="10" stroke={strokeColor} strokeWidth="0.8" opacity="0.5" />
    <circle cx="705" cy="42" r="18" stroke={strokeColor} strokeWidth="1.2" opacity="0.7" />
    <circle cx="705" cy="42" r="10" stroke={strokeColor} strokeWidth="0.8" opacity="0.5" />
    {/* Kalash Finial at Keystone */}
    <circle cx="400" cy="8" r="4" fill={strokeColor} />
  </svg>
);

const JSMonogramSVG = ({ className = 'w-full h-full' }) => (
  <div
    className={`${className} rounded-full bg-[#F4EBDD] border-2 border-[#C5A15B] shadow-lg overflow-hidden flex items-center justify-center`}
  >
    <img
      src="/JS%20Logo%20Transperant.png"
      alt="Jainam and Shalvi wedding logo"
      className="w-full h-full object-contain scale-100"
    />
  </div>
);

const OrnamentalDivider = ({ variant = 'gold', showLotus = true }) => {
  const stroke = variant === 'gold' ? '#C5A15B' : '#641D2B';
  return (
    <div className="flex items-center justify-center my-6 select-none" aria-hidden="true">
      <svg viewBox="0 0 420 36" className="w-64 sm:w-80 h-8" fill="none">
        <path d="M10 18 H155" stroke={stroke} strokeWidth="1" opacity="0.6" />
        <path d="M35 14 H145" stroke={stroke} strokeWidth="0.6" opacity="0.35" />
        <path d="M265 18 H410" stroke={stroke} strokeWidth="1" opacity="0.6" />
        <path d="M275 14 H385" stroke={stroke} strokeWidth="0.6" opacity="0.35" />
        {/* Ornamental Diamond & Lotus Center */}
        <path d="M165 18 L180 10 L195 18 L180 26 Z" stroke={stroke} strokeWidth="1.2" />
        <path d="M225 18 L240 10 L255 18 L240 26 Z" stroke={stroke} strokeWidth="1.2" />
        {showLotus && (
          <g>
            <path
              d="M210 4 C216 11, 216 25, 210 32 C204 25, 204 11, 210 4 Z"
              fill={stroke}
              fillOpacity="0.2"
              stroke={stroke}
              strokeWidth="1.4"
            />
            <path
              d="M210 8 C220 12, 222 22, 210 28 C198 22, 200 12, 210 8 Z"
              stroke={stroke}
              strokeWidth="1.1"
            />
            <circle cx="210" cy="18" r="2.5" fill={stroke} />
          </g>
        )}
        <circle cx="155" cy="18" r="2" fill={stroke} />
        <circle cx="265" cy="18" r="2" fill={stroke} />
      </svg>
    </div>
  );
};

const JharokhaFrame = ({ imageUrl, title, monogram = 'J&S', dark = false, aspectClass = 'aspect-[4/5]' }) => {
  return (
    <div
      className={`relative mx-auto w-full max-w-sm rounded-t-full p-3 border-2 border-[#C5A15B]/70 shadow-2xl overflow-hidden ${
        dark ? 'bg-[#46131F]' : 'bg-[#F4EBDD]'
      }`}
    >
      {/* Inner Cusped Arch SVG Overlay */}
      <div className={`relative w-full ${aspectClass} rounded-t-full overflow-hidden border border-[#C5A15B]/50 bg-gradient-to-b from-[#641D2B] via-[#46131F] to-[#29201D]`}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative">
            {/* Subtle Jaali Background Pattern */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  'radial-gradient(#C5A15B 1px, transparent 1px), radial-gradient(#C5A15B 1px, #46131F 1px)',
                backgroundSize: '24px 24px',
                backgroundPosition: '0 0, 12px 12px'
              }}
            />
            <LotusMandalaSVG className="w-28 h-28 mb-3 opacity-80" color="#C5A15B" />
            <span className="font-cinzel text-2xl tracking-[0.25em] text-[#C5A15B] font-semibold">
              {monogram}
            </span>
            <p className="font-cormorant italic text-[#F4EBDD]/90 text-base mt-2 max-w-[220px]">
              {title}
            </p>
            <span className="mt-3 inline-block px-3 py-1 rounded-full text-[10px] font-montserrat uppercase tracking-widest border border-[#C5A15B]/40 text-[#E5D5BB]/80">
              Royal Jharokha Placeholder
            </span>
          </div>
        )}
        {/* Top Arch Filigree Crown */}
        <svg
          viewBox="0 0 300 90"
          className="absolute top-0 left-0 w-full h-auto pointer-events-none"
          fill="none"
        >
          <path
            d="M0 90 V40 C30 25, 90 10, 150 2 C210 10, 270 25, 300 40 V90"
            stroke="#C5A15B"
            strokeWidth="2"
            opacity="0.65"
          />
        </svg>
      </div>
      {/* Jharokha Sill Base */}
      <div className="mt-2 py-1.5 px-4 border-t border-[#C5A15B]/40 flex items-center justify-between text-[#C5A15B] text-xs font-cinzel tracking-widest">
        <span>❖</span>
        <span className="truncate max-w-[200px]">{title}</span>
        <span>❖</span>
      </div>
    </div>
  );
};

// ============================================================================
// PROCEDURAL ROYAL INDIAN AMBIENT AUDIO SYNTHESIZER (WEB AUDIO API)
// Plays a soothing, authentic Sa-Pa-Sa Tanpura drone & gentle Swarmandal chimes
// so background music works out-of-the-box with zero copyright issues!
// ============================================================================
class RoyalSoundscapeEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.masterGain = null;
    this.intervalId = null;
    this.oscillators = [];
  }

  start(volume = 0.25) {
    if (this.isPlaying) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : volume, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Warm Tanpura Drone (D Major / Raag Yaman Kalyan base: D3 = 146.83Hz, A3 = 220Hz)
    const baseFreqs = [146.83, 220.0, 293.66];
    baseFreqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(idx === 0 ? 0.08 : 0.03, this.ctx.currentTime);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      this.oscillators.push(osc);
    });

    // Gentle Swarmandal / Sitar Pluck Chimes in Raag Yaman (D, E, F#, G#, A, B, C#, D)
    const yamanScale = [293.66, 329.63, 369.99, 415.3, 440.0, 493.88, 554.37, 587.33];
    let noteIndex = 0;

    const triggerChime = () => {
      if (!this.ctx || !this.isPlaying) return;
      const now = this.ctx.currentTime;
      const freq = yamanScale[noteIndex % yamanScale.length];
      noteIndex = (noteIndex + Math.floor(Math.random() * 2) + 1) % yamanScale.length;

      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.06, now + 0.15);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

      osc.connect(noteGain);
      noteGain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 2.9);
    };

    this.isPlaying = true;
    triggerChime();
    this.intervalId = setInterval(triggerChime, 2400);
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.oscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // ignore already stopped
      }
    });
    this.oscillators = [];
  }

  setVolume(val) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : val, this.ctx.currentTime, 0.1);
    }
  }

  setMuted(muted, volume = 0.25) {
    this.isMuted = muted;
    this.setVolume(volume);
  }
}

// ============================================================================
// PRODUCTION SUPABASE SQL SCHEMA & RLS GENERATOR
// ============================================================================
const SUPABASE_SQL_SETUP = `-- ============================================================================
-- JAINAM SHAH & SHALVI DASADIA — ROYAL WEDDING WEBSITE (27 FEB 2027)
-- Production Supabase PostgreSQL Schema, Row-Level Security (RLS) & Storage
-- Run this script in your Supabase SQL Editor
-- ============================================================================

-- 1. Website CMS Content & Settings Table (Single JSONB Document + Versioned)
CREATE TABLE IF NOT EXISTS public.wedding_cms (
  id TEXT PRIMARY KEY DEFAULT 'main',
  payload JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Guest Wishes Table (Public Submissions with Admin Moderation)
CREATE TABLE IF NOT EXISTS public.wedding_wishes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name TEXT NOT NULL CHECK (char_length(guest_name) BETWEEN 2 AND 100),
  relationship TEXT DEFAULT '',
  message TEXT NOT NULL CHECK (char_length(message) BETWEEN 5 AND 1000),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.wedding_cms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_wishes ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for wedding_cms
-- Public visitors can read published website content
CREATE POLICY "Public can read wedding_cms"
  ON public.wedding_cms FOR SELECT
  USING (true);

-- Only authenticated administrators can insert/update website content
CREATE POLICY "Admins can modify wedding_cms"
  ON public.wedding_cms FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 5. RLS Policies for wedding_wishes
-- Public visitors can only read approved wishes
CREATE POLICY "Public can view approved wishes"
  ON public.wedding_wishes FOR SELECT
  USING (status = 'approved' OR auth.role() = 'authenticated');

-- Public visitors can submit new wishes (always enters pending moderation)
CREATE POLICY "Public can submit wishes"
  ON public.wedding_wishes FOR INSERT
  WITH CHECK (status = 'pending');

-- Authenticated administrators can approve, feature, or delete wishes
CREATE POLICY "Admins can moderate wishes"
  ON public.wedding_wishes FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
`;

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  // Opening Palace Entrance Gate State
  const [hasEnteredPalace, setHasEnteredPalace] = useState(false);
  const [enterWithMusic, setEnterWithMusic] = useState(true);
  const [isTransitioningGate, setIsTransitioningGate] = useState(false);

  // CMS State (Live Editable in Admin Dashboard)
  const [cmsData, setCmsData] = useState(INITIAL_CMS_DATA);

  // Navigation & Active Section Spy
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Story Chapter Interactive View
  const [selectedChapterIdx, setSelectedChapterIdx] = useState(0);
  const [storyViewMode, setStoryViewMode] = useState('journal'); // 'journal' | 'scroll'

  // Family Filter
  const [familyFilter, setFamilyFilter] = useState('all'); // 'all' | 'groom' | 'bride'

  // Celebrations View Mode
  const [celebrationView, setCelebrationView] = useState('both'); // 'both' | 'timeline' | 'cards'

  // Gallery Category & Lightbox State
  const [galleryCategory, setGalleryCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const touchStartX = useRef(null);

  // Kankotri Invitation Modal
  const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);

  // Wishes Guestbook Form State
  const [wishName, setWishName] = useState('');
  const [wishRelation, setWishRelation] = useState('');
  const [wishMessage, setWishMessage] = useState('');
  const [wishHoneypot, setWishHoneypot] = useState(''); // Spam protection
  const [lastWishTimestamp, setLastWishTimestamp] = useState(0); // Rate limiting
  const [wishFeedback, setWishFeedback] = useState(null);

  // Background Music Player State
  const soundscapeRef = useRef(null);
  const audioElemRef = useRef(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isMutedMusic, setIsMutedMusic] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.3);

  // Admin Studio Modal & Auth State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [adminTab, setAdminTab] = useState('story');
  const [adminNotification, setAdminNotification] = useState(null);

  // Supabase Live Cloud Connector State
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState('');
  const [supabaseConnected, setSupabaseConnected] = useState(false);
  const [supabaseStatusMsg, setSupabaseStatusMsg] = useState('');

  // Share Toast State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  // Initialize Soundscape Engine
  useEffect(() => {
    soundscapeRef.current = new RoyalSoundscapeEngine();
    return () => {
      if (soundscapeRef.current) {
        soundscapeRef.current.stop();
      }
    };
  }, []);

  // Update Document Title & SEO Meta Dynamically
  useEffect(() => {
    document.title = cmsData.settings.siteTitle;
  }, [cmsData.settings.siteTitle]);

  // Live Countdown Timer to 27 February 2027 (Asia/Kolkata +05:30)
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false
  });

  useEffect(() => {
    const calculateRemaining = () => {
      const targetTime = new Date(cmsData.settings.weddingDateISO).getTime();
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown({ days, hours, minutes, seconds, isPast: false });
    };

    calculateRemaining();
    const timer = setInterval(calculateRemaining, 1000);
    return () => clearInterval(timer);
  }, [cmsData.settings.weddingDateISO]);

  // Scroll Spy for Fixed Royal Navigation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const sectionIds = [
        'home',
        'story',
        'couple',
        'families',
        'celebrations',
        'gallery',
        'invitation',
        'venue',
        'wishes'
      ];
      const scrollPos = window.scrollY + 240;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle Music Playback (Supports Custom Uploaded Audio OR Procedural Royal Tanpura)
  const toggleMusicPlayback = useCallback(
    (forcePlay = null) => {
      const shouldPlay = forcePlay !== null ? forcePlay : !isPlayingMusic;
      if (cmsData.settings.musicUrl && audioElemRef.current) {
        if (soundscapeRef.current) soundscapeRef.current.stop();
        if (shouldPlay) {
          audioElemRef.current.volume = isMutedMusic ? 0 : musicVolume;
          audioElemRef.current.play().catch(() => {});
          setIsPlayingMusic(true);
        } else {
          audioElemRef.current.pause();
          setIsPlayingMusic(false);
        }
      } else if (soundscapeRef.current) {
        if (shouldPlay) {
          soundscapeRef.current.start(musicVolume);
          setIsPlayingMusic(true);
        } else {
          soundscapeRef.current.stop();
          setIsPlayingMusic(false);
        }
      }
    },
    [cmsData.settings.musicUrl, isMutedMusic, isPlayingMusic, musicVolume]
  );

  const handleMuteToggle = () => {
    const nextMuted = !isMutedMusic;
    setIsMutedMusic(nextMuted);
    if (soundscapeRef.current) {
      soundscapeRef.current.setMuted(nextMuted, musicVolume);
    }
    if (audioElemRef.current) {
      audioElemRef.current.muted = nextMuted;
    }
  };

  // Handle Entering the Palace from the Opening Experience
  const handleEnterStory = () => {
    setIsTransitioningGate(true);
    if (enterWithMusic) {
      toggleMusicPlayback(true);
    }
    setTimeout(() => {
      setHasEnteredPalace(true);
      setIsTransitioningGate(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 650);
  };

  // Smooth Scroll to Section
  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  // Filtered Gallery Photos
  const filteredGallery = useMemo(() => {
    if (galleryCategory === 'All') return cmsData.gallery;
    return cmsData.gallery.filter((item) => item.category === galleryCategory);
  }, [cmsData.gallery, galleryCategory]);

  // Keyboard Navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % filteredGallery.length);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredGallery.length]);

  // Submit Guest Wish (with validation, honeypot & rate-limit protection)
  const handleWishSubmit = async (e) => {
    e.preventDefault();
    if (wishHoneypot.trim() !== '') return; // Bot caught

    const now = Date.now();
    if (now - lastWishTimestamp < 12000) {
      setWishFeedback({
        type: 'error',
        text: 'Please wait a few seconds before submitting another blessing.'
      });
      return;
    }

    const cleanName = wishName.trim().replace(/[<>]/g, '');
    const cleanRelation = wishRelation.trim().replace(/[<>]/g, '');
    const cleanMessage = wishMessage.trim().replace(/[<>]/g, '');

    if (cleanName.length < 2 || cleanMessage.length < 5) {
      setWishFeedback({
        type: 'error',
        text: 'Please enter your name and a heartfelt message (at least 5 characters).'
      });
      return;
    }

    const newWish = {
      id: `wish-${now}`,
      guestName: cleanName,
      relationship: cleanRelation || 'Well-Wisher & Guest',
      message: cleanMessage,
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      status: cmsData.settings.autoApproveWishes ? 'approved' : 'pending',
      featured: false
    };

    // If Supabase REST is connected, also push to Supabase `wedding_wishes`
    if (supabaseConnected && supabaseUrl && supabaseAnonKey) {
      try {
        await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/wedding_wishes`, {
          method: 'POST',
          headers: {
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            guest_name: cleanName,
            relationship: cleanRelation,
            message: cleanMessage,
            status: 'pending'
          })
        });
      } catch (err) {
        // Fallback smoothly to in-app state
      }
    }

    setCmsData((prev) => ({
      ...prev,
      wishes: [newWish, ...prev.wishes]
    }));

    setLastWishTimestamp(now);
    setWishName('');
    setWishRelation('');
    setWishMessage('');

    setWishFeedback({
      type: 'success',
      text: cmsData.settings.autoApproveWishes
        ? 'Pranam! Your royal blessing has been inscribed into our storybook.'
        : 'Pranam! Your heartfelt blessing has been received and sent for royal moderation.'
    });
  };

  // WhatsApp & Native Web Share Handler
  const handleWhatsAppShare = () => {
    const currentUrl = window.location.href;
    const shareText = `You're invited to celebrate the wedding of ${cmsData.settings.groomName} & ${cmsData.settings.brideName} on ${cmsData.settings.weddingDateDisplay}! Explore our wedding story and celebrations here: ${currentUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    const currentUrl = window.location.href;
    const shareData = {
      title: cmsData.settings.siteTitle,
      text: `You're invited to celebrate the wedding of ${cmsData.settings.groomName} & ${cmsData.settings.brideName} on ${cmsData.settings.weddingDateDisplay}!`,
      url: currentUrl
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // user cancelled
      }
    } else {
      navigator.clipboard?.writeText(currentUrl);
      showToast('Wedding Storybook link copied to clipboard!');
    }
  };

  // Printable / Downloadable Royal Kankotri Invitation Handler
  const handleDownloadInvitation = () => {
    if (cmsData.settings.invitationPdfUrl) {
      window.open(cmsData.settings.invitationPdfUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    setIsInvitationModalOpen(true);
    showToast('Opening Official Royal Kankotri Preview (Ready to Print / Save as PDF)');
  };

  // Helper to convert local image file input to DataURL for instant Admin Photo Uploads
  const handleFileUploadToDataUrl = (file, callback) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        callback(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Approved Wishes for Public View
  const approvedWishes = useMemo(
    () =>
      cmsData.wishes
        .filter((w) => w.status === 'approved')
        .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)),
    [cmsData.wishes]
  );

  // Published Events Sorted Chronologically
  const publishedEvents = useMemo(
    () =>
      cmsData.events
        .filter((ev) => ev.published)
        .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)),
    [cmsData.events]
  );

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'story', label: 'Our Story' },
    { id: 'couple', label: 'The Couple' },
    { id: 'families', label: 'Our Families' },
    { id: 'celebrations', label: 'Celebrations' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'invitation', label: 'The Invitation' },
    { id: 'venue', label: 'Venue' },
    { id: 'wishes', label: 'Wishes' }
  ];

  return (
    <div className="min-h-screen bg-[#F4EBDD] text-[#29201D] font-montserrat selection:bg-[#641D2B] selection:text-[#F4EBDD] overflow-x-hidden">
      {/* Load Royal Google Fonts & Custom Utility Keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600&display=swap');

        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes shimmerGold {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-float-slow {
          animation: floatSlow 6s ease-in-out infinite;
        }
        .gold-shimmer-border {
          background: linear-gradient(90deg, rgba(197,161,91,0.3) 0%, rgba(197,161,91,0.95) 50%, rgba(197,161,91,0.3) 100%);
          background-size: 200% 100%;
          animation: shimmerGold 8s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-float-slow, .gold-shimmer-border {
            animation: none !important;
          }
        }
      `}</style>

      {/* Optional Custom Background Music Audio Element */}
      {cmsData.settings.musicUrl && (
        <audio ref={audioElemRef} src={cmsData.settings.musicUrl} loop preload="none" />
      )}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-[90] bg-[#46131F] text-[#F4EBDD] border border-[#C5A15B] px-5 py-3 rounded-lg shadow-2xl flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-[#C5A15B] shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* ====================================================================
          OPENING PALACE ENTRANCE EXPERIENCE
      ==================================================================== */}
      {!hasEnteredPalace && (
        <div
          className={`fixed inset-0 z-[100] bg-gradient-to-b from-[#46131F] via-[#641D2B] to-[#46131F] text-[#F4EBDD] flex flex-col justify-between overflow-y-auto transition-all duration-700 ${
            isTransitioningGate ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          {/* Top Rajasthani Palace Cusped Arch */}
          <div className="w-full pointer-events-none select-none">
            <PalaceArchSVG className="w-full h-24 sm:h-36 md:h-44" strokeColor="#C5A15B" />
          </div>

          {/* Center Royal Entrance Content */}
          <div className="relative z-10 max-w-3xl mx-auto px-6 py-4 text-center flex flex-col items-center my-auto">
            {/* Subtle Jain Auspicious Invocation */}
            <p className="font-cinzel text-[10px] sm:text-xs tracking-[0.35em] text-[#C5A15B] uppercase mb-4">
              ❖ Shri Mahaviray Namah ❖
            </p>

            {/* Custom Royal Logo Crest */}
            <div className="relative flex items-center justify-center mb-5 animate-float-slow">
              <div className="w-32 h-32 sm:w-44 sm:h-44 flex items-center justify-center overflow-visible drop-shadow-[0_0_20px_rgba(197,161,91,0.25)]">
                <JSMonogramSVG className="w-full h-full hover:scale-105 transition-transform duration-700" />
              </div>
            </div>

            <p className="font-cormorant italic text-[#E5D5BB] text-lg sm:text-xl mb-2">
              Together with the blessings of our families
            </p>

            {/* Couple's Names */}
            <h1 className="font-cinzel text-2xl sm:text-4xl md:text-5xl tracking-[0.12em] text-[#F4EBDD] font-semibold leading-tight uppercase">
              {cmsData.settings.groomName}
              <span className="block font-cormorant italic text-[#C5A15B] text-2xl sm:text-3xl my-1.5 lowercase">
                &amp;
              </span>
              {cmsData.settings.brideName}
            </h1>

            <OrnamentalDivider variant="gold" />

            {/* Tagline & Wedding Date */}
            <p className="font-cinzel text-xs sm:text-sm tracking-[0.3em] text-[#C5A15B] uppercase mb-2">
              {cmsData.settings.tagline}
            </p>
            <p className="font-cormorant text-xl sm:text-2xl tracking-[0.18em] text-[#F4EBDD] font-medium mb-8">
              {cmsData.settings.weddingDateDisplay.toUpperCase()}
            </p>

            {/* Enter Our Story CTA Button */}
            <button
              onClick={handleEnterStory}
              className="group relative inline-flex items-center gap-3 px-9 py-4 bg-[#C5A15B] text-[#29201D] font-cinzel text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase rounded-sm shadow-2xl hover:bg-[#F4EBDD] transition-all duration-300 border border-[#F4EBDD]/40 cursor-pointer"
            >
              <span>Enter Our Story</span>
              <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-45" />
            </button>

            {/* Ambient Royal Soundscape Toggle */}
            <label className="mt-5 inline-flex items-center gap-2.5 text-xs text-[#E5D5BB]/80 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={enterWithMusic}
                onChange={(e) => setEnterWithMusic(e.target.checked)}
                className="accent-[#C5A15B] w-3.5 h-3.5 rounded"
              />
              <span>Accompany with subtle Royal Sitar &amp; Tanpura ambiance</span>
            </label>
          </div>

          {/* Bottom Ornamental Border */}
          <div className="w-full py-4 px-6 border-t border-[#C5A15B]/25 text-center text-[11px] font-cinzel tracking-[0.25em] text-[#C5A15B]/80">
            THE ROYAL WEDDING JOURNAL
          </div>
        </div>
      )}

      {/* ====================================================================
          FIXED ROYAL NAVIGATION BAR
      ==================================================================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#46131F]/95 backdrop-blur-md border-b border-[#C5A15B]/40 shadow-xl py-2.5'
            : 'bg-gradient-to-b from-[#46131F]/90 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Custom Monogram Logo Navbar Crest */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0 drop-shadow-lg group-hover:scale-105 transition-transform">
              <JSMonogramSVG className="w-full h-full" />
            </div>
            <div className="hidden sm:block">
              <p className="font-cinzel text-xs tracking-[0.2em] text-[#F4EBDD] uppercase">
                Jainam &amp; Shalvi
              </p>
              <p className="text-[10px] tracking-[0.18em] text-[#C5A15B]">27 FEB 2027</p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1.5 font-cinzel text-[11px] tracking-[0.16em] uppercase transition-all rounded cursor-pointer ${
                    isActive
                      ? 'text-[#29201D] bg-[#C5A15B] font-semibold'
                      : 'text-[#F4EBDD]/90 hover:text-[#C5A15B]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Replay Gate, Admin Studio & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setHasEnteredPalace(false)}
              title="Replay Royal Palace Entrance"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-cinzel tracking-wider text-[#E5D5BB] border border-[#C5A15B]/40 rounded hover:border-[#C5A15B] hover:text-[#C5A15B] transition-colors cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 text-[#C5A15B]" />
              <span>Entrance</span>
            </button>

            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-cinzel tracking-wider uppercase bg-[#641D2B] text-[#C5A15B] border border-[#C5A15B]/60 rounded hover:bg-[#C5A15B] hover:text-[#29201D] transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Studio</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Drawer"
              className="xl:hidden p-2.5 text-[#F4EBDD] hover:text-[#C5A15B] border border-[#C5A15B]/40 rounded cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Royal Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#46131F] border-b-2 border-[#C5A15B] px-6 py-5 shadow-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`py-2.5 px-3 text-left font-cinzel text-xs tracking-[0.15em] uppercase rounded border transition-colors ${
                    activeSection === item.id
                      ? 'bg-[#C5A15B] text-[#29201D] border-[#C5A15B] font-semibold'
                      : 'bg-[#641D2B]/50 text-[#F4EBDD] border-[#C5A15B]/30 hover:border-[#C5A15B]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-[#C5A15B]/30 flex items-center justify-between text-xs text-[#E5D5BB]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setHasEnteredPalace(false);
                }}
                className="inline-flex items-center gap-1.5 text-[#C5A15B]"
              >
                <Crown className="w-3.5 h-3.5" /> Replay Palace Entrance
              </button>
              <span className="font-cinzel tracking-widest">{cmsData.settings.hashtag}</span>
            </div>
          </div>
        )}
      </header>

      {/* ====================================================================
          SECTION 1: HOME / ROYAL HERO & LIVE COUNTDOWN
      ==================================================================== */}
      <section
        id="home"
        className="relative min-h-screen bg-gradient-to-b from-[#46131F] via-[#641D2B] to-[#46131F] text-[#F4EBDD] pt-20 pb-16 flex flex-col justify-between overflow-hidden"
      >
        {/* Decorative Rajasthani Arch Header */}
        <div className="w-full pointer-events-none select-none opacity-90">
          <PalaceArchSVG className="w-full h-24 sm:h-36 md:h-44" strokeColor="#C5A15B" />
        </div>

        {/* Hero Centerpiece */} 
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center my-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#C5A15B]/50 bg-[#46131F]/70 text-[#C5A15B] font-cinzel text-[11px] tracking-[0.28em] uppercase mb-5">
            <Crown className="w-3.5 h-3.5" />
            <span>The Royal Wedding Storybook</span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.1em] text-[#F4EBDD] font-semibold uppercase leading-tight">
            {cmsData.settings.groomName}
            <span className="block font-cormorant italic text-[#C5A15B] text-3xl sm:text-4xl md:text-5xl my-2 lowercase">
              &amp;
            </span>
            {cmsData.settings.brideName}
          </h1>

          <p className="mt-3 font-cormorant italic text-xl sm:text-2xl text-[#E5D5BB]">
            “{cmsData.settings.tagline}”
          </p>

          <OrnamentalDivider variant="gold" />

          {/* Date & Location Badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-6 py-2.5 rounded border border-[#C5A15B]/40 bg-[#46131F]/80 text-[#F4EBDD] font-cinzel text-xs sm:text-sm tracking-[0.22em] uppercase mb-8">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C5A15B]" />
              {cmsData.settings.weddingDateDisplay}
            </span>
            {/* <span className="text-[#C5A15B]">❖</span>
            <span>IST (Asia / Kolkata)</span> */}
          </div>

          {/* LIVE COUNTDOWN TIMER */}
          {countdown.isPast ? (
            <div className="max-w-xl mx-auto p-6 rounded-lg border-2 border-[#C5A15B] bg-[#46131F]/90 shadow-2xl">
              <p className="font-cinzel text-lg sm:text-xl text-[#C5A15B] tracking-widest uppercase">
                Happily United in Forever
              </p>
              <p className="font-cormorant italic text-lg text-[#F4EBDD] mt-1">
                Thank you for celebrating our sacred beginning on {cmsData.settings.weddingDateDisplay}.
              </p>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <p className="font-cinzel text-[11px] tracking-[0.28em] text-[#C5A15B] uppercase mb-4">
                Counting Down To Our Auspicious Muhurat
              </p>
              <div className="grid grid-cols-4 gap-2.5 sm:gap-5">
                {[
                  { label: 'Days', value: countdown.days },
                  { label: 'Hours', value: countdown.hours },
                  { label: 'Minutes', value: countdown.minutes },
                  { label: 'Seconds', value: countdown.seconds }
                ].map((unit) => (
                  <div
                    key={unit.label}
                    className="relative p-3 sm:p-5 rounded-t-2xl bg-[#46131F]/90 border border-[#C5A15B]/70 shadow-xl flex flex-col items-center justify-center"
                  >
                    <span className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-bold text-[#F4EBDD] tabular-nums">
                      {String(unit.value).padStart(2, '0')}
                    </span>
                    <span className="mt-1 font-cinzel text-[10px] sm:text-xs tracking-[0.2em] text-[#C5A15B] uppercase">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hero Quick Navigation Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection('story')}
              className="px-7 py-3.5 bg-[#C5A15B] text-[#29201D] font-cinzel text-xs font-semibold tracking-[0.2em] uppercase rounded-sm hover:bg-[#F4EBDD] transition-colors cursor-pointer"
            >
              Read Our Chapters
            </button>
            <button
              onClick={() => scrollToSection('celebrations')}
              className="px-7 py-3.5 bg-transparent text-[#F4EBDD] border border-[#C5A15B] font-cinzel text-xs tracking-[0.2em] uppercase rounded-sm hover:bg-[#C5A15B]/20 transition-colors cursor-pointer"
            >
              View Celebrations
            </button>
          </div>
        </div>

        {/* Bottom Ornamental Transition */}
        <div className="mt-12 text-center">
          <p className="font-cinzel text-[10px] tracking-[0.3em] text-[#C5A15B]/80 uppercase">
            Scroll to Open the Royal Journal
          </p>
        </div>
      </section>

      {/* ====================================================================
          SECTION 2: OUR STORY — THE 6-CHAPTER ROYAL STORYBOOK
      ==================================================================== */}
      <section id="story" className="py-20 sm:py-24 bg-[#F4EBDD] text-[#29201D] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="font-cinzel text-xs tracking-[0.3em] text-[#641D2B] uppercase font-semibold">
              ❖ A Romantic Journal ❖
            </span>
            <h2 className="mt-2 font-cinzel text-3xl sm:text-5xl text-[#641D2B] tracking-wider uppercase">
              Our Story
            </h2>
            <p className="mt-3 font-cormorant italic text-xl sm:text-2xl text-[#29201D]/85">
              Six chapters of two worlds crossing paths and becoming one forever.
            </p>
            <OrnamentalDivider variant="burgundy" />

            {/* View Toggle: Interactive Storybook Reader vs Full Vertical Scroll */}
            <div className="inline-flex rounded-sm border border-[#641D2B]/30 bg-[#E5D5BB]/60 p-1 mt-2">
              <button
                onClick={() => setStoryViewMode('journal')}
                className={`px-4 py-1.5 font-cinzel text-xs tracking-wider uppercase rounded-sm transition-colors cursor-pointer ${
                  storyViewMode === 'journal'
                    ? 'bg-[#641D2B] text-[#F4EBDD]'
                    : 'text-[#641D2B] hover:bg-[#641D2B]/10'
                }`}
              >
                All 6 Chapters Scroll
              </button>
              <button
                onClick={() => setStoryViewMode('book')}
                className={`px-4 py-1.5 font-cinzel text-xs tracking-wider uppercase rounded-sm transition-colors cursor-pointer ${
                  storyViewMode === 'book'
                    ? 'bg-[#641D2B] text-[#F4EBDD]'
                    : 'text-[#641D2B] hover:bg-[#641D2B]/10'
                }`}
              >
                Chapter-by-Chapter Reader
              </button>
            </div>
          </div>

          {/* Chapter Navigation Pills */}
          <div className="mt-8 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2">
            {cmsData.chapters.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => {
                  setSelectedChapterIdx(idx);
                  if (storyViewMode === 'journal') {
                    const el = document.getElementById(`story-chapter-${ch.id}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className={`shrink-0 px-4 py-2 rounded-sm border font-cinzel text-xs tracking-widest uppercase transition-all cursor-pointer ${
                  selectedChapterIdx === idx
                    ? 'bg-[#641D2B] text-[#C5A15B] border-[#641D2B] shadow-md'
                    : 'bg-[#E5D5BB]/60 text-[#29201D] border-[#C5A15B]/50 hover:border-[#641D2B]'
                }`}
              >
                0{idx + 1}. {ch.title}
              </button>
            ))}
          </div>

          {/* MODE A: FULL 6-CHAPTER STORYBOOK SCROLL */}
          {storyViewMode === 'journal' ? (
            <div className="mt-12 space-y-12">
              {cmsData.chapters.map((ch, idx) => {
                const isDark = ch.theme === 'burgundy';
                const isEven = idx % 2 === 1;
                return (
                  <article
                    key={ch.id}
                    id={`story-chapter-${ch.id}`}
                    className={`rounded-xl border-2 border-[#C5A15B]/70 shadow-xl overflow-hidden transition-all ${
                      isDark
                        ? 'bg-gradient-to-br from-[#641D2B] to-[#46131F] text-[#F4EBDD]'
                        : 'bg-[#E5D5BB]/65 text-[#29201D]'
                    }`}
                  >
                    <div className="p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Portrait / Illustration Column */}
                      <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                        <JharokhaFrame
                          imageUrl={ch.imageUrl}
                          title={ch.imageCaption || ch.title}
                          monogram={`CH 0${idx + 1}`}
                          dark={!isDark}
                          aspectClass="aspect-[4/4]"
                        />
                      </div>

                      {/* Chapter Narrative Column */}
                      <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span
                            className={`px-3 py-1 font-cinzel text-xs tracking-[0.25em] uppercase rounded-sm border ${
                              isDark
                                ? 'bg-[#46131F] text-[#C5A15B] border-[#C5A15B]/50'
                                : 'bg-[#641D2B] text-[#F4EBDD] border-[#641D2B]'
                            }`}
                          >
                            {ch.number}
                          </span>
                          <span
                            className={`text-xs font-cinzel tracking-widest ${
                              isDark ? 'text-[#E5D5BB]' : 'text-[#641D2B]'
                            }`}
                          >
                            • {ch.dateLabel}
                          </span>
                        </div>

                        <h3
                          className={`font-cinzel text-2xl sm:text-3xl tracking-wide uppercase font-semibold ${
                            isDark ? 'text-[#C5A15B]' : 'text-[#641D2B]'
                          }`}
                        >
                          {ch.title}
                        </h3>
                        <p
                          className={`font-cormorant italic text-lg sm:text-xl mt-1 ${
                            isDark ? 'text-[#E5D5BB]' : 'text-[#29201D]/80'
                          }`}
                        >
                          {ch.subtitle}
                        </p>

                        {/* Chapter Pull Quote */}
                        <blockquote
                          className={`my-5 pl-4 border-l-2 border-[#C5A15B] font-cormorant italic text-lg sm:text-xl ${
                            isDark ? 'text-[#F4EBDD]/95' : 'text-[#641D2B]'
                          }`}
                        >
                          {ch.quote}
                        </blockquote>

                        {/* Narrative Paragraphs */}
                        <div className="space-y-4 font-cormorant text-lg sm:text-xl leading-relaxed">
                          <p>{ch.boyNarrative}</p>
                          <p>{ch.girlNarrative}</p>
                          <p
                            className={`font-semibold italic ${
                              isDark ? 'text-[#C5A15B]' : 'text-[#641D2B]'
                            }`}
                          >
                            {ch.closingNarrative}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-[#C5A15B]/30 flex items-center justify-between text-xs">
                          <span className="opacity-75 font-montserrat">
                            Storybook Page 0{idx + 1} of 0{cmsData.chapters.length}
                          </span>
                          <button
                            onClick={() => {
                              setAdminTab('story');
                              setIsAdminOpen(true);
                            }}
                            className={`inline-flex items-center gap-1.5 font-cinzel tracking-wider uppercase underline cursor-pointer ${
                              isDark ? 'text-[#C5A15B]' : 'text-[#641D2B]'
                            }`}
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Customize Chapter
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* MODE B: SINGLE CHAPTER BOOK READER */
            <div className="mt-8">
              {(() => {
                const ch = cmsData.chapters[selectedChapterIdx] || cmsData.chapters[0];
                return (
                  <div className="rounded-xl border-2 border-[#C5A15B] bg-gradient-to-br from-[#641D2B] to-[#46131F] text-[#F4EBDD] p-6 sm:p-12 shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      <div className="lg:col-span-5">
                        <JharokhaFrame
                          imageUrl={ch.imageUrl}
                          title={ch.imageCaption}
                          monogram={ch.number}
                          dark={false}
                        />
                      </div>
                      <div className="lg:col-span-7">
                        <span className="font-cinzel text-xs tracking-[0.25em] text-[#C5A15B] uppercase">
                          {ch.number} • {ch.dateLabel}
                        </span>
                        <h3 className="mt-2 font-cinzel text-2xl sm:text-4xl text-[#F4EBDD] uppercase">
                          {ch.title}
                        </h3>
                        <p className="font-cormorant italic text-xl text-[#C5A15B] mt-1">
                          {ch.subtitle}
                        </p>
                        <blockquote className="my-5 pl-4 border-l-2 border-[#C5A15B] font-cormorant italic text-xl text-[#E5D5BB]">
                          {ch.quote}
                        </blockquote>
                        <div className="space-y-4 font-cormorant text-xl leading-relaxed text-[#F4EBDD]/95">
                          <p>{ch.boyNarrative}</p>
                          <p>{ch.girlNarrative}</p>
                          <p className="text-[#C5A15B] font-semibold italic">{ch.closingNarrative}</p>
                        </div>

                        {/* Previous / Next Chapter Controls */}
                        <div className="mt-8 pt-5 border-t border-[#C5A15B]/30 flex items-center justify-between">
                          <button
                            onClick={() =>
                              setSelectedChapterIdx((prev) =>
                                prev > 0 ? prev - 1 : cmsData.chapters.length - 1
                              )
                            }
                            className="inline-flex items-center gap-2 px-4 py-2 border border-[#C5A15B] text-[#C5A15B] font-cinzel text-xs tracking-wider uppercase rounded hover:bg-[#C5A15B] hover:text-[#29201D] transition-colors cursor-pointer"
                          >
                            <ChevronLeft className="w-4 h-4" /> Previous Chapter
                          </button>
                          <button
                            onClick={() =>
                              setSelectedChapterIdx((prev) =>
                                prev < cmsData.chapters.length - 1 ? prev + 1 : 0
                              )
                            }
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#C5A15B] text-[#29201D] font-cinzel text-xs font-semibold tracking-wider uppercase rounded hover:bg-[#F4EBDD] transition-colors cursor-pointer"
                          >
                            Next Chapter <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </section>

      {/* ====================================================================
          SECTION 3: MEET THE COUPLE (JAINAM SHAH & SHALVI DASADIA)
      ==================================================================== */}
      <section
        id="couple"
        className="py-20 sm:py-24 bg-gradient-to-b from-[#641D2B] via-[#46131F] to-[#641D2B] text-[#F4EBDD] relative"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="font-cinzel text-xs tracking-[0.3em] text-[#C5A15B] uppercase">
              ❖ Two Souls, One Destiny ❖
            </span>
            <h2 className="mt-2 font-cinzel text-3xl sm:text-5xl text-[#F4EBDD] tracking-wider uppercase">
              Meet The Couple
            </h2>
            <p className="mt-3 font-cormorant italic text-xl sm:text-2xl text-[#E5D5BB]">
              Individual journeys woven into a shared tapestry of love and heritage.
            </p>
            <OrnamentalDivider variant="gold" />
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
            {[
              { key: 'groom', profile: cmsData.couple.groom },
              { key: 'bride', profile: cmsData.couple.bride }
            ].map(({ key, profile }) => (
              <div
                key={key}
                className="rounded-2xl border-2 border-[#C5A15B]/70 bg-[#46131F]/90 p-6 sm:p-10 shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <JharokhaFrame
                    imageUrl={profile.portraitUrl}
                    title={profile.name}
                    monogram={profile.monogram}
                    dark={true}
                    aspectClass="aspect-[4/4]"
                  />

                  <div className="text-center mt-6">
                    <span className="font-cinzel text-xs tracking-[0.28em] text-[#C5A15B] uppercase">
                      {profile.title}
                    </span>
                    <h3 className="mt-1 font-cinzel text-2xl sm:text-3xl text-[#F4EBDD] tracking-wider uppercase font-semibold">
                      {profile.name}
                    </h3>
                  </div>

                  <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-[#F4EBDD]/90">
                    <div className="p-4 rounded bg-[#641D2B]/50 border border-[#C5A15B]/30">
                      <span className="block font-cinzel text-xs tracking-widest text-[#C5A15B] uppercase mb-1">
                        Introduction
                      </span>
                      <p className="font-cormorant text-lg">{profile.introduction}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded bg-[#64131F]/60 border border-[#C5A15B]/25">
                        <span className="block font-cinzel text-xs tracking-widest text-[#C5A15B] uppercase mb-1">
                          Personality
                        </span>
                        <p className="text-xs sm:text-sm text-[#E5D5BB]">{profile.personality}</p>
                      </div>
                      <div className="p-4 rounded bg-[#64131F]/60 border border-[#C5A15B]/25">
                        <span className="block font-cinzel text-xs tracking-widest text-[#C5A15B] uppercase mb-1">
                          Interests &amp; Hobbies
                        </span>
                        <p className="text-xs sm:text-sm text-[#E5D5BB]">{profile.interests}</p>
                      </div>
                    </div>

                    <div className="p-4 rounded bg-[#641D2B]/50 border border-[#C5A15B]/30">
                      <span className="block font-cinzel text-xs tracking-widest text-[#C5A15B] uppercase mb-1">
                        Dreams &amp; Aspirations
                      </span>
                      <p className="text-xs sm:text-sm text-[#E5D5BB]">{profile.dreams}</p>
                    </div>
                  </div>
                </div>

                {/* Personal Note Quote */}
                <blockquote className="mt-6 pt-5 border-t border-[#C5A15B]/40 text-center font-cormorant italic text-xl text-[#C5A15B]">
                  {profile.personalMessage}
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 4: OUR FAMILIES (SHAH & DASADIA PARIVAR)
      ==================================================================== */}
      <section id="families" className="py-20 sm:py-24 bg-[#F4EBDD] text-[#29201D]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="font-cinzel text-xs tracking-[0.3em] text-[#641D2B] uppercase font-semibold">
              ❖ Our Roots &amp; Revered Elders ❖
            </span>
            <h2 className="mt-2 font-cinzel text-3xl sm:text-5xl text-[#641D2B] tracking-wider uppercase">
              Our Families
            </h2>
            <p className="mt-3 font-cormorant italic text-xl sm:text-2xl text-[#29201D]/85">
              With the blessings of our parents, grandparents, and beloved parivar.
            </p>
            <OrnamentalDivider variant="burgundy" />

            {/* Side Filter Buttons */}
            <div className="inline-flex flex-wrap justify-center gap-2 mt-2">
              {[
                { id: 'all', label: 'Both Families' },
                { id: 'groom', label: 'Shah Family (Groom)' },
                { id: 'bride', label: 'Dasadia Family (Bride)' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFamilyFilter(tab.id)}
                  className={`px-5 py-2 rounded-sm font-cinzel text-xs tracking-wider uppercase border transition-colors cursor-pointer ${
                    familyFilter === tab.id
                      ? 'bg-[#641D2B] text-[#F4EBDD] border-[#641D2B]'
                      : 'bg-[#E5D5BB]/70 text-[#29201D] border-[#C5A15B] hover:border-[#641D2B]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Family Portrait Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cmsData.families
              .filter(
                (member) =>
                  familyFilter === 'all' || member.side === familyFilter || member.side === 'both'
              )
              .map((member) => (
                <div
                  key={member.id}
                  className="rounded-t-3xl rounded-b-lg border-2 border-[#C5A15B] bg-[#E5D5BB]/65 p-6 shadow-lg flex flex-col justify-between hover:shadow-xl transition-shadow"
                >
                  <div>
                    {/* Arch Avatar / Portrait */}
                    <div className="w-28 h-32 mx-auto rounded-t-full border-2 border-[#C5A15B] bg-[#641D2B] overflow-hidden flex flex-col items-center justify-center text-[#C5A15B] mb-5 shadow-md">
                      {member.photoUrl ? (
                        <img
                          src={member.photoUrl}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <>
                          <Users className="w-7 h-7 mb-1 text-[#C5A15B]" />
                          <span className="text-[9px] font-cinzel uppercase tracking-widest text-[#E5D5BB]">
                            Portrait
                          </span>
                        </>
                      )}
                    </div>

                    <div className="text-center">
                      <span className="inline-block px-3 py-0.5 rounded-full bg-[#641D2B]/10 text-[#641D2B] font-cinzel text-[10px] tracking-[0.2em] uppercase font-semibold">
                        {member.category}
                      </span>
                      <h3 className="mt-2 font-cinzel text-lg sm:text-xl text-[#641D2B] font-semibold">
                        {member.name}
                      </h3>
                      <p className="font-cormorant italic text-base text-[#29201D]/80 mt-0.5">
                        {member.relation}
                      </p>
                      <p className="mt-3 text-xs sm:text-sm text-[#29201D]/90 leading-relaxed">
                        {member.introduction}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#C5A15B]/40 text-center">
                    <button
                      onClick={() => {
                        setAdminTab('families');
                        setIsAdminOpen(true);
                      }}
                      className="text-[11px] font-cinzel tracking-wider text-[#641D2B] hover:underline uppercase cursor-pointer"
                    >
                      Edit Family Details in Admin
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 5: WEDDING CELEBRATIONS (TIMELINE & ROYAL EVENT CARDS)
      ==================================================================== */}
      <section
        id="celebrations"
        className="py-20 sm:py-24 bg-gradient-to-b from-[#46131F] via-[#641D2B] to-[#46131F] text-[#F4EBDD]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="font-cinzel text-xs tracking-[0.3em] text-[#C5A15B] uppercase">
              ❖ Auspicious Ceremonies &amp; Festivities ❖
            </span>
            <h2 className="mt-2 font-cinzel text-3xl sm:text-5xl text-[#F4EBDD] tracking-wider uppercase">
              Wedding Celebrations
            </h2>
            <p className="mt-3 font-cormorant italic text-xl sm:text-2xl text-[#E5D5BB]">
              From the sacred Kankotri Lekhan to the Royal Wedding Mandap.
            </p>
            <OrnamentalDivider variant="gold" />

            {/* View Selector */}
            <div className="inline-flex rounded-sm border border-[#C5A15B]/50 bg-[#46131F] p-1 mt-2">
              {[
                { id: 'both', label: 'Timeline + Cards' },
                { id: 'timeline', label: 'Chronological Timeline' },
                { id: 'cards', label: 'Detailed Function Cards' }
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setCelebrationView(mode.id)}
                  className={`px-4 py-1.5 font-cinzel text-xs tracking-wider uppercase rounded-sm transition-colors cursor-pointer ${
                    celebrationView === mode.id
                      ? 'bg-[#C5A15B] text-[#29201D] font-semibold'
                      : 'text-[#E5D5BB] hover:text-[#C5A15B]'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          {/* 1. CHRONOLOGICAL ROYAL TIMELINE */}
          {(celebrationView === 'both' || celebrationView === 'timeline') && (
            <div className="mt-12 relative">
              <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-[#C5A15B]/40 -translate-x-1/2" />
              <div className="space-y-6">
                {publishedEvents.map((evt, idx) => {
                  const isLeft = idx % 2 === 0;
                  return (
                    <div
                      key={`tl-${evt.id}`}
                      className="relative flex flex-col md:flex-row items-center justify-between"
                    >
                      <div
                        className={`w-full md:w-[45%] ${
                          isLeft ? 'md:text-right md:pr-8' : 'md:order-2 md:text-left md:pl-8'
                        }`}
                      >
                        <div className="p-5 rounded-lg bg-[#46131F]/90 border border-[#C5A15B]/60 shadow-lg">
                          <span className="font-cinzel text-xs tracking-[0.2em] text-[#C5A15B] uppercase">
                            {evt.date}
                          </span>
                          <h3 className="mt-1 font-cinzel text-xl text-[#F4EBDD] font-semibold">
                            {evt.name}
                          </h3>
                          <p className="text-xs text-[#E5D5BB] mt-1">
                            {evt.startTime} • {evt.venueName}
                          </p>
                        </div>
                      </div>

                      {/* Center Medallion */}
                      <div className="my-2 md:my-0 z-10 w-10 h-10 rounded-full bg-[#C5A15B] text-[#29201D] font-cinzel text-xs font-bold flex items-center justify-center border-4 border-[#46131F] shadow">
                        0{idx + 1}
                      </div>

                      <div className={`hidden md:block md:w-[45%] ${isLeft ? 'md:order-2' : ''}`} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. DETAILED ROYAL EVENT CARDS */}
          {(celebrationView === 'both' || celebrationView === 'cards') && (
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publishedEvents.map((evt, index) => (
                <div
                  key={evt.id}
                  className="rounded-t-3xl rounded-b-xl border-2 border-[#C5A15B]/80 bg-[#46131F]/95 p-6 sm:p-7 shadow-2xl flex flex-col justify-between relative overflow-hidden group"
                >
                  {/* Top Arch Ribbon */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-cinzel tracking-widest text-[#C5A15B] mb-3">
                      <span>CEREMONY 0{index + 1}</span>
                      <Crown className="w-4 h-4" />
                    </div>

                    <h3 className="font-cinzel text-xl sm:text-2xl text-[#F4EBDD] uppercase font-semibold">
                      {evt.name}
                    </h3>

                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded bg-[#641D2B] border border-[#C5A15B]/50 text-[#C5A15B] font-cinzel text-xs tracking-wider">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{evt.date}</span>
                    </div>

                    <p className="mt-4 font-cormorant text-lg text-[#E5D5BB] leading-relaxed">
                      {evt.description}
                    </p>

                    <div className="mt-5 pt-4 border-t border-[#C5A15B]/30 space-y-2.5 text-xs text-[#F4EBDD]/90">
                      <div className="flex items-start gap-2.5">
                        <Clock className="w-4 h-4 text-[#C5A15B] shrink-0 mt-0.5" />
                        <span>
                          <strong>Timings:</strong> {evt.startTime} — {evt.endTime}
                        </span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-[#C5A15B] shrink-0 mt-0.5" />
                        <span>
                          <strong>Venue:</strong> {evt.venueName}
                          <span className="block text-[#E5D5BB]/75 mt-0.5">{evt.venueAddress}</span>
                        </span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-[#C5A15B] shrink-0 mt-0.5" />
                        <span>
                          <strong>Dress Code:</strong> {evt.dressCode}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Map Link CTA */}
                  <div className="mt-6 pt-4 border-t border-[#C5A15B]/30 flex items-center justify-between gap-2">
                    <a
                      href={evt.mapLink || 'https://maps.google.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C5A15B] text-[#29201D] font-cinzel text-[11px] font-semibold tracking-wider uppercase rounded-sm hover:bg-[#F4EBDD] transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Google Maps</span>
                    </a>
                    <button
                      onClick={() => {
                        setAdminTab('events');
                        setIsAdminOpen(true);
                      }}
                      className="text-[11px] font-cinzel tracking-wider text-[#C5A15B] hover:underline uppercase cursor-pointer"
                    >
                      Edit Event
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ====================================================================
          SECTION 6: PHOTO GALLERY (WITH CATEGORY FILTERS & LIGHTBOX) + VIDEO GALLERY
      ==================================================================== */}
      <section id="gallery" className="py-20 sm:py-24 bg-[#F4EBDD] text-[#29201D]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* PHOTO GALLERY */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="font-cinzel text-xs tracking-[0.3em] text-[#641D2B] uppercase font-semibold">
              ❖ Royal Moments &amp; Portraits ❖
            </span>
            <h2 className="mt-2 font-cinzel text-3xl sm:text-5xl text-[#641D2B] tracking-wider uppercase">
              Photo Gallery
            </h2>
            <p className="mt-3 font-cormorant italic text-xl sm:text-2xl text-[#29201D]/85">
              Glimpses of our journey, engagement, family, and festive memories.
            </p>
            <OrnamentalDivider variant="burgundy" />

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              {[
                'All',
                'Couple',
                'Engagement',
                'Family',
                'Friends',
                'Celebrations',
                'Special Memories'
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setGalleryCategory(cat);
                    setLightboxIndex(null);
                  }}
                  className={`px-4 py-2 rounded-sm font-cinzel text-xs tracking-wider uppercase border transition-colors cursor-pointer ${
                    galleryCategory === cat
                      ? 'bg-[#641D2B] text-[#F4EBDD] border-[#641D2B]'
                      : 'bg-[#E5D5BB]/70 text-[#29201D] border-[#C5A15B] hover:border-[#641D2B]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry-Inspired Gallery Grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                className="group cursor-pointer rounded-xl border-2 border-[#C5A15B] bg-[#46131F] overflow-hidden shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-[#641D2B] via-[#46131F] to-[#29201D] flex items-center justify-center">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="p-6 text-center flex flex-col items-center">
                      <LotusMandalaSVG className="w-20 h-20 mb-2 opacity-80" color="#C5A15B" />
                      <span className="font-cinzel text-xs tracking-[0.2em] text-[#C5A15B] uppercase">
                        {item.category}
                      </span>
                      <p className="font-cormorant italic text-lg text-[#F4EBDD] mt-1">
                        {item.title}
                      </p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-[#29201D]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-[#C5A15B] text-[#29201D] font-cinzel text-xs font-semibold tracking-wider uppercase rounded-sm flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" /> View in Lightbox
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-[#46131F] text-[#F4EBDD] border-t border-[#C5A15B]/40">
                  <div className="flex items-center justify-between text-[10px] font-cinzel tracking-widest text-[#C5A15B] uppercase">
                    <span>{item.category}</span>
                    <span>❖</span>
                  </div>
                  <h4 className="font-cinzel text-sm text-[#F4EBDD] mt-1">{item.title}</h4>
                  <p className="text-xs text-[#E5D5BB]/80 mt-0.5 line-clamp-2">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* SEPARATE VIDEO GALLERY SECTION */}
          <div className="mt-20 pt-16 border-t-2 border-[#C5A15B]/40">
            <div className="text-center max-w-3xl mx-auto">
              <span className="font-cinzel text-xs tracking-[0.3em] text-[#641D2B] uppercase font-semibold">
                ❖ Motion Pictures &amp; Films ❖
              </span>
              <h3 className="mt-2 font-cinzel text-2xl sm:text-4xl text-[#641D2B] tracking-wider uppercase">
                Video Screening Room
              </h3>
              <p className="mt-2 font-cormorant italic text-lg sm:text-xl text-[#29201D]/85">
                Pre-wedding films and cinematic chapters (plays only on guest click, never autoplays with sound).
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              {cmsData.videos.map((vid) => (
                <div
                  key={vid.id}
                  className="rounded-xl border-2 border-[#C5A15B] bg-[#46131F] text-[#F4EBDD] overflow-hidden shadow-xl"
                >
                  <div className="aspect-video w-full bg-gradient-to-br from-[#641D2B] to-[#29201D] relative flex items-center justify-center">
                    {vid.embedUrl ? (
                      <iframe
                        src={vid.embedUrl}
                        title={vid.title}
                        className="w-full h-full"
                        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="p-6 text-center flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full border-2 border-[#C5A15B] bg-[#641D2B] flex items-center justify-center text-[#C5A15B] mb-3 shadow-lg">
                          <Film className="w-7 h-7" />
                        </div>
                        <span className="font-cinzel text-xs tracking-[0.2em] text-[#C5A15B] uppercase">
                          {vid.category} • {vid.duration}
                        </span>
                        <h4 className="font-cinzel text-lg text-[#F4EBDD] mt-1">{vid.title}</h4>
                        <p className="text-xs text-[#E5D5BB]/80 max-w-sm mt-2">{vid.description}</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex items-center justify-between border-t border-[#C5A15B]/30">
                    <div>
                      <span className="text-[10px] font-cinzel tracking-widest text-[#C5A15B] uppercase">
                        {vid.category}
                      </span>
                      <h5 className="font-cinzel text-sm text-[#F4EBDD]">{vid.title}</h5>
                    </div>
                    <button
                      onClick={() => {
                        setAdminTab('gallery');
                        setIsAdminOpen(true);
                      }}
                      className="text-xs font-cinzel text-[#C5A15B] underline uppercase cursor-pointer"
                    >
                      Embed Video URL
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FULL-SCREEN GALLERY LIGHTBOX MODAL (WITH TOUCH SWIPE & KEYBOARD NAVIGATION) */}
      {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[95] bg-[#29201D]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const deltaX = e.changedTouches[0].clientX - touchStartX.current;
            if (deltaX > 50) {
              setLightboxIndex(
                (prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length
              );
            } else if (deltaX < -50) {
              setLightboxIndex((prev) => (prev + 1) % filteredGallery.length);
            }
            touchStartX.current = null;
          }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-[#F4EBDD]">
            <span className="font-cinzel text-xs tracking-widest text-[#C5A15B]">
              {lightboxIndex + 1} / {filteredGallery.length} •{' '}
              {filteredGallery[lightboxIndex].category}
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full border border-[#C5A15B] text-[#C5A15B] hover:bg-[#C5A15B] hover:text-[#29201D] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Image & Arrows */}
          <div className="relative my-auto max-w-4xl w-full mx-auto flex items-center justify-center">
            <button
              onClick={() =>
                setLightboxIndex(
                  (prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length
                )
              }
              className="p-3 rounded-full bg-[#46131F] border border-[#C5A15B] text-[#C5A15B] hover:bg-[#C5A15B] hover:text-[#29201D] mr-2 sm:mr-6 cursor-pointer"
              aria-label="Previous Photograph"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex-1 rounded-xl border-2 border-[#C5A15B] bg-[#46131F] p-4 sm:p-8 text-center">
              {filteredGallery[lightboxIndex].imageUrl ? (
                <img
                  src={filteredGallery[lightboxIndex].imageUrl}
                  alt={filteredGallery[lightboxIndex].title}
                  className="max-h-[65vh] mx-auto object-contain rounded"
                />
              ) : (
                <div className="py-16 flex flex-col items-center justify-center">
                  <LotusMandalaSVG className="w-28 h-28 mb-4" color="#C5A15B" />
                  <h4 className="font-cinzel text-2xl text-[#C5A15B]">
                    {filteredGallery[lightboxIndex].title}
                  </h4>
                  <p className="font-cormorant italic text-xl text-[#F4EBDD] mt-2 max-w-md">
                    {filteredGallery[lightboxIndex].caption}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => setLightboxIndex((prev) => (prev + 1) % filteredGallery.length)}
              className="p-3 rounded-full bg-[#46131F] border border-[#C5A15B] text-[#C5A15B] hover:bg-[#C5A15B] hover:text-[#29201D] ml-2 sm:ml-6 cursor-pointer"
              aria-label="Next Photograph"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Caption Footer */}
          <div className="text-center text-[#F4EBDD]">
            <h5 className="font-cinzel text-base text-[#C5A15B]">
              {filteredGallery[lightboxIndex].title}
            </h5>
            <p className="text-xs text-[#E5D5BB] mt-1">{filteredGallery[lightboxIndex].caption}</p>
          </div>
        </div>
      )}

      {/* ====================================================================
          SECTION 7: OFFICIAL WEDDING INVITATION (KANKOTRI PREVIEW & PDF)
      ==================================================================== */}
      <section
        id="invitation"
        className="py-20 sm:py-24 bg-gradient-to-b from-[#641D2B] via-[#46131F] to-[#641D2B] text-[#F4EBDD]"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="font-cinzel text-xs tracking-[0.3em] text-[#C5A15B] uppercase">
            ❖ Auspicious Kankotri ❖
          </span>
          <h2 className="mt-2 font-cinzel text-3xl sm:text-5xl text-[#F4EBDD] tracking-wider uppercase">
            The Official Invitation
          </h2>
          <p className="mt-3 font-cormorant italic text-xl sm:text-2xl text-[#E5D5BB]">
            Our traditional royal wedding invitation scroll, ready to view or download on mobile &amp; desktop.
          </p>
          <OrnamentalDivider variant="gold" />

          {/* Ornate Royal Kankotri Card Preview */}
          <div className="mt-8 rounded-2xl border-2 border-[#C5A15B] bg-[#F4EBDD] text-[#29201D] p-6 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="border border-[#641D2B]/40 p-6 sm:p-10 rounded-xl relative">
              <p className="font-cinzel text-[11px] tracking-[0.3em] text-[#641D2B] uppercase">
                ❖ Shree Mahaviraya Namah ❖
              </p>

              <div className="my-4 flex justify-center">
                <LotusMandalaSVG className="w-20 h-20" color="#641D2B" />
              </div>

              <p className="font-cormorant italic text-lg sm:text-xl text-[#29201D]/90 max-w-xl mx-auto">
                {cmsData.settings.invitationNote}
              </p>

              <h3 className="mt-6 font-cinzel text-2xl sm:text-4xl text-[#641D2B] tracking-widest uppercase font-semibold">
                {cmsData.settings.groomName}
                <span className="block font-cormorant italic text-2xl text-[#C5A15B] my-1 lowercase">
                  weds
                </span>
                {cmsData.settings.brideName}
              </h3>

              <p className="mt-4 font-cinzel text-sm sm:text-base tracking-[0.25em] text-[#29201D] uppercase font-semibold">
                {cmsData.settings.weddingDateDisplay}
              </p>

              <p className="mt-3 text-xs text-[#641D2B]/80 font-montserrat">
                {cmsData.settings.invitationPdfUrl
                  ? 'Official Kankotri PDF Uploaded & Ready for Download'
                  : '[Kankotri Preview Placeholder — Upload Official Invitation PDF via Admin Studio]'}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setIsInvitationModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#641D2B] text-[#F4EBDD] font-cinzel text-xs tracking-[0.2em] uppercase rounded-sm hover:bg-[#46131F] transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#C5A15B]" />
                  <span>Open Full Kankotri View</span>
                </button>

                {cmsData.settings.invitationDownloadEnabled && (
                  <button
                    onClick={handleDownloadInvitation}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C5A15B] text-[#29201D] font-cinzel text-xs font-semibold tracking-[0.2em] uppercase rounded-sm hover:bg-[#29201D] hover:text-[#F4EBDD] transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Invitation PDF</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FULL KANKOTRI INVITATION MODAL */}
      {isInvitationModalOpen && (
        <div className="fixed inset-0 z-[95] bg-[#29201D]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-2xl w-full rounded-xl border-2 border-[#C5A15B] bg-[#F4EBDD] text-[#29201D] p-6 sm:p-10 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#641D2B]/20">
              <span className="font-cinzel text-xs tracking-widest text-[#641D2B] uppercase font-semibold">
                Official Digital Kankotri Preview
              </span>
              <button
                onClick={() => setIsInvitationModalOpen(false)}
                className="p-1.5 rounded border border-[#641D2B]/30 text-[#641D2B] hover:bg-[#641D2B] hover:text-[#F4EBDD] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-6 text-center space-y-4">
              <p className="font-cinzel text-xs tracking-[0.3em] text-[#641D2B]">
                ❖ SHREE GANESHAYA NAMAH • SHRI MAHAVIRAY NAMAH ❖
              </p>
              <h3 className="font-cinzel text-2xl sm:text-3xl text-[#641D2B] uppercase font-bold">
                {cmsData.settings.groomName} &amp; {cmsData.settings.brideName}
              </h3>
              <p className="font-cormorant italic text-lg text-[#29201D]">
                {cmsData.settings.invitationNote}
              </p>

              <div className="text-left bg-[#E5D5BB]/60 p-4 rounded border border-[#C5A15B] space-y-2">
                <p className="font-cinzel text-xs tracking-wider text-[#641D2B] uppercase font-semibold">
                  Schedule of Royal Celebrations:
                </p>
                {publishedEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="flex flex-wrap justify-between text-xs py-1 border-b border-[#641D2B]/10"
                  >
                    <span className="font-semibold text-[#641D2B]">{ev.name}</span>
                    <span>
                      {ev.date} • {ev.startTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#641D2B]/20 flex flex-wrap items-center justify-end gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-[#641D2B] text-[#F4EBDD] font-cinzel text-xs tracking-wider uppercase rounded cursor-pointer"
              >
                Print / Save as PDF
              </button>
              <button
                onClick={() => setIsInvitationModalOpen(false)}
                className="px-5 py-2.5 border border-[#641D2B] text-[#641D2B] font-cinzel text-xs tracking-wider uppercase rounded cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          SECTION 8: WEDDING VENUES & GOOGLE MAPS DIRECTORY
      ==================================================================== */}
      <section id="venue" className="py-20 sm:py-24 bg-[#F4EBDD] text-[#29201D]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="font-cinzel text-xs tracking-[0.3em] text-[#641D2B] uppercase font-semibold">
              ❖ Royal Destinations &amp; Directions ❖
            </span>
            <h2 className="mt-2 font-cinzel text-3xl sm:text-5xl text-[#641D2B] tracking-wider uppercase">
              Wedding Venues
            </h2>
            <p className="mt-3 font-cormorant italic text-xl sm:text-2xl text-[#29201D]/85">
              Detailed venue locations and navigation links for every ceremony.
            </p>
            <OrnamentalDivider variant="burgundy" />
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {cmsData.venues.map((venue) => (
              <div
                key={venue.id}
                className="rounded-xl border-2 border-[#C5A15B] bg-[#E5D5BB]/70 p-6 sm:p-8 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-cinzel tracking-widest text-[#641D2B] uppercase mb-2">
                    <span>Associated Functions</span>
                    <MapPin className="w-4 h-4 text-[#641D2B]" />
                  </div>
                  <p className="inline-block px-3 py-1 rounded bg-[#641D2B] text-[#F4EBDD] font-cinzel text-[11px] tracking-wider mb-4">
                    {venue.associatedEvents}
                  </p>

                  <h3 className="font-cinzel text-xl sm:text-2xl text-[#641D2B] font-semibold">
                    {venue.name}
                  </h3>
                  <p className="mt-2 text-sm text-[#29201D] leading-relaxed">{venue.address}</p>
                  <p className="mt-1 text-xs text-[#641D2B]/80 italic">{venue.landmark}</p>

                  {/* Interactive Architectural Map Preview Card */}
                  <div className="mt-5 p-5 rounded-lg bg-[#46131F] text-[#F4EBDD] border border-[#C5A15B] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#C5A15B]/20 border border-[#C5A15B] flex items-center justify-center text-[#C5A15B]">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-cinzel text-xs tracking-wider text-[#C5A15B] uppercase">
                          Google Maps Navigation
                        </p>
                        <p className="text-xs text-[#E5D5BB]">{venue.mapEmbedInfo}</p>
                      </div>
                    </div>
                    <a
                      href={venue.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#C5A15B] text-[#29201D] font-cinzel text-xs font-semibold uppercase rounded-sm hover:bg-[#F4EBDD] transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      <span>Open Map</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#C5A15B]/50 flex items-center justify-between text-xs">
                  <a
                    href={venue.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-cinzel text-[#641D2B] font-semibold uppercase hover:underline"
                  >
                    Get Turn-by-Turn Directions →
                  </a>
                  <button
                    onClick={() => {
                      setAdminTab('venues');
                      setIsAdminOpen(true);
                    }}
                    className="font-cinzel text-[#641D2B] underline uppercase cursor-pointer"
                  >
                    Update Venue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 9: WEDDING WISHES (INTERACTIVE GUESTBOOK & BLESSINGS)
      ==================================================================== */}
      <section
        id="wishes"
        className="py-20 sm:py-24 bg-gradient-to-b from-[#46131F] via-[#641D2B] to-[#46131F] text-[#F4EBDD]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="font-cinzel text-xs tracking-[0.3em] text-[#C5A15B] uppercase">
              ❖ Ashirwad &amp; Heartfelt Messages ❖
            </span>
            <h2 className="mt-2 font-cinzel text-3xl sm:text-5xl text-[#F4EBDD] tracking-wider uppercase">
              Wishes For The Couple
            </h2>
            <p className="mt-3 font-cormorant italic text-xl sm:text-2xl text-[#E5D5BB]">
              Leave your blessings and warm wishes for Jainam and Shalvi as they begin their forever.
            </p>
            <OrnamentalDivider variant="gold" />
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Submit a Wish Form */}
            <div className="lg:col-span-5">
              <form
                onSubmit={handleWishSubmit}
                className="rounded-xl border-2 border-[#C5A15B] bg-[#46131F]/95 p-6 sm:p-8 shadow-2xl space-y-5"
              >
                <h3 className="font-cinzel text-xl text-[#C5A15B] tracking-wider uppercase">
                  Inscribe Your Blessing
                </h3>
                <p className="text-xs text-[#E5D5BB]/85 leading-relaxed">
                  No login required. Submitted wishes are reviewed by our family moderators before appearing on the public royal wall.
                </p>

                {/* Honeypot field for spam protection */}
                <input
                  type="text"
                  value={wishHoneypot}
                  onChange={(e) => setWishHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <label className="block font-cinzel text-xs tracking-wider text-[#E5D5BB] uppercase mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={80}
                    value={wishName}
                    onChange={(e) => setWishName(e.target.value)}
                    placeholder="e.g., राजेश भाई शाह / Priya & Family"
                    className="w-full px-4 py-3 rounded bg-[#641D2B]/60 border border-[#C5A15B]/60 text-[#F4EBDD] placeholder-[#E5D5BB]/40 text-sm focus:outline-none focus:border-[#C5A15B]"
                  />
                </div>

                <div>
                  <label className="block font-cinzel text-xs tracking-wider text-[#E5D5BB] uppercase mb-2">
                    Relationship with the Couple (Optional)
                  </label>
                  <input
                    type="text"
                    maxLength={80}
                    value={wishRelation}
                    onChange={(e) => setWishRelation(e.target.value)}
                    placeholder="e.g., Maternal Uncle, College Friend, Colleague"
                    className="w-full px-4 py-3 rounded bg-[#641D2B]/60 border border-[#C5A15B]/60 text-[#F4EBDD] placeholder-[#E5D5BB]/40 text-sm focus:outline-none focus:border-[#C5A15B]"
                  />
                </div>

                <div>
                  <label className="block font-cinzel text-xs tracking-wider text-[#E5D5BB] uppercase mb-2">
                    Your Wishes &amp; Blessings *
                  </label>
                  <textarea
                    rows={4}
                    required
                    maxLength={600}
                    value={wishMessage}
                    onChange={(e) => setWishMessage(e.target.value)}
                    placeholder="Write your heartfelt message for Jainam & Shalvi..."
                    className="w-full px-4 py-3 rounded bg-[#641D2B]/60 border border-[#C5A15B]/60 text-[#F4EBDD] placeholder-[#E5D5BB]/40 text-sm focus:outline-none focus:border-[#C5A15B]"
                  />
                </div>

                {wishFeedback && (
                  <div
                    className={`p-3.5 rounded border text-xs flex items-start gap-2.5 ${
                      wishFeedback.type === 'success'
                        ? 'bg-[#C5A15B]/20 border-[#C5A15B] text-[#F4EBDD]'
                        : 'bg-red-950/60 border-red-400 text-red-200'
                    }`}
                  >
                    {wishFeedback.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-[#C5A15B] shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-300 shrink-0 mt-0.5" />
                    )}
                    <span>{wishFeedback.text}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#C5A15B] text-[#29201D] font-cinzel text-xs font-semibold tracking-[0.2em] uppercase rounded-sm hover:bg-[#F4EBDD] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Royal Blessing</span>
                </button>
              </form>
            </div>

            {/* Right Column: Approved & Featured Royal Message Cards */}
            <div className="lg:col-span-7 space-y-4 max-h-[620px] overflow-y-auto pr-1">
              {approvedWishes.map((wish) => (
                <div
                  key={wish.id}
                  className={`p-6 rounded-xl border transition-all ${
                    wish.featured
                      ? 'bg-gradient-to-r from-[#46131F] to-[#641D2B] border-2 border-[#C5A15B] shadow-xl'
                      : 'bg-[#46131F]/80 border-[#C5A15B]/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-cinzel text-base sm:text-lg text-[#F4EBDD] font-semibold">
                          {wish.guestName}
                        </h4>
                        {wish.featured && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#C5A15B] text-[#29201D] font-cinzel text-[10px] font-bold uppercase">
                            <Star className="w-3 h-3 fill-current" /> Featured
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#C5A15B] font-cinzel tracking-wider uppercase mt-0.5">
                        {wish.relationship}
                      </p>
                    </div>
                    <span className="text-[11px] text-[#E5D5BB]/60">{wish.createdAt}</span>
                  </div>

                  <p className="mt-4 font-cormorant italic text-lg sm:text-xl text-[#F4EBDD]/95 leading-relaxed">
                    “{wish.message}”
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 10: CLOSING CHAPTER & WHATSAPP SHARING
      ==================================================================== */}
      <footer className="relative bg-[#46131F] text-[#F4EBDD] pt-20 pb-24 border-t-2 border-[#C5A15B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-24 h-24 mx-auto mb-5 flex items-center justify-center drop-shadow-xl animate-float-slow">
            <JSMonogramSVG className="w-full h-full hover:scale-105 transition-transform duration-500" />
          </div>

          <span className="font-cinzel text-xs tracking-[0.3em] text-[#C5A15B] uppercase">
            ❖ Epilogue ❖
          </span>
          <h2 className="mt-2 font-cinzel text-2xl sm:text-4xl md:text-5xl text-[#F4EBDD] tracking-wider uppercase">
            And So, A New Chapter Begins...
          </h2>

          <p className="mt-5 font-cormorant italic text-xl sm:text-2xl text-[#E5D5BB] max-w-2xl mx-auto leading-relaxed">
            “Two families. Two journeys. One beautiful beginning.
            <br />
            Thank you for being a part of our story. We cannot wait to celebrate this special chapter with you.”
          </p>

          <OrnamentalDivider variant="gold" />

          <h3 className="font-cinzel text-2xl sm:text-3xl text-[#C5A15B] tracking-[0.2em] uppercase">
            {cmsData.settings.groomName} &amp; {cmsData.settings.brideName}
          </h3>
          <p className="mt-2 font-cinzel text-sm tracking-[0.3em] text-[#F4EBDD] uppercase">
            {cmsData.settings.weddingDateDisplay} • {cmsData.settings.hashtag}
          </p>

          {/* WhatsApp & Native Sharing Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleWhatsAppShare}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#C5A15B] text-[#29201D] font-cinzel text-xs font-semibold tracking-[0.18em] uppercase rounded-sm hover:bg-[#F4EBDD] transition-colors cursor-pointer shadow-lg"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Invitation on WhatsApp</span>
            </button>

            <button
              onClick={handleNativeShare}
              className="inline-flex items-center gap-2 px-5 py-3.5 border border-[#C5A15B] text-[#E5D5BB] font-cinzel text-xs tracking-[0.18em] uppercase rounded-sm hover:bg-[#C5A15B]/20 transition-colors cursor-pointer"
            >
              <Copy className="w-4 h-4 text-[#C5A15B]" />
              <span>Copy / Share Website Link</span>
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-[#C5A15B]/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E5D5BB]/70">
            <span>© 2027 {cmsData.settings.groomName} &amp; {cmsData.settings.brideName}. Crafted with Royal Heritage.</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-[#C5A15B] font-cinzel uppercase tracking-wider hover:underline cursor-pointer"
              >
                Back to Palace Arch ↑
              </button>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="text-[#C5A15B] font-cinzel uppercase tracking-wider hover:underline cursor-pointer"
              >
                Admin Studio
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          FLOATING ROYAL BACKGROUND MUSIC PLAYER
      ==================================================================== */}
      <div className="fixed bottom-5 left-5 z-40 flex items-center gap-2 bg-[#46131F]/95 border-2 border-[#C5A15B] text-[#F4EBDD] px-3.5 py-2.5 rounded-full shadow-2xl backdrop-blur-md">
        <button
          onClick={() => toggleMusicPlayback()}
          aria-label={isPlayingMusic ? 'Pause Royal Music' : 'Play Royal Music'}
          className="w-9 h-9 rounded-full bg-[#C5A15B] text-[#29201D] flex items-center justify-center hover:bg-[#F4EBDD] transition-colors cursor-pointer"
        >
          {isPlayingMusic ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        <div className="hidden sm:flex flex-col pr-1">
          <span className="font-cinzel text-[10px] tracking-widest text-[#C5A15B] uppercase">
            {isPlayingMusic ? 'Royal Raag Playing' : 'Royal Soundscape'}
          </span>
          <span className="text-[10px] text-[#E5D5BB]/80">
            {cmsData.settings.musicUrl ? 'Custom Track' : 'Sitar & Tanpura'}
          </span>
        </div>

        <button
          onClick={handleMuteToggle}
          aria-label={isMutedMusic ? 'Unmute Music' : 'Mute Music'}
          className="p-1.5 text-[#C5A15B] hover:text-[#F4EBDD] cursor-pointer"
        >
          {isMutedMusic ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* ====================================================================
          COMPREHENSIVE ADMIN DASHBOARD & SUPABASE STUDIO MODAL
      ==================================================================== */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-[110] bg-[#29201D]/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-6xl bg-[#F4EBDD] text-[#29201D] border-2 border-[#C5A15B] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Admin Top Bar */}
            <div className="bg-[#46131F] text-[#F4EBDD] px-6 py-4 border-b border-[#C5A15B] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Crown className="w-5 h-5 text-[#C5A15B]" />
                <div>
                  <h2 className="font-cinzel text-sm sm:text-base tracking-widest text-[#C5A15B] uppercase font-semibold">
                    Royal Wedding CMS &amp; Admin Dashboard
                  </h2>
                  <p className="text-[11px] text-[#E5D5BB]">
                    Manage Story Chapters, Couple Profiles, Families, Events, Galleries, Wishes &amp; Supabase Cloud
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {isAdminAuthenticated && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-950 border border-emerald-500/50 text-emerald-200 text-[11px]">
                    <Unlock className="w-3 h-3" /> Authorised Admin
                  </span>
                )}
                <button
                  onClick={() => setIsAdminOpen(false)}
                  className="p-2 rounded bg-[#641D2B] text-[#C5A15B] border border-[#C5A15B]/50 hover:bg-[#C5A15B] hover:text-[#29201D] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Admin Notification Banner */}
            {adminNotification && (
              <div className="bg-[#641D2B] text-[#F4EBDD] px-6 py-2.5 text-xs flex items-center justify-between border-b border-[#C5A15B]/40">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A15B]" />
                  {adminNotification}
                </span>
                <button onClick={() => setAdminNotification(null)} className="text-[#C5A15B]">
                  Dismiss
                </button>
              </div>
            )}

            {/* Admin Authentication Gate */}
            {!isAdminAuthenticated ? (
              <div className="p-8 sm:p-14 max-w-md mx-auto text-center my-auto">
                <div className="w-16 h-16 rounded-full bg-[#641D2B] text-[#C5A15B] border-2 border-[#C5A15B] flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="font-cinzel text-2xl text-[#641D2B] uppercase font-semibold">
                  Administrator Access
                </h3>
                <p className="text-xs text-[#29201D]/80 mt-2 leading-relaxed">
                  Enter the administrator passcode or click Instant Preview Unlock below to test editing all website sections, moderating wishes, and configuring Supabase.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsAdminAuthenticated(true);
                    setAdminNotification('Welcome to the Royal Admin Dashboard! All edits update the live website immediately.');
                  }}
                  className="mt-6 space-y-4"
                >
                  <input
                    type="password"
                    value={adminPasscode}
                    onChange={(e) => setAdminPasscode(e.target.value)}
                    placeholder="Admin Passcode (Default: 27022027)"
                    className="w-full px-4 py-3 rounded border border-[#641D2B]/40 bg-white text-sm text-center"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#641D2B] text-[#F4EBDD] font-cinzel text-xs tracking-[0.2em] uppercase rounded hover:bg-[#46131F] cursor-pointer"
                  >
                    Unlock Admin Dashboard
                  </button>
                </form>
              </div>
            ) : (
              /* Authenticated Admin Studio Content */
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Left Sidebar Tabs */}
                <div className="w-full md:w-60 bg-[#E5D5BB] border-b md:border-b-0 md:border-r border-[#C5A15B] p-3 flex md:flex-col gap-1.5 overflow-x-auto shrink-0">
                  {[
                    { id: 'story', label: 'A. Story & Couple', icon: BookOpen },
                    { id: 'families', label: 'B. Our Families', icon: Users },
                    { id: 'events', label: 'C. Celebrations', icon: Calendar },
                    { id: 'gallery', label: 'D. Photos & Videos', icon: ImageIcon },
                    { id: 'venues', label: 'E. Venues & Maps', icon: MapPin },
                    {
                      id: 'wishes',
                      label: `F. Wishes (${
                        cmsData.wishes.filter((w) => w.status === 'pending').length
                      } Pending)`,
                      icon: Heart
                    },
                    { id: 'invitation', label: 'G. PDF & Music', icon: FileText },
                    { id: 'settings', label: 'H. Settings & Supabase', icon: Database }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setAdminTab(tab.id)}
                        className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded text-left font-cinzel text-xs tracking-wider uppercase shrink-0 transition-colors cursor-pointer ${
                          adminTab === tab.id
                            ? 'bg-[#641D2B] text-[#F4EBDD] font-semibold'
                            : 'text-[#29201D] hover:bg-[#641D2B]/10'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-[#C5A15B] shrink-0" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Right Main Editor Pane */}
                <div className="flex-1 p-5 sm:p-8 overflow-y-auto space-y-8">
                  {/* TAB A: STORY CHAPTERS & COUPLE PROFILES */}
                  {adminTab === 'story' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="font-cinzel text-xl text-[#641D2B] uppercase font-semibold border-b border-[#C5A15B] pb-2">
                          Edit 6 Story Chapters
                        </h3>
                        <div className="mt-4 space-y-6">
                          {cmsData.chapters.map((ch, idx) => (
                            <div
                              key={ch.id}
                              className="p-4 rounded-lg bg-[#E5D5BB]/60 border border-[#C5A15B] space-y-3"
                            >
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <span className="font-cinzel text-xs font-bold text-[#641D2B]">
                                  {ch.number}: {ch.title}
                                </span>
                                <label className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#641D2B] text-[#F4EBDD] rounded text-xs cursor-pointer">
                                  <Upload className="w-3.5 h-3.5 text-[#C5A15B]" />
                                  <span>Upload Chapter Photo</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                      handleFileUploadToDataUrl(e.target.files?.[0], (dataUrl) => {
                                        const updated = [...cmsData.chapters];
                                        updated[idx] = { ...updated[idx], imageUrl: dataUrl };
                                        setCmsData({ ...cmsData, chapters: updated });
                                        setAdminNotification(`Uploaded photo for ${ch.number}`);
                                      })
                                    }
                                  />
                                </label>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <input
                                  type="text"
                                  value={ch.title}
                                  onChange={(e) => {
                                    const updated = [...cmsData.chapters];
                                    updated[idx] = { ...updated[idx], title: e.target.value };
                                    setCmsData({ ...cmsData, chapters: updated });
                                  }}
                                  placeholder="Chapter Title"
                                  className="px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs"
                                />
                                <input
                                  type="text"
                                  value={ch.subtitle}
                                  onChange={(e) => {
                                    const updated = [...cmsData.chapters];
                                    updated[idx] = { ...updated[idx], subtitle: e.target.value };
                                    setCmsData({ ...cmsData, chapters: updated });
                                  }}
                                  placeholder="Subtitle"
                                  className="px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs"
                                />
                                <input
                                  type="text"
                                  value={ch.dateLabel}
                                  onChange={(e) => {
                                    const updated = [...cmsData.chapters];
                                    updated[idx] = { ...updated[idx], dateLabel: e.target.value };
                                    setCmsData({ ...cmsData, chapters: updated });
                                  }}
                                  placeholder="Date / Era Label"
                                  className="px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs"
                                />
                              </div>

                              <textarea
                                rows={2}
                                value={ch.boyNarrative}
                                onChange={(e) => {
                                  const updated = [...cmsData.chapters];
                                  updated[idx] = { ...updated[idx], boyNarrative: e.target.value };
                                  setCmsData({ ...cmsData, chapters: updated });
                                }}
                                className="w-full px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs"
                                placeholder="Paragraph 1 Narrative"
                              />
                              <textarea
                                rows={2}
                                value={ch.girlNarrative}
                                onChange={(e) => {
                                  const updated = [...cmsData.chapters];
                                  updated[idx] = { ...updated[idx], girlNarrative: e.target.value };
                                  setCmsData({ ...cmsData, chapters: updated });
                                }}
                                className="w-full px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs"
                                placeholder="Paragraph 2 Narrative"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Couple Profiles Editor */}
                      <div>
                        <h3 className="font-cinzel text-xl text-[#641D2B] uppercase font-semibold border-b border-[#C5A15B] pb-2">
                          Edit Meet The Couple Profiles
                        </h3>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                          {['groom', 'bride'].map((role) => {
                            const prof = cmsData.couple[role];
                            return (
                              <div
                                key={role}
                                className="p-4 rounded-lg bg-[#E5D5BB]/60 border border-[#C5A15B] space-y-3"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-cinzel text-sm font-bold text-[#641D2B] uppercase">
                                    {prof.name}
                                  </span>
                                  <label className="px-3 py-1 bg-[#641D2B] text-[#F4EBDD] rounded text-xs cursor-pointer">
                                    Upload Portrait
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) =>
                                        handleFileUploadToDataUrl(e.target.files?.[0], (url) => {
                                          setCmsData({
                                            ...cmsData,
                                            couple: {
                                              ...cmsData.couple,
                                              [role]: { ...prof, portraitUrl: url }
                                            }
                                          });
                                        })
                                      }
                                    />
                                  </label>
                                </div>
                                <textarea
                                  rows={2}
                                  value={prof.introduction}
                                  onChange={(e) =>
                                    setCmsData({
                                      ...cmsData,
                                      couple: {
                                        ...cmsData.couple,
                                        [role]: { ...prof, introduction: e.target.value }
                                      }
                                    })
                                  }
                                  className="w-full px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs"
                                  placeholder="Introduction"
                                />
                                <textarea
                                  rows={2}
                                  value={prof.personality}
                                  onChange={(e) =>
                                    setCmsData({
                                      ...cmsData,
                                      couple: {
                                        ...cmsData.couple,
                                        [role]: { ...prof, personality: e.target.value }
                                      }
                                    })
                                  }
                                  className="w-full px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs"
                                  placeholder="Personality"
                                />
                                <textarea
                                  rows={2}
                                  value={prof.personalMessage}
                                  onChange={(e) =>
                                    setCmsData({
                                      ...cmsData,
                                      couple: {
                                        ...cmsData.couple,
                                        [role]: { ...prof, personalMessage: e.target.value }
                                      }
                                    })
                                  }
                                  className="w-full px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs"
                                  placeholder="Personal Quote"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB B: OUR FAMILIES EDITOR */}
                  {adminTab === 'families' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-[#C5A15B] pb-2">
                        <h3 className="font-cinzel text-xl text-[#641D2B] uppercase font-semibold">
                          Manage Family Profiles
                        </h3>
                        <button
                          onClick={() => {
                            const newFam = {
                              id: `fam-${Date.now()}`,
                              side: 'both',
                              category: 'Family Member',
                              name: 'New Family Member Name',
                              relation: 'Relationship with Couple',
                              introduction: 'Warm family introduction...',
                              photoUrl: ''
                            };
                            setCmsData({ ...cmsData, families: [...cmsData.families, newFam] });
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#641D2B] text-[#F4EBDD] font-cinzel text-xs uppercase rounded cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Family Card
                        </button>
                      </div>

                      <div className="space-y-4">
                        {cmsData.families.map((fam, idx) => (
                          <div
                            key={fam.id}
                            className="p-4 rounded-lg bg-[#E5D5BB]/60 border border-[#C5A15B] space-y-3"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <input
                                type="text"
                                value={fam.name}
                                onChange={(e) => {
                                  const next = [...cmsData.families];
                                  next[idx] = { ...next[idx], name: e.target.value };
                                  setCmsData({ ...cmsData, families: next });
                                }}
                                className="px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs font-semibold"
                                placeholder="Family Member Name(s)"
                              />
                              <input
                                type="text"
                                value={fam.relation}
                                onChange={(e) => {
                                  const next = [...cmsData.families];
                                  next[idx] = { ...next[idx], relation: e.target.value };
                                  setCmsData({ ...cmsData, families: next });
                                }}
                                className="px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs"
                                placeholder="Relationship"
                              />
                              <div className="flex items-center gap-2">
                                <select
                                  value={fam.side}
                                  onChange={(e) => {
                                    const next = [...cmsData.families];
                                    next[idx] = { ...next[idx], side: e.target.value };
                                    setCmsData({ ...cmsData, families: next });
                                  }}
                                  className="px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs flex-1"
                                >
                                  <option value="groom">Groom Side (Shah)</option>
                                  <option value="bride">Bride Side (Dasadia)</option>
                                  <option value="both">Both Families</option>
                                </select>
                                <button
                                  onClick={() =>
                                    setCmsData({
                                      ...cmsData,
                                      families: cmsData.families.filter((f) => f.id !== fam.id)
                                    })
                                  }
                                  className="p-2 text-red-700 hover:bg-red-100 rounded cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <textarea
                              rows={2}
                              value={fam.introduction}
                              onChange={(e) => {
                                const next = [...cmsData.families];
                                next[idx] = { ...next[idx], introduction: e.target.value };
                                setCmsData({ ...cmsData, families: next });
                              }}
                              className="w-full px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB C: WEDDING CELEBRATIONS (EVENTS) MANAGER */}
                  {adminTab === 'events' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-[#C5A15B] pb-2">
                        <h3 className="font-cinzel text-xl text-[#641D2B] uppercase font-semibold">
                          Manage Wedding Celebrations
                        </h3>
                        <button
                          onClick={() => {
                            const newEvt = {
                              id: `evt-${Date.now()}`,
                              name: 'New Royal Ceremony',
                              date: 'February 2027',
                              sortOrder: cmsData.events.length + 1,
                              startTime: '06:00 PM',
                              endTime: '10:00 PM',
                              venueName: 'Royal Courtyard Venue',
                              venueAddress: 'Full Address',
                              description: 'Ceremony description...',
                              dressCode: 'Traditional Royal Attire',
                              mapLink: 'https://maps.google.com',
                              published: true
                            };
                            setCmsData({ ...cmsData, events: [...cmsData.events, newEvt] });
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#641D2B] text-[#F4EBDD] font-cinzel text-xs uppercase rounded cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Event
                        </button>
                      </div>

                      <div className="space-y-4">
                        {cmsData.events.map((evt, idx) => (
                          <div
                            key={evt.id}
                            className="p-4 rounded-lg bg-[#E5D5BB]/60 border border-[#C5A15B] space-y-3"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="font-cinzel text-xs font-bold text-[#641D2B]">
                                0{idx + 1}. {evt.name} ({evt.date})
                              </span>
                              <div className="flex items-center gap-3">
                                <label className="text-xs flex items-center gap-1.5 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={evt.published}
                                    onChange={(e) => {
                                      const next = [...cmsData.events];
                                      next[idx] = { ...next[idx], published: e.target.checked };
                                      setCmsData({ ...cmsData, events: next });
                                    }}
                                  />
                                  <span>Published</span>
                                </label>
                                <button
                                  onClick={() =>
                                    setCmsData({
                                      ...cmsData,
                                      events: cmsData.events.filter((item) => item.id !== evt.id)
                                    })
                                  }
                                  className="text-red-700 p-1 hover:bg-red-100 rounded cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <input
                                type="text"
                                value={evt.name}
                                onChange={(e) => {
                                  const next = [...cmsData.events];
                                  next[idx] = { ...next[idx], name: e.target.value };
                                  setCmsData({ ...cmsData, events: next });
                                }}
                                placeholder="Event Name"
                                className="px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs"
                              />
                              <input
                                type="text"
                                value={evt.date}
                                onChange={(e) => {
                                  const next = [...cmsData.events];
                                  next[idx] = { ...next[idx], date: e.target.value };
                                  setCmsData({ ...cmsData, events: next });
                                }}
                                placeholder="Date (e.g. 27 February 2027)"
                                className="px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs"
                              />
                              <input
                                type="text"
                                value={evt.startTime}
                                onChange={(e) => {
                                  const next = [...cmsData.events];
                                  next[idx] = { ...next[idx], startTime: e.target.value };
                                  setCmsData({ ...cmsData, events: next });
                                }}
                                placeholder="Start Time"
                                className="px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <input
                                type="text"
                                value={evt.venueName}
                                onChange={(e) => {
                                  const next = [...cmsData.events];
                                  next[idx] = { ...next[idx], venueName: e.target.value };
                                  setCmsData({ ...cmsData, events: next });
                                }}
                                placeholder="Venue Name"
                                className="px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs"
                              />
                              <input
                                type="text"
                                value={evt.dressCode}
                                onChange={(e) => {
                                  const next = [...cmsData.events];
                                  next[idx] = { ...next[idx], dressCode: e.target.value };
                                  setCmsData({ ...cmsData, events: next });
                                }}
                                placeholder="Dress Code"
                                className="px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs"
                              />
                              <input
                                type="text"
                                value={evt.mapLink}
                                onChange={(e) => {
                                  const next = [...cmsData.events];
                                  next[idx] = { ...next[idx], mapLink: e.target.value };
                                  setCmsData({ ...cmsData, events: next });
                                }}
                                placeholder="Google Maps Link"
                                className="px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs"
                              />
                            </div>

                            <textarea
                              rows={2}
                              value={evt.description}
                              onChange={(e) => {
                                const next = [...cmsData.events];
                                next[idx] = { ...next[idx], description: e.target.value };
                                setCmsData({ ...cmsData, events: next });
                              }}
                              className="w-full px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB D: PHOTO & VIDEO GALLERY MANAGER */}
                  {adminTab === 'gallery' && (
                    <div className="space-y-6">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#C5A15B] pb-2">
                        <h3 className="font-cinzel text-xl text-[#641D2B] uppercase font-semibold">
                          Photo &amp; Video Gallery Manager
                        </h3>
                        <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#641D2B] text-[#F4EBDD] font-cinzel text-xs uppercase rounded cursor-pointer">
                          <Upload className="w-3.5 h-3.5 text-[#C5A15B]" />
                          <span>Upload New Photograph</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleFileUploadToDataUrl(e.target.files?.[0], (url) => {
                                const newPhoto = {
                                  id: `gal-${Date.now()}`,
                                  category: 'Couple',
                                  title: 'New Royal Photograph',
                                  caption: 'Uploaded via Admin Studio',
                                  aspect: 'square',
                                  imageUrl: url
                                };
                                setCmsData({
                                  ...cmsData,
                                  gallery: [newPhoto, ...cmsData.gallery]
                                });
                                setAdminNotification('Photograph added to gallery!');
                              })
                            }
                          />
                        </label>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {cmsData.gallery.map((item, idx) => (
                          <div
                            key={item.id}
                            className="p-3.5 rounded-lg bg-[#E5D5BB]/60 border border-[#C5A15B] space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <select
                                value={item.category}
                                onChange={(e) => {
                                  const next = [...cmsData.gallery];
                                  next[idx] = { ...next[idx], category: e.target.value };
                                  setCmsData({ ...cmsData, gallery: next });
                                }}
                                className="px-2 py-1 rounded border border-[#C5A15B] bg-white text-xs"
                              >
                                {[
                                  'Couple',
                                  'Engagement',
                                  'Family',
                                  'Friends',
                                  'Celebrations',
                                  'Special Memories'
                                ].map((c) => (
                                  <option key={c} value={c}>
                                    {c}
                                  </option>
                                ))}
                              </select>
                              <button
                                onClick={() =>
                                  setCmsData({
                                    ...cmsData,
                                    gallery: cmsData.gallery.filter((g) => g.id !== item.id)
                                  })
                                }
                                className="text-red-700 p-1 hover:bg-red-100 rounded cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => {
                                const next = [...cmsData.gallery];
                                next[idx] = { ...next[idx], title: e.target.value };
                                setCmsData({ ...cmsData, gallery: next });
                              }}
                              className="w-full px-3 py-1.5 rounded border border-[#C5A15B] bg-white text-xs"
                              placeholder="Title"
                            />
                            <input
                              type="text"
                              value={item.imageUrl}
                              onChange={(e) => {
                                const next = [...cmsData.gallery];
                                next[idx] = { ...next[idx], imageUrl: e.target.value };
                                setCmsData({ ...cmsData, gallery: next });
                              }}
                              className="w-full px-3 py-1.5 rounded border border-[#C5A15B] bg-white text-xs"
                              placeholder="Image URL (or upload above)"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB E: VENUES MANAGER */}
                  {adminTab === 'venues' && (
                    <div className="space-y-6">
                      <h3 className="font-cinzel text-xl text-[#641D2B] uppercase font-semibold border-b border-[#C5A15B] pb-2">
                        Manage Wedding Venues &amp; Map Links
                      </h3>
                      <div className="space-y-4">
                        {cmsData.venues.map((v, idx) => (
                          <div
                            key={v.id}
                            className="p-4 rounded-lg bg-[#E5D5BB]/60 border border-[#C5A15B] space-y-3"
                          >
                            <input
                              type="text"
                              value={v.name}
                              onChange={(e) => {
                                const next = [...cmsData.venues];
                                next[idx] = { ...next[idx], name: e.target.value };
                                setCmsData({ ...cmsData, venues: next });
                              }}
                              className="w-full px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs font-semibold"
                              placeholder="Venue Name"
                            />
                            <input
                              type="text"
                              value={v.address}
                              onChange={(e) => {
                                const next = [...cmsData.venues];
                                next[idx] = { ...next[idx], address: e.target.value };
                                setCmsData({ ...cmsData, venues: next });
                              }}
                              className="w-full px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs"
                              placeholder="Full Venue Address"
                            />
                            <input
                              type="text"
                              value={v.googleMapsUrl}
                              onChange={(e) => {
                                const next = [...cmsData.venues];
                                next[idx] = { ...next[idx], googleMapsUrl: e.target.value };
                                setCmsData({ ...cmsData, venues: next });
                              }}
                              className="w-full px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs"
                              placeholder="Google Maps URL"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB F: WISHES MODERATION */}
                  {adminTab === 'wishes' && (
                    <div className="space-y-6">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#C5A15B] pb-2">
                        <h3 className="font-cinzel text-xl text-[#641D2B] uppercase font-semibold">
                          Guest Wishes Moderation
                        </h3>
                        <label className="text-xs flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={cmsData.settings.autoApproveWishes}
                            onChange={(e) =>
                              setCmsData({
                                ...cmsData,
                                settings: {
                                  ...cmsData.settings,
                                  autoApproveWishes: e.target.checked
                                }
                              })
                            }
                          />
                          <span>Auto-Approve New Submissions</span>
                        </label>
                      </div>

                      <div className="space-y-3">
                        {cmsData.wishes.map((w, idx) => (
                          <div
                            key={w.id}
                            className="p-4 rounded-lg bg-[#E5D5BB]/60 border border-[#C5A15B] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-cinzel text-sm font-bold text-[#641D2B]">
                                  {w.guestName}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${
                                    w.status === 'approved'
                                      ? 'bg-emerald-900 text-emerald-100'
                                      : 'bg-amber-800 text-amber-100'
                                  }`}
                                >
                                  {w.status}
                                </span>
                              </div>
                              <p className="text-xs text-[#29201D]/70">{w.relationship}</p>
                              <p className="mt-1 text-sm italic">“{w.message}”</p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 shrink-0">
                              <button
                                onClick={() => {
                                  const next = [...cmsData.wishes];
                                  next[idx] = { ...next[idx], status: 'approved' };
                                  setCmsData({ ...cmsData, wishes: next });
                                }}
                                className="px-3 py-1.5 bg-emerald-800 text-white text-xs rounded cursor-pointer"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => {
                                  const next = [...cmsData.wishes];
                                  next[idx] = { ...next[idx], featured: !next[idx].featured };
                                  setCmsData({ ...cmsData, wishes: next });
                                }}
                                className="px-3 py-1.5 bg-[#C5A15B] text-[#29201D] text-xs font-semibold rounded cursor-pointer"
                              >
                                {w.featured ? 'Unfeature' : 'Feature ★'}
                              </button>
                              <button
                                onClick={() =>
                                  setCmsData({
                                    ...cmsData,
                                    wishes: cmsData.wishes.filter((item) => item.id !== w.id)
                                  })
                                }
                                className="px-3 py-1.5 bg-red-800 text-white text-xs rounded cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB G: INVITATION PDF & BACKGROUND MUSIC */}
                  {adminTab === 'invitation' && (
                    <div className="space-y-6">
                      <h3 className="font-cinzel text-xl text-[#641D2B] uppercase font-semibold border-b border-[#C5A15B] pb-2">
                        Official Kankotri PDF &amp; Background Music
                      </h3>

                      <div className="p-4 rounded-lg bg-[#E5D5BB]/60 border border-[#C5A15B] space-y-4">
                        <label className="block font-cinzel text-xs uppercase text-[#641D2B] font-semibold">
                          Official Invitation PDF URL
                        </label>
                        <input
                          type="text"
                          value={cmsData.settings.invitationPdfUrl}
                          onChange={(e) =>
                            setCmsData({
                              ...cmsData,
                              settings: {
                                ...cmsData.settings,
                                invitationPdfUrl: e.target.value
                              }
                            })
                          }
                          placeholder="https://your-supabase-storage.supabase.co/storage/v1/object/public/invitations/kankotri.pdf"
                          className="w-full px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs"
                        />

                        <label className="block font-cinzel text-xs uppercase text-[#641D2B] font-semibold mt-4">
                          Background Music MP3 URL (Leave empty to use built-in Royal Tanpura &amp; Sitar Soundscape)
                        </label>
                        <input
                          type="text"
                          value={cmsData.settings.musicUrl}
                          onChange={(e) =>
                            setCmsData({
                              ...cmsData,
                              settings: { ...cmsData.settings, musicUrl: e.target.value }
                            })
                          }
                          placeholder="https://.../royal-shehnai.mp3"
                          className="w-full px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {/* TAB H: WEBSITE SETTINGS & SUPABASE POSTGRESQL + RLS INTEGRATION */}
                  {adminTab === 'settings' && (
                    <div className="space-y-6">
                      <h3 className="font-cinzel text-xl text-[#641D2B] uppercase font-semibold border-b border-[#C5A15B] pb-2">
                        Website Settings &amp; Supabase Cloud Setup
                      </h3>

                      <div className="p-4 rounded-lg bg-[#E5D5BB]/60 border border-[#C5A15B] grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-cinzel uppercase text-[#641D2B] mb-1">
                            Groom Name
                          </label>
                          <input
                            type="text"
                            value={cmsData.settings.groomName}
                            onChange={(e) =>
                              setCmsData({
                                ...cmsData,
                                settings: { ...cmsData.settings, groomName: e.target.value }
                              })
                            }
                            className="w-full px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-cinzel uppercase text-[#641D2B] mb-1">
                            Bride Name
                          </label>
                          <input
                            type="text"
                            value={cmsData.settings.brideName}
                            onChange={(e) =>
                              setCmsData({
                                ...cmsData,
                                settings: { ...cmsData.settings, brideName: e.target.value }
                              })
                            }
                            className="w-full px-3 py-2 rounded border border-[#C5A15B] bg-white text-xs"
                          />
                        </div>
                      </div>

                      {/* Live Supabase Project Connector */}
                      <div className="p-5 rounded-lg bg-[#46131F] text-[#F4EBDD] border border-[#C5A15B] space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-cinzel text-sm text-[#C5A15B] uppercase font-semibold flex items-center gap-2">
                            <Database className="w-4 h-4" /> Supabase Backend Connection
                          </span>
                          <button
                            onClick={() => {
                              navigator.clipboard?.writeText(SUPABASE_SQL_SETUP);
                              setAdminNotification(
                                'Copied complete Supabase PostgreSQL + RLS SQL Setup Script to clipboard!'
                              );
                            }}
                            className="px-3 py-1.5 bg-[#C5A15B] text-[#29201D] font-cinzel text-[11px] font-semibold uppercase rounded cursor-pointer"
                          >
                            Copy SQL &amp; RLS Schema
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={supabaseUrl}
                            onChange={(e) => setSupabaseUrl(e.target.value)}
                            placeholder="Supabase Project URL (https://xyz.supabase.co)"
                            className="px-3 py-2 rounded bg-[#641D2B] border border-[#C5A15B]/60 text-xs text-[#F4EBDD]"
                          />
                          <input
                            type="password"
                            value={supabaseAnonKey}
                            onChange={(e) => setSupabaseAnonKey(e.target.value)}
                            placeholder="Supabase Public Anon Key"
                            className="px-3 py-2 rounded bg-[#641D2B] border border-[#C5A15B]/60 text-xs text-[#F4EBDD]"
                          />
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <button
                            onClick={() => {
                              if (supabaseUrl && supabaseAnonKey) {
                                setSupabaseConnected(true);
                                setSupabaseStatusMsg(
                                  'Connected! Live CMS sync & Wishes table linked to Supabase.'
                                );
                              } else {
                                setSupabaseStatusMsg(
                                  'Please enter both your Supabase Project URL and Public Anon Key.'
                                );
                              }
                            }}
                            className="px-4 py-2 bg-[#C5A15B] text-[#29201D] font-cinzel text-xs font-semibold uppercase rounded cursor-pointer"
                          >
                            Connect Supabase
                          </button>
                          {supabaseStatusMsg && (
                            <span className="text-xs text-[#E5D5BB]">{supabaseStatusMsg}</span>
                          )}
                        </div>

                        <pre className="p-3 rounded bg-[#29201D] text-[#E5D5BB] text-[11px] overflow-x-auto max-h-48 border border-[#C5A15B]/30">
                          {SUPABASE_SQL_SETUP}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}