import { memo, MouseEventHandler } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { useAppDispatch } from 'store/redux-hooks'
import { addComponent } from 'store/workSpace/workSpaceSlice'
import { makeNewComponent } from 'utils/utils'
import Block from './Block'

export const HEADLINE = 'Headline'
export const PARAGRAPH = 'Paragraph'
export const BUTTON = 'Button'
export const IMAGE = 'Image'

const Toolbar = () => {
  const dispatch = useAppDispatch()

  const onClickAddToWorkSpace: MouseEventHandler<HTMLLIElement> = (e) => {
    const type = e.currentTarget.dataset.type as string
    const newComponent = makeNewComponent(type)
    dispatch(addComponent(newComponent))
  }

  const types = [HEADLINE, PARAGRAPH, BUTTON, IMAGE]

  return (
    <Droppable droppableId='droppable2' isDropDisabled>
      {(provided) => (
        <ul
          ref={provided.innerRef}
          className='flex flex-wrap justify-center gap-[10px] content-start p-[30px] w-full md:w-[270px]'
        >
          {types.map((item, index) => (
            <Draggable draggableId={item} index={index} key={item}>
              {(provided, snapshot) => {
                return (
                  <>
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className='flex flex-col gap-[10px] items-center py-[15px] px-[10px] w-[100px] h-[83px] cursor-pointer bg-[#F6F9FE] rounded-[6px]'
                      onClick={onClickAddToWorkSpace}
                      data-type={item}
                    >
                      <Block item={item} />
                    </li>

                    {snapshot.isDragging && (
                      <li className='flex flex-col gap-[10px] items-center py-[15px] px-[10px] w-[100px] h-[83px] cursor-pointer bg-[#F6F9FE] rounded-[6px]'>
                        <Block item={item} />
                      </li>
                    )}
                  </>
                )
              }}
            </Draggable>
          ))}
        </ul>
      )}
    </Droppable>
  )
}

export default memo(Toolbar)
