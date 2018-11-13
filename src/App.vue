<template>
    <v-app id="brandboom-notes">
        <v-toolbar absolute app clipped-left color="teal" dark>
            <v-toolbar-title>Brandboom&nbsp;<strong>Notes</strong></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field flat hide-details label="Search" prepend-inner-icon="search" solo-inverted v-model="search"></v-text-field>
            <v-divider vertical class="mx-3"></v-divider>
            <v-btn icon @click="dialogs.create = true">
                <v-icon flat>note_add</v-icon>
            </v-btn>
        </v-toolbar>
        <v-content>
            <v-container class="grey lighten-4" fluid grid-list-lg v-if="notes.length > 0">
                <v-layout row wrap>
                    <v-flex :key="`note-${note.id}`" dark v-for="note in notes" xs3>
                        <v-card hover>
                            <v-toolbar :color="note.color" flat>
                                <v-toolbar-title>{{ note.title }}</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-menu offset-y>
                                    <v-btn icon slot="activator">
                                        <v-icon flat>more_vert</v-icon>
                                    </v-btn>
                                    <v-list>
                                        <v-list-tile :key="index" @click="option.click" avatar v-for="(option, index) in options">
                                            <v-list-tile-avatar>
                                                <v-icon :color="note.color">{{ option.icon }}</v-icon>
                                            </v-list-tile-avatar>
                                            <v-list-tile-title>{{ option.text }}</v-list-tile-title>
                                        </v-list-tile>
                                    </v-list>
                                </v-menu>
                            </v-toolbar>
                            <v-card-text>{{ note.content }}</v-card-text>
                        </v-card>
                        <palette :dialog.sync="dialogs.palette" :note.sync="note"></palette>
                        <edit :dialog.sync="dialogs.edit" :note.sync="note"></edit>
                        <delete :dialog.sync="dialogs.delete" :note="note"></delete>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-container v-else fill-height fluid>
                <v-layout column>
                    <v-flex xs12 class="text-xs-center">
                        <div class="display-2">You haven't saved any notes yet</div>
                        <v-icon :style="{ fontSize: '5rem' }" large>hourglass_empty</v-icon>
                        <div class="title">Click the Add Note button to get started</div>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <create :dialog.sync="dialogs.create"></create>
    </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Create, Delete, Edit, Palette } from '@/components/Dialogs'
  import { IDialogs, INote } from '@/brandroom-notes'

  @Component({
    components: {
      Create,
      Delete,
      Edit,
      Palette
    }
  })
  export default class App extends Vue {
    protected search: string = ''

    protected dialogs: IDialogs = {
      create: false,
      delete: false,
      edit: false,
      palette: false
    }

    protected options: any[] = [
      {
        text: 'Edit',
        icon: 'edit',
        click: () => {
          this.$nextTick(() => {
            this.dialogs.edit = true
          })
        }
      },
      {
        text: 'Color',
        icon: 'palette',
        click: () => {
          this.$nextTick(() => {
            this.dialogs.palette = true
          })
        }
      },
      {
        text: 'Delete',
        icon: 'delete',
        click: () => {
          this.$nextTick(() => {
            this.dialogs.delete = true
          })
        }
      }
    ]

    get notes (): INote[] {
      return this.$store.getters['getNotes']
    }

    created(): void {

    }
  }
</script>
