/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#c5a33c',
        secondary: '#121a00',
        background: '#f5f5f5',
        surface: '#ffffff',
      },
      fontFamily: {
        sans: [
          "Hiragino Kaku Gothic Pro",
          "ヒラギノ角ゴ Pro W3",
          "メイリオ",
          "Meiryo",
          "ＭＳ Ｐゴシック",
          "sans-serif"
        ]
      }
    },
  },
  plugins: [],
}