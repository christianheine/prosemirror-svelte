import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import { history, redo, undo } from "prosemirror-history";

/**
 * Core plugins which will be passed by default to each editor state instance
 * @type {*[]}
 */
export const corePlugins = [
  history(),
  keymap({"Mod-z": undo, "Mod-y": redo, "Mod-Shift-z": redo}),
  keymap(baseKeymap),
];
