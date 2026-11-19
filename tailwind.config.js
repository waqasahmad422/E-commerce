/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Design uses Integral CF (display) + Satoshi (body).
        // Archivo (expanded, black) and DM Sans are the closest free Google Fonts.
        display: ['"Integral CF"', 'Archivo', 'Arial Black', 'sans-serif'],
        body: ['Satoshi', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        // ── Brand palette ──────────────────────────────
        forest: { DEFAULT: '#123D2B', 900: '#0B271B', 700: '#1B5A40', 100: '#DCE7E0', 50: '#F1F5F2' },
        gold: { DEFAULT: '#D9A52E', dark: '#9A6F0E', light: '#F7EBC9' },
        // `black` is remapped to Forest Green so text-black / bg-black / border-black/10 follow the theme
        black: '#123D2B',
        // ── Surfaces ───────────────────────────────────
        surface: '#EEF2EF',
        tile: '#F0EEED', // matches the baked-in background of the product photos
        hero: '#F1F5F2',
        star: '#D9A52E',
        verified: '#123D2B',
        sale: '#C0392B', // errors / destructive actions only
      },
      maxWidth: { shell: '1240px' },
      boxShadow: {
        card: '0 18px 40px -18px rgba(18,61,43,0.35)',
        glow: '0 10px 40px -8px rgba(217,165,46,0.55)',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        float: { '0%,100%': { transform: 'translateY(0) rotate(0deg)' }, '50%': { transform: 'translateY(-12px) rotate(8deg)' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(14px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp .5s ease-out both',
      },
    },
  },
  plugins: [],
}
