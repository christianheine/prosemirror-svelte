import { EditorState, TextSelection } from "prosemirror-state";
import { singleLineSchema, multiLineSchema } from "./schemas";
import { corePlugins } from './plugins';

/**
 * Create an empty editor state
 * @return {EditorState<any>}
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
 * Create an empty editor state
 * @param content {string}
 * @param plugins {array<Plugin>}
 * @return {EditorState<any>}
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
      ...plugins,
      ...corePlugins
    ]
  });
}

/**
 * Serialize an editor state to JSON
 * @param editorState {EditorState}
 * @returns Object
 */
export const toJSON = (editorState) => {
  return editorState ? editorState.toJSON() : null;
}

/**
 *
 * @param json JSON representation of the editor state
 * @param schema Related schema (defaults to multiline)
 * @param plugins Additional plugins
 * @returns {instance|EditorState}
 */
export const fromJSON = (json, schema = multiLineSchema, plugins = corePlugins) => {
  return EditorState.fromJSON({
    schema, plugins
  }, json);
}
