import { EditorState, TextSelection } from "prosemirror-state";
import { DOMParser, DOMSerializer } from "prosemirror-model";
import { singleLineSchema, multiLineSchema, richTextSchema } from "./schemas";
import { corePlugins } from '../helpers/plugins';
import { richTextPlugins } from "../helpers"

/**
 * Create an empty editor state, for a single-line editor schema
 * @return {EditorState}
 */
export const createSingleLineEditor = (content = "", plugins = []) => {
  
  const doc = content ? singleLineSchema.node("doc", null, [
    singleLineSchema.text(content)
  ]) : undefined;
  
  const selection = doc ? TextSelection.atEnd(doc) : undefined;
  
  return EditorState.create({
    schema: singleLineSchema,
    doc,
    selection,
    plugins: [
      ...plugins,
      ...corePlugins
    ]
  });
}

/**
 * Create an empty editor state, for a multi-line editor schema
 * @param content {string}
 * @param plugins {array<Plugin>}
 * @return {EditorState}
 */
export const createMultiLineEditor = (content = "", plugins = []) => {
  let doc, selection;
  
  if (content) {
    const paragraphs = content.split('\n');
    doc = multiLineSchema.node("doc", null,
      paragraphs.map(paragraph => {
        return multiLineSchema.node("paragraph", null,
          paragraph ? [multiLineSchema.text(paragraph)] : null
        )
      })
    );
    selection = TextSelection.atEnd(doc);
  }
  
  return EditorState.create({
    schema: multiLineSchema,
    doc,
    selection,
    plugins: [
      ...corePlugins,
      ...plugins
    ]
  });
}

/**
 * Parses an html string to create a document from it
 * @param schema {Schema}
 * @param html {string}
 * @returns {Document}
 */
const createDocumentFromHtml = (schema, html) => {
  const parser = DOMParser.fromSchema(schema);
  const node = document.createElement('div');
  node.innerHTML = html;
  return parser.parse(node);
}

/**
 * Create an empty editor state with rich text editing capabilities
 * @param html {string}
 * @param plugins {array<Plugin>}
 * @return {EditorState}
 */
export const createRichTextEditor = (html = "", plugins = []) => {
  let doc, selection;
  
  if (html) {
    doc = createDocumentFromHtml(richTextSchema, html);
    selection = TextSelection.atEnd(doc);
  }
  
  return EditorState.create({
    schema: richTextSchema,
    doc,
    selection,
    plugins: [
      ...corePlugins,
      ...richTextPlugins,
      ...plugins
    ]
  });
}
