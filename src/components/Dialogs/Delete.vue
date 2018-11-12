<template>
    <v-dialog max-width="500" v-model="dialog">
        <v-card>
            <v-toolbar card>
                <v-toolbar-title>Confirm Delete</v-toolbar-title>
            </v-toolbar>
            <v-card-text>Are you sure you want to delete this note?</v-card-text>
            <v-card-actions>
                <v-btn @click="$emit('update:dialog', false)" color="green darken-1" raised>
                    Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="submit" color="red" raised>
                    Delete
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

    @Prop({ type: Object, required: false })
    public note: INote

    public submit (): void {
      this.$store.commit('deleteNote', this.note)
      this.$emit('update:dialog', false)
    }
  }
</script>
