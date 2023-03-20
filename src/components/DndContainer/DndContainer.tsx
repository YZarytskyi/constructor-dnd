import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { useAppDispatch, useAppSelector } from 'store/redux-hooks'
import { setComponents } from 'store/workSpace/workSpaceSlice'
import { makeNewComponentList } from 'utils/utils'
import Toolbar from '../Toolbar/Toolbar'
import { WorkSpace } from '../WorkSpace/WorkSpace'

export const DndContainer = () => {
  const dispatch = useAppDispatch()
  const components = useAppSelector((state) => state.workSpace.components)

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (
      !destination ||
      (destination.index === result.source.index && source.droppableId === destination.droppableId)
    ) {
      return
    }
    const newComponentList = makeNewComponentList(result, components)
    dispatch(setComponents(newComponentList))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Toolbar />
      <WorkSpace />
    </DragDropContext>
  )
}
