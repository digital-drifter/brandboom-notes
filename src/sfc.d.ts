import Vue from 'vue'
import { Tour, Tours } from 'vue-tour'

declare module 'vue/types/vue' {
  export interface Vue {
    $tours: Tours<Tour>
  }
}
