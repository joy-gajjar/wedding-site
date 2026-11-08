import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { entranceState, scrollProgress } from './entranceTimeline.js';
import {
  Crown,
  Sparkles,
  Heart,
  Calendar,
  MapPin,
  Clock,
  Volume2,
  VolumeX,
  Share2,
  Download,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Menu,
  Film,
  BookOpen,
  Users,
  Send,
  ExternalLink,
  Copy,
  Star,
  Play,
  Pause,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// ============================================================================
// INITIAL ROYAL STORYBOOK CMS DATA (EDIT DIRECTLY IN CODE)
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
    autoApproveWishes: true, // No admin moderation any more, so wishes appear immediately
    musicUrl: '', // Empty uses built-in Royal Tanpura & Chime Synthesizer; set a custom MP3 URL here
    invitationPdfUrl: '',
    invitationDownloadEnabled: true,
    invitationNote:
      'With the divine blessings of Lord Mahavir and our revered ancestors, we cordially invite you to grace the auspicious wedding celebrations.'
  },
  chapters: [
    {
      id: 'ch-1',
      number: 'CHAPTER 01',
      title: 'Stolen Glances & An Anime DP',
      subtitle: 'Where it all began',
      dateLabel: 'Sthanakvasi Jain Upashray',
      quote: '“We caught each other’s eyes across the hall again and again—yet neither of us said a word.”',
      story: [
        'Our story began in the serene surroundings of the Sthanakvasi Jain Upashray. Call it fate or love at first sight, we caught each other’s eyes across the hall again and again—yet neither of us said a word.',
        'Determined to find her, Jainam tracked down Shalvi’s Instagram and sent a follow request, only to be left hanging because his profile picture was an anime character and she had no idea who he was!',
        'Six months later, destiny gave us a second take at the very same Upashray. After another round of stolen glances, it was Shalvi’s turn to do some detective work. She found his profile, sent the first text, and officially began our story.'
      ],
      imageCaption: 'Sthanakvasi Jain Upashray',
      imageUrl: ''
    },
    {
      id: 'ch-2',
      number: 'CHAPTER 02',
      title: 'The Riverfront Surprise',
      subtitle: 'Our first real date',
      dateLabel: 'The Riverfront',
      quote: '“Our first real date wasn’t a grand planned affair, which made it even better.”',
      story: [
        'One evening, Jainam showed up at Shalvi’s office as a surprise. From there, we rode over to the Riverfront and spent an hour simply sitting by the water, talking about our lives before he dropped her home.',
        'By the end of that evening, Jainam was convinced he had met the ultimate sanskari, sushil girl of his dreams, while Shalvi walked away smiling at the caring, effortlessly funny guy who had just brightened her evening.'
      ],
      imageCaption: 'An evening by the Riverfront',
      imageUrl: ''
    },
    {
      id: 'ch-3',
      number: 'CHAPTER 03',
      title: 'Instagram Chats & Commute Chronicles',
      subtitle: 'Magic in the everyday',
      dateLabel: 'Late nights & daily rides',
      quote: '“We didn’t need extravagant getaways to fall deeper in love—our magic happened in the everyday routine.”',
      story: [
        'Between endless late-night Instagram conversations and the happy coincidence that our daily office routes nearly overlapped, our commutes quickly became the best part of the workday.',
        'Those shared rides through city traffic turned two people getting to know each other into best friends who couldn’t imagine a day without talking.'
      ],
      imageCaption: 'Shared rides through the city',
      imageUrl: ''
    },
    {
      id: 'ch-4',
      number: 'CHAPTER 04',
      title: 'Becoming Each Other’s Habit',
      subtitle: 'Quietly, then all at once',
      dateLabel: 'Every season since',
      quote: '“There wasn’t a single cinematic lightning bolt—instead, we quietly became each other’s favourite habit.”',
      story: [
        'Over time, Jainam saw in Shalvi everything he had ever prayed for—a creative soul who would love and care for his parents as her own and show compassion to everyone around her.',
        'And in Jainam, Shalvi found her safe harbour—a man who would put her first, protect her, and keep her laughing through every season of life.'
      ],
      imageCaption: 'Each other’s favourite habit',
      imageUrl: ''
    },
    {
      id: 'ch-5',
      number: 'CHAPTER 05',
      title: 'The Soft Launch & Family Blessings',
      subtitle: 'An effortless “Yes!” from everyone',
      dateLabel: 'Bandish Bhai’s wedding',
      quote: '“Our quiet romance turned into a joyous, effortless “Yes!” from everyone.”',
      story: [
        'The unofficial debut happened during Bandish Bhai’s wedding. Knowing how talented Shalvi is with traditional decor and chaab designs, Jainam smartly “soft-launched” her to the Shah family through the wedding preparations.',
        'Once the festivities wrapped up, we finally opened up to our parents. Coming from the same Sthanakvasi Jain roots and values, both families welcomed the match with open hearts, turning our quiet romance into a joyous, effortless “Yes!” from everyone.'
      ],
      imageCaption: 'Two families, one blessing',
      imageUrl: ''
    },
    {
      id: 'ch-6',
      number: 'CHAPTER 06',
      title: 'Forever Starts February 27, 2027',
      subtitle: 'Hand in hand',
      dateLabel: '27 February 2027',
      quote: '“Hand in hand, just like those evening rides that started it all.”',
      story: [
        'As we count down to February 27, 2027, we couldn’t be more excited to step into this next chapter side by side.',
        'We are ready to build a life filled with shared ambitions, mutual success, spontaneous adventures, and endless laughter—hand in hand, just like those evening rides that started it all.'
      ],
      imageCaption: 'Our forever begins',
      imageUrl: ''
    }
  ],
  couple: {
    groom: {
      name: 'Jainam Shah',
      title: 'The Groom',
      writtenBy: 'In Shalvi’s words',
      monogram: 'J',
      portraitUrl: './couple/jainam-illustrated.jpg',
      introduction:
        'If there is ever a problem that needs solving, Jainam already has three logical solutions mapped out in his head. When he isn’t engineering solutions at work, you’ll find him calculating his next move on a chess board, immersed in video games, or diving deep into a new skill just for the joy of learning. Yes, he can have a quick temper at times, but beneath that logical exterior is the funniest, most fiercely caring and loving man.',
      facts: [
        { label: 'Education', text: 'Master’s in Mechanical Engineering' },
        { label: 'Work', text: 'Former researcher at ISRO; now at Harsha Engineers International Limited' },
        { label: 'Loves', text: 'Chess, video games and learning new skills for the joy of it' }
      ],
      personalMessage: '“He makes me feel cherished every single day.” — Shalvi'
    },
    bride: {
      name: 'Shalvi Dasadia',
      title: 'The Bride',
      writtenBy: 'In Jainam’s words',
      monogram: 'S',
      portraitUrl: './couple/shalvi-illustrated.jpg',
      introduction:
        'The first thing you’ll notice about Shalvi is how effortlessly she puts everyone else before herself. At heart, she is the most caring, loving, and compassionate person I have ever met. She has this incredible creative spark that turns everything around her into something beautiful—whether she is pouring intricate resin art, perfecting nail art, designing traditional wedding chaabs, or cooking up something amazing in the kitchen.',
      facts: [
        { label: 'Education', text: 'Master’s in Commerce' },
        { label: 'Work', text: 'HR Executive at Allies Business Hub, 4.5+ years' },
        { label: 'Loves', text: 'Resin art, nail art, wedding chaab designs and cooking' }
      ],
      personalMessage:
        '“She is the calm to my storm, the warmth in every room, and the exact partner I always hoped to find.” — Jainam'
    }
  },
  familyIntros: {
    groom: {
      title: 'The Groom’s Family — The Shahs',
      text: 'Step into the Shah household and you’ll immediately feel the warmth, laughter, and togetherness that define us. Our home thrives on shared moments—especially our legendary family card nights that happen at least four times a week!'
    },
    bride: {
      title: 'The Bride’s Family — The Dasadias',
      text: 'At the heart of the Dasadia home is a deep bond built on hard work, humility, and unconditional love. Shalvi grew up in a closely knit home where family always comes first. Their grace, togetherness, and heartfelt warmth are the very values Shalvi carries with her every day.'
    }
  },
  families: [
    {
      id: 'fam-1',
      side: 'groom',
      category: 'Parents',
      name: 'Manvesh Shah & Bhavina Shah',
      relation: 'Papa & Mom',
      introduction: 'The unwavering love and guidance at the heart of the Shah household.',
      photoUrl: ''
    },
    {
      id: 'fam-2',
      side: 'groom',
      category: 'Brother & Sister-in-law',
      name: 'Bandish Bhai & Kamya Bhabhi',
      relation: 'Elder brother & sister-in-law',
      introduction: 'Our constant camaraderie—and the reason for the famous soft launch.',
      photoUrl: ''
    },
    {
      id: 'fam-3',
      side: 'groom',
      category: 'Nephew',
      name: 'Baby Hreyan',
      relation: 'The newest star of the family',
      introduction:
        'Two months old and already practising his best smiles to welcome his favourite Chachi home at Chachu and Chachi’s wedding.',
      photoUrl: ''
    },
    {
      id: 'fam-4',
      side: 'bride',
      category: 'Parents',
      name: 'Chirag Dasadia & Reena Dasadia',
      relation: 'Father & Mother',
      introduction:
        'Her father, her pillar of strength, and her warm, ever-supportive mother.',
      photoUrl: ''
    },
    {
      id: 'fam-5',
      side: 'bride',
      category: 'Brother',
      name: 'Vishva',
      relation: 'Shalvi’s loving brother',
      introduction: 'Part of the closely knit home where family always comes first.',
      photoUrl: ''
    }
  ],
  events: [
    {
      id: 'evt-1',
      name: 'Kankotri Lekhan',
      date: '31 January 2027',
      sortOrder: 1,
      startTime: '08:00 AM Onwards',
      endTime: '',
      venueLabel: 'Venue',
      venueName: 'Krushnakunj Flats (B202)',
      venueAddress:
        'B202, Krushnakunj Flats, Opposite Vrundavan Bunglows, Kudasan, Gandhinagar, Gujarat, 382421',
      description:
        'An auspicious beginning where the first wedding invitations (Kankotri) are inscribed with sacred prayers and divine blessings for the upcoming nuptials.',
      dressCode: 'Traditional Indian Festive • Pastel Gold & Ivory',
      mapLink: 'https://maps.app.goo.gl/AByfvXAJ6isCwy297',
      motif: 'kankotri',
      published: true
    },
    {
      id: 'evt-2',
      name: 'Home Mehndi — Day I',
      date: '24 February 2027',
      sortOrder: 2,
      startTime: '08:00 AM Onwards',
      endTime: '',
      venueLabel: 'Venue',
      venueName: 'Krushnakunj Flats (B202)',
      venueAddress:
        'B202, Krushnakunj Flats, Opposite Vrundavan Bunglows, Kudasan, Gandhinagar, Gujarat, 382421',
      description:
        'An intimate afternoon of intricate henna artistry, traditional folk melodies, and joyful family warmth as the wedding week commences.',
      dressCode: 'Rajasthani Mehndi Greens & Marigold Hues',
      mapLink: 'https://maps.app.goo.gl/AByfvXAJ6isCwy297',
      motif: 'mehndi',
      published: true
    },
    {
      id: 'evt-3',
      name: 'Home Mehndi — Day II',
      date: '25 February 2027',
      sortOrder: 3,
      startTime: '08:00 AM Onwards',
      endTime: '',
      venueLabel: 'Venue',
      venueName: 'Krushnakunj Flats (B202)',
      venueAddress:
        'B202, Krushnakunj Flats, Opposite Vrundavan Bunglows, Kudasan, Gandhinagar, Gujarat, 382421',
      description:
        'Continuing the celebration of henna, music, and cherished rituals surrounded by close family and dearest friends.',
      dressCode: 'Vibrant Ethnic • Emerald, Lime & Champagne',
      mapLink: 'https://maps.app.goo.gl/AByfvXAJ6isCwy297',
      motif: 'mehndi',
      published: true
    },
    {
      id: 'evt-4',
      name: 'Royal Haldi Ceremony',
      date: '26 February 2027',
      sortOrder: 4,
      startTime: '09:00 AM Onwards',
      endTime: '',
      venueLabel: 'Venue',
      venueName: 'Kanam Greens Party Plot',
      venueAddress: 'Near Reliance Crossroads, Kudasan, Gandhinagar, Gujarat, 382421',
      description:
        'A sunlit morning awash in auspicious turmeric, marigold petals, dhol beats, and heartfelt blessings for the bride and groom.',
      dressCode: 'Shades of Saffron, Mustard Yellow & Ivory',
      mapLink: 'https://maps.app.goo.gl/bFXUGsMqUfP1FSid7',
      motif: 'haldi',
      published: true
    },
    {
      id: 'evt-5',
      name: 'Grand Sangeet & Reception',
      date: '26 February 2027',
      sortOrder: 5,
      startTime: '06:00 PM Onwards',
      endTime: '',
      venueLabel: 'Venue',
      venueName: 'Kanam Greens Party Plot',
      venueAddress: 'Near Reliance Crossroads, Kudasan, Gandhinagar, Gujarat, 382421',
      description:
        'An enchanting evening of royal glamour, choreographed family performances, musical celebration, and toasts to the couple.',
      dressCode: 'Royal Black-Tie Ethnic / Indo-Western Couture',
      mapLink: 'https://maps.app.goo.gl/bFXUGsMqUfP1FSid7',
      motif: 'sangeet',
      published: true
    },
    {
      id: 'evt-6',
      name: 'Wedding Ceremony & Baarat',
      date: '27 February 2027',
      sortOrder: 6,
      startTime: '07:00 AM Onwards',
      endTime: '',
      venueLabel: 'Baarat Venue',
      venueName: 'Krushnakunj Flats (B202)',
      venueAddress:
        'B202, Krushnakunj Flats, Opposite Vrundavan Bunglows, Kudasan, Gandhinagar, Gujarat, 382421',
      mapLink: 'https://maps.app.goo.gl/AByfvXAJ6isCwy297',
      extraVenue: {
        label: 'Marriage Venue',
        name: 'La Crest Restaurant and Banquet',
        address: 'Sargasan, Gandhinagar, Gujarat, 382421',
        mapLink: 'https://maps.app.goo.gl/GaC3p1SAZUvD5SqUA'
      },
      description:
        'The sacred culmination—where the royal Baarat arrives in grandeur and Jainam & Shalvi unite in holy matrimony beneath the Mandap.',
      dressCode: 'Royal Heritage • Crimson, Burgundy, Gold & Regal Pastels',
      motif: 'wedding',
      published: true
    }
  ],
  gallery: [
    {
      id: 'gal-1',
      category: 'Couple',
      title: 'Royal Jharokha Portrait I',
      caption: '[Editable Placeholder: Couple Portrait]',
      aspect: 'tall',
      imageUrl: ''
    },
    {
      id: 'gal-2',
      category: 'Engagement',
      title: 'The Sacred Promise',
      caption: '[Editable Placeholder: Engagement Moment]',
      aspect: 'wide',
      imageUrl: ''
    },
    {
      id: 'gal-3',
      category: 'Family',
      title: 'Two Families, One Parivar',
      caption: '[Editable Placeholder: Shah & Dasadia Family Portrait]',
      aspect: 'square',
      imageUrl: ''
    },
    {
      id: 'gal-4',
      category: 'Celebrations',
      title: 'Festive Beginnings',
      caption: '[Editable Placeholder: Pre-Wedding Festivities]',
      aspect: 'tall',
      imageUrl: ''
    },
    {
      id: 'gal-5',
      category: 'Friends',
      title: 'Laughter & Companionship',
      caption: '[Editable Placeholder: Friends & Wedding Squad]',
      aspect: 'square',
      imageUrl: ''
    },
    {
      id: 'gal-6',
      category: 'Special Memories',
      title: 'Golden Hour Heritage',
      caption: '[Editable Placeholder: Special Milestone Memory]',
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
        '[Video Placeholder]: Replace with your official Save the Date or Pre-Wedding film link (YouTube, Vimeo, or MP4).',
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
      name: 'Krushnakunj Flats (B202)',
      associatedEvents: 'Kankotri Lekhan, Home Mehndi (Day I & II), Baarat',
      address:
        'B202, Krushnakunj Flats, Opposite Vrundavan Bunglows, Kudasan, Gandhinagar, Gujarat, 382421',
      landmark: 'Opposite Vrundavan Bunglows, Kudasan',
      mapEmbedInfo: 'Live directions on Google Maps',
      googleMapsUrl: 'https://maps.app.goo.gl/AByfvXAJ6isCwy297'
    },
    {
      id: 'ven-2',
      name: 'Kanam Greens Party Plot',
      associatedEvents: 'Royal Haldi Ceremony, Grand Sangeet & Reception',
      address: 'Near Reliance Crossroads, Kudasan, Gandhinagar, Gujarat, 382421',
      landmark: 'Near Reliance Crossroads, Kudasan',
      mapEmbedInfo: 'Live directions on Google Maps',
      googleMapsUrl: 'https://maps.app.goo.gl/bFXUGsMqUfP1FSid7'
    },
    {
      id: 'ven-3',
      name: 'La Crest Restaurant and Banquet',
      associatedEvents: 'Wedding Ceremony (Marriage Venue)',
      address: 'Sargasan, Gandhinagar, Gujarat, 382421',
      landmark: 'Sargasan, Gandhinagar',
      mapEmbedInfo: 'Live directions on Google Maps',
      googleMapsUrl: 'https://maps.app.goo.gl/GaC3p1SAZUvD5SqUA'
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
      guestName: '[Sample Guest Wish]',
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

// ============================================================================
// MOTION HELPERS (reduced-motion hook, scroll reveal, kinetic text)
// ============================================================================
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const usePrefersReducedMotion = (onPreferenceChange) => {
  const [reduced, setReduced] = useState(() => window.matchMedia(REDUCED_MOTION_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(REDUCED_MOTION_QUERY);
    const onChange = (e) => {
      onPreferenceChange?.(e.matches);
      setReduced(e.matches);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [onPreferenceChange]);
  return reduced;
};

// Fades/slides children in once they enter the viewport (see .reveal CSS)
const Reveal = ({ as: Tag = 'div', variant = 'up', delay = 0, className = '', children }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant} ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

// Per-letter rise for headline names (see .kinetic-char CSS)
const KineticText = ({ text, baseDelay = 0, stagger = 38, play = true }) => {
  let n = 0;
  return (
    <span className={`block ${play ? 'kinetic-play' : ''}`} aria-label={text}>
      {text.split(' ').map((word, wi) => (
        <React.Fragment key={wi}>
          {wi > 0 && ' '}
          <span className="kinetic-word" aria-hidden="true">
            {[...word].map((ch, ci) => (
              <span
                key={ci}
                className="kinetic-char"
                style={{ animationDelay: `${baseDelay + n++ * stagger}ms` }}
              >
                {ch}
              </span>
            ))}
          </span>
        </React.Fragment>
      ))}
    </span>
  );
};

// ============================================================================
// ROYAL TORAN — marigold & mango-leaf door garland with hanging bells
// Rope draws on, swags fill with marigolds, strands unfurl then sway gently.
// ============================================================================
const TORAN_W = 1200;
const TORAN_SWAGS = 8;
const TORAN_SWAG_W = TORAN_W / TORAN_SWAGS;
const ROPE_Y = 18;
const SWAG_SAG = 120; // quadratic sag: y = ROPE_Y + SAG * t * (1 - t)

const RoyalToran = ({ className = '', play = true }) => {
  const swagPath = Array.from({ length: TORAN_SWAGS }, (_, i) => {
    const x0 = i * TORAN_SWAG_W;
    return `M${x0} ${ROPE_Y} Q${x0 + TORAN_SWAG_W / 2} ${ROPE_Y + SWAG_SAG / 2} ${x0 + TORAN_SWAG_W} ${ROPE_Y}`;
  }).join(' ');

  const flowers = [];
  for (let i = 0; i < TORAN_SWAGS; i++) {
    for (let k = 1; k <= 7; k++) {
      const t = k / 8;
      flowers.push({
        x: i * TORAN_SWAG_W + TORAN_SWAG_W * t,
        y: ROPE_Y + SWAG_SAG * t * (1 - t),
        r: k === 4 ? 7 : 5.5,
        fill: k % 2 ? '#E39B2D' : '#F2C14E',
        d: 700 + Math.abs(i - (TORAN_SWAGS - 1) / 2) * 90 + k * 25
      });
    }
  }

  const strands = Array.from({ length: TORAN_SWAGS + 1 }, (_, i) => ({
    x: i * TORAN_SWAG_W,
    len: i % 2 ? 62 : 92,
    d: 1100 + Math.abs(i - TORAN_SWAGS / 2) * 110,
    sd: `${4.2 + (i % 3) * 0.7}s`,
    sdl: `${(i % 4) * -0.9}s`
  }));

  return (
    <svg
      viewBox={`0 0 ${TORAN_W} 170`}
      preserveAspectRatio="xMidYMin slice"
      className={`toran ${play ? 'toran-play' : ''} ${className}`}
      fill="none"
      aria-hidden="true"
    >
      {/* Rope & swag cords */}
      <path className="t-draw" pathLength="1" d={`M0 ${ROPE_Y} H${TORAN_W}`} stroke="#C5A15B" strokeWidth="3" />
      <path className="t-draw" pathLength="1" d={`M0 ${ROPE_Y - 6} H${TORAN_W}`} stroke="#C5A15B" strokeWidth="1" opacity="0.5" />
      <path className="t-draw" pathLength="1" d={swagPath} stroke="#C5A15B" strokeWidth="1.5" opacity="0.8" />

      {/* Hanging strands: marigold beads, mango leaves, temple bell */}
      {strands.map((s, i) => (
        <g key={`s-${i}`} className="t-unfurl" style={{ '--d': `${s.d}ms` }}>
          <g className="t-sway" style={{ '--sd': s.sd, '--sdl': s.sdl }}>
            <line x1={s.x} y1={ROPE_Y} x2={s.x} y2={ROPE_Y + s.len} stroke="#C5A15B" strokeWidth="1.2" />
            {Array.from({ length: Math.floor(s.len / 14) }, (_, b) => (
              <circle
                key={b}
                cx={s.x}
                cy={ROPE_Y + 12 + b * 14}
                r="5"
                fill={b % 2 ? '#F2C14E' : '#E39B2D'}
                stroke="#B5651D"
                strokeWidth="0.6"
              />
            ))}
            <path
              d={`M${s.x} ${ROPE_Y + s.len} q-14 6 -16 22 q12 -4 16 -22 Z`}
              fill="#5E7A43"
              opacity="0.9"
            />
            <path
              d={`M${s.x} ${ROPE_Y + s.len} q14 6 16 22 q-12 -4 -16 -22 Z`}
              fill="#6E8C4E"
              opacity="0.9"
            />
            <g className="t-bell" style={{ '--sdl': s.sdl }}>
              <line x1={s.x} y1={ROPE_Y + s.len} x2={s.x} y2={ROPE_Y + s.len + 10} stroke="#C5A15B" strokeWidth="1" />
              <path
                d={`M${s.x - 8} ${ROPE_Y + s.len + 26} Q${s.x - 8} ${ROPE_Y + s.len + 10} ${s.x} ${ROPE_Y + s.len + 10} Q${s.x + 8} ${ROPE_Y + s.len + 10} ${s.x + 8} ${ROPE_Y + s.len + 26} Z`}
                fill="#C5A15B"
                stroke="#8A6A2E"
                strokeWidth="0.8"
              />
              <circle cx={s.x} cy={ROPE_Y + s.len + 29} r="2.4" fill="#8A6A2E" />
            </g>
          </g>
        </g>
      ))}

      {/* Marigolds along each swag */}
      {flowers.map((f, i) => (
        <g key={`f-${i}`} className="t-bead" style={{ '--d': `${f.d}ms` }}>
          <circle cx={f.x} cy={f.y} r={f.r} fill={f.fill} stroke="#B5651D" strokeWidth="0.6" />
          <circle cx={f.x} cy={f.y} r={f.r * 0.35} fill="#B5651D" opacity="0.55" />
        </g>
      ))}

      {/* Centre medallion */}
      <g className="t-fade">
        <circle cx={TORAN_W / 2} cy={ROPE_Y} r="13" fill="#46131F" stroke="#C5A15B" strokeWidth="2" />
        <path
          d={`M${TORAN_W / 2} ${ROPE_Y - 8} C${TORAN_W / 2 + 6} ${ROPE_Y - 2} ${TORAN_W / 2 + 6} ${ROPE_Y + 4} ${TORAN_W / 2} ${ROPE_Y + 8} C${TORAN_W / 2 - 6} ${ROPE_Y + 4} ${TORAN_W / 2 - 6} ${ROPE_Y - 2} ${TORAN_W / 2} ${ROPE_Y - 8} Z`}
          fill="#C5A15B"
        />
      </g>
    </svg>
  );
};

// ============================================================================
// STORY SWIPER — drag / swipe / arrow-key chapter pages (no buttons, no scroller)
// ============================================================================
const SWIPE_THRESHOLD = 0.18; // fraction of width
const FLICK_VELOCITY = 0.45; // px per ms

const StorySwiper = ({ chapters }) => {
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const viewportRef = useRef(null);
  const drag = useRef(null);
  const total = chapters.length;

  const goTo = (i) => setIndex(Math.max(0, Math.min(total - 1, i)));

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    drag.current = { x: e.clientX, y: e.clientY, t: performance.now(), axis: null, id: e.pointerId };
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.axis) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      d.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (d.axis === 'y') {
        drag.current = null; // let the page scroll
        return;
      }
      viewportRef.current?.setPointerCapture(d.id);
      setDragging(true);
    }
    // Rubber-band resistance past the first/last chapter
    const atEdge = (index === 0 && dx > 0) || (index === total - 1 && dx < 0);
    setDragX(atEdge ? dx * 0.3 : dx);
  };

  const onPointerEnd = (e) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.axis !== 'x') return;
    const dx = e.clientX - d.x;
    const width = viewportRef.current?.offsetWidth || 1;
    const velocity = Math.abs(dx) / Math.max(1, performance.now() - d.t);
    if (Math.abs(dx) > width * SWIPE_THRESHOLD || velocity > FLICK_VELOCITY) {
      goTo(index + (dx < 0 ? 1 : -1));
    }
    setDragging(false);
    setDragX(0);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') goTo(index + 1);
    if (e.key === 'ArrowLeft') goTo(index - 1);
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Our story chapters — swipe or use arrow keys"
      tabIndex={0}
      onKeyDown={onKeyDown}
      id="story-card"
      className="story-card scroll-mt-[4.75rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A15B] rounded-xl"
    >
      <div
        ref={viewportRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        className={`story-viewport relative overflow-hidden rounded-xl border-2 border-[#C5A15B] bg-gradient-to-br from-[#641D2B] to-[#46131F] text-[#F4EBDD] shadow-2xl ${
          dragging ? 'is-dragging' : ''
        }`}
      >
        <div
          className="flex items-stretch h-full"
          style={{
            transform: `translate3d(calc(${-index * 100}% + ${dragX}px), 0, 0)`,
            transition: dragging ? 'none' : 'transform 750ms var(--ease-out-quint)'
          }}
        >
          {chapters.map((ch, i) => (
            <article
              key={ch.id}
              aria-roledescription="slide"
              aria-label={`Chapter ${i + 1} of ${total}`}
              aria-hidden={i !== index}
              className={`story-slide w-full shrink-0 h-full p-4 pb-12 sm:p-12 ${i === index ? 'is-active' : ''}`}
            >
              <div className="h-full flex flex-col gap-4 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
                {/* Phone: arch fills the top of the card */}
                <div className="chapter-frame lg:hidden flex-[0_0_36%] min-h-0 flex justify-center">
                  <div className="h-full aspect-[4/5] rounded-t-full p-1.5 border-2 border-[#C5A15B]/70 bg-[#F4EBDD]">
                    <div className="relative h-full w-full rounded-t-full overflow-hidden border border-[#C5A15B]/50 bg-gradient-to-b from-[#641D2B] via-[#46131F] to-[#29201D] flex flex-col items-center justify-center text-center">
                      {ch.imageUrl ? (
                        <img src={ch.imageUrl} alt={ch.imageCaption} draggable={false} className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <>
                          <LotusMandalaSVG className="w-14 h-14 opacity-80" color="#C5A15B" />
                          <span className="mt-1 font-cinzel text-xs tracking-[0.2em] text-[#C5A15B]">{ch.number}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="chapter-frame hidden lg:block lg:col-span-5">
                  <JharokhaFrame imageUrl={ch.imageUrl} title={ch.imageCaption} monogram={ch.number} />
                </div>

                <div className="story-text flex-1 min-h-0 overflow-y-auto overscroll-contain lg:overflow-visible lg:col-span-7">
                  <span className="chapter-item block font-cinzel text-[11px] sm:text-xs tracking-[0.25em] text-[#C5A15B] uppercase" style={{ '--i': 0 }}>
                    {ch.number} • {ch.dateLabel}
                  </span>
                  <h3 className="chapter-item mt-1.5 font-display text-[1.55rem] leading-tight sm:text-4xl text-[#F4EBDD]" style={{ '--i': 1 }}>
                    {ch.title}
                  </h3>
                  <p className="chapter-item font-cormorant italic text-lg sm:text-xl text-[#C5A15B] mt-1" style={{ '--i': 2 }}>
                    {ch.subtitle}
                  </p>
                  <blockquote className="chapter-item my-3 sm:my-5 pl-3 sm:pl-4 border-l-2 border-[#C5A15B] font-cormorant italic text-lg sm:text-xl text-[#E5D5BB]" style={{ '--i': 3 }}>
                    {ch.quote}
                  </blockquote>
                  <div className="space-y-3 sm:space-y-4 font-cormorant text-[1.05rem] sm:text-xl leading-relaxed text-[#F4EBDD]/95">
                    {ch.story.map((para, pi) => (
                      <p key={pi} className="chapter-item" style={{ '--i': 4 + pi }}>{para}</p>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Page counter + swipe hint, pinned inside the card */}
        <div className="absolute inset-x-0 bottom-0 h-11 flex items-center justify-center gap-3 border-t border-[#C5A15B]/30 bg-[#46131F]/90 font-cinzel text-[10px] sm:text-[11px] tracking-[0.25em] text-[#C5A15B] uppercase select-none pointer-events-none">
          <span aria-live="polite">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span className="swipe-hint-hand inline-block" aria-hidden="true">⟷</span>
          <span className="text-[#E5D5BB]/70">Swipe to turn the page</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// PALACE ENTRANCE — SVG facade and independently hinged carved doors
// ============================================================================
const PALACE_ART = './entrance/palace.svg';
// Coordinates match the opening in palace.svg (viewBox 1200 × 700).
const DOORWAY = { left: 40, top: 240 / 7, width: 20, height: 390 / 7 };

const PalaceGate = ({ doorOpen, lightAlpha }) => (
  <div className="palace-plane" aria-hidden="true">
    <img src={PALACE_ART} alt="" width="1200" height="700" draggable={false} />
    <div className="palace-doorway" style={{ left: `${DOORWAY.left}%`, top: `${DOORWAY.top}%`, width: `${DOORWAY.width}%`, height: `${DOORWAY.height}%` }}>
      <svg className="palace-light" viewBox="0 0 240 390" style={{ opacity: lightAlpha }}>
        <defs><radialGradient id="palace-light"><stop stopColor="#FFFDF5"/><stop offset=".6" stopColor="#FFE8A8"/><stop offset="1" stopColor="#C5A15B"/></radialGradient></defs>
        <path d="M0 390V130Q0 55 120 0Q240 55 240 130V390Z" fill="url(#palace-light)" />
      </svg>
      {['left', 'right'].map((side) => (
        <svg key={side} className={`palace-door palace-door-${side}`} viewBox="0 0 120 390" style={{ transform: `rotateY(${(side === 'left' ? -1 : 1) * doorOpen * 100}deg)` }}>
          <g transform={side === 'right' ? 'translate(120 0) scale(-1 1)' : undefined}>
            <path d="M0 390V130Q0 55 120 0V390Z" fill="#46131F" stroke="#E8CF8E" strokeWidth="2" />
            <path d="M9 379V134Q9 68 111 15V379Z" fill="#641D2B" stroke="#C5A15B" />
            <path d="M16 182V137Q16 79 102 29V182Z M16 196H102V294H16Z M16 308H102V368H16Z" fill="#46131F" stroke="#C5A15B" />
            <path d="M60 72Q95 108 60 158Q26 124 60 72Z M60 83V151M30 119H90" stroke="#C5A15B" fill="none" />
            <path d="M37 321Q60 304 84 321V355H37Z M44 332H76M44 341H76" stroke="#C5A15B" fill="none" />
            {[202, 286, 314, 360].flatMap((y) => [23, 94].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill="#E8CF8E" />))}
            <circle cx="86" cy="235" r="5" fill="#C5A15B" />
            <ellipse cx="86" cy="248" rx="7" ry="11" stroke="#E8CF8E" strokeWidth="3" fill="none" />
          </g>
        </svg>
      ))}
    </div>
    <RoyalToran className="palace-toran" play />
  </div>
);

// ============================================================================
// COUPLE DANCE — pre-rendered illustrated film (public/media), muted so it can autoplay
// ============================================================================
const DANCE_VIDEO = './media/our-dance.mp4';
const DANCE_POSTER = './media/our-dance-poster.jpg';

const DanceStage = ({ active, onComplete }) => {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [failed, setFailed] = useState(false);

  // Keeps the playback position when the guest scrolls briefly out of the dance and back.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active && !paused) {
      video.play().then(() => setBlocked(false)).catch(() => setBlocked(true));
    } else {
      video.pause();
    }
  }, [active, paused]);

  useEffect(() => {
    const onVisibility = () => { if (document.hidden) setPaused(true); };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return (
    <div className="dance-stage">
      <p className="entrance-eyebrow font-cinzel">One hand. One dance. One forever.</p>
      <div className="dance-frame">
        <video
          ref={videoRef}
          className="dance-video"
          src={DANCE_VIDEO}
          poster={DANCE_POSTER}
          muted
          playsInline
          preload="auto"
          aria-label="Illustrated Jainam offers Shalvi his hand, she twirls under his arm, and they come together in an embrace"
          onEnded={onComplete}
          onError={() => setFailed(true)}
          onPlaying={() => { setBlocked(false); setFailed(false); }}
        />
      </div>
      <p className="dance-caption font-cormorant italic">May I have this dance?</p>
      <div className="dance-controls">
        {!failed && (
          <button
            type="button"
            onClick={() => {
              if (!blocked) return setPaused(!paused);
              setPaused(false);
              videoRef.current?.play().then(() => setBlocked(false)).catch(() => {});
            }}
            className="entrance-text-link"
          >
            {blocked ? 'Play our dance' : paused ? 'Resume dance' : 'Pause dance'}
          </button>
        )}
        <button type="button" onClick={onComplete} className="entrance-text-link">
          {failed ? 'Continue to our invitation' : 'Skip dance'} <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
};

const ScrollEntrance = ({ settings, onMusic, isPlayingMusic, onExitChange }) => {
  const ref = useRef(null);
  const stickyRef = useRef(null);
  const inviteRef = useRef(null);
  const transferFocusRef = useRef(false);
  const rememberDanceFocus = useCallback(() => {
    transferFocusRef.current = Boolean(document.activeElement?.closest('.dance-layer'));
  }, []);
  const reduced = usePrefersReducedMotion(rememberDanceFocus);
  const [progress, setProgress] = useState(0);
  const [danceDone, setDanceDone] = useState(false);
  const finishDance = useCallback(() => {
    // Capture before React makes the dance inert (which clears activeElement).
    rememberDanceFocus();
    setDanceDone(true);
  }, [rememberDanceFocus]);
  const state = entranceState(progress, { danceDone, reduced });

  useEffect(() => {
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = ref.current;
        const stage = stickyRef.current;
        const rect = el.getBoundingClientRect();
        const t = scrollProgress(rect.top, el.offsetHeight, stage.offsetHeight);
        setProgress(t);
        if (t < .08) setDanceDone(false);
        else if (t >= .94) setDanceDone(true);
        onExitChange(rect.bottom <= 80);
      });
    };
    const observer = new ResizeObserver(update);
    observer.observe(ref.current);
    observer.observe(stickyRef.current);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('pageshow', update);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      window.removeEventListener('pageshow', update);
    };
  }, [onExitChange, reduced]);

  useEffect(() => {
    if (state.showInvite && transferFocusRef.current) {
      inviteRef.current?.focus({ preventScroll: true });
      transferFocusRef.current = false;
    }
  }, [state.showInvite]);

  return (
    <section id="entrance" ref={ref} className={`entrance ${reduced ? 'reduced' : ''}`} aria-label="Your invitation opens as you scroll">
      <div ref={stickyRef} className="entrance-sticky">
        <div className="entrance-visual" style={{ opacity: state.visualAlpha }}>
          <div className="palace-zoom" style={{ transform: `scale(${state.visualScale})` }}>
            <PalaceGate doorOpen={state.doorOpen} lightAlpha={state.lightAlpha} />
          </div>
        </div>
        <div className="entrance-heading intro intro-play" style={{ opacity: state.headingAlpha }} inert={state.headingAlpha < .5 || undefined}>
          <p className="entrance-eyebrow font-cinzel intro-item" style={{ '--i': 0 }}>❖ Shri Mahaviray Namah ❖</p>
          <p className="entrance-kicker font-cormorant italic intro-item" style={{ '--i': 1 }}>Together with the blessings of our families</p>
          <h1 className="font-display">
            <KineticText text={settings.groomName} baseDelay={150} />
            <span className="entrance-amp font-cormorant italic">&amp;</span>
            <KineticText text={settings.brideName} baseDelay={450} />
          </h1>
          <p className="entrance-date font-cinzel intro-item" style={{ '--i': 3 }}>{settings.weddingDateDisplay}</p>
          <button type="button" className="entrance-music press font-cinzel intro-item" style={{ '--i': 4 }} aria-pressed={isPlayingMusic} onClick={() => onMusic(!isPlayingMusic)}>
            {isPlayingMusic ? <Pause size={14} aria-hidden="true" /> : <Volume2 size={14} aria-hidden="true" />}
            {isPlayingMusic ? 'Pause music' : 'Begin with music'}
          </button>
        </div>
        {!reduced && <div className="entrance-scroll font-cinzel" style={{ opacity: state.headingAlpha }}>
          Scroll to open the gates<span className="scroll-cue" aria-hidden="true" />
          <a href="#home" className="entrance-skip" tabIndex={state.headingAlpha < .5 ? -1 : 0}>Skip entrance</a>
        </div>}
        {!reduced && <div className="entrance-layer dance-layer" style={{ opacity: state.danceAlpha }} inert={!state.danceOn || undefined} aria-hidden={!state.danceOn}>
          <DanceStage key={state.resetDance ? 'reset' : 'run'} active={state.danceOn} onComplete={finishDance} />
        </div>}
        <div className={`entrance-layer entrance-invitation intro ${state.showInvite ? 'intro-play' : ''}`} inert={!state.showInvite || undefined} style={{ opacity: state.showInvite ? 1 : 0 }}>
          <p className="entrance-eyebrow font-cinzel intro-item" style={{ '--i': 0 }}>With love, from us to you</p>
          <h2 ref={inviteRef} tabIndex={-1} className="font-display intro-item" style={{ '--i': 1 }}>Two families,<br /><span className="font-cormorant italic">one forever.</span></h2>
          <div className="entrance-portrait intro-item" style={{ '--i': 2 }}>
            <img src="./couple/jainam-shalvi-3.jpg" alt="Jainam and Shalvi smiling together" width="1400" height="1050" />
          </div>
          <p className="entrance-note font-cormorant intro-item" style={{ '--i': 3 }}>{settings.invitationNote}</p>
          <a href="#home" className="entrance-text-link font-cinzel intro-item" style={{ '--i': 4 }}>Discover the celebrations <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  );
};

const JSMonogramSVG = ({ className = 'w-full h-full' }) => (
  <div
    className={`${className} rounded-full bg-[#F4EBDD] border-2 border-[#C5A15B] shadow-lg overflow-hidden flex items-center justify-center`}
  >
    <img
      src="./JS%20Logo%20Transperant.png"
      alt="Jainam and Shalvi wedding logo"
      className="w-full h-full object-contain scale-100"
    />
  </div>
);

const OrnamentalDivider = ({ variant = 'gold', showLotus = true }) => {
  const stroke = variant === 'gold' ? '#C5A15B' : '#641D2B';
  return (
    <Reveal variant="draw" className="flex items-center justify-center my-6 select-none">
      <svg viewBox="0 0 420 36" className="w-64 sm:w-80 h-8" fill="none" aria-hidden="true">
        <path className="draw-path" pathLength="1" d="M10 18 H155" stroke={stroke} strokeWidth="1" opacity="0.6" />
        <path className="draw-path" pathLength="1" d="M35 14 H145" stroke={stroke} strokeWidth="0.6" opacity="0.35" />
        <path className="draw-path" pathLength="1" d="M265 18 H410" stroke={stroke} strokeWidth="1" opacity="0.6" />
        <path className="draw-path" pathLength="1" d="M275 14 H385" stroke={stroke} strokeWidth="0.6" opacity="0.35" />
        {/* Ornamental Diamond & Lotus Center */}
        <path className="draw-path" pathLength="1" d="M165 18 L180 10 L195 18 L180 26 Z" stroke={stroke} strokeWidth="1.2" />
        <path className="draw-path" pathLength="1" d="M225 18 L240 10 L255 18 L240 26 Z" stroke={stroke} strokeWidth="1.2" />
        {showLotus && (
          <g className="draw-bloom">
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
        <circle className="draw-bloom" cx="155" cy="18" r="2" fill={stroke} />
        <circle className="draw-bloom" cx="265" cy="18" r="2" fill={stroke} />
      </svg>
    </Reveal>
  );
};

const JharokhaFrame = ({
  imageUrl,
  title,
  monogram = 'J&S',
  dark = false,
  aspectClass = 'aspect-[4/5]',
  sizeClass = 'max-w-sm'
}) => {
  return (
    <div
      className={`relative mx-auto w-full ${sizeClass} rounded-t-full p-3 border-2 border-[#C5A15B]/70 shadow-2xl overflow-hidden ${
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
            draggable={false}
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
            <span className="font-cinzel text-lg sm:text-2xl tracking-[0.15em] sm:tracking-[0.25em] whitespace-nowrap text-[#C5A15B] font-semibold">
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
// MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  // The scroll stage owns its timeline; App only tracks the actual exit boundary.
  const [entranceExited, setEntranceExited] = useState(false);

  // Website content (edit INITIAL_CMS_DATA at the top of this file)
  const [cmsData, setCmsData] = useState(INITIAL_CMS_DATA);

  // Navigation & Active Section Spy
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Story chapters are handled by <StorySwiper /> (swipe / drag / keyboard)

  // Family Filter
  const [familyFilter, setFamilyFilter] = useState('groom'); // 'groom' | 'bride'

  // Celebrations: which ceremony's detail card is open
  const [selectedEventId, setSelectedEventId] = useState(null);

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
  const [musicVolume] = useState(0.3);

  // Motion preference (tiered reduced-motion support)
  const prefersReducedMotion = usePrefersReducedMotion();

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

  // On a cold SPA load the browser may resolve the hash before React mounts its target.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

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
        'entrance',
        'home',
        'couple',
        'story',
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

  const heroPlay = entranceExited;

  // Smooth Scroll to Section
  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    // On phones/tablets "Our Story" lands on the chapter card so it fills the screen
    const targetId = id === 'story' && window.innerWidth < 1024 ? 'story-card' : id;
    const el = document.getElementById(targetId);
    if (el) {
      setActiveSection(id);
      // wait a frame so the menu's scroll lock is released first
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
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

  // Lock page scroll & allow Escape while the full-screen menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMobileMenuOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close ceremony details with Escape key & lock page scroll while open
  useEffect(() => {
    if (!selectedEventId) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setSelectedEventId(null);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selectedEventId]);

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
    { id: 'couple', label: 'The Couple' },
    { id: 'story', label: 'Our Story' },
    { id: 'families', label: 'Our Families' },
    { id: 'celebrations', label: 'Celebrations' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'invitation', label: 'The Invitation' },
    { id: 'venue', label: 'Venue' }
  ];

  return (
    <div className="min-h-screen bg-[#F4EBDD] text-[#29201D] font-montserrat selection:bg-[#641D2B] selection:text-[#F4EBDD] overflow-x-clip">
      {/* Load Royal Google Fonts & Custom Utility Keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cinzel+Decorative:wght@400;700&family=Marcellus&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap');

        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-montserrat { font-family: 'Marcellus', 'Cormorant Garamond', serif; }
        .font-display, h1.font-cinzel, h2.font-cinzel { font-family: 'Cinzel Decorative', 'Cinzel', serif; font-weight: 700; }

        /* Story card fills exactly one phone/tablet screen below the top bar */
        @media (max-width: 1023px) {
          .story-viewport { height: calc(100svh - 5.5rem); min-height: 520px; }
          .story-text { -webkit-mask-image: linear-gradient(to bottom, #000 88%, transparent); mask-image: linear-gradient(to bottom, #000 88%, transparent); padding-bottom: 1.5rem; }
        }

        /* Full-screen mobile menu */
        .menu-in { animation: menuIn 420ms var(--ease-out-expo) both; }
        @keyframes menuIn { from { opacity: 0; transform: translate3d(0, -16px, 0); } to { opacity: 1; transform: none; } }
        .menu-item { animation: introUp 600ms var(--ease-out-expo) both; animation-delay: calc(var(--i, 0) * 45ms + 120ms); }

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

        /* ==================================================================
           MOTION SYSTEM
           Built with the iart-ai/web-animation-skills guidance:
           - 60fps: only transform + opacity animate per frame
           - micro-interaction: ease-out entrances, quick press feedback
           - svg-animation: pathLength="1" stroke draw-on
           - accessible-animation: tiered prefers-reduced-motion (bottom)
        ================================================================== */
        :root {
          --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
          --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
          --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
          --ease-overshoot: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Scroll reveal (IntersectionObserver toggles .is-visible) */
        .reveal {
          opacity: 0;
          transition:
            opacity 800ms var(--ease-out-expo) var(--reveal-delay, 0ms),
            transform 1000ms var(--ease-out-expo) var(--reveal-delay, 0ms);
        }
        .reveal-up { transform: translate3d(0, 32px, 0); }
        .reveal-left { transform: translate3d(-44px, 0, 0); }
        .reveal-right { transform: translate3d(44px, 0, 0); }
        .reveal-zoom { transform: scale(0.92); }
        .reveal-line { transform: scaleY(0); transform-origin: top center; transition-duration: 600ms, 1800ms; }
        .reveal.is-visible { opacity: 1; transform: none; }

        /* Ornamental divider: stroke draw-on + lotus bloom */
        .reveal.reveal-draw { opacity: 1; transform: none; }
        .reveal-draw .draw-path {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          transition: stroke-dashoffset 1400ms var(--ease-in-out) var(--reveal-delay, 0ms);
        }
        .reveal-draw.is-visible .draw-path { stroke-dashoffset: 0; }
        .reveal-draw .draw-bloom {
          opacity: 0;
          transform: scale(0.4);
          transform-box: fill-box;
          transform-origin: center;
          transition: opacity 600ms ease 500ms, transform 900ms var(--ease-overshoot) 500ms;
        }
        .reveal-draw.is-visible .draw-bloom { opacity: 1; transform: none; }

        /* Intro sequences (gate + hero) */
        .intro .intro-item { opacity: 0; }
        .intro.intro-play .intro-item {
          animation: introUp 1000ms var(--ease-out-expo) both;
          animation-delay: calc(var(--i, 0) * 120ms + var(--intro-base, 300ms));
        }
        @keyframes introUp {
          from { opacity: 0; transform: translate3d(0, 24px, 0); }
          to { opacity: 1; transform: none; }
        }

        /* Kinetic typography: per-letter rise */
        .kinetic-word { display: inline-block; white-space: nowrap; }
        .kinetic-char { display: inline-block; opacity: 0; }
        .kinetic-play .kinetic-char {
          animation: charRise 900ms var(--ease-out-expo) both;
        }
        @keyframes charRise {
          from { opacity: 0; transform: translate3d(0, 0.55em, 0) rotate(8deg); }
          to { opacity: 1; transform: none; }
        }

        /* Countdown digit roll */
        .digit-window { display: inline-flex; overflow: hidden; padding-block: 0.06em; }
        .digit-roll { display: inline-block; animation: digitRoll 550ms var(--ease-out-quint) both; }
        @keyframes digitRoll {
          from { opacity: 0; transform: translate3d(0, -70%, 0); }
          to { opacity: 1; transform: none; }
        }

        /* The palace is a real sticky section: scrolling never locks the page. */
        .entrance { height: 430svh; position: relative; color: #F4EBDD; background: #2E0D15; }
        .entrance-sticky { position: sticky; top: 0; height: 100svh; overflow: hidden; isolation: isolate;
          background: radial-gradient(ellipse at 50% 45%, #71303C, #46131F 55%, #2E0D15); }
        .entrance-sticky::before { content: ''; position: absolute; inset: 14px; border: 1px solid #C5A15B40; pointer-events: none; z-index: 6; }
        .entrance-visual { position: absolute; inset: 0; display: flex; align-items: end; justify-content: center; padding-bottom: 13svh; pointer-events: none; }
        .palace-zoom { width: min(210vw, 85svh, 1160px); flex-shrink: 0; transform-origin: 50% 65%; }
        .palace-plane { position: relative; width: 100%; aspect-ratio: 12 / 7; }
        .palace-plane > img { display: block; width: 100%; height: 100%; }
        .palace-doorway { position: absolute; perspective: 1000px; }
        .palace-light { position: absolute; inset: 0; width: 100%; height: 100%; }
        .palace-door { position: absolute; top: 0; width: 50%; height: 100%; backface-visibility: hidden; }
        .palace-door-left { left: 0; transform-origin: left center; }
        .palace-door-right { right: 0; transform-origin: right center; }
        .palace-toran { position: absolute; left: 32%; top: 28.5%; width: 36%; height: 11%; }
        .entrance-heading { position: absolute; top: max(30px, env(safe-area-inset-top)); left: 20px; right: 20px; text-align: center; z-index: 2; }
        .entrance-eyebrow { font-size: 10px; letter-spacing: .25em; text-transform: uppercase; color: #E8CF8E; }
        .entrance-kicker { font-size: clamp(15px, 2.1svh, 20px); margin-top: 13px; color: #E5D5BB; }
        .entrance-heading h1 { font-size: clamp(22px, 4svh, 40px); line-height: 1.18; margin: 12px 0; }
        .entrance-amp { display: block; font-size: .8em; font-weight: 400; color: #C5A15B; line-height: 1.1; }
        .entrance-date { font-size: 11px; letter-spacing: .24em; color: #E8CF8E; }
        .entrance-music { min-height: 44px; padding: 8px 18px; margin: 14px auto 0; display: inline-flex; align-items: center; gap: 9px;
          border: 1px solid #C5A15B80; border-radius: 30px; background: #2E0D1540; font-size: 10px; letter-spacing: .16em; text-transform: uppercase; cursor: pointer; }
        .entrance-scroll { position: absolute; bottom: max(24px, env(safe-area-inset-bottom)); left: 0; right: 0; z-index: 2; text-align: center; font-size: 9px; letter-spacing: .25em; color: #E8CF8E; text-transform: uppercase; }
        .entrance-scroll .scroll-cue { height: 22px; margin: 8px auto; }
        .entrance-skip { display: inline-flex; min-height: 32px; align-items: center; font-size: 9px; text-decoration: underline; text-underline-offset: 4px; }
        .entrance-layer { position: absolute; inset: 0; transition: opacity 250ms ease; }
        .entrance-layer[inert] { pointer-events: none; }
        .dance-layer { z-index: 3; }
        /* Cream stage matches the film's paper background (#F6F6F1) so the frame edge disappears */
        .dance-stage { height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 10px; padding: 28px 16px;
          background: radial-gradient(ellipse at 50% 48%, #F6F6F1 45%, #EFE6D6 100%); color: #641D2B; }
        .dance-stage .entrance-eyebrow { color: #8A6A2E; }
        .dance-frame { width: min(640px, 100vw, 68svh * 832 / 720); aspect-ratio: 832 / 720; flex-shrink: 0;
          -webkit-mask-image: radial-gradient(ellipse 72% 70% at 50% 50%, #000 62%, transparent 100%); mask-image: radial-gradient(ellipse 72% 70% at 50% 50%, #000 62%, transparent 100%); }
        .dance-video { display: block; width: 100%; height: 100%; object-fit: cover; background: #F6F6F1; }
        .dance-caption { font-size: clamp(25px, 4svh, 36px); color: #641D2B; }
        .dance-stage .entrance-text-link { color: #641D2B; }
        .dance-stage :focus-visible { outline-color: #641D2B; }
        .dance-controls { display: flex; gap: 24px; }
        .entrance-text-link { display: inline-flex; min-height: 44px; align-items: center; justify-content: center; gap: 10px; padding: 10px 4px; font-size: 12px; color: #E8CF8E; cursor: pointer; text-decoration: underline; text-underline-offset: 6px; }
        .entrance :focus-visible { outline: 2px solid #E8CF8E; outline-offset: 5px; }
        .entrance-invitation { z-index: 4; padding: 32px 26px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 15px;
          text-align: center; background: radial-gradient(ellipse at 50% 40%, #641D2B, #2E0D15); }
        .entrance-invitation h2 { font-size: clamp(26px, 4.3svh, 42px); line-height: 1.12; }
        .entrance-invitation h2 span { font-size: 1.25em; color: #E8CF8E; font-weight: 400; }
        .entrance-portrait { width: min(220px, 29svh); height: min(254px, 33svh); border-radius: 50% 50% 4px 4px; padding: 5px; border: 1px solid #E8CF8E; flex-shrink: 0; }
        .entrance-portrait img { width: 100%; height: 100%; object-fit: cover; object-position: 53% 30%; border-radius: inherit; }
        .entrance-note { max-width: 470px; font-size: clamp(17px, 2.5svh, 22px); line-height: 1.4; color: #E5D5BB; }
        .entrance-invitation > a { font-size: 10px; text-transform: uppercase; letter-spacing: .15em; }
        @media (min-width: 1024px) { .entrance { height: 260svh; } }
        @media (max-height: 700px) and (orientation: portrait) {
          .entrance-visual { padding-bottom: 16svh; }
          .palace-zoom { width: min(210vw, 78svh); }
          .entrance-heading { top: 24px; }
          .entrance-heading h1 { margin: 8px 0; font-size: 24px; }
          .entrance-kicker { margin-top: 8px; font-size: 14px; }
          .entrance-music { margin-top: 8px; }
          .entrance-invitation { gap: 10px; }
        }
        @media (max-height: 500px) and (orientation: landscape) {
          .entrance-heading { top: 22px; left: 4%; right: auto; width: 43%; }
          .entrance-heading h1 { font-size: 25px; }
          .entrance-visual { justify-content: end; padding-right: 1vw; padding-bottom: 1svh; }
          .palace-zoom { width: 58vw; }
          .entrance-scroll { left: 4%; right: auto; width: 43%; bottom: 90px; }
          .entrance-scroll .scroll-cue { display: none; }
          .dance-stage { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 20px 40px; text-align: center; }
          .dance-frame { grid-column: 2; grid-row: 1 / 4; width: min(48vw, 86svh * 832 / 720); }
          .dance-controls { justify-content: center; }
          .entrance-invitation { display: grid; grid-template-columns: 30% 1fr; column-gap: 30px; padding: 24px 8%; }
          .entrance-invitation .entrance-portrait { grid-column: 1; grid-row: 1 / 5; width: 100%; height: 62svh; }
          .entrance-invitation > :not(.entrance-portrait) { grid-column: 2; }
          .entrance-invitation h2 { font-size: 27px; }
          .entrance-note { font-size: 17px; }
        }
        /* Natural reading flow: no pinning, zoom, hidden content or dance. */
        .entrance.reduced { height: auto; }
        .entrance.reduced .entrance-sticky { position: relative; height: auto; overflow: hidden; }
        .entrance.reduced .entrance-heading { position: relative; inset: auto; padding: 36px 24px 0; width: auto; }
        .entrance.reduced .entrance-visual { position: relative; padding: 12px 0; display: flex; justify-content: center; }
        .entrance.reduced .palace-zoom { width: min(100%, 860px); transform: none !important; }
        .entrance.reduced .entrance-heading { order: -1; }
        .entrance.reduced .entrance-sticky { display: flex; flex-direction: column; }
        .entrance.reduced .entrance-invitation { position: relative; opacity: 1; min-height: 0; display: flex; }
        .entrance.reduced .entrance-portrait { width: 220px; height: 254px; }

        /* Floating gold dust (hero ambience) */
        .gold-dust {
          position: absolute;
          bottom: -12px;
          border-radius: 9999px;
          background: radial-gradient(circle, #F6E3AE 0%, #C5A15B 55%, rgba(197,161,91,0) 72%);
          opacity: 0;
          animation-name: dustRise;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes dustRise {
          0% { opacity: 0; transform: translate3d(0, 0, 0); }
          12% { opacity: 0.75; }
          85% { opacity: 0.45; }
          100% { opacity: 0; transform: translate3d(var(--drift, 0px), -105vh, 0); }
        }

        /* Scroll cue */
        .scroll-cue { position: relative; display: block; width: 1px; height: 38px; margin: 10px auto 0; background: rgba(197,161,91,0.35); overflow: hidden; }
        .scroll-cue::after {
          content: ''; position: absolute; left: 0; top: 0; width: 1px; height: 14px;
          background: #C5A15B; animation: scrollCue 2.2s var(--ease-in-out) infinite;
        }
        @keyframes scrollCue {
          from { transform: translate3d(0, -14px, 0); }
          to { transform: translate3d(0, 38px, 0); }
        }

        /* Royal Toran (hero SVG) */
        .toran .t-draw { stroke-dasharray: 1; stroke-dashoffset: 1; }
        .toran .t-fade { opacity: 0; }
        .toran .t-unfurl { transform-box: fill-box; transform-origin: 50% 0%; transform: scaleY(0); opacity: 0; }
        .toran .t-bead { transform-box: fill-box; transform-origin: center; transform: scale(0); }
        .toran-play .t-draw { animation: tDraw 1600ms var(--ease-in-out) forwards; }
        .toran-play .t-fade { animation: tFade 900ms ease-out 250ms forwards; }
        .toran-play .t-unfurl { animation: tUnfurl 1300ms cubic-bezier(0.34, 1.3, 0.64, 1) forwards; animation-delay: var(--d, 0ms); }
        .toran-play .t-bead { animation: tBead 600ms var(--ease-overshoot) forwards; animation-delay: var(--d, 0ms); }
        .toran-play .t-sway {
          transform-box: fill-box; transform-origin: 50% 0%;
          animation: tSway var(--sd, 5s) ease-in-out var(--sdl, 0s) infinite alternate;
        }
        .toran-play .t-bell {
          transform-box: fill-box; transform-origin: 50% 0%;
          animation: tBell 2.6s ease-in-out var(--sdl, 0s) infinite alternate;
        }
        @keyframes tDraw { to { stroke-dashoffset: 0; } }
        @keyframes tFade { to { opacity: 1; } }
        @keyframes tUnfurl {
          0% { transform: scaleY(0); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes tBead { to { transform: scale(1); } }
        @keyframes tSway { from { transform: rotate(-1.8deg); } to { transform: rotate(1.8deg); } }
        @keyframes tBell { from { transform: rotate(-7deg); } to { transform: rotate(7deg); } }

        /* Story swiper */
        .story-viewport { touch-action: pan-y; overscroll-behavior-x: contain; cursor: grab; }
        .story-viewport.is-dragging { cursor: grabbing; user-select: none; }
        .story-slide { transition: opacity 600ms ease; }
        .story-slide:not(.is-active) { opacity: 0.45; }
        .story-slide .chapter-item { will-change: auto; }
        .story-slide.is-active .chapter-item {
          animation: chapterItemIn 900ms var(--ease-out-expo) both;
          animation-delay: calc(var(--i, 0) * 85ms + 120ms);
        }
        @keyframes chapterItemIn {
          from { opacity: 0.35; transform: translate3d(0, 18px, 0); }
          to { opacity: 1; transform: none; }
        }
        .story-slide.is-active .chapter-frame { animation: frameIn 1100ms var(--ease-out-expo) both; }
        @keyframes frameIn {
          from { opacity: 0.5; transform: scale(0.94) rotate(-1deg); }
          to { opacity: 1; transform: none; }
        }
        .swipe-hint-hand { animation: swipeHint 2.4s var(--ease-in-out) infinite; }
        @keyframes swipeHint {
          0%, 100% { transform: translate3d(10px, 0, 0); opacity: 0.4; }
          50% { transform: translate3d(-10px, 0, 0); opacity: 1; }
        }
        .story-progress { transform-origin: left center; transition: transform 700ms var(--ease-out-quint); }

        /* Cards that re-enter on filter change */
        .card-in { animation: cardIn 700ms var(--ease-out-expo) both; animation-delay: var(--d, 0ms); }
        @keyframes cardIn {
          from { opacity: 0; transform: translate3d(0, 22px, 0) scale(0.97); }
          to { opacity: 1; transform: none; }
        }

        /* Modals, drawers, toasts */
        .backdrop-in { animation: backdropIn 300ms ease-out both; }
        @keyframes backdropIn { from { opacity: 0; } to { opacity: 1; } }
        .modal-in { animation: modalIn 550ms var(--ease-out-expo) both; }
        @keyframes modalIn {
          from { opacity: 0; transform: translate3d(0, 28px, 0) scale(0.96); }
          to { opacity: 1; transform: none; }
        }
        .drawer-in { animation: drawerIn 380ms var(--ease-out-expo) both; transform-origin: top center; }
        @keyframes drawerIn {
          from { opacity: 0; transform: translate3d(0, -12px, 0); }
          to { opacity: 1; transform: none; }
        }
        .toast-in { animation: toastIn 450ms var(--ease-overshoot) both; }
        @keyframes toastIn {
          from { opacity: 0; transform: translate3d(24px, 0, 0) scale(0.96); }
          to { opacity: 1; transform: none; }
        }
        .swap-in { animation: swapIn 450ms var(--ease-out-expo) both; }
        @keyframes swapIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: none; }
        }

        /* Press feedback for primary buttons */
        .press { transition: transform 160ms var(--ease-out-quint), background-color 250ms ease, color 250ms ease, border-color 250ms ease, box-shadow 250ms ease; }
        .press:hover { transform: translateY(-2px); }
        .press:active { transform: scale(0.96); transition-duration: 80ms; }

        /* ---------- Tiered reduced motion (accessible-animation skill) ----------
           Tier 1 (removed): parallax-like drift, sway, door slide, big translates.
           Tier 2 (softened): reveals become short opacity fades.
           Tier 3 (kept): opacity + colour transitions. */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
          .reveal, .reveal.is-visible { transform: none !important; transition: opacity 200ms ease !important; }
          .gold-dust, .scroll-cue::after, .swipe-hint-hand { display: none !important; animation: none !important; }
          .toran-play .t-sway, .toran-play .t-bell { animation: none !important; }
          .story-slide { transition: opacity 200ms ease !important; }
          .press:hover, .press:active { transform: none; }
        }
      `}</style>

      {/* Optional Custom Background Music Audio Element */}
      {cmsData.settings.musicUrl && (
        <audio ref={audioElemRef} src={cmsData.settings.musicUrl} loop preload="none" />
      )}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          className="toast-in fixed top-20 right-4 z-[90] bg-[#46131F] text-[#F4EBDD] border border-[#C5A15B] px-5 py-3 rounded-lg shadow-2xl flex items-center gap-3"
        >
          <Sparkles className="w-4 h-4 text-[#C5A15B] shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* ====================================================================
          FIXED ROYAL NAVIGATION BAR
      ==================================================================== */}
      <header
        inert={!entranceExited || undefined}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${entranceExited ? '' : 'opacity-0 pointer-events-none -translate-y-full'} ${
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

          {/* Right Action Controls: Send Wishes, Replay Gate & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToSection('wishes')}
              className="press inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-[#C5A15B] text-[#29201D] font-cinzel text-[11px] font-semibold tracking-[0.14em] uppercase rounded-full shadow-md hover:bg-[#F4EBDD] cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Send Wishes</span>
            </button>
            <button
              onClick={() => scrollToSection('entrance')}
              title="Replay Royal Palace Entrance"
              className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-cinzel tracking-wider text-[#E5D5BB] border border-[#C5A15B]/40 rounded hover:border-[#C5A15B] hover:text-[#C5A15B] transition-colors cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 text-[#C5A15B]" />
              <span>Entrance</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              className="xl:hidden p-2 text-[#F4EBDD] hover:text-[#C5A15B] border border-[#C5A15B]/40 rounded cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

      </header>

      {/* Full-screen Royal Menu (phones & tablets) */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="menu-in xl:hidden fixed inset-0 z-[60] bg-[#2E0D15] text-[#F4EBDD] flex flex-col overflow-y-auto"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 0%, rgba(197,161,91,0.18), transparent 55%), radial-gradient(rgba(197,161,91,0.08) 1px, transparent 1px)',
            backgroundSize: '100% 100%, 22px 22px'
          }}
        >
          <div className="flex items-center justify-between px-4 pt-3 pb-2">
            <div className="flex items-center gap-3">
              <JSMonogramSVG className="w-11 h-11" />
              <div>
                <p className="font-display text-sm text-[#F4EBDD]">Jainam &amp; Shalvi</p>
                <p className="font-cinzel text-[10px] tracking-[0.2em] text-[#C5A15B]">27 FEB 2027</p>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="w-10 h-10 rounded-full border border-[#C5A15B]/60 text-[#C5A15B] flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <RoyalToran className="w-full h-16 -mt-1" play />

          <nav className="flex-1 px-6 py-2">
            <ul>
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id} className="menu-item border-b border-[#C5A15B]/15" style={{ '--i': idx }}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="w-full flex items-center gap-4 py-3.5 text-left cursor-pointer group"
                    >
                      <span className="font-cinzel text-[11px] tracking-widest text-[#C5A15B]/70 w-6">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`flex-1 font-display text-xl transition-colors ${
                          isActive ? 'text-[#C5A15B]' : 'text-[#F4EBDD] group-hover:text-[#C5A15B]'
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className={`text-[#C5A15B] transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}>❖</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="menu-item px-6 pt-4 pb-8 space-y-4" style={{ '--i': navItems.length }}>
            <button
              onClick={() => scrollToSection('wishes')}
              className="press w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#C5A15B] text-[#29201D] font-cinzel text-xs font-semibold tracking-[0.2em] uppercase rounded-full cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-current" /> Send Your Wishes
            </button>
            <div className="flex items-center justify-between text-xs text-[#E5D5BB]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection('entrance');
                }}
                className="inline-flex items-center gap-1.5 text-[#C5A15B] cursor-pointer"
              >
                <Crown className="w-3.5 h-3.5" /> Replay Entrance
              </button>
              <span className="font-cinzel tracking-widest">{cmsData.settings.hashtag}</span>
            </div>
          </div>
        </div>
      )}

      <ScrollEntrance settings={cmsData.settings} onMusic={toggleMusicPlayback} isPlayingMusic={isPlayingMusic} onExitChange={setEntranceExited} />

      {/* ====================================================================
          SECTION 1: HOME / ROYAL HERO & LIVE COUNTDOWN
      ==================================================================== */}
      <section
        id="home"
        className="relative min-h-screen bg-gradient-to-b from-[#46131F] via-[#641D2B] to-[#46131F] text-[#F4EBDD] pt-20 pb-16 flex flex-col justify-between overflow-hidden"
      >
        {/* Floating gold dust */}
        {!prefersReducedMotion && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {Array.from({ length: 16 }, (_, i) => (
              <span
                key={i}
                className="gold-dust"
                style={{
                  left: `${(i * 37 + 7) % 100}%`,
                  width: `${3 + (i % 4)}px`,
                  height: `${3 + (i % 4)}px`,
                  animationDuration: `${11 + (i % 5) * 2.5}s`,
                  animationDelay: `${-(i * 1.7)}s`,
                  '--drift': `${(i % 2 ? 1 : -1) * (20 + (i % 3) * 18)}px`
                }}
              />
            ))}
          </div>
        )}

        {/* Marigold Toran Header */}
        <div className="w-full pointer-events-none select-none">
          <RoyalToran className="w-full h-28 sm:h-40 md:h-44" play={heroPlay} />
        </div>

        {/* Hero Centerpiece */}
        <div
          className={`intro ${heroPlay ? 'intro-play' : ''} relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center my-auto`}
          style={{ '--intro-base': '700ms' }}
        >
          <div style={{ '--i': 0 }} className="intro-item inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#C5A15B]/50 bg-[#46131F]/70 text-[#C5A15B] font-cinzel text-[11px] tracking-[0.28em] uppercase mb-5">
            <Crown className="w-3.5 h-3.5" />
            <span>The Royal Wedding Storybook</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.1em] text-[#F4EBDD] font-semibold uppercase leading-tight">
            <KineticText text={cmsData.settings.groomName} baseDelay={900} play={heroPlay} />
            <span
              className="intro-item block font-cormorant italic text-[#C5A15B] text-3xl sm:text-4xl md:text-5xl my-2 lowercase"
              style={{ '--i': 4 }}
            >
              &amp;
            </span>
            <KineticText text={cmsData.settings.brideName} baseDelay={1300} play={heroPlay} />
          </h2>

          <p style={{ '--i': 7 }} className="intro-item mt-3 font-cormorant italic text-xl sm:text-2xl text-[#E5D5BB]">
            “{cmsData.settings.tagline}”
          </p>

          <OrnamentalDivider variant="gold" />

          {/* Date Badge */}
          <div style={{ '--i': 8 }} className="intro-item inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-6 py-2.5 rounded border border-[#C5A15B]/40 bg-[#46131F]/80 text-[#F4EBDD] font-cinzel text-xs sm:text-sm tracking-[0.22em] uppercase mb-8">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C5A15B]" />
              {cmsData.settings.weddingDateDisplay}
            </span>
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
            <div style={{ '--i': 9 }} className="intro-item max-w-2xl mx-auto">
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
                    <span className="digit-window font-cinzel text-2xl sm:text-4xl md:text-5xl font-bold text-[#F4EBDD] tabular-nums">
                      <span key={unit.value} className="digit-roll">
                        {String(unit.value).padStart(2, '0')}
                      </span>
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
          <div style={{ '--i': 10 }} className="intro-item mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection('story')}
              className="press px-7 py-3.5 bg-[#C5A15B] text-[#29201D] font-cinzel text-xs font-semibold tracking-[0.2em] uppercase rounded-sm hover:bg-[#F4EBDD] transition-colors cursor-pointer"
            >
              Read Our Chapters
            </button>
            <button
              onClick={() => scrollToSection('celebrations')}
              className="press px-7 py-3.5 bg-transparent text-[#F4EBDD] border border-[#C5A15B] font-cinzel text-xs tracking-[0.2em] uppercase rounded-sm hover:bg-[#C5A15B]/20 transition-colors cursor-pointer"
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
          <span className="scroll-cue" aria-hidden="true" />
        </div>
      </section>

      {/* ====================================================================
          SECTION 2: MEET THE COUPLE (JAINAM SHAH & SHALVI DASADIA)
      ==================================================================== */}
      <section
        id="couple"
        className="border-t-2 border-[#C5A15B]/40 py-20 sm:py-24 bg-gradient-to-b from-[#641D2B] via-[#46131F] to-[#641D2B] text-[#F4EBDD] relative"
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

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-y-6 lg:gap-x-6 items-stretch">
            {[
              { key: 'groom', profile: cmsData.couple.groom, family: 'Shah Parivar' },
              { key: 'bride', profile: cmsData.couple.bride, family: 'Dasadia Parivar' }
            ].map(({ key, profile, family }, idx) => (
              <React.Fragment key={key}>
                {idx === 1 && (
                  <div className="flex lg:flex-col items-center justify-center gap-3" aria-hidden="true">
                    <span className="h-px w-16 lg:h-24 lg:w-px bg-[#C5A15B]/50" />
                    <span className="w-14 h-14 rounded-full border-2 border-[#C5A15B] bg-[#46131F] flex items-center justify-center font-display text-2xl text-[#C5A15B] shadow-lg">
                      &amp;
                    </span>
                    <span className="h-px w-16 lg:h-24 lg:w-px bg-[#C5A15B]/50" />
                  </div>
                )}
                <Reveal variant={idx === 0 ? 'left' : 'right'} className="h-full pt-14">
                  <article className="relative h-full rounded-[2rem] border-2 border-[#C5A15B]/80 bg-gradient-to-b from-[#46131F] to-[#2E0D15] px-6 pb-8 pt-28 sm:px-10 text-center shadow-2xl">
                    {/* Inner gold frame */}
                    <div className="absolute inset-2 rounded-[1.6rem] border border-[#C5A15B]/25 pointer-events-none" aria-hidden="true" />

                    {/* Arched portrait breaking out of the card top */}
                    <div className="absolute left-1/2 -top-14 -translate-x-1/2 w-36 h-40 sm:w-40 sm:h-44 rounded-t-full p-1.5 bg-gradient-to-b from-[#E8CF8E] to-[#A8823E] shadow-xl">
                      <div className="w-full h-full rounded-t-full overflow-hidden bg-gradient-to-b from-[#641D2B] to-[#29201D] flex items-center justify-center">
                        {profile.portraitUrl ? (
                          <img src={profile.portraitUrl} alt={`Illustrated portrait of ${profile.name}`} loading="lazy" className="w-full h-full object-cover object-top" />
                        ) : (
                          <span className="font-display text-5xl text-[#C5A15B]">{profile.monogram}</span>
                        )}
                      </div>
                    </div>

                    <span className="inline-block px-3 py-1 rounded-full border border-[#C5A15B]/50 font-cinzel text-[10px] tracking-[0.3em] text-[#C5A15B] uppercase">
                      {profile.title} • {family}
                    </span>
                    <h3 className="mt-3 font-display text-3xl sm:text-4xl text-[#F4EBDD] leading-tight">
                      {profile.name}
                    </h3>
                    <p className="mt-4 font-cinzel text-[10px] tracking-[0.25em] text-[#C5A15B] uppercase">
                      {profile.writtenBy}
                    </p>
                    <p className="mt-2 font-cormorant italic text-lg sm:text-xl text-[#E5D5BB] leading-relaxed">
                      {profile.introduction}
                    </p>

                    <ul className="mt-6 space-y-4 text-left">
                      {profile.facts.map(({ label, text }) => {
                        const Icon = { Education: BookOpen, Work: Star, Loves: Heart }[label] || Sparkles;
                        return (
                        <li key={label} className="flex gap-3.5">
                          <span className="shrink-0 w-9 h-9 rounded-full border border-[#C5A15B]/60 bg-[#641D2B]/60 flex items-center justify-center text-[#C5A15B]">
                            <Icon className="w-4 h-4" />
                          </span>
                          <div>
                            <p className="font-cinzel text-[11px] tracking-[0.2em] text-[#C5A15B] uppercase">{label}</p>
                            <p className="mt-0.5 font-cormorant text-[1.05rem] text-[#F4EBDD]/90 leading-snug">{text}</p>
                          </div>
                        </li>
                        );
                      })}
                    </ul>

                    <div className="mt-7 pt-5 border-t border-[#C5A15B]/30">
                      <LotusMandalaSVG className="w-8 h-8 mx-auto mb-2 opacity-80" color="#C5A15B" />
                      <blockquote className="font-cormorant italic text-xl text-[#C5A15B] leading-relaxed">
                        {profile.personalMessage}
                      </blockquote>
                    </div>
                  </article>
                </Reveal>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 3: OUR STORY — CHAPTER-BY-CHAPTER READER (SWIPE ENABLED)
      ==================================================================== */}
      <section id="story" className="py-16 sm:py-24 bg-[#EADCC4] text-[#29201D] relative">
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
              Six chapters, from stolen glances at the Upashray to forever.
            </p>
            <OrnamentalDivider variant="burgundy" />
          </div>

          <Reveal variant="up" className="mt-8">
            <StorySwiper chapters={cmsData.chapters} />
          </Reveal>
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
              With the blessings of our parents and our beloved parivar.
            </p>
            <OrnamentalDivider variant="burgundy" />

            {/* Side Filter Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-2 w-full max-w-md mx-auto">
              {[
                { id: 'groom', label: 'Shah Family' },
                { id: 'bride', label: 'Dasadia Family' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFamilyFilter(tab.id)}
                  className={`px-3 py-2.5 rounded-sm font-cinzel text-xs tracking-wider uppercase border transition-colors cursor-pointer ${
                    familyFilter === tab.id
                      ? 'bg-[#641D2B] text-[#F4EBDD] border-[#641D2B]'
                      : 'bg-[#E5D5BB]/70 text-[#29201D] border-[#C5A15B] hover:border-[#641D2B]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div key={familyFilter} className="card-in mt-8 max-w-2xl mx-auto">
              <h3 className="font-display text-xl sm:text-2xl text-[#641D2B]">
                {cmsData.familyIntros[familyFilter].title}
              </h3>
              <p className="mt-3 font-cormorant italic text-lg sm:text-xl text-[#29201D]/85 leading-relaxed">
                {cmsData.familyIntros[familyFilter].text}
              </p>
            </div>
          </div>

          {/* Family Portrait Cards */}
          <div className="mt-10 flex flex-wrap justify-center gap-8 [&>*]:w-full md:[&>*]:w-[calc(50%-1rem)] lg:[&>*]:w-[calc(33.333%-1.35rem)]">
            {cmsData.families
              .filter(
                (member) =>
                  member.side === familyFilter || member.side === 'both'
              )
              .map((member, idx) => (
                <div
                  key={`${familyFilter}-${member.id}`}
                  style={{ '--d': `${idx * 90}ms` }}
                  className="card-in rounded-t-3xl rounded-b-lg border-2 border-[#C5A15B] bg-[#E5D5BB]/65 p-6 shadow-lg flex flex-col justify-between hover:shadow-xl transition-shadow"
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

                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 5: WEDDING CELEBRATIONS (TIMELINE → CLICK FOR DETAILS)
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
            <p className="font-cinzel text-[11px] tracking-[0.25em] text-[#C5A15B]/90 uppercase">
              Tap any ceremony to view its full details
            </p>
          </div>

          {/* CHRONOLOGICAL ROYAL TIMELINE */}
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
                      <button
                        type="button"
                        onClick={() => setSelectedEventId(evt.id)}
                        className={`w-full text-left ${
                          isLeft ? 'md:text-right' : 'md:text-left'
                        } p-5 rounded-lg bg-[#46131F]/90 border border-[#C5A15B]/60 shadow-lg hover:border-[#C5A15B] hover:-translate-y-0.5 transition-all cursor-pointer`}
                      >
                        <span className="block font-cinzel text-xs tracking-[0.2em] text-[#C5A15B] uppercase">
                          {evt.date}
                        </span>
                        <span className="block mt-1 font-cinzel text-xl text-[#F4EBDD] font-semibold">
                          {evt.name}
                        </span>
                        <span className="block text-xs text-[#E5D5BB] mt-1">
                          {evt.startTime} • {evt.venueName}
                          {evt.extraVenue ? ` & ${evt.extraVenue.name}` : ''}
                        </span>
                        <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-cinzel tracking-widest text-[#C5A15B] uppercase">
                          Tap for details <ChevronRight className="w-3 h-3" />
                        </span>
                      </button>
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
        </div>
      </section>

      {/* CEREMONY DETAIL CARD (OPENS WHEN AN EVENT IS CLICKED) */}
      {selectedEventId &&
        (() => {
          const evt = publishedEvents.find((e) => e.id === selectedEventId);
          if (!evt) return null;
          const number = publishedEvents.findIndex((e) => e.id === selectedEventId) + 1;
          const venueList = [
            {
              label: evt.venueLabel || 'Venue',
              name: evt.venueName,
              address: evt.venueAddress,
              mapLink: evt.mapLink
            },
            ...(evt.extraVenue ? [evt.extraVenue] : [])
          ];
          return (
            <div
              className="fixed inset-0 z-[95] bg-[#29201D]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
              onClick={() => setSelectedEventId(null)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg my-8 rounded-t-3xl rounded-b-xl border-2 border-[#C5A15B] bg-[#46131F] text-[#F4EBDD] p-6 sm:p-8 shadow-2xl"
              >
                <div className="flex items-center justify-between text-xs font-cinzel tracking-widest text-[#C5A15B] mb-3">
                  <span>CEREMONY 0{number}</span>
                  <button
                    onClick={() => setSelectedEventId(null)}
                    aria-label="Close details"
                    className="p-1.5 rounded-full border border-[#C5A15B]/60 text-[#C5A15B] hover:bg-[#C5A15B] hover:text-[#29201D] transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-cinzel text-2xl sm:text-3xl text-[#F4EBDD] uppercase font-semibold">
                  {evt.name}
                </h3>

                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded bg-[#641D2B] border border-[#C5A15B]/50 text-[#C5A15B] font-cinzel text-xs tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{evt.date}</span>
                </div>

                <p className="mt-4 font-cormorant text-lg sm:text-xl text-[#E5D5BB] leading-relaxed">
                  {evt.description}
                </p>

                <div className="mt-5 pt-4 border-t border-[#C5A15B]/30 space-y-4 text-sm text-[#F4EBDD]/90">
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#C5A15B] shrink-0 mt-0.5" />
                    <span>
                      <strong>Timings:</strong> {evt.startTime}
                      {evt.endTime ? ` — ${evt.endTime}` : ''}
                    </span>
                  </div>

                  {venueList.map((v) => (
                    <div key={v.label} className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#C5A15B] shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p>
                          <strong>{v.label}:</strong> {v.name}
                        </p>
                        <p className="text-[#E5D5BB]/75 mt-0.5">{v.address}</p>
                        <a
                          href={v.mapLink || 'https://maps.google.com'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-[#C5A15B] text-[#29201D] font-cinzel text-[11px] font-semibold tracking-wider uppercase rounded-sm hover:bg-[#F4EBDD] transition-colors"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Open in Google Maps</span>
                        </a>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#C5A15B] shrink-0 mt-0.5" />
                    <span>
                      <strong>Dress Code:</strong> {evt.dressCode}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#C5A15B]/30 text-right">
                  <button
                    onClick={() => setSelectedEventId(null)}
                    className="px-5 py-2.5 border border-[#C5A15B] text-[#C5A15B] font-cinzel text-xs tracking-wider uppercase rounded hover:bg-[#C5A15B] hover:text-[#29201D] transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

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
                  : '[Kankotri Preview Placeholder — set settings.invitationPdfUrl in code]'}
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
                  No login required. Your blessing appears on the royal wall right away.
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
                    className="w-full px-4 py-3 rounded bg-[#641D2B]/60 border border-[#C5A15B]/60 text-[#F4EBDD] placeholder-[#E5D5BB]/40 text-base sm:text-sm focus:outline-none focus:border-[#C5A15B]"
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
                    className="w-full px-4 py-3 rounded bg-[#641D2B]/60 border border-[#C5A15B]/60 text-[#F4EBDD] placeholder-[#E5D5BB]/40 text-base sm:text-sm focus:outline-none focus:border-[#C5A15B]"
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
                    className="w-full px-4 py-3 rounded bg-[#641D2B]/60 border border-[#C5A15B]/60 text-[#F4EBDD] placeholder-[#E5D5BB]/40 text-base sm:text-sm focus:outline-none focus:border-[#C5A15B]"
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
            <div className="lg:col-span-7 space-y-4 lg:max-h-[620px] lg:overflow-y-auto pr-1">
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
            </div>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          FLOATING ROYAL BACKGROUND MUSIC PLAYER
      ==================================================================== */}
      <div style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
        className="fixed left-4 sm:left-5 z-40 flex items-center gap-2 bg-[#46131F]/95 border-2 border-[#C5A15B] text-[#F4EBDD] p-1 sm:px-3.5 sm:py-2.5 rounded-full shadow-2xl backdrop-blur-md">
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
          className="hidden sm:block p-1.5 text-[#C5A15B] hover:text-[#F4EBDD] cursor-pointer"
        >
          {isMutedMusic ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

    </div>
  );
}
