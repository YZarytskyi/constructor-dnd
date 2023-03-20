import { FC, useCallback, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'store/redux-hooks'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { setComponents } from 'store/workSpace/workSpaceSlice'
import { reorder } from 'utils/utils'
import Block from './Block'

export const WorkSpace: FC = () => {
  const dispatch = useAppDispatch()
  const components = useAppSelector((state) => state.workSpace.components)
  const [activeId, setActiveId] = useState<string>('')

  const onClickArrowUp = useCallback(
    (index: number) => {
      if (!index) {
        return
      }
      const newComponentList = reorder(components, index, index - 1)
      dispatch(setComponents(newComponentList))
    },
    [components],
  )

  const onClickArrowDown = useCallback(
    (index: number) => {
      if (index === components.length - 1) {
        return
      }
      const newComponentList = reorder(components, index, index + 1)
      dispatch(setComponents(newComponentList))
    },
    [components],
  )

  return (
    <Droppable droppableId='droppable'>
      {(provided) => (
        <ul
          ref={provided.innerRef}
          {...provided.droppableProps}
          className='bg-[#F5F5FC] border-l-[1px] border-[#E4E6F1] w-full md:w-[539px] py-[25px] px-[30px]'
        >
          {components.length ? (
            components.map((component, index) => (
              <Draggable draggableId={component.id} index={index} key={component.id}>
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      userSelect: 'none',
                      borderRadius: '6px',
                      marginBottom: '15px',
                      background: snapshot.isDragging ? '#D9E7FF' : '#ffffff',
                      ...provided.draggableProps.style,
                    }}
                  >
                    <Block
                      isActive={activeId === component.id}
                      setActiveId={setActiveId}
                      component={component}
                      index={index}
                      onClickArrowUp={onClickArrowUp}
                      onClickArrowDown={onClickArrowDown}
                    />
                  </li>
                )}
              </Draggable>
            ))
          ) : (
            <li>
              <p className='text-center mt-5'>Drag a component here</p>
            </li>
          )}
        </ul>
      )}
    </Droppable>
  )
}
