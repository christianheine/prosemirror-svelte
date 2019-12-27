<script>
  import PlainTextEditor from "./PlainTextEditor.svelte"
  import RichTextEditor from "./RichTextEditor.svelte"

</script>

<main>

  <div class="header">
    <h2>Prosemirror editor</h2> <div class="header"><span>bindings for </span> <img src="https://svelte.dev/svelte-logo-horizontal.svg" alt="Svelte logo"></div>
  </div>

  <PlainTextEditor/>

  <RichTextEditor/>

</main>

<style>

  div.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  main {
    padding: 1em;
    max-width: 40em;
    margin: 0 auto;
  }

  img {
    height: 2em;
  }

  div.controls {
    margin-top: 1em;
  }

  div.mirror {
    margin-top: 1em;
    white-space: pre-line;
    overflow-wrap: break-spaces;
  }

  :global(.ui-editor) {
    box-sizing: border-box;
    background-color: transparent;
    color: var(--ui-color-baseline);
    padding: 1em;
    border: 1px solid #efefef;
    border-radius: .5em;
    display: inline-block;
    font: inherit;
    text-rendering: optimizeLegibility;
    white-space: pre-line;
    overflow-wrap: break-spaces;
    vertical-align: top;
    width: 100%;
    min-height: 1.25rem;
    outline: none;
  }
</style>
