<script>
  import { onMount } from "svelte";

  import ProsemirrorEditor from "../../../ProsemirrorEditor.svelte";
  import { createMultiLineEditor, toPlainText } from "../../../state";
  import { clear, selectAll } from "../../../state/transform";

  const getEditorState = () => createMultiLineEditor("Go ahead. Edit me!");

  let editor, focusEditor;
  let editorState = getEditorState();

  const handleChange = event => {
    editorState = event.detail.editorState;
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

  $: textContent = editorState ? toPlainText(editorState) : '';

  onMount(() => focusEditor());

</script>

<ProsemirrorEditor
  {editorState}
  bind:editor={editor}
  bind:focus={focusEditor}
  on:change={handleChange}
  placeholder="Text goes here"
  debounceChangeEventsInterval={0}/>

<div class="controls">
  <button on:click={clearEditor}>Clear</button>
  <button on:click={resetEditor}>Reset</button>
  <button on:click={selectAllText}>Select all</button>
  <button on:click={focusEditor}>Focus</button>
</div>

<div class="mirror">Current plain text content of the editor: "{textContent}"</div>
