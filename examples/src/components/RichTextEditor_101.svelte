<script>
  import { onMount } from "svelte";

  import ProsemirrorEditor from "../../../ProsemirrorEditor.svelte";
  import { createRichTextEditor, clear, toHTML, toPlainText } from "../../../state";

  const html = `
<h3>I am Rich</h3>
<p>Hello there! I am Rich, a rich-text editor. </p>
<p>Go ahead and edit me.</p>
<p>You can change the format using the keyboard. E.g.: </p>
<p><strong>Ctrl/Cmd-b</strong> will toggle text as <strong>bold</strong>.</p>
<p><strong>Ctrl/Cmd-i</strong> will toggle text as <em>italic</em>.</p>
<p><b>Ctrl-Shift-0</b> will set the block type to paragraph.</p>
<p><b>Ctrl-Shift-1,2,3...</b> will set the block type to heading 1,2,3...</p>`;

  let focusEditor;
  let editorState = createRichTextEditor(html);

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

  function showHtml(event) {
    alert(toHTML(editorState));
  }

  function showText(event) {
    alert(toPlainText(editorState));
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
  <button on:click={showHtml}>Show HTML</button>
  <button on:click={showText}>Show Text</button>
</div>
