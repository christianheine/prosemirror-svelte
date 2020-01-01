<script>
  import { onMount } from "svelte";

  import ProsemirrorEditor from "../../../ProsemirrorEditor.svelte";
  import { createRichTextEditor, fromJSON, toJSON, clear, richTextSchema } from "../../../state";
  import { richTextPlugins } from "../../../helpers"

  const html = "<h3>Welcome to Prosemirror Svelte</h3><p>Feel free to <b>edit me</b>!</p>";

  let focusEditor;
  let showEditorState = false;
  let editorState = createRichTextEditor(html);

  const plugins = [];

  function handleChange(event) {
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

  function handleSave() {
    try {
      localStorage.setItem('editor', JSON.stringify(toJSON(editorState)));
      alert('Saved!')
    } catch (err) {
      alert('Error saving your state:' + err.message);
    }
  }

  function handleLoad() {
    const state = localStorage.getItem('editor');

    if (!state) {
      alert('Nothing saved so far');
      return
    }

    try {
      editorState = fromJSON(JSON.parse(state), richTextSchema, richTextPlugins);
      focusEditor();
    } catch (err) {
      alert('Error loading your state:' + err.message);
    }
  }

  onMount(() => focusEditor());

</script>

<ProsemirrorEditor
  {editorState}
  bind:focus={focusEditor}
  on:change={handleChange}
  placeholder="Go ahead and edit me!"/>

<div class="controls">
  <button on:click={clearEditor}>Clear</button>
  <button on:click={resetEditor}>Reset</button>
  <button on:click={handleSave}>Save to local storage</button>
  <button on:click={handleLoad}>Load from local storage</button>
</div>
