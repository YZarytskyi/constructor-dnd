import { ChangeEventHandler, Dispatch, FC, memo, MouseEventHandler, SetStateAction } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { Component } from 'types'
import { useAppDispatch } from 'store/redux-hooks'
import { addComponent, removeComponent, setText, setAlt } from 'store/workSpace/workSpaceSlice'
import { IMAGE } from '../Toolbar/Toolbar'
import { getSvgSrc } from 'utils/utils'
import sprite from 'assets/icons.svg'

interface BlockProps {
  isActive: boolean
  component: Component
  index: number
  setActiveId: Dispatch<SetStateAction<string>>
  onClickArrowUp: (index: number) => void
  onClickArrowDown: (index: number) => void
}

const Block: FC<BlockProps> = ({
  isActive,
  component,
  index,
  setActiveId,
  onClickArrowUp,
  onClickArrowDown,
}) => {
  const { type, id } = component
  const dispatch = useAppDispatch()

  const onClickToggleActive: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement
    if ((target.tagName === 'INPUT' || target.closest('.settings')) && isActive) {
      return
    }
    setActiveId((prev) => (prev === id ? '' : id))
  }

  const onClickRemove: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(removeComponent(id))
  }

  const onClickCopy: MouseEventHandler<HTMLButtonElement> = () => {
    const newComponent = { ...component, id: nanoid() }
    dispatch(addComponent(newComponent))
  }

  const onChangeText: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setText({ id: component.id, text: e.target.value }))
  }

  const onChangeAlt: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setAlt({ id: component.id, text: e.target.value }))
  }

  return (
    <div
      className={`relative flex justify-center items-center min-h-[83px] py-[15px] px-[10.5px] rounded-[6px] cursor-pointer
        ${isActive ? 'bg-[#D9E7FF]' : 'bg-transparent'}`}
      onClick={onClickToggleActive}
    >
      <div className='w-full flex flex-col gap-[10px] items-center'>
        <svg className='h-[25px] w-[25px]'>
          <use href={`${sprite}#icon-${getSvgSrc(type)}`} />
        </svg>
        <p className='tracking-[0.02em] text-[12px]'>{type}</p>
        <div className={`workSpace__inputContainer  ${isActive ? '' : 'hidden'}`}>
          <input
            type='text'
            onChange={onChangeText}
            value={type === IMAGE ? component.src : component.text}
            placeholder={`${type === IMAGE ? 'Link' : 'Text'}`}
            className='workSpace__input'
          />
        </div>
        {typeof component.alt !== 'undefined' && (
          <div className={`workSpace__inputContainer  ${isActive ? '' : 'hidden'}`}>
            <input
              type='text'
              value={component.alt}
              onChange={onChangeAlt}
              placeholder='Alt'
              className='workSpace__input'
            />
          </div>
        )}
      </div>

      <div
        className={`absolute -top-[27px] right-[10px] flex gap-[10px] ${isActive ? '' : 'hidden'}`}
      >
        <div className='settings flex gap-[10px] p-[6px] bg-[#449CF4] rounded-t-[3px]'>
          <button onClick={() => onClickArrowDown(index)}>
            <svg className='h-[21px] w-[21px] rotate-[180deg]'>
              <use href={`${sprite}#icon-arrow-up`} />
            </svg>
          </button>
          <button onClick={() => onClickArrowUp(index)}>
            <svg className='h-[21px] w-[21px]'>
              <use href={`${sprite}#icon-arrow-up`} />
            </svg>
          </button>
        </div>

        <div className='settings flex items-center justify-center gap-[5px] bg-[#68C2E9] p-[3px] rounded-t-[3px]'>
          <button onClick={onClickCopy}>
            <svg className='h-[21px] w-[21px]'>
              <use href={`${sprite}#icon-copy`} />
            </svg>
          </button>
          <button onClick={onClickRemove}>
            <svg className='h-[21px] w-[21px]'>
              <use href={`${sprite}#icon-trash`} />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(Block)
