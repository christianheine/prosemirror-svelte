import { EditorState, TextSelection, AllSelection } from "prosemirror-state"

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
 * Get the text content from an editor State
 * @param editorState {EditorState}
 * @return {string}
 */
export const getPlainText = editorState => {
  
  if (editorState.doc.childCount === 0) {
    return '';
  } else if (editorState.doc.childCount === 1) {
    return editorState.doc.textContent;
  } else {
    let paragraphs = [];
    for (let i = 0; i < editorState.doc.childCount; i++) {
      paragraphs.push(editorState.doc.child(i).textContent);
    }
    return paragraphs.join('\n');
  }
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

export const clear = (editorState) => {
  const selection = new AllSelection(editorState.doc);
  const transaction = editorState.tr;
  transaction.setSelection(selection);
  transaction.deleteSelection().scrollIntoView();
  return editorState.apply(transaction);
}

export const selectAll = (editorState) => {
  const selection = new AllSelection(editorState.doc);
  const transaction = editorState.tr;
  transaction.setSelection(selection);
  return editorState.apply(transaction);
}

export const deleteSelection = (editorState) => {
  if (editorState.selection.empty) return false;
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
