<template>
    <v-dialog max-width="500" v-model="dialog">
        <v-card v-if="note" :color="note.color.color" :dark="theme === 'dark'" :light="theme === 'light'">
            <v-toolbar card flat :color="note.color.color">
                <v-toolbar-title>Edit Note</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-text-field solo :dark="theme === 'dark'" :light="theme === 'light'" label="Title" required v-model="note.title"></v-text-field>
                <v-textarea solo :dark="theme === 'dark'" :light="theme === 'light'" label="Contents" v-model="note.content"></v-textarea>
            </v-card-text>
            <v-divider></v-divider>
            <color-palette :color.sync="note.color"></color-palette>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn @click="closeDialog" color="light-grey" raised>
                    Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="updateNote" color="cyan" dark raised>
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-snackbar :bottom="true" :color="statusColor" :timeout="6000" v-model="snackbar">
            {{ message }}
            <v-btn @click="snackbar = false" color="pink" flat>
                Close
            </v-btn>
        </v-snackbar>
    </v-dialog>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import colors from 'vuetify/es5/util/colors'
  import ColorPalette from '@/components/ColorPalette.vue'
  import { INote, IPaletteColor, ThemeOption } from '@/brandroom-notes'

  @Component({
    components: {
      ColorPalette
    }
  })
  export default class Edit extends Vue {
    @Prop({ type: Boolean, required: true })
    public dialog: boolean

    get note(): INote {
      return this.$store.getters.getNote
    }

    set note(note: INote) {
      this.$store.commit('setNote', note)
    }

    // public title: string = ''
    //
    // public content: string = ''

    protected snackbar: boolean = false

    protected message: string = ''

    protected statusColor: string = 'green'

    // protected color: IPaletteColor = {
    //   name: 'yellow',
    //   active: true,
    //   theme: 'light',
    //   color: colors.yellow.base
    // }

    get theme (): ThemeOption {
      return this.note.color.theme
    }

    // public mounted(): void {
    //   this.color = this.note.color
    //   this.title = this.note.title
    //   this.content = this.note.content
    // }

    public updateNote (): void {
      this.$store.dispatch('updateNote', {
        title: this.note.title,
        color: this.note.color,
        content: this.note.content
      }).then(() => {
        this.statusColor = 'green'
        this.message = 'Note Updated'
        this.snackbar = true

        this.closeDialog()
      }).catch((error: any) => {
        this.statusColor = 'red'
        this.message = 'An error occurred while updating the note'
        this.snackbar = true
      })
    }

    public closeDialog (): void {
      this.$emit('update:dialog', false)
      this.title = ''
      this.content = ''
    }
  }
</script>
