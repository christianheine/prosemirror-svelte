<script>
  import ProsemirrorEditor from '../../ProsemirrorEditor.svelte';
  import { createMultiLineEditor, getPlainText, clear, selectAll } from "../../helpers";

  const getEditorState = () => createMultiLineEditor('Go ahead. Edit me!');

  let editor;
  let editorState = getEditorState();

  $: textContent = editorState ? getPlainText(editorState) : ''

  const handleChange = event => {
    editorState = event.detail.editorState;
  }

  const focusEditor = () => {
    editor && editor.focus();
  }

  const clearEditor = event => {
    editorState = clear(editorState);
    focusEditor();
  }

  const resetEditor = event => {
    editorState = getEditorState();
    focusEditor();
  }

  const selectAllText = event => {
    editorState = selectAll(editorState);
    focusEditor();
  }

</script>

<main>

  <img src="https://svelte.dev/svelte-logo-horizontal.svg" alt="Svelte logo">
  <h2>Prosemirror editor</h2>

  <ProsemirrorEditor
    placeholder="Text goes here"
    {editorState}
    bind:editor={editor}
    on:change={handleChange}
    debounceChangeEventsInterval={0}/>

  <div class="controls">
    <button on:click={clearEditor}>Clear</button>
    <button on:click={resetEditor}>Reset text</button>
    <button on:click={selectAllText}>Select all</button>
    <button on:click={focusEditor}>Focus</button>
  </div>

  <div class="mirror">Current plain text content of the editor: "{textContent}"</div>

</main>

<style>

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
