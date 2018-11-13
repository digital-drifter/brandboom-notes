declare module 'vue-tour' {
  export type Tour = { [key: string]: { start (): void } }

  export interface Tours<T extends Tour> {
    [key: string]: T
  }
}
