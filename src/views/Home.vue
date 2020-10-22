<template>
  <v-app>
    <v-app-bar app color="primary" flat>
      <div class="d-flex align-center">
        <v-toolbar-title> Vuetify Template </v-toolbar-title>
      </div>
    </v-app-bar>

    <v-main>
      <v-progress-linear :active="showProgress" indeterminate />
      <v-snackbar ref="snackbar" v-model="snackbarShow" :timeout="5000" top>
        {{ snackbarMessage }}

        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbarShow = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <v-bottom-sheet v-model="alertShow" hide-overlay>
        <v-alert v-model="alertShow" :type="alertType" class="d-flex">
          {{ alertMessage }}
        </v-alert>
      </v-bottom-sheet>
      <login-dialog />
    </v-main>
    <v-footer>
      <v-switch
        v-model="$vuetify.theme.dark"
        @change="changeTheme"
        inset
        append-icon="invert_colors"
      />
      <v-spacer />
      <bruit-io :config.prop="bruitConfig"
        ><v-icon>bug_report</v-icon></bruit-io
      >
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import "reflect-metadata";
import { Vue, Component, Prop, Watch, Ref } from "vue-property-decorator";
import AlertType, { eventsModule } from "@/store/events-module";
import LoginDialog from "@/components/LoginDialog.vue";

@Component({
  components: {
    LoginDialog,
  },
})
export default class Home extends Vue {
  @Ref() readonly snackbar!: any;

  showProgress = false;
  bruitConfig = {
    apiKey: process.env.VUE_APP_BRUIT_API_KEY,
    labels: { title: "Send us a feedback" },
    form: [
      { label: "First question", type: "text", required: true, id: "title" },
      {
        id: "agreement",
        type: "checkbox",
        label:
          "I agree to send technical information in addition to my answers",
        value: true,
      },
    ],
  };

  created() {
    this.$vuetify.theme.dark = localStorage.theme
      ? JSON.parse(localStorage.theme)
      : false;

    eventsModule.$watch(
      (module) => module.snackbar.message,
      (message) => {
        this.snackbar.setTimeout();
      }
    );
  }

  changeTheme() {
    localStorage.theme = this.$vuetify.theme.dark;
  }

  get alertShow(): boolean {
    return eventsModule.alert.show;
  }
  set alertShow(value: boolean) {
    if (!value) {
      eventsModule.hideAlert();
    }
  }

  get alertType(): string {
    return eventsModule.alert.type;
  }

  get alertMessage(): string {
    return eventsModule.alert.message;
  }

  get snackbarShow(): boolean {
    return eventsModule.snackbar.show;
  }
  set snackbarShow(value: boolean) {
    if (!value) {
      eventsModule.hideSnackbar();
    }
  }

  get snackbarMessage(): string {
    return eventsModule.snackbar.message;
  }
}
</script>

<style lang="scss" scoped>
.v-alert {
  margin-bottom: 0;
}
</style>
