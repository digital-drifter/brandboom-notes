declare module 'vue-tour' {
  export interface Tours {
    [key: string]: {
      start (): void
    }
  }
}
