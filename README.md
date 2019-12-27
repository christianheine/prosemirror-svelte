# Prosemirror Svelte: [Demo](http://prosemirror-svelte.surge.sh/)
 [Svelte](https://svelte.dev) bindings for the [Prosemirror editor](https://prosemirror.net/).

The key motivation of this component is to provide a gentle wrapper around prosemirror - while trying to embrace its 
core concept (such as the EditorState and Transactions). 
 
## Installation

```bash
yarn add prosemirror-svelte
```

or 
```bash
npm install --save prosemirror-svelte
```

## Essential usage

```html
<script>
  import ProsemirrorEditor from 'prosemirror-svelte'; // import the core component
  import { createSingleLineEditor, getPlainText } from 'prosemirror-svelte/helpers'; // import some helpers to work with prosemirror state 

  let editorState = createSingleLineEditor('Hello world!'); // create the initial editor state

  function handleChange(event) {
    editorState = event.detail.editorState; // handle the change event; event.detail.editorState contains the new state
  }

  $: console.log(getPlainText(editorState)); // log the text content of the editor state, just for fun

</script>

<ProsemirrorEditor placeholder="Go ahead and type something" {editorState} on:change={handleChange}/>
```

## License
[MIT](LICENSE)
