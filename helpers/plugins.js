import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import { history, redo, undo } from "prosemirror-history";
import { dropCursor } from "prosemirror-dropcursor"
import { gapCursor } from "prosemirror-gapcursor"

import { richTextKeyMapPlugin } from "./keymap";

export { dropCursor, gapCursor, richTextKeyMapPlugin };

/**
 * Core plugins which will be passed by default to each editor state instance
 * @type {*[]}
 */
export const corePlugins = [
  history(),
  keymap({"Mod-z": undo, "Mod-y": redo, "Mod-Shift-z": redo}),
  keymap(baseKeymap),
];

export const richTextPlugins = [
  dropCursor(),
  gapCursor(),
  richTextKeyMapPlugin
];
