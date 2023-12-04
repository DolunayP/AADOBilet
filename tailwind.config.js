/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-primary": "#1E1E1E",
        "color-secondary": "#292929",
        "color-rose-ebony": "#57393B",
        "color-night": "#0C0F12",
        "color-davys-gray": "#545155",
        "color-myrtle-green": "#3D726D",
      },
      backgroundImage: {
        events: "url('/src/assets/img/events.jpg')",
        sports: "url('/src/assets/img/sports.jpg')",
        parties: "url('/src/assets/img/parties.jpg')",
        communities: "url('/src/assets/img/communities.jpg')",
        theaters: "url('/src/assets/img/theaters.jpg')",
        concerts: "url('/src/assets/img/concerts.jpg')",
        statistics: "url('/src/assets/img/statistics.jpg')",
      },
    },
  },
  plugins: [],
};
