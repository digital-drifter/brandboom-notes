import Vue from 'vue'
import Vuex, { ActionContext } from 'vuex'
import { INote, IState } from '@/brandroom-notes'

Vue.use(Vuex)

const BASE_API_URL: string = `${process.env.VUE_APP_URL || 'http://localhost'}:${process.env.VUE_APP_PORT || 8585}/api`

const state: IState = {
  notes: Array<INote>(),
  note: undefined
}

export default new Vuex.Store({
  state,
  getters: {
    getNote: (s: IState) => s.note,
    getNotes: (s: IState) => s.notes
  },
  mutations: {
    setNote: (s: IState, note: INote) => {
      s.note = note
    },
    setNotes: (s: IState, notes: INote[]) => {
      s.notes = notes
    },
    updateNote: (s: IState, note: INote) => {
      s.notes.splice(s.notes.findIndex((n: INote) => n.id === note.id), 1, note)
    },
    addNote: (s: IState, note: INote) => {
      s.notes.push(note)
    },
    deleteNote: (s: IState, note: INote) => {
      s.notes.splice(s.notes.findIndex((n: INote) => n.id === note.id), 1)
    }
  },
  actions: {
    fetchNotes: async (context: ActionContext<IState, any>) => {
      return fetch(`${BASE_API_URL}/notes`)
        .then((response: Response) => response.json())
        .then((json: any) => {
          json.notes.forEach((note: INote) => {
            if (!note.content) {
              note.content = ''
            }
          })

          context.commit('setNotes', json.notes)

          return Promise.resolve()
        })
    },
    storeNote: async (context: ActionContext<IState, any>, note: INote) => {
      const formData = new FormData()

      formData.append('title', note.title)
      formData.append('content', note.content)
      formData.append('color', note.color)

      return fetch(`${BASE_API_URL}/notes`, {
        method: 'post',
        body: formData
      })
        .then((response: Response) => response.json())
        .then((json: any) => {
          context.commit('addNote', json.note)

          return Promise.resolve()
        })
    },
    updateNote: async (context: ActionContext<IState, any>, note: INote) => {
      const formData = new FormData()

      formData.append('_method', 'put')
      formData.append('title', note.title)
      formData.append('content', note.content)
      formData.append('color', note.color)

      return fetch(`${BASE_API_URL}/notes/${note.id}`, {
        method: 'post',
        body: formData
      })
        .then((response: Response) => response.json())
        .then((json: any) => {
          const index: number = context.state.notes.findIndex((n: INote) => n.id === json.note.id)
          const notes: INote[] = [...context.state.notes]

          notes.splice(index, 1, json.note)

          context.commit('setNotes', notes)

          return Promise.resolve()
        })
    },
    deleteNote: async (context: ActionContext<IState, any>, note: INote) => {
      const formData = new FormData()

      formData.append('_method', 'delete')

      return fetch(`${BASE_API_URL}/notes/${note.id}`, {
        method: 'post',
        body: formData
      }).then((response: Response) => {
        if (response.ok) {
          context.commit('setNotes', context.state.notes.filter((n: INote) => n.id !== note.id))

          return Promise.resolve()
        } else {
          return Promise.reject(response)
        }
      })
    }
  }
})
