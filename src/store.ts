import Vue from 'vue'
import Vuex from 'vuex'
import { INote, IState } from '@/brandroom-notes'

Vue.use(Vuex)

const state: IState = {
  notes: Array<INote>()
}

export default new Vuex.Store({
  state,
  getters: {
    getNote: (s: IState) => (id: number) => s.notes.find((note: INote) => note.id === id),
    getNotes: (s: IState) => s.notes
  },
  mutations: {
    updateNote: (s: IState, note: INote) => {
      s.notes.splice(s.notes.findIndex((n: INote) => n.id === note.id), 1, note)
    },
    addNote: (s: IState, note: INote) => {
      if (typeof note.id !== 'number') {
        note.id = s.notes.reduce((id: number, n: INote) => {
          return n.id > id ? n.id : id
        }, 1)
      }
      s.notes.push(note)
    },
    deleteNote: (s: IState, note: INote) => {
      s.notes.splice(s.notes.findIndex((n: INote) => n.id === note.id), 1)
    }
  },
  actions: {}
})
