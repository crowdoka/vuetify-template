import "material-design-icons-iconfont/dist/material-design-icons.css";
import colors from "vuetify/lib/util/colors";
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "md",
  },
  theme: {
    themes: {
      light: {
        primary: colors.blueGrey.base,
        secondary: colors.teal.base,
        accent: colors.lightBlue.base,
        error: colors.red.base,
        warning: colors.orange.base,
        info: colors.cyan.base,
        success: colors.green.base,
      },
      dark: {
        primary: colors.blueGrey.base,
        secondary: colors.teal.darken4,
        accent: colors.lightBlue.darken4,
        error: colors.red.darken2,
        warning: colors.orange.darken2,
        info: colors.cyan.darken2,
        success: colors.green.darken2,
      },
    },
  },
});
