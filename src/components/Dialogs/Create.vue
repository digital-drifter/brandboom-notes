<template>
    <v-dialog max-width="500" v-model="dialog">
        <v-card :color="color.color" :dark="theme === 'dark'" :light="theme === 'light'">
            <v-toolbar card flat :color="color.color">
                <v-toolbar-title>New Note</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-text-field solo :dark="theme === 'dark'" :light="theme === 'light'" label="Title" required v-model="title"></v-text-field>
                <v-textarea solo :dark="theme === 'dark'" :light="theme === 'light'" label="Contents" v-model="content"></v-textarea>
            </v-card-text>
            <v-divider></v-divider>
            <color-palette :color.sync="color"></color-palette>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn @click="$emit('update:dialog', false)" color="light-grey" raised>
                    Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="submit" color="cyan" raised>
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

    public submit (): void {
      this.$store.commit('addNote', {
        title: this.title,
        color: this.color,
        content: this.content
      })

      this.$emit('update:dialog', false)

      this.title = ''
      this.content = ''
    }
  }
</script>
