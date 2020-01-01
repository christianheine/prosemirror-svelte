# Prosemirror Svelte
 [Svelte](https://svelte.dev) bindings for the [Prosemirror editor](https://prosemirror.net/).

The key motivation of this component is to provide a gentle wrapper around prosemirror - while trying to embrace its 
core concept (such as the EditorState and Transactions). 

If you only need a basic editor you can use the included helpers to create your editor state (see below). They will get you started with a working single-line or multi-line editor.
If you are in need of rich-text editing, I strongly recommend to implement you custom schema. You may 
also use the schema provided by prosemirror-basic-schema, of course. In case you are just getting started with Prosemirror and want to see a working implementation, have a look at the [examples](examples). 

Note: Before the release of version 1.0, the API (especially of the helpers) will be undergoing changes. The same applies to this documentation. 

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
   // import the core component
  import ProsemirrorEditor from 'prosemirror-svelte';

  // import helpers to work with prosemirror state
  import { createSingleLineEditor, toPlainText } from 'prosemirror-svelte/state';  

  // create the initial editor state
  let editorState = createSingleLineEditor('Hello world!'); 

  function handleChange(event) {
    // get the new editor state from event.detail
    editorState = event.detail.editorState;
  }

  // log the text content of the editor state, just for fun
  $: console.log(toPlainText(editorState)); 

</script>

<ProsemirrorEditor 
  placeholder="Go ahead and type something" 
  {editorState} 
  on:change={handleChange}
/>
```

## Props
- **editorState** [[EditorState](https://prosemirror.net/docs/ref/#state.EditorState)]: 
The state of the editor. If no state is provided, the component will create a very basic single-line editor state with some core plugins (e.g. key bindings)   
- **placeholder** [String]: Placeholder text which is shown if the editor is empty
- **className** [String]: CSS class to be used for the container div on which the Prosemirror editor will be mounted. Defaults to "ui-editor".
- **debounceChangeEventsInterval** [Number]: Advanced setting to set how often change events are emitted. In milliseconds. Defaults to 50(ms).

## Props intended to be bound
The following two props are intended to be used with bind:editor={yourVariable}. Don't change them in your code.
- **view** [[EditorView](https://prosemirror.net/docs/ref/#view.EditorView)]: reference to the Prosemirror editor view
- **editor** [HTMLDivElement]: Reference to the DOM element on which the prosemirror editor is mounted

## Instance functions
- **focus**: Focus the editor. It's recommended to use this function instead of focusing the DOM node directly (to ensure the proper selection is applied to your editor)
- **blur**: Blur the editor

## Events
- **change**: Emitted when the content of the editor has changed (not when the selection changes). Also, by default, it is debounced by 50ms. This behavior can be altered with the "debounceChangeEventsInterval" prop.
The new state of the editor can be found in event.detail.editorState
- **transaction**: Emitted whenever a transaction is executed on the editor view. This includes changes to the selection. event.detail contains four fields: 
    - view [EditorView]: Reference to the editor view
    - editorState [EditorState]: Reference to the new editor state
    - isDirty [boolean]: Whether the component has changes which need to be dispatched via change event
    - contentHasChanged[boolean]: Whether the document content has changed (via !editorState.doc.eq(view.state.doc))
- **focus**: (Forwarded) focus event
- **blur**: (Forwarded) blur event
- **keydown**: (Forwarded) keydown event

To support the plugin system provided by Prosemirror, the component also listens for events of type "custom". If such an event is submitted by a plugin, the component will look for a "type" attribute on the event.detail and then dispatch a new event of that type (essentially forwarding the event from native DOM into the Svelte world).  

## Example
The example app which is included in the repository can be also be found here: http://prosemirror-svelte.surge.sh  

## State helper methods 
```JS
  import { ... } from 'prosemirror-svelte/state';
```
### Creating and serializing editor state
- **createSingleLineEditor** [(content = "", plugins = []) -> EditorState]: Creates an editor state with a single-line schema and optional text content
- **createMultiLineEditor** [(content = "", plugins = []) -> EditorState]: Creates an editor state with a multi-line schema and optional text content
- **createRichTextEditor** [(html = "", plugins = []) -> EditorState]: Creates an editor state with a rich text schema which can be initialized with HTML content
- **toHTML** [(EditorState)->String]: Returns the HTML representation of the given editor state 
- **toPlainText** [(EditorState)->String]: Returns the plain text representation of the given editor state 
- **toJSON** [(EditorState)->Object]: Serialize the editor state as JSON
- **fromJSON** [(json, schema = multiLineSchema, plugins = corePlugins)]: Create editor state from a JSON object 

### Modifying editor state
- **split** [(EditorState) -> EditorState]: splits the text at the current selection. If the selection is not collapsed, it will be split around it.
- **selectText&& [(editorState: EditorState, from: number, to: number) => EditorState]: returns a new editor state with the the selection around from and to.
- **clear** [(EditorState) -> EditorState]: returns a new editor state where all content was removed.
- **selectAll** [(EditorState) -> EditorState]: returns a new editor state with all text selected.
- **deleteSelection** [(EditorState) -> EditorState]: returns a new editor state where the selection was deleted.
- **replaceTextAtPosition** [(editorState, from, to, newText, setSelection = false) -> EditorState]: returns a new editor state where the text between "from" and "to" was replaced by a new one, optionally setting a selection for that inserted text.
- **toggleMark** [(EditorState, MarkType, attrs) -> EditorState]: Toggle the mark of type MarkType for the current selection (or sets the stored marks if the selection is collapsed)
- **toggleBold** [(EditorState) -> EditorState]: Specialized version of toggleMark to toggle the "strong" mark (more to come)

## General helpers
```JS
  import { ... } from 'prosemirror-svelte/helpers';
```

### Getting meta information about the current state
- **getNodeTypeAtSelectionHead** [(editorState: EditorState)->{type:NodeType, attrs: Object}]: Returns the type of node at the head of the current selection, e.g. for activating menu buttons
- **getCurrentMarks** [(editorState: EditorState)-> {{activeMarks: Object<string,Mark>, marksInSelection: Object<string,Mark>, marksAtHead: Object<string,Mark>, storedMarks: Object}}]: Returns information about the marks inside the current selection (i.e. whether the text is marked as bold or italic). *Active marks* is what you might want to use for setting menu buttons active/inactive. Have a look at the examples to guide you in the right direction.

### Plugins
- **corePlugins**
- **richTextKeyMapPlugin**

## License
[MIT](LICENSE)
