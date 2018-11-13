import colors from 'vuetify/es5/util/colors'
import { IPaletteColor, ThemeOption } from '@/brandroom-notes'

/**
 * Calculate the luminosity of the given hex color string.
 *
 * @param invert
 */
const luminance = (invert: string) => {
  const v: number[] = []

  for (let i = 0; i < invert.length; i++) {
    const x = parseInt(invert[i], 16) / 0xFF
    v[i] = x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]
}

export const generateColorPalette = (color?: string): IPaletteColor[] => {
  const threshold: number = (Math.sqrt(1.05 * 0.05) - 0.01) / 100

  return Object.keys(colors).filter((key: string) => (colors as any)[key].hasOwnProperty('base')).map((key: string) => {
    const hex: string = ((colors as any)[key].base as string).substring(1)
    const red: number = parseInt(hex.substring(0, 1), 16)
    const green: number = parseInt(hex.substring(2, 3), 16)
    const blue: number = parseInt(hex.substring(4, 5), 16)
    const invert: string = [(0xFF - red).toString(16), (0xFF - green).toString(16), (0xFF - blue).toString(16)].join('')

    return {
      name: key,
      active: (color && (key === color)) || false,
      color: (colors as any)[key].base,
      theme: (luminance(invert) > threshold ? 'dark' : 'light') as ThemeOption
    }
  })
}
