<template>
    <v-dialog max-width="290" v-model="dialog">
        <v-card>
            <v-toolbar :color="note ? note.color : 'indigo'" :dark="theme === 'dark'" :light="theme === 'light'" card>
                <v-toolbar-title>Choose Note Color</v-toolbar-title>
            </v-toolbar>
            <v-container fluid full-height grid-list-lg>
                <v-layout row wrap>
                    <v-flex :key="index" @click="updateColor(color)" v-for="(color, index) in palette" xs3>
                        <v-card :class="{ 'elevation-20': color.active }" flat tile>
                            <v-tooltip top>
                                <div :style="{ backgroundColor: color.color, minHeight: '3rem' }" slot="activator"></div>
                                <span>{{ color.name }}</span>
                            </v-tooltip>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-divider></v-divider>
            <v-card-actions class="white">
                <v-spacer></v-spacer>
                <v-btn @click="$emit('update:dialog', false)" color="blue" dark raised>
                    Done
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import colors from 'vuetify/es5/util/colors'
  import { INote, IPaletteColor, ThemeOption } from '@/brandroom-notes'

  @Component
  export default class Palette extends Vue {
    @Prop({ type: Boolean, required: true })
    public dialog: boolean

    @Prop({ type: Object, required: false })
    public note: INote

    public color: IPaletteColor | null = null

    public palette: IPaletteColor[] = []

    get theme (): ThemeOption {
      return this.color ? this.color.theme : 'dark'
    }

    public created (): void {
      const threshold: number = (Math.sqrt(1.05 * 0.05) - 0.01) / 100

      this.palette = Object.keys(colors).filter((key: string) => (colors as any)[key].hasOwnProperty('base')).map((key: string) => {
        const hex: string = ((colors as any)[key].base as string).substring(1)
        const red: number = parseInt(hex.substring(0, 1), 16)
        const green: number = parseInt(hex.substring(2, 3), 16)
        const blue: number = parseInt(hex.substring(4, 5), 16)
        const invert: string = [(0xFF - red).toString(16), (0xFF - green).toString(16), (0xFF - blue).toString(16)].join('')

        return {
          name: key,
          active: false,
          color: (colors as any)[key].base,
          theme: (this.luminance(invert) > threshold ? 'dark' : 'light') as ThemeOption
        }
      })
    }

    public luminance (invert: string): number {
      const v: number[] = []

      for (let i = 0; i < invert.length; i++) {
        const x = parseInt(invert[i], 16) / 0xFF
        v[i] = x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)
      }
      return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]
    }

    public updateColor (color: IPaletteColor): void {
      this.palette.forEach((c: IPaletteColor) => {
        c.active = c.name === color.name
      })
      this.color = color
      const note: INote = Object.assign({}, { ...this.note }, { color: color.color })
      this.$emit('update:note', note)
      this.$store.commit('updateNote', note)
    }
  }
</script>
