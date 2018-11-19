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

    get theme (): ThemeOption {
      return this.note.color.theme
    }

    public updateNote (): void {
      this.$store.dispatch('updateNote', this.note).then(() => {
        this.$root.$emit('snackbar:show', { message: 'Note updated', statusColor: 'green', buttonColor: 'black' })

        this.closeDialog()
      }).catch((error: any) => {
        this.$root.$emit('snackbar:show', { message: 'An error occurred while updating the note', statusColor: 'red', buttonColor: 'white' })
      })
    }

    public closeDialog (): void {
      this.$emit('update:dialog', false)
    }
  }
</script>
