<template>
    <v-dialog max-width="500" v-model="dialog">
        <v-card :color="color.color" :dark="theme === 'dark'" :light="theme === 'light'">
            <v-toolbar :color="color.color" card flat>
                <v-toolbar-title>New Note</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-text-field :dark="theme === 'dark'" :light="theme === 'light'" label="Title" required solo v-model="title"></v-text-field>
                <v-textarea :dark="theme === 'dark'" :light="theme === 'light'" label="Contents" solo v-model="content"></v-textarea>
            </v-card-text>
            <v-divider></v-divider>
            <color-palette :color.sync="color"></color-palette>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn @click="closeDialog" color="light-grey" raised>
                    Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="storeNote" color="cyan" raised>
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-snackbar :bottom="true" :timeout="6000" v-model="snackbar" :color="statusColor">
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
  import { IPaletteColor, ThemeOption } from '@/brandroom-notes'

  @Component({
    components: {
      ColorPalette
    }
  })
  export default class Create extends Vue {
    @Prop({ type: Boolean, required: true })
    public dialog: boolean

    protected snackbar: boolean = false

    protected message: string = ''

    protected statusColor: string = 'green'

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

    public storeNote (): void {
      this.$store.dispatch('storeNote', {
        title: this.title,
        color: this.color,
        content: this.content
      }).then(() => {
        this.statusColor = 'green'
        this.message = 'Note Saved'
        this.snackbar = true

        this.closeDialog()
      }).catch((error: any) => {
        this.statusColor = 'red'
        this.message = 'An error occurred while saving the note'
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
