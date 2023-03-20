import { DropResult } from 'react-beautiful-dnd'
import { nanoid } from 'nanoid'
import { Component } from 'types'
import { IMAGE } from 'components/Toolbar/Toolbar'
import defaultImg from 'assets/defaultImg.jpg'

export const reorder = (list: Component[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const makeNewComponent = (draggableId: string) => {
  let newComponent
  if (draggableId === IMAGE) {
    newComponent = {
      id: nanoid(),
      type: draggableId,
      src: defaultImg,
      alt: 'Hand pointing on the laptop screen',
    }
  } else {
    newComponent = {
      id: nanoid(),
      type: draggableId,
      text: 'Text',
    }
  }

  return newComponent
}

export const makeNewComponentList = (result: DropResult, components: Component[]) => {
  const { source, destination } = result

  let newComponentList
  if (source.droppableId !== destination!.droppableId) {
    newComponentList = [...components]
    const newComponent = makeNewComponent(result.draggableId)
    newComponentList.splice(destination!.index, 0, newComponent)
  } else {
    newComponentList = reorder(components, source.index, destination!.index)
  }

  return newComponentList
}

export const getSvgSrc = (type: string) =>
  type === 'Button' || type === IMAGE ? 'multimedia' : type
