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

## Props
- editorState [[EditorState](https://prosemirror.net/docs/ref/#state.EditorState)]: 
The state of the editor. If no state is provided, the component will create a very basic single-line editor state with some core plugins (e.g. key bindings)   
- placeholder [String]: Placeholder text which is shown if the editor is empty
- className [String]: CSS class to be used for the container div on which the Prosemirror editor will be mounted. Defaults to "ui-editor".
- debounceChangeEventsInterval [Number]: Advanced setting to set how often change events are emitted. In milliseconds. Defaults to 50(ms).

## Props intended to be bound
The following two props are intended to be used with bind:editor={yourVariable}. Don't change them in your code.
- view [[EditorView](https://prosemirror.net/docs/ref/#view.EditorView)]: reference to the Prosemirror editor view
- editor [HTMLDivElement]: Reference to the DOM element on which the prosemirror editor is mounted

## Instance functions
- focus: Focus the editor
- blur: Blur the editor

## Events
- change: Emitted when the content of the editor has changed (not when the selection changes). Also, by default, it is debounced by 50ms. This behavior can be altered with the "debounceChangeEventsInterval" prop.
The new state of the editor can be found in event.detail.editorState
- transaction: Emitted whenever a transaction is executed on the editor view. This includes changes to the selection. event.detail contains four fields: 
    - view [EditorView]: Reference to the editor view
    - editorState [EditorState]: Reference to the new editor state
    - isDirty [boolean]: Whether the component has changes which need to be dispatched via change event
    - contentHasChanged[boolean]: Whether the document content has changed (via !editorState.doc.eq(view.state.doc))
- focus: (Forwarded) focus event
- blur: (Forwarded) blur event
- keydown: (Forwarded) keydown event

To support the plugin system provided by Prosemirror, the component also listens for events of type "custom". If such an event is submitted by a plugin, the component will look for a "type" attribute on the event.detail and then dispatch a new event of that type (essentially forwarding the event from native DOM into the Svelte world).  

## Example
The example app which is included in the repository can be also be found here: http://prosemirror-svelte.surge.sh  

## License
[MIT](LICENSE)
