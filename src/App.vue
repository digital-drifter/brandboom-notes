<template>
    <v-app id="brandboom-notes">
        <v-toolbar absolute app clipped-left color="teal" dark>
            <v-toolbar-title>Brandboom&nbsp;<strong>Notes</strong></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field flat hide-details label="Search" prepend-inner-icon="search" solo-inverted v-model="search"></v-text-field>
            <v-divider class="mx-3" vertical></v-divider>
            <v-tooltip left hover>
                <v-btn slot="activator" @click="createNote" icon id="add-note">
                    <v-icon flat>note_add</v-icon>
                </v-btn>
                <span>Create Note</span>
            </v-tooltip>
        </v-toolbar>
        <v-content>
            <v-container class="grey lighten-4" fluid grid-list-lg v-if="notes.length > 0">
                <v-slide-x-reverse-transition class="wrap row" group mode="out-in" tag="v-layout">
                    <v-flex :key="`note-${note.id}`" dark v-for="note in notes" xs6>
                        <v-card :color="note.color" :style="{ opacity: note.title.includes(search) || note.content.includes(search) ? 1 : 0.3 }" hover>
                            <v-toolbar :color="note.color" :style="{ opacity: note.title.includes(search) || note.content.includes(search) ? 1 : 0.3 }" flat>
                                <v-text-field flat hide-details v-model="note.title"></v-text-field>
                            </v-toolbar>
                            <v-card-text>
                                <div class="editor">
                                    <editor-menu-bar :editor="createEditor(note)">
                                        <div :class="{ 'is-focused': focused }" class="menubar is-hidden" slot-scope="{ commands, isActive, focused }">
                                            <button v-for="command in Object.keys(commands)"
                                                    v-if="!Array<string>(['heading', 'code', 'bullet_list', 'ordered_list', 'undo', 'redo']).includes(command)"
                                                    :key="command"
                                                    :class="{ 'is-active': isActive[command]() }"
                                                    @click="commands[command]"
                                                    class="menubar__button">
                                                <v-icon flat small>{{ `format_${command}` }}</v-icon>
                                            </button>
                                            <button :class="{ 'is-active': isActive.code() }" @click="commands.code" class="menubar__button">
                                                <v-icon flat small>code</v-icon>
                                            </button>
                                            <button v-for="index in 3" :class="{ 'is-active': isActive.heading({ level: index }) }" @click="commands.heading({ level: index })" class="menubar__button">
                                                {{ `H${index}` }}
                                            </button>
                                            <button :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list" class="menubar__button">
                                                <v-icon flat small>format_list_bulleted</v-icon>
                                            </button>
                                            <button :class="{ 'is-active': isActive.ordered_list() }" @click="commands.ordered_list" class="menubar__button">
                                                <v-icon flat small>format_list_numbered</v-icon>
                                            </button>
                                            <button @click="commands.undo" class="menubar__button">
                                                <v-icon flat small>undo</v-icon>
                                            </button>
                                            <button @click="commands.redo" class="menubar__button">
                                                <v-icon flat small>redo</v-icon>
                                            </button>
                                        </div>
                                    </editor-menu-bar>
                                    <editor-content :editor="createEditor(note)"></editor-content>
                                </div>
                            </v-card-text>
                            <v-card-actions>
                                <v-tooltip top hover>
                                    <swatches slot="activator" :row-length="8" :show-border="true" :swatch-size="30" @input="note.color = $event" colors="material-light" popover-to="right" shapes="circles" v-model="note.color">
                                        <v-btn slot="trigger" color="blue-grey" dark fab raised small icon>
                                            <v-icon class="white--text" flat>palette</v-icon>
                                        </v-btn>
                                    </swatches>
                                    <span>Choose Color</span>
                                </v-tooltip>
                                <v-spacer></v-spacer>
                                <v-fab-transition>
                                    <v-tooltip top hover>
                                        <v-btn slot="activator" @click="confirmDelete = false" class="grey white--text" dark fab raised small v-show="confirmDelete">
                                            <v-icon flat small>cancel</v-icon>
                                        </v-btn>
                                        <span>Cancel</span>
                                    </v-tooltip>
                                </v-fab-transition>
                                <v-fab-transition>
                                    <v-tooltip top hover class="mx-3">
                                        <v-btn slot="activator" :color="confirmDelete ? 'green' : 'red'" :value="confirmDelete" @click="deleteNote(note)" dark fab raised small>
                                            <v-icon flat small>{{ confirmDelete ? 'done' : 'delete' }}</v-icon>
                                        </v-btn>
                                        <span>{{ confirmDelete ? 'Confirm' : 'Delete' }}</span>
                                    </v-tooltip>
                                </v-fab-transition>
                                <v-tooltip top hover>
                                    <v-btn slot="activator" @click="updateNote(note)" color="blue" dark fab raised small>
                                        <v-icon flat small>save</v-icon>
                                    </v-btn>
                                    <span>Save</span>
                                </v-tooltip>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-slide-x-reverse-transition>
            </v-container>
            <v-container fill-height fluid v-else>
                <v-layout column>
                    <v-flex class="text-xs-center" xs12>
                        <div class="display-2 grey--text text--lighten-1" style="font-family: 'Muli', sans-serif !important; padding-top: 10rem;">{{ emptyStateText }}</div>
                        <v-icon :style="{ fontSize: '5rem' }" class="my-5 grey--text text--lighten-1" large>inbox</v-icon>
                        <div class="title grey--text text--accent-1">Click the Add Note button to get started</div>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <v-snackbar :bottom="true" :color="statusColor" :timeout="6000" v-model="snackbar">
            {{ message }}
            <v-btn :color="buttonColor" @click="snackbar = false" flat>
                Close
            </v-btn>
        </v-snackbar>
    </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import Swatches from 'vue-swatches'
  import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
  import { Blockquote, Bold, BulletList, Code, CodeBlock, HardBreak, Heading, History, Italic, Link, ListItem, OrderedList, Placeholder, Strike, TodoItem, TodoList, Underline } from 'tiptap-extensions'

  import { INote } from '@/brandroom-notes'

  @Component({
    components: {
      Swatches,
      EditorContent,
      EditorMenuBar
    }
  })
  export default class App extends Vue {
    protected confirmDelete: boolean = false

    protected search: string = ''

    protected loading: boolean = true

    protected snackbar: boolean = false

    protected message: string = ''

    protected statusColor: string = 'green'

    protected buttonColor: string = 'pink'

    protected boundEditors: Array<{ note: INote, editor: any }> = []

    get notes (): INote[] {
      return this.search.length > 0 ? this.$store.getters.getNotes.sort((a: INote, b: INote) => {
        const foundA = (a.title.includes(this.search) || a.content.includes(this.search))
        const foundB = (b.title.includes(this.search) || b.content.includes(this.search))

        return (foundA && !foundB) ? -1 : ((foundB && !foundA) ? 1 : 0)
      }) : this.$store.getters.getNotes
    }

    get emptyStateText (): string {
      return this.loading ? 'Loading notes...' : 'You haven\'t saved any notes yet'
    }

    public mounted (): void {
      this.$store.dispatch('fetchNotes')
        .catch(() => {
          this.showErrorSnackbar('Unable to fetch notes')
        })
        .then(() => {
          this.loading = false
        })
    }

    public beforeDestroy () {
      this.boundEditors.forEach(({ note, editor }: { note: INote, editor: any }) => editor.destroy())
    }

    public async createNote (): Promise<any> {
      await this.$store.dispatch('storeNote', {
        title: 'New Note',
        content: '',
        color: '#FFF59D'
      })
        .catch(() => {
          this.showErrorSnackbar('Unable to create note')
        })
    }

    public async updateNote (note: INote): Promise<any> {
      await this.$store.dispatch('updateNote', note)
        .then(() => {
          this.showSuccessSnackbar('Note updated')
        })
        .catch(() => {
          this.showErrorSnackbar('Unable to update note')
        })
    }

    public async deleteNote (note: INote): Promise<any> {
      if (this.confirmDelete) {
        await this.$store.dispatch('deleteNote', note)
          .then(() => {
            this.showSuccessSnackbar('Note deleted')
          })
          .catch(() => {
            this.showErrorSnackbar('Unable to delete note')
          })
          .then(() => {
            this.confirmDelete = false
          })
      } else {
        this.confirmDelete = true
      }
    }

    public createEditor (note: INote): any {
      const index = this.boundEditors.findIndex((entry: { note: INote, editor: any }) => entry.note.id === note.id)

      if (index !== -1) {
        return this.boundEditors[index].editor
      }

      const editor = new Editor({
        content: note.content,
        extensions: [
          new Blockquote(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new BulletList(),
          new OrderedList(),
          new ListItem(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History(),
          new Placeholder({
            emptyClass: 'is-empty'
          })
        ],
        onUpdate: ({ getHTML }: any) => {
          note.content = getHTML()
        }
      })

      this.boundEditors.push(({ note, editor }))

      return editor
    }

    public showErrorSnackbar (message: string): void {
      this.showSnackbar({ message, statusColor: 'red', buttonColor: 'white' })
    }

    public showSuccessSnackbar (message: string): void {
      this.showSnackbar({ message, statusColor: 'green', buttonColor: 'blue-grey' })
    }

    public showSnackbar ({ message, statusColor, buttonColor }: { message: string, statusColor: string, buttonColor: string }): void {
      this.message = message
      this.statusColor = statusColor
      this.buttonColor = buttonColor
      this.snackbar = true
    }
  }
</script>

<style lang="scss">
    $color-black: #000000;
    $color-white: #ffffff;

    .search-highlight {
        background-color: #e91e63;
    }

    .editor p.is-empty:first-child::before {
        content: 'Start typing...';
        float: left;
        color: #424242;
        pointer-events: none;
        height: 0;
        font-style: italic;
    }

    .editor {
        position: relative;
        margin: 0 auto 5rem auto;

        &__content {
            pre {
                padding: 0.7rem 1rem;
                border-radius: 5px;
                background: $color-black;
                color: $color-white;
                font-size: 0.8rem;
                overflow-x: auto;

                code {
                    display: block;
                }
            }

            p code {
                display: inline-block;
                padding: 0 0.4rem;
                border-radius: 5px;
                font-size: 0.8rem;
                font-weight: bold;
                background: rgba($color-black, 0.1);
                color: rgba($color-black, 0.8);
            }

            ul,
            ol {
                padding-left: 1rem;
            }

            li > p,
            li > ol,
            li > ul {
                margin: 0;
            }

            a {
                color: inherit;
            }

            blockquote {
                border-left: 3px solid rgba($color-black, 0.1);
                color: rgba($color-black, 0.8);
                padding-left: 0.8rem;
                font-style: italic;

                p {
                    margin: 0;
                }
            }

            img {
                max-width: 100%;
                border-radius: 3px;
            }

        }
    }

    .menubar {

        display: flex;
        margin-bottom: 1rem;
        transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;

        &.is-hidden {
            visibility: hidden;
            opacity: 0;
        }

        &.is-focused {
            visibility: visible;
            opacity: 1;
            transition: visibility 0.2s, opacity 0.2s;
        }

        &__button {
            font-weight: bold;
            display: inline-flex;
            background: transparent;
            border: 0;
            color: $color-black;
            padding: 0.2rem 0.5rem;
            margin-right: 0.2rem;
            border-radius: 3px;
            cursor: pointer;

            &:hover {
                background-color: rgba($color-black, 0.05);
            }

            &.is-active {
                background-color: rgba($color-black, 0.1);
            }
        }
    }
</style>
