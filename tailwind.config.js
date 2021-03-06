module.exports = {
    purge: {
        enabled: true,
        content: [
            'public/index.html',
            'src/**/*.svelte',
            'src/**/*.js',
            'src/css/*.css'
        ] 
    },
  theme: {
      minHeight: {
        "0": "0",
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "0.75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "7": "1.75rem",
        "8": "2rem",
        "10": "2.5rem",
        "12": "3rem",
        "14": "3.5rem",
        "16": "4rem",
        "20": "5rem",
        "24": "6rem",
        "32": "8rem",
        "36": "9rem",
        "40": "10rem",
        "48": "12rem",
        "56": "14rem",
        "64": "16rem",
        '60px': '60px'
      },
    minWidth: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '1/3': '33%',
        'full': '100%',
        '200px': '200px',
        '240px': '240px',
        '340px': '340px',
        '620px': '620px',
        '16': '4rem',
        '60px': '60px'
    },
    minWidth: {
        'full': '100%',
        '5/6': '83%'
    },
    maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
        '1/6': '17%',
        '2/6': '33%',
        '3/6': '50%',
        '4/6': '66%',
        '5/6': '83%',
        '320px': '320px',
        '480px': '480px',
        '620px': '620px',
        "720px": "720px",
        '820px': '820px',
        '28': '28rem'
    },
    maxHeight: {
           '0': '0',
           '5/6': '83%',
           '11/12': '92%',
           'full': '100%',
          },
    colors: {
      transparent: "transparent",
      black: "#000",
      white: "#fff",
      fondLBF: "#FCFCFC",
      orangeLBF: "#ee732e",
      orangeLBFT: "#ee732e55",
      bleuLBF: "#4bbcc4",
      bleuLBFT: "#4bbcc455",
      bleuLBFTT: "#4bbcc420",
      vertLBF: "#93c021",
      vertLBFT: "#93c02155",
      vertLBFTT: "#93c02120",
      rougeLBF: "#e02933",
      rougeLBFT: "#e0293355",
      jauneLBF: "#fcc62d",
      jauneLBFT: "#fcc62d55",
      violetLBF: "#5e4b99",
      lbfviolet: {
        50:"#EBE8F2",
        100:"#CDC7E0",
        200:"#ADA3CC",
        300:"#8D7EB7",
        400:"#7564A8",
        500:"#5F4B99",
        600:"#574693",
        700:"#4C3E89",
        800:"#433880",
        900:"#352D6C"
      },
      lbforange: {
        50: "#FFF4E3",
        100: "#FFE1B9",
        200: "#FFCE8D",
        300: "#ffba62",
        400: "#ffab45",
        500: "#ff9E36",
        600: "#fc9234",
        700: "#f58331",
        800: "#EE732E",
        900: "#C24E22"
      },

      lbfbleu: {
        50: "#e1f6f6",
        100: "#b4e7e9",
        200: "#87d8db",
        300: "#60c7ce",
        400: "#4BBCC4",
        500: "#42b1bc",
        600: "#3ea1aa",
        700: "#398c92",
        800: "#34787b",
        900: "#285554"
      },
      lbfvert: {
        50: "#f3f7e6",
        100: "#e0ecc0",
        200: "#cbdf98",
        300: "#b5d36d",
        400: "#a4c94a",
        500: "#93C021",
        600: "#6d9d0b",
        700: "#6d9d0b",
        800: "#588900",
        900: "#316800"
      },
      lbfvertt: {
        50: "#f3f7e655",
        100: "#e0ecc055",
        200: "#cbdf9855",
        300: "#b5d36d55",
        400: "#a4c94a55",
        500: "#93C02155",
        600: "#6d9d0b55",
        700: "#6d9d0b55",
        800: "#58890055",
        900: "#31680055"
      },

      lbfrouge: {
        50: "#fce6e7",
        100: "#f7c0c4",
        200: "#f1979c",
        300: "#eb6d74",
        400: "#e74d57",
        500: "#e32e39",
        600: "#e02933",
        700: "#dc232c",
        800: "#d81d24",
        900: "#d01217"
      },

      lbfjaune: {
        50: "#fffee7",
        100: "#fefac4",
        200: "#fdf69d",
        300: "#fcf275",
        400: "#f9ed55",
        500: "#f6e833",
        600: "#fddd36",
        700: "#fcc62d",
        800: "#fbad24",
        900: "#f78413"
      },

      gray: {
        100: "#f7fafc",
        200: "#edf2f7",
        300: "#e2e8f0",
        400: "#cbd5e0",
        500: "#a0aec0",
        600: "#718096",
        700: "#4a5568",
        800: "#2d3748",
        900: "#1a202c"
      }
    },
    spacing: {
        "1/2": "50%",
      px: "1px",
      "10px": "10px",
      "200px": "200px",
      "40px": "40px",
      "60px": "60px",
      "150px": "150px",
      "180px": "180px",
      "240px": "240px",
      "300px": "300px",
      "340px": "340px",
      "400px": "400px",
      "480px": "480px",
      "640px": "640px",
      "720px": "720px",
      "820px": "820px",
      "1024px": "1024px",
      "0": "0",
      "1": "0.25rem",
      "2": "0.5rem",
      "3": "0.75rem",
      "4": "1rem",
      "5": "1.25rem",
      "6": "1.5rem",
      "7": "1.75rem",
      "8": "2rem",
      "10": "2.5rem",
      "12": "3rem",
      "14": "3.5rem",
      "16": "4rem",
      "20": "5rem",
      "24": "6rem",
      "32": "8rem",
      "36": "9rem",
      "40": "10rem",
      "48": "12rem",
      "56": "14rem",
      "64": "16rem"
    },
    inset: {
        '0': 0,
        'auto': 'auto',
        '16': '4rem',
    },
    zIndex: {
      "0": 0,
      "10": 10,
      "20": 20,
      "30": 30,
      "40": 40,
      "50": 50,
      "25": 25,
      "75": 75,
      "100": 100,
      "997": 997,
      "998": 998,
      "999": 999,
      "10000": 10000,
      auto: "auto"
    },
    extend: {
      spacing: {
        "72": "18rem",
        "84": "21rem",
        "96": "24rem"
      },
      inset: {
        "-1": "-0.25rem",
        "-2": "-0.5rem"
      }
    }
  },
  variants: {
    cursor: ["hover", "focus", "disabled"],
    backgroundColor: ["hover", "focus", "disabled"],
    display: ["responsive", "disabled"],
    maxWidth: ["responsive"],
    backgroundOpacity: ['hover']
  },
  plugins: [
        require('tailwind-scrollbar')
    ]
};
