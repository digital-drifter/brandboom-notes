export interface INote {
  id: number
  title: string
  content: string
  color: string
  created_at: string
  updated_at: string
}

export interface IState {
  notes: INote[]
  note: INote | undefined
}
