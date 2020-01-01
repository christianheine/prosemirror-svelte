<script>
  import PlainTextEditor from "./components/PlainTextEditor.svelte";

  import RichTextEditor_101 from "./components/RichTextEditor_101.svelte";
  import RichTextEditor_102 from "./components/RichTextEditor_102.svelte";
  import RichTextEditor_103 from "./components/RichTextEditor_103.svelte";
  import ProsemirrorLogo from "./components/ProsemirrorLogo.svelte"
  import SvelteLogo from "./components/SvelteLogo.svelte"

  let selectedExample = 'richtext_101';

  const examples = {
    "plaintext": {
      name: '#1: Plain text',
      title: "Plain text editor",
      subtitle: "If you don't need rich text. Dead simple to use.",
      component: PlainTextEditor
    },
    "richtext_101": {
      name: '#2: Rich text',
      title: 'Rich text 101',
      subtitle: "Relatively minimal editor setup, to get a hang of the basics.",
      component: RichTextEditor_101
    },
    "richtext_102": {
      name: '#3: Transactions',
      title: 'Rich text 102: Transactions',
      subtitle: "Listening to the on-transaction event instead of on-change, e.g. to track changes to the current selection. Useful to track the state of menu buttons.",
      component: RichTextEditor_102
    },
    "richtext_103": {
      name: "#4: Serialization",
      title: 'Rich text 103: JSON serialization',
      subtitle: "Serializing to and from JSON (and saving your state to local storage, just for fun).",
      component: RichTextEditor_103
    },
  }

</script>

<main>

  <div class="header">
    <h1>Prosemirror-Svelte</h1>

    <div class="subheader">
      <ProsemirrorLogo/>
      <span style="margin-left: .5em;">ProseMirror bindings for</span>
      <SvelteLogo/>
    </div>
  </div>

  <div class="select_example">

    <h2>{examples[selectedExample].title}</h2>

    <label>
      <select bind:value={selectedExample}>
          {#each Object.keys(examples) as example (example)}
            <option value={example}>{examples[example].name}</option>
          {/each}
      </select>
    </label>

  </div>

  <h4>{examples[selectedExample].subtitle}</h4>

  <svelte:component this={examples[selectedExample].component}/>

</main>

<style>

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 1em;
  }

  .subheader {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
  }

  .select_example {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  main {
    padding: 1em;
    max-width: 48em;
    margin: 0 auto;
  }

  img {
    height: 2em;
  }

  h4 {
    margin-bottom: 1em;
  }

  label {
    margin: 0 0 0 1em;
  }

</style>
