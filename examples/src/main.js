import App from './App.svelte';

const root = document.querySelector("#root");

const app = new App({
  target: root,
  props: {}
});

export default app;
