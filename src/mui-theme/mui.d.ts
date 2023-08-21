import '@mui/material'

type CustomSingleColor = {
  alabaster: string
  hawkesBlue: string
  lightPurple: string
  royalBlue: string
  mantis: string
  disabled: string
  silverChalice: string
}

declare module '@mui/material/styles' {
  interface Palette extends CustomSingleColor {
    badge: Palette['primary']
    greyBlue: Palette['primary']
    blue: Palette['primary']
  }

  interface PaletteOptions extends CustomSingleColor {
    badge: PaletteOptions['primary']
    greyBlue: PaletteOptions['primary']
    blue: PaletteOptions['primary']
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    greyBlue: true
    blue: true
  }
}
