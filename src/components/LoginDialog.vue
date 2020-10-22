<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-text-field
                v-model="server"
                type="url"
                label="Server Url"
                required
                :error-messages="validationMsg($v.server)"
                @input="$v.server.$touch()"
                @blur="$v.server.$touch()"
                @keyup.enter="login"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="email"
                type="email"
                label="E-mail"
                required
                :error-messages="validationMsg($v.email)"
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                @keyup.enter="login"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="password"
                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                required
                @click:append="showPassword = !showPassword"
                :error-messages="validationMsg($v.password)"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                @keyup.enter="login"
              ></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            class="mr-4"
            @click="login"
            :disabled="$v.$invalid"
            :loading="loading"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import "reflect-metadata";
import { Vue, Component, Prop } from "vue-property-decorator";
import { required, email, url, or } from "vuelidate/lib/validators";
import { validationMessage } from "vuelidate-messages";
import AlertType, { eventsModule } from "@/store/events-module";
import AuthService from "@/services/AuthService";

const formMessages = {
  required: () => "Required",
  email: () => "Must be a valid email",
  isLocalhostOrUrl: () => "Must be a valid url",
};

const isLocalhost = (value: string) => value == "http://localhost:3000";

/**
 * Login dialog with an input form.
 * @displayName Login Dialog
 */
@Component
export default class LoginDialog extends Vue {
  showPassword = false;
  server = "";
  email = "";
  password = "";
  loading = false;

  validationMsg = validationMessage(formMessages, {
    dirty: true,
    first: 1,
  });

  validations() {
    let validations = {
      server: {
        required,
        isLocalhostOrUrl: or(isLocalhost, url),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    };
    return validations;
  }

  created() {
    this.$v.$reset();

    eventsModule.$watch(
      (module) => module.login.show,
      (show) => {
        if (show) {
          this.$v.$reset();
          this.loading = false;

          this.server = localStorage.server ? localStorage.server : "";
          this.email = localStorage.email;
          this.password = localStorage.password;
        }
      }
    );
  }

  login() {
    if (this.$v.$invalid) {
      this.$v.$touch();
      return;
    }

    this.loading = true;
    AuthService.login(this.server, this.email, this.password)
      .then(() => {
        if (eventsModule.login.callback) {
          eventsModule.login.callback();
        }
        this.show = false;
        localStorage.server = this.server;
        localStorage.email = this.email;
        localStorage.password = this.password;
      })
      .catch((error) => {
        if (error.statusText) {
          error = error.statusText;
        }
        this.loading = false;
        eventsModule.showAlert(AlertType.Error, error);
      });
  }

  get show(): boolean {
    return eventsModule.login.show;
  }

  set show(value: boolean) {
    if (!value) {
      eventsModule.hideLogin();
    }
  }
}
</script>

<docs>
## Examples

Template

```html
<login-dialog />
```

Show login dialog

```ts
import { eventsModule } from "@/store/events-module";
.
.
.
eventsModule.showLogin(() => {
  // Login success, do nomething here
});

```
</docs>
