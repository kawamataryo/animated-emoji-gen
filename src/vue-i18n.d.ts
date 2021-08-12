import en from "./locales/en.json";
type MessageSchema = typeof en; // define message schema with 'en'

declare module "vue-i18n" {
  export interface DefineLocaleMessage extends MessageSchema {} // eslint-disable-line @typescript-eslint/no-empty-interface
}
