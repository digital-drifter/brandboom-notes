<template>
    <v-dialog max-width="500" v-model="dialog">
        <v-card :color="note.color.color" :dark="theme === 'dark'" :light="theme === 'light'">
            <v-toolbar card flat :color="note.color.color">
                <v-toolbar-title>New Note</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-text-field solo :dark="theme === 'dark'" :light="theme === 'light'" label="Title" required v-model="title"></v-text-field>
                <v-textarea solo :dark="theme === 'dark'" :light="theme === 'light'" label="Contents" v-model="content"></v-textarea>
            </v-card-text>
            <v-divider></v-divider>
            <color-palette :color.sync="note.color"></color-palette>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn @click="$emit('update:dialog', false)" color="light-grey" raised>
                    Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="submit" color="cyan" dark raised>
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

    @Prop({ type: Object, required: false })
    public note: INote

    public title: string = ''

    public content: string = ''

    get theme (): ThemeOption {
      return this.note.color.theme
    }

    mounted(): void {
      this.title = this.note.title
      this.content = this.note.content
    }

    submit(): void {
      // todo
    }
  }
</script>
