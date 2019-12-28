import { Schema } from 'prosemirror-model';

export const singleLineSchema = new Schema({
  nodes: {
    doc: {content: "text*"},
    text: {inline: true}
  }
});

export const multiLineSchema = new Schema({
  nodes: {
    doc: {
      content: "paragraph+"
    },
    paragraph: {
      content: "text*",
      parseDOM: [{tag: "p"}],
      toDOM: () => ["p", 0]
    },
    text: {
      inline: true
    }
  }
});
