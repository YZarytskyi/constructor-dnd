import { FC } from 'react'
import { useAppSelector } from 'store/redux-hooks'
import { IMAGE } from '../Toolbar/Toolbar'

export const Content: FC = () => {
  const components = useAppSelector((state) => state.workSpace.components)

  return (
    <div className='w-full md:w-[632px] flex flex-col gap-[30px] py-[30px] px-[46px]'>
      {components.map((component) => {
        if (component.type === IMAGE) {
          return (
            <img
              key={component.id}
              src={component.src}
              className='rounded-[4px] h-[230px] object-cover'
              alt={component.alt}
            />
          )
        }
        if (component.type === 'Button') {
          return (
            <button
              key={component.id}
              className='block mx-auto bg-[#4368E0] text-[#F6F9FE] rounded-[4px] py-[10px] px-[30px] min-w-[145px] min-h-[40px] font-[500] leading-[1.45]'
            >
              {component.text}
            </button>
          )
        }
        if (component.type === 'Headline') {
          return (
            <h2 key={component.id} className='text-[22px] text-center font-[700]'>
              {component.text}
            </h2>
          )
        }
        return (
          <p key={component.id} className='text-[#97AACD] text-center'>
            {component.text}
          </p>
        )
      })}
    </div>
  )
}
