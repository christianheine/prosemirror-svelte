<script>
  import { onMount } from "svelte";

  import ProsemirrorEditor from "../../../ProsemirrorEditor.svelte";
  import { createRichTextEditor, toJSON, clear, toggleMark, setBlockType } from "../../../state";
  import { getCurrentMarks, getNodeTypeAtSelectionHead } from "../../../helpers";

  const html = "<h3>Welcome to Prosemirror Svelte</h3><p>Feel free to <b>edit me</b>!</p>";

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

  function handleToggleBold(event) {
    editorState = toggleMark(editorState, 'strong');
  }

  function handleSetBlockType(type, attrs = null) {
    return function (event) {
      editorState = setBlockType(editorState, type, attrs)
    }
  }

  function preventDefault(event) {
    event.preventDefault();
  }

  function getBlockType(node) {
    if(!node) return null

    if(node.attrs && typeof node.attrs.level !== 'undefined' &&  node.attrs.level !== null) {
        return `${node.type.name}-${node.attrs.level}`
    } else {
      return node.type.name
    }
  }

  $: currentMarks = editorState ? getCurrentMarks(editorState) : null
  $: activeMarks = currentMarks ? Object.keys(currentMarks.activeMarks) : []
  $: nodeAtSelectionHead = editorState ? getNodeTypeAtSelectionHead(editorState) : {}
  $: activeBlockType = getBlockType(nodeAtSelectionHead)
  $: isBold = currentMarks && currentMarks.activeMarks && currentMarks.activeMarks.strong

  onMount(() => focusEditor());

</script>

<ProsemirrorEditor
  {editorState}
  bind:focus={focusEditor}
  on:transaction={handleTransaction}
  placeholder="Go ahead and edit me!"/>

<div class="controls">
  <button on:click={clearEditor}>Clear</button>
  <button on:click={resetEditor}>Reset</button>

  <button style="margin-left: .5em" on:click={handleToggleBold} on:mousedown={preventDefault}>
      {#if isBold}Too bold for me{:else}Make it bold{/if}
  </button>

  <button style="margin-left: .5em"
          disabled={activeBlockType==='paragraph'}
          on:click={handleSetBlockType('paragraph')}
          on:mousedown={preventDefault}>p</button>

  <button disabled={activeBlockType==='heading-1'}
          on:click={handleSetBlockType('heading', {level:1})}
          on:mousedown={preventDefault}>h1</button>

  <button disabled={activeBlockType==='heading-2'}
          on:click={handleSetBlockType('heading', {level:2})}
          on:mousedown={preventDefault}>h2</button>

  <button disabled={activeBlockType==='heading-3'}
          on:click={handleSetBlockType('heading', {level:3})}
          on:mousedown={preventDefault}>h3</button>

</div>

<div class="controls">

  Additional information about the current editor instance:

  <ul>

    <!-- Show which marks are currently active, e.g. to highlight a menu button -->
    <li><b>Active marks: </b>{activeMarks && activeMarks.length ? activeMarks.toString() : 'none'}</li>

    <!-- Show which type of node is currently active at the selection head, e.g. to highlight a menu button menu -->
    <li>
      <b>Type of node at selection head:</b> {activeBlockType}
    </li>

  </ul>

  <p>
    <label>Show serialized editor state
      <input type="checkbox" bind:checked={showEditorState}/>
    </label>
  </p>

</div>

{#if showEditorState}
  <pre>{JSON.stringify(toJSON(editorState), null, 2)}</pre>
{/if}

