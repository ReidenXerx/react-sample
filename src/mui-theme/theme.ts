import { createTheme } from '@mui/material'

const titillium = 'Titillium, sans-serif'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#3247E5',
    },
    success: {
      main: '#4ABFB9',
      light: '#DBF2F1',
    },
    text: {
      primary: '#010745',
      secondary: '#2B3064',
      disabled: '#565A83',
    },
    background: {
      default: '#FFFFFF',
    },
    divider: '#EDEEF2',
    error: {
      main: '#DA3E3E',
      light: '#F2DCE2',
    },
    info: {
      main: '#1F68FA',
    },
    badge: {
      main: '#E5F4F0',
    },
    greyBlue: {
      light: '#9EA3B6',
      main: '#4D5678',
    },
    blue: {
      main: '#008BF0',
      contrastText: '#FFF',
    },
    alabaster: '#F8F8F8',
    hawkesBlue: '#D6DAFA',
    lightPurple: '#EAEBFC',
    royalBlue: '#3247E5',
    mantis: '#7ECE58',
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
  },

  typography: {
    fontFamily: 'GT-America, sans-serif',
  },
})

const { pxToRem } = theme.typography

theme.typography = {
  ...theme.typography,

  h1: {
    fontFamily: titillium,
    fontSize: pxToRem(20),
    lineHeight: pxToRem(28),
    fontWeight: 700,
    letterSpacing: '0.68px',
  },

  h2: {
    fontFamily: titillium,
    fontSize: pxToRem(24),
    lineHeight: pxToRem(36),
    fontWeight: 700,
    letterSpacing: '0.52px',
  },

  h3: {
    fontFamily: titillium,
    fontSize: pxToRem(18),
    lineHeight: pxToRem(27),
    fontWeight: 600,
    letterSpacing: '0.45px',
  },

  h4: {
    fontFamily: titillium,
    fontSize: pxToRem(14),
    lineHeight: pxToRem(21),
    fontWeight: 600,
    letterSpacing: '0.45px',
  },

  body1: {
    fontFamily: titillium,
    fontSize: pxToRem(16),
    lineHeight: pxToRem(24),
    fontWeight: 400,
    letterSpacing: '0.52px',
  },

  body2: {
    fontFamily: titillium,
    fontSize: pxToRem(14),
    lineHeight: pxToRem(18),
    fontWeight: 400,
    letterSpacing: '0.52px',
  },

  caption: {
    fontFamily: titillium,
    display: 'inline-block',
    fontSize: pxToRem(12),
    lineHeight: pxToRem(16),
    fontWeight: 400,
    letterSpacing: '0.52px',
  },

  button: {
    fontFamily: titillium,
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
    variants: [
      {
        props: { variant: 'contained' },
        style: {
          boxShadow:
            '0px 1px 3px -1px rgba(0, 0, 0, 0.3), 0px 2px 5px -1px rgba(50, 50, 93, 0.25)',
          '&:hover': {
            boxShadow:
              '0px 2px 3px -1px rgba(0, 0, 0, 0.3), 0px 3px 6px -1px rgba(50, 50, 93, 0.25)',
          },
          '&:focus': {
            boxShadow:
              '0px 2px 3px -1px rgba(0, 0, 0, 0.3), 0px 3px 6px -1px rgba(50, 50, 93, 0.25)',
          },
        },
      },
      {
        props: { variant: 'outlined' },
        style: {
          boxShadow:
            '0px 1px 3px -1px rgba(0, 0, 0, 0.15), 0px 2px 5px -1px rgba(50, 50, 93, 0.12)',
          '&:hover': {
            boxShadow:
              '0px 2px 3px -1px rgba(0, 0, 0, 0.15), 0px 3px 4px -1px rgba(50, 50, 93, 0.12)',
          },
          '&:focus': {
            boxShadow:
              '0px 2px 3px -1px rgba(0, 0, 0, 0.15), 0px 3px 4px -1px rgba(50, 50, 93, 0.12)',
          },
        },
      },
      {
        props: { variant: 'outlined', color: 'greyBlue' },
        style: {
          borderColor: theme.palette.divider,
          '&:hover': {
            borderColor: theme.palette.divider,
          },
        },
      },
    ],
  },

  MuiInputBase: {
    styleOverrides: {
      root: {
        border: '1px solid',
        borderColor: theme.palette.divider,
        boxShadow: 'inset 0px 1px 4px rgba(0, 14, 62, 0.04)',

        '&:hover:not(.Mui-disabled)': {
          boxShadow:
            'inset 0px 1px 4px rgba(0, 14, 62, 0.04), 0px 1px 2px rgba(77, 86, 120, 0.1)',
        },
      },
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: theme.palette.text.primary,
      },
    },
  },
}
