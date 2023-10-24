import '@mui/material'

// separate single palette units from paletteoptions extensions
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
  interface PaletteColor {
    special?: string
    lowPriority?: string
    highPriority?: string
    disabled?: string
  }
  interface Palette extends CustomSingleColor {
    badge: Palette['primary']
    accentRed: Palette['primary']
    accentOlive: Palette['primary']
    accentYellow: Palette['primary']
    accentBlue: Palette['primary']
    textSpecial: Palette['primary']
  }

  interface PaletteOptions extends CustomSingleColor {
    badge: PaletteOptions['primary'] & Partial<CustomSingleColor>
    accentRed: PaletteOptions['primary'] & Partial<CustomSingleColor>
    accentOlive: PaletteOptions['primary'] & Partial<CustomSingleColor>
    textSpecial: PaletteOptions['primary'] & Partial<PaletteColor>
    accentYellow: PaletteOptions['primary'] & Partial<PaletteColor>
    accentBlue: PaletteOptions['primary'] & Partial<PaletteColor>
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    greyBlue: true
    blue: true
  }
}
