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

    protected snackbar: boolean = false

    protected message: string = ''

    protected statusColor: string = 'green'

    public submit (): void {
      this.$store.dispatch('deleteNote', this.note)
        .then(() => {
          this.message = 'Note Deleted'
          this.snackbar = true
          this.closeDialog()
        })
        .catch((error: any) => {
          this.statusColor = 'red'
          this.message = 'An error occurred while deleting the note'
          this.snackbar = true
        })
    }

    public closeDialog (): void {
      this.$emit('update:dialog', false)
    }
  }
</script>
