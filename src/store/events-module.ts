import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";

enum AlertType {
  Error = "error",
  Warning = "warning",
  Info = "info",
  Success = "success",
}

@Module
class EventsModule extends VuexModule {
  // state
  login = {
    show: false,
    callback: Function as () => void,
  };
  alert = {
    show: false,
    type: AlertType.Info,
    message: "",
  };
  snackbar = {
    show: false,
    message: "",
  };

  // mutations
  @Mutation
  setLoginShow(show: boolean) {
    this.login.show = show;
  }
  @Mutation
  setLoginCallback(callback: () => void) {
    this.login.callback = callback;
  }
  @Mutation
  setAlertShow(show: boolean) {
    this.alert.show = show;
  }
  @Mutation
  setAlertType(type: AlertType) {
    this.alert.type = type;
  }
  @Mutation
  setAlertMessage(message: string) {
    this.alert.message = message;
  }
  @Mutation
  setSnackbarShow(show: boolean) {
    this.snackbar.show = show;
  }
  @Mutation
  setSnackbarMessage(message: string) {
    this.snackbar.message = message;
  }

  // actions
  @Action
  showLogin(callback: () => void) {
    this.setLoginCallback(callback);
    this.setLoginShow(true);
  }
  hideLogin() {
    this.setLoginCallback(Function as () => void);
    this.setLoginShow(false);
  }
  showAlert(type: AlertType, message: string) {
    this.setAlertType(type);
    this.setAlertMessage(message);
    this.setAlertShow(true);
  }
  hideAlert() {
    this.setAlertShow(false);
  }
  showSnackbar(message: string) {
    this.setSnackbarMessage(message);
    this.setSnackbarShow(true);
  }
  hideSnackbar() {
    this.setSnackbarShow(false);
  }
}

// register module (could be in any file)
import store from "@/store/index";
export const eventsModule = new EventsModule({ store, name: "events" });
export default AlertType;
