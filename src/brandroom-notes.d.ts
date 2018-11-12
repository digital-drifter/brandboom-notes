export interface INote {
  id: number
  title: string
  content: string
  color: string
}

export interface IDialogs {
  create: boolean
  edit: boolean
  palette: boolean
  delete: boolean
}

export interface IPaletteColor {
  name: string
  color: string
  theme: ThemeOption,
  active: boolean
}

export type ThemeOption = 'light' | 'dark'

export interface IState {
  notes: INote[]
}
