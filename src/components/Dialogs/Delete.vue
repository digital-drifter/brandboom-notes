<template>
    <v-dialog max-width="500" v-model="dialog">
        <v-card>
            <v-toolbar card flat color="red" dark>
                <v-toolbar-icon><v-icon>warning</v-icon></v-toolbar-icon>
                <v-toolbar-title>Delete Note?</v-toolbar-title>
            </v-toolbar>
            <v-card-text>Click confirm to permanently delete this note.</v-card-text>
            <v-card-actions>
                <v-btn @click="$emit('update:dialog', false)" light class="grey lighten-1" raised>
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

    @Prop({ type: Object, required: false })
    public note: INote

    public submit (): void {
      this.$store.commit('deleteNote', this.note)
      this.$emit('update:dialog', false)
    }
  }
</script>
