<script>
  import { EditorState } from "prosemirror-state";
  import { schema } from "prosemirror-schema-basic";
  import { exampleSetup } from "prosemirror-example-setup";

  import ProsemirrorEditor from "../../ProsemirrorEditor.svelte";
  import { clear, fromJSON, toJSON } from "../../helpers";

  let showEditorState = false;
  let editor;

  const plugins = exampleSetup({schema, menuBar: false});

  const doc = schema.node("doc", null,
    [
      schema.node("heading", {level: 4}, [
        schema.text("I am Rich", null),
      ]),
      schema.node("paragraph", null, [
        schema.text("Hello there! I am Rich, a rich-text editor. Go ahead and edit me as well.", null),
      ]),
      schema.node("paragraph", null, [
        schema.text("I can make text ", null),
        schema.text("bold", [schema.mark("strong")]),
        schema.text(". Or you maybe prefer ", null),
        schema.text("italic", [schema.mark("em")]),
        schema.text("?", null)
      ]),
      schema.node("paragraph", null, [
        schema.text("My creator was too lazy to create buttons for changing the format. But you can also use your keyboard. E.g. ", null),
        schema.text("Ctrl/Cmd-B", [schema.mark("strong")]),
        schema.text(" will toggle text as bold.", null),
      ]),
    ]
  );

  const getEditorState = () => EditorState.create({schema, doc, plugins});

  let editorState = getEditorState()

  function handleChange(event) {
    editorState = event.detail.editorState;
  }

  const clearEditor = event => {
    editorState = clear(editorState);
  }

  const resetEditor = event => {
    editorState = getEditorState();
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
      editorState = fromJSON(JSON.parse(state), schema, plugins);
    } catch (err) {
      alert('Error loading your state:' + err.message);
    }

  }

</script>

<h3>Rich text editor example</h3>

<div class="controls">
  <button on:click={clearEditor}>Clear</button>
  <button on:click={resetEditor}>Reset text</button>

  <button on:click={handleSave}>Save to local storage</button>
  <button on:click={handleLoad}>Load from local storage</button>
</div>

<!-- In order to be notified about each selection change, we listen to on:transaction instead of on:change -->
<ProsemirrorEditor
  placeholder="Go ahead. Type and format"
  {editorState}
  on:transaction={handleChange}
/>

<div class="controls">
  <label>Show serialized editor state
    <input type="checkbox" bind:checked={showEditorState}/>
  </label>
</div>

{#if showEditorState}
  <pre>{JSON.stringify(toJSON(editorState), null, 2)}</pre>
{/if}


<style>
  div.controls {
    margin: .5em .5em;
  }

  pre {
    max-height: 20em;
    overflow-y: auto;
    overflow-x: hidden;
    border-bottom: 2px solid orangered;
    border-top: 2px solid orangered;
  }
</style>
