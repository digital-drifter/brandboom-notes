import Vue from 'vue'
import Vuex, { ActionContext } from 'vuex'
import { INote, IState } from '@/brandroom-notes'

Vue.use(Vuex)

const BASE_API_URL: string = 'https://api.brandboom.localhost'

const state: IState = {
  notes: Array<INote>(),
  note: null
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
      if (typeof note.color === 'string') {
        note.color = JSON.parse(note.color)
      }
      s.notes.splice(s.notes.findIndex((n: INote) => n.id === note.id), 1, note)
    },
    addNote: (s: IState, note: INote) => {
      if (typeof note.id !== 'number') {
        note.id = s.notes.reduce((id: number, n: INote) => {
          return n.id > id ? n.id : id
        }, 1)
      }
      if (typeof note.color === 'string') {
        note.color = JSON.parse(note.color)
      }
      s.notes.push(note)
    },
    deleteNote: (s: IState, note: INote) => {
      s.notes.splice(s.notes.findIndex((n: INote) => n.id === note.id), 1)
    }
  },
  actions: {
    fetchNotes: async (context: ActionContext<IState, any>) => {
      return fetch(`${BASE_API_URL}/api/notes`)
        .then((response: Response) => response.json())
        .then((json: any) => {
          json.notes.forEach((note: INote) => {
            if (typeof note.color === 'string') {
              note.color = JSON.parse(note.color)
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
      formData.append('color', JSON.stringify(note.color))

      return fetch(`${BASE_API_URL}/api/notes`, {
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
      formData.append('color', JSON.stringify(note.color))

      return fetch(`${BASE_API_URL}/api/notes/${note.id}`, {
        method: 'post',
        body: formData
      })
        .then((response: Response) => response.json())
        .then((json: any) => {
          const index: number = context.state.notes.findIndex((n: INote) => n.id === json.note.id)
          const notes: INote[] = [...context.state.notes]

          if (typeof json.note.color === 'string') {
            json.note.color = JSON.parse(json.note.color)
          }

          notes.splice(index, 1, json.note)

          context.commit('setNotes', notes)

          return Promise.resolve()
        })
    },
    deleteNote: async (context: ActionContext<IState, any>, note: INote) => {
      const formData = new FormData()

      formData.append('_method', 'delete')

      return fetch(`${BASE_API_URL}/api/notes/${note.id}`, {
        method: 'post',
        body: formData
      }).then(() => {
        context.commit('setNotes', context.state.notes.filter((n: INote) => n.id !== note.id))

        return Promise.resolve()
      })
    }
  }
})
