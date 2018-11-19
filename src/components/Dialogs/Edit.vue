<template>
    <v-dialog max-width="500" v-model="dialog">
        <v-card :color="note.color.color" :dark="theme === 'dark'" :light="theme === 'light'" v-if="note">
            <v-toolbar :color="note.color.color" card flat>
                <v-toolbar-title>Edit Note</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-text-field :dark="theme === 'dark'" :light="theme === 'light'" label="Title" required solo v-model="note.title"></v-text-field>
                <!--<v-textarea :dark="theme === 'dark'" :light="theme === 'light'" label="Contents" solo v-model="note.content"></v-textarea>-->
                <wysiwyg v-model="note.content"></wysiwyg>
            </v-card-text>
            <v-divider></v-divider>
            <color-palette :color.sync="note.color"></color-palette>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn @click="closeDialog" color="light-grey" raised>
                    Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="updateNote" color="cyan" dark raised :disabled="disabled">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import ColorPalette from '@/components/ColorPalette.vue'
  import { INote, ThemeOption } from '@/brandroom-notes'

  @Component({
    components: {
      ColorPalette
    }
  })
  export default class Edit extends Vue {
    @Prop({ type: Boolean, required: true })
    public dialog: boolean

    get note (): INote {
      return this.$store.getters.getNote
    }

    set note (note: INote) {
      this.$store.commit('setNote', note)
    }

    get theme (): ThemeOption {
      return this.note.color.theme
    }

    get disabled(): boolean {
      return !this.note.title.length || !this.note.content.length
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
