<template>
    <v-dialog max-width="500" v-model="dialog">
        <v-card :color="color.color" :dark="theme === 'dark'" :light="theme === 'light'">
            <v-toolbar :color="color.color" card flat>
                <v-toolbar-title>New Note</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-text-field :dark="theme === 'dark'" :light="theme === 'light'" label="Title" required solo v-model="title"></v-text-field>
                <!--<v-textarea :dark="theme === 'dark'" :light="theme === 'light'" label="Contents" solo v-model="content"></v-textarea>-->
                <wysiwyg v-model="content"></wysiwyg>
            </v-card-text>
            <v-divider></v-divider>
            <color-palette :color.sync="color"></color-palette>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn @click="closeDialog" color="light-grey" raised>
                    Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="storeNote" color="cyan" raised :disabled="disabled">
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
  import { IPaletteColor, ThemeOption } from '@/brandroom-notes'

  @Component({
    components: {
      ColorPalette
    }
  })
  export default class Create extends Vue {
    @Prop({ type: Boolean, required: true })
    public dialog: boolean

    protected title: string = ''

    protected content: string = ''

    protected color: IPaletteColor = {
      name: 'yellow',
      active: true,
      theme: 'light',
      color: colors.yellow.base
    }

    get theme (): ThemeOption {
      return this.color.theme
    }

    get disabled(): boolean {
      return !this.title.length || !this.content.length
    }

    public storeNote (): void {
      this.$store.dispatch('storeNote', {
        title: this.title,
        color: this.color,
        content: this.content
      }).then(() => {
        this.$root.$emit('snackbar:show', { message: 'Note saved', statusColor: 'green', buttonColor: 'black' })

        this.closeDialog()
      }).catch((error: any) => {
        this.$root.$emit('snackbar:show', { message: 'An error occurred while saving the note', statusColor: 'red', buttonColor: 'white' })
      })
    }

    public closeDialog (): void {
      this.$emit('update:dialog', false)
      this.title = ''
      this.content = ''
    }
  }
</script>
