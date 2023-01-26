import { get } from 'svelte/store';
import { cloneDeep } from 'lodash';
import Sizeof from 'object-sizeof'

import {
  undoArr,
  redoArr,

  updateScreens,

  screens,
  currentScreenIndex,
} from '$lib/store.designer';

const addColorUndo = (detail: any) => {
  const undo = {};
  const { key, layer, color } = detail;

  if (key === 'panel') {

  }

  get(undoArr).push(undo);
}

export const addUndo = (type: any, detail: any) => {
  switch(type) {
    case 'color':
      addColorUndo(detail);
      break;
  }
}

export const addUndoPrevious = () => {
  const previous = {
    screen: cloneDeep(get(screens)),
    currentScreenIndex: get(currentScreenIndex)
  };
  get(redoArr).splice(0, get(redoArr).length);
  get(undoArr).push({ previous });
}

export const addUndoAfter = () => {
  const after = {
    screen: cloneDeep(get(screens)),
    currentScreenIndex: get(currentScreenIndex)
  };
  get(undoArr)[get(undoArr).length - 1].after = after;
}

export const undo = () => {
  const undos = get(undoArr);
  const redos = get(redoArr);
  // console.log('size', Sizeof(undos), Sizeof(redos))
  if (!undos.length) return;
  const undo = undos.pop();
  redos.push(undo);

  const cloned = cloneDeep(undo.previous.screen);
  for (const key in Object.keys(cloned)) {
    get(screens)[key] = cloned[key];
  }
  updateScreens();
}

export const redo = () => {
  const undos = get(undoArr);
  const redos = get(redoArr);
  if (!redos.length) return;
  const undo = redos.pop();
  undos.push(undo);

  const cloned = cloneDeep(undo.after.screen);
  for (const key in Object.keys(cloned)) {
    get(screens)[key] = cloned[key];
  }
  updateScreens();
}