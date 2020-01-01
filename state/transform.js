import { EditorState, TextSelection, AllSelection } from "prosemirror-state";
import { MarkType } from "prosemirror-model";
import * as commands from "prosemirror-commands";
import { richTextSchema } from "./schemas"

/**
 * Basic implementation to split the editor state at the current selection
 * @param editorState
 * @return {EditorState}
 */
export const split = editorState => {
  const transaction = editorState.tr;
  
  transaction.split(editorState.selection.from);
  
  // if text is selected split before and after the text
  if (!editorState.selection.empty) {
    transaction.split(transaction.mapping.map(editorState.selection.to));
  }
  
  return editorState.apply(transaction);
}


/**
 * Apply a selection to the editor state
 * @param editorState {EditorState}
 * @param from {number}
 * @param to {number}
 */
export const selectText = (editorState, from, to) => {
  const selection = TextSelection.create(editorState.doc, from, to);
  const transaction = editorState.tr;
  transaction.setSelection(selection);
  return editorState.apply(transaction);
}

/**
 * Clear the given editor state (keeping the history)
 * @param editorState
 * @returns {EditorState}
 */
export const clear = (editorState) => {
  const selection = new AllSelection(editorState.doc);
  const transaction = editorState.tr;
  transaction.setSelection(selection);
  transaction.deleteSelection().scrollIntoView();
  return editorState.apply(transaction);
}

/**
 * Select all content of the given editor state
 * @param editorState
 * @returns {EditorState}
 */
export const selectAll = (editorState) => {
  const selection = new AllSelection(editorState.doc);
  const transaction = editorState.tr;
  transaction.setSelection(selection);
  return editorState.apply(transaction);
}

/**
 * Delete the current selection
 * @param editorState
 * @returns {EditorState}
 */
export const deleteSelection = (editorState) => {
  if (editorState.selection.empty) return editorState;
  const transaction = editorState.tr;
  transaction.deleteSelection().scrollIntoView();
  return editorState.apply(transaction);
}

/**
 * Replace text at the given positions with a new text
 * @param editorState {EditorState} The current editor state
 * @param from {number} Start position for replacing the text
 * @param to {number} End position for replacing the text
 * @param newText {string} New text to insert
 * @param setSelection {boolean} Update the selection to select the changed content
 * @return {EditorState}
 */
export const replaceTextAtPosition = (editorState, from, to, newText, setSelection = false) => {
  const transaction = editorState.tr;
  
  transaction.replaceWith(from, to, editorState.schema.text(newText));
  
  if (setSelection) {
    const selection = TextSelection.create(transaction.doc, from, from + newText.length);
    transaction.setSelection(selection);
  }
  
  return editorState.apply(transaction);
}

/**
 * Toggle the Mark for the given editor state
 * @param editorState {EditorState}
 * @param type {MarkType}
 * @param attrs {Object}
 * @returns {EditorState}
 */
export const toggleMark = (editorState, type, attrs) => {
  let newEditorState;
  
  const dispatch = tr => newEditorState = editorState.apply(tr);

  if (commands.toggleMark(type, attrs)(editorState, dispatch)) return newEditorState;
  else return editorState;
}

/**
 * Toggle the bold Mark for the given editor state
 * @param editorState {EditorState}
 * @returns {EditorState}
 */
export const toggleBold = (editorState) => {
  return toggleMark(editorState, richTextSchema.marks.strong, null)
}
