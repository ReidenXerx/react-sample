import { createTheme } from '@mui/material'

const inter = 'Inter, sans-serif'

export const theme = createTheme({
  transitions: {
    // So we have to create a "duration" and "easing" object
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      // Most basic recommended timing
      standard: 300,
      // This is to be used in complex animations
      complex: 375,
      // Something between complex and entering screen
      enteringScreen: 225,
      // Total opposite, between exiting and complex
      leavingScreen: 195,
    },
    easing: {
      // This is the most common easing curve
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Objects in the screen are accelerating
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      // Objects on the screen decelerate
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      // The sharp curve is meant for objects that may return to the screen after leaving.
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
  palette: {
    primary: {
      main: '#00BABF',
      light: '#EDFAFB',
      dark: '#D1FEFF',
    },
    success: {
      main: '#CCF9D6',
      light: '#66B979',
    },
    text: {
      primary: '#000000',
      secondary: '#626D7D',
      disabled: '#C9C9C9',
    },
    textSpecial: {
      lowPriority: '#A7A7A6',
      highPriority: '#5E6E78',
    },
    background: {
      default: '#FFFFFF',
    },
    accentRed: {
      main: '#FFBCCB',
      dark: '#FF2052',
      light: '#FFEDF1',
      disabled: '#FFF2F1',
    },
    accentOlive: {
      main: '#CCDAC9',
      dark: '#A4B4A0',
      light: '#F8FFFF',
    },
    accentYellow: {
      main: '#FCF4DB',
    },
    accentBlue: {
      main: '#1F68FA',
      light: '#D5E6FB',
    },
    divider: '#EDEEF2',
    error: {
      main: '#F7D8D6',
      light: '#CA9E9C',
      dark: '#E51212',
    },
    info: {
      main: '#1F68FA',
      light: '#D5E6FB',
    },
    badge: {
      main: '#E5F4F0',
    },
    alabaster: '#F8F8F8',
    hawkesBlue: '#D6DAFA',
    lightPurple: '#EAEBFC',
    royalBlue: '#F0F8FF',
    mantis: '#CAD7C5',
    disabled: '#CCCDDA',
    silverChalice: '#AEAEAE',
  },

  components: {
    MuiPaper: {
      defaultProps: {
        variant: 'outlined',
      },
      variants: [
        {
          props: { variant: 'elevation' },
          style: {
            boxShadow:
              '0px 1px 1px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(50, 50, 105, 0.16)',
          },
        },
      ],
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
        },
      },
    },
  },

  typography: {
    fontFamily: 'Inter, sans-serif',
  },
})

const { pxToRem } = theme.typography

theme.typography = {
  ...theme.typography,

  h1: {
    fontFamily: inter,
    fontSize: pxToRem(32),
    lineHeight: pxToRem(28),
    fontWeight: 700,
    letterSpacing: '0.68px',
  },

  h2: {
    fontFamily: inter,
    fontSize: pxToRem(22),
    lineHeight: pxToRem(36),
    fontWeight: 500,
    letterSpacing: '0.52px',
  },

  h3: {
    fontFamily: inter,
    fontSize: pxToRem(18),
    lineHeight: pxToRem(27),
    fontWeight: 600,
    letterSpacing: '0.45px',
  },

  h4: {
    fontFamily: inter,
    fontSize: pxToRem(14),
    lineHeight: pxToRem(21),
    fontWeight: 600,
    letterSpacing: '0.45px',
  },

  h5: {
    fontFamily: inter,
    fontSize: pxToRem(16),
    lineHeight: pxToRem(20),
    fontWeight: 700,
    letterSpacing: '0.45px',
  },

  body1: {
    fontFamily: inter,
    fontSize: pxToRem(14),
    lineHeight: pxToRem(24),
    fontWeight: 400,
    letterSpacing: '0.52px',
  },

  body2: {
    fontFamily: inter,
    fontSize: pxToRem(12),
    lineHeight: pxToRem(18),
    fontWeight: 400,
    letterSpacing: '0.52px',
  },

  caption: {
    fontFamily: inter,
    display: 'inline-block',
    fontSize: pxToRem(10),
    lineHeight: pxToRem(16),
    fontWeight: 400,
    letterSpacing: '0.52px',
  },

  button: {
    fontFamily: inter,
    fontSize: pxToRem(10),
    lineHeight: pxToRem(20),
    fontWeight: 700,
    letterSpacing: '0.6px',
    textTransform: 'uppercase',
  },
}

theme.components = {
  ...theme.components,

  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      disabled: {
        backgroundColor: '#F0F8FF',
        color: 'white',
      },
    },
  },

  MuiInputBase: {
    styleOverrides: {
      root: {
        '& label.Mui-focused': {
          color: '#00BABF', // primary main
        },

        '& .MuiInput-underline:after': {
          borderBottomColor: '#00BABF', // primary main
        },
        '&.Mui-disabled': {
          color: '#C9C9C9',
          backgroundColor: '#F0F8FF',
          borderColor: '#F0F8FF',
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#00BABF', // primary light
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#00BABF', // primary main
        },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          border: '2px solid',
          borderColor: '#FF2052', // accentRed dark
        },
        '&.Mui-error': {
          color: '#FF2052', // accentRed dark
        },
      },
      notchedOutline: {
        borderColor: '#D5E6FB',
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        '&.Mui-error': {
          color: '#FF2052', // accentRed dark
        },
      },
    },
  },

  MuiFormHelperText: {
    styleOverrides: {
      root: {
        '&.Mui-error': {
          color: '#FF2052', // accentRed dark
        },
      },
    },
  },

  // Add customization for the MuiMenuItem component
  MuiMenuItem: {
    styleOverrides: {
      root: {
        '&.Mui-selected': {
          backgroundColor: '#D5E6FB', // pick a color
        },
        '&.Mui-selected:hover': {
          backgroundColor: '#00BABF', // primary main
          color: 'white',
        },
      },
    },
  },

  MuiContainer: {
    styleOverrides: {
      root: {
        margin: 0,
      },
    },
  },

  MuiTextField: {
    styleOverrides: {
      root: {
        '&.Mui-disabled': {
          color: '#C9C9C9',
          backgroundColor: '#F0F8FF',
        },
      },
    },
  },

  MuiChip: {
    styleOverrides: {
      root: {
        backgroundColor: '#00BABF',
      },
      label: {
        color: 'white',
      },
    },
  },
}
