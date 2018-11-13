<template>
    <v-app id="brandboom-notes">
        <v-toolbar absolute app clipped-left color="teal" dark>
            <v-toolbar-title>Brandboom&nbsp;<strong>Notes</strong></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field flat hide-details label="Search" prepend-inner-icon="search" solo-inverted v-model="search"></v-text-field>
            <v-divider class="mx-3" vertical></v-divider>
            <v-btn @click="dialogs.create = true" icon id="add-note">
                <v-icon flat>note_add</v-icon>
            </v-btn>
        </v-toolbar>
        <v-content>
            <v-container class="grey lighten-4" fluid grid-list-lg v-if="notes.length > 0">
                <v-layout row wrap>
                    <v-flex :key="`note-${note.id}`" dark v-for="note in notes" xs3>
                        <v-card hover>
                            <v-toolbar :color="note.color.color" flat>
                                <v-toolbar-title>{{ note.title }}</v-toolbar-title>
                                <v-spacer></v-spacer>
                                <v-menu offset-y>
                                    <v-btn icon slot="activator">
                                        <v-icon flat>more_vert</v-icon>
                                    </v-btn>
                                    <v-list>
                                        <v-list-tile :key="index" @click="option.click" avatar v-for="(option, index) in options">
                                            <v-list-tile-avatar>
                                                <v-icon :color="note.color.color">{{ option.icon }}</v-icon>
                                            </v-list-tile-avatar>
                                            <v-list-tile-title>{{ option.text }}</v-list-tile-title>
                                        </v-list-tile>
                                    </v-list>
                                </v-menu>
                            </v-toolbar>
                            <v-card-text>{{ note.content }}</v-card-text>
                        </v-card>
                        <edit :dialog.sync="dialogs.edit" :note.sync="note"></edit>
                        <delete :dialog.sync="dialogs.delete" :note="note"></delete>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-container fill-height fluid v-else>
                <v-layout column>
                    <v-flex class="text-xs-center" xs12>
                        <div class="display-2 grey--text text--lighten-1" style="font-family: 'Muli', sans-serif !important; padding-top: 10rem;">You haven't saved any notes yet</div>
                        <v-icon :style="{ fontSize: '5rem' }" class="my-5 grey--text text--lighten-1" large>inbox</v-icon>
                        <div class="title grey--text text--accent-1">Click the Add Note button to get started</div>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <create :dialog.sync="dialogs.create"></create>
        <v-tour :options="{ startTimeout: 2000, labels: { buttonStop: 'Dismiss' } }" :steps="steps" :style="{ zIndex: 10 }" name="getting-started"></v-tour>
    </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Create, Delete, Edit } from '@/components/Dialogs'
  import { IDialogs, INote } from '@/brandroom-notes'

  @Component({
    components: {
      Create,
      Delete,
      Edit
    }
  })
  export default class App extends Vue {
    protected search: string = ''

    protected steps: any[] = [
      {
        target: '#add-note',
        content: `<strong>Get Started</strong>!`
      }
    ]

    protected dialogs: IDialogs = {
      create: false,
      delete: false,
      edit: false
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

    public mounted (): void {
      this.$tours['getting-started'].start()
    }
  }
</script>
