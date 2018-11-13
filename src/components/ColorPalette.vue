<template>
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
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { IPaletteColor, ThemeOption } from '@/brandroom-notes'
  import { generateColorPalette } from '@/utils'

  @Component
  export default class ColorPalette extends Vue {
    @Prop({ type: Object, required: true })
    public color: IPaletteColor

    public palette: IPaletteColor[] = []

    get theme (): ThemeOption {
      return this.color ? this.color.theme : 'dark'
    }

    public created (): void {
      this.palette = generateColorPalette(this.color.name)
    }

    public updateColor (color: IPaletteColor): void {
      this.palette.forEach((c: IPaletteColor) => {
        c.active = c.name === color.name
      })
      this.$emit('update:color', color)
    }
  }
</script>
