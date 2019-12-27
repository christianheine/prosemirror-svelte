<script>
  import { EditorState } from "prosemirror-state";
  import { schema } from "prosemirror-schema-basic";
  import { exampleSetup } from "prosemirror-example-setup";

  import ProsemirrorEditor from "../../ProsemirrorEditor.svelte";

  const plugins = exampleSetup({schema, menuBar: false});

  const doc = schema.node("doc", null,
    [
      schema.node("heading",{level: 4}, [
        schema.text("I am Rich", null),
      ]),
      schema.node("paragraph", null, [
        schema.text("Hello there! I am Rich, a rich-text editor. Go ahead and edit me as well.", null),
      ]),
      schema.node("paragraph", null, [
        schema.text("I can make text ",null),
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

  let editorState = EditorState.create({schema, doc, plugins});

  function handleChange(event) {
    editorState = event.detail.editorState;
  }

</script>

<h3>Rich text editor example</h3>
<ProsemirrorEditor
  placeholder="Go ahead. Type and format"
  {editorState}
  on:change={handleChange}
/>
