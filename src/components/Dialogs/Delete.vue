<template>
    <v-dialog max-width="500" v-model="dialog">
        <v-card>
            <v-toolbar card color="red" dark flat>
                <v-toolbar-side-icon>
                    <v-icon>warning</v-icon>
                </v-toolbar-side-icon>
                <v-toolbar-title>Delete Note?</v-toolbar-title>
            </v-toolbar>
            <v-card-text>Click confirm to permanently delete this note.</v-card-text>
            <v-card-actions>
                <v-btn @click="closeDialog" class="grey lighten-1" light raised>
                    Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="submit" color="red" dark raised>
                    Confirm
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { INote } from '@/brandroom-notes'

  @Component
  export default class Delete extends Vue {
    @Prop({ type: Boolean, required: true })
    public dialog: boolean

    get note (): INote {
      return this.$store.getters.getNote
    }

    set note (note: INote) {
      this.$store.commit('setNote', note)
    }

    public submit (): void {
      this.$store.dispatch('deleteNote', this.note)
        .then(() => {
          this.$root.$emit('snackbar:show', { message: 'Note deleted', statusColor: 'green', buttonColor: 'black' })
          this.closeDialog()
        })
        .catch((error: any) => {
          this.$root.$emit('snackbar:show', { message: 'An error occurred while deleting the note', statusColor: 'red', buttonColor: 'white' })
        })
    }

    public closeDialog (): void {
      this.$emit('update:dialog', false)
    }
  }
</script>
