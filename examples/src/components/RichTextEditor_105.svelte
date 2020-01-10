<script>
  import { onMount } from "svelte";

  import ProsemirrorEditor from "../../../ProsemirrorEditor.svelte";
  import { createRichTextEditor, clear, insertImage } from "../../../state";

  const html = "<h3>Welcome to Prosemirror Svelte</h3><p>Feel free to <b>edit me</b>!</p>";

  let src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60';

  let focusEditor;
  let showEditorState = true;
  let editorState = createRichTextEditor(html);

  const plugins = [];

  function handleTransaction(event) {
    editorState = event.detail.editorState;
  }

  function clearEditor(event) {
    editorState = clear(editorState);
    focusEditor();
  }

  function resetEditor(event) {
    editorState = createRichTextEditor(html);
    focusEditor();
  }

  function handleInsertImage(event) {
    editorState = insertImage(editorState, {src});
  }

  function preventDefault(event) {
    event.preventDefault();
  }

  onMount(() => focusEditor());

</script>

<ProsemirrorEditor
  {editorState}
  bind:focus={focusEditor}
  on:transaction={handleTransaction}
  placeholder="Go ahead and edit me!"/>

<div class="controls" style="display: flex">
  <button on:click={clearEditor}>Clear</button>
  <button on:click={resetEditor}>Reset</button>

  <input type="text" bind:value={src} style="flex: 1">

  <button style="margin-left: .5em" on:click={handleInsertImage} on:mousedown={preventDefault}>Insert image</button>

</div>

<style>
  button, input {
    margin: .5em;
  }

  input {
    outline: none;
  }

  :global(.ui-editor img) {
    max-width: 300px;
  }
</style>
