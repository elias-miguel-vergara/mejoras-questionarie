import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      sm: '12px',
      md: '16px',
      lg: '20px',
      xl: '24px',
      '2xl': '30px',
    },
    extend: {
      backgroundColor: {},
      colors: {
        primary: '#3f6212D9',
        secondary: 'white',
        option: '#3f621233',
        correct: '#3f6212B3',
        wrong: '#f87171',
      },
    },
  },
  plugins: [],
  safelist: [{ pattern: /(bg)-(option|correct|wrong)/ }],
}
export default config
