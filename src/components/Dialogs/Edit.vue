<template>
    <v-dialog max-width="500" v-model="dialog">
        <v-card>
            <v-toolbar card>
                <v-toolbar-title>Edit Note</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-text-field label="Title" required v-model="title"></v-text-field>
                <v-textarea label="Contents" v-model="content"></v-textarea>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="$emit('update:dialog', false)" color="green darken-1" flat="flat">
                    Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="dialog = false" color="green darken-1" flat="flat">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { INote } from '@/brandroom-notes'

  @Component
  export default class Edit extends Vue {
    @Prop({ type: Boolean, required: true })
    public dialog: boolean

    @Prop({ type: Object, required: false })
    public note: INote

    get title (): string {
      return this.note ? this.note.title : ''
    }

    set title (title: string) {
      this.$store.commit('updateNote', Object.assign({}, this.note, { title }))
    }

    get content (): string {
      return this.note ? this.note.content : ''
    }

    set content (content: string) {
      this.$store.commit('updateNote', Object.assign({}, this.note, { content }))
    }
  }
</script>
