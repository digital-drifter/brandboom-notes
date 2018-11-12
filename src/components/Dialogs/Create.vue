<template>
    <v-dialog max-width="500" v-model="dialog">
        <v-card>
            <v-toolbar card>
                <v-toolbar-title>New Note</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-text-field label="Title" required v-model="title"></v-text-field>
                <v-textarea label="Contents" v-model="content"></v-textarea>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="$emit('update:dialog', false)" color="green darken-1" flat="flat">
                    Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="submit" color="green darken-1" flat="flat">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import colors from 'vuetify/es5/util/colors'

  @Component
  export default class Create extends Vue {
    @Prop({ type: Boolean, required: true })
    public dialog: boolean

    protected title: string = ''

    protected content: string = ''

    public submit (): void {
      this.$store.commit('addNote', {
        title: this.title,
        color: colors.yellow.base,
        content: this.content
      })

      this.$emit('update:dialog', false)
    }
  }
</script>
