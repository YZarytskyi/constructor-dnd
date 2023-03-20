import { FC, memo } from 'react'
import { getSvgSrc } from 'utils/utils'
import sprite from 'assets/icons.svg'

interface BlockProps {
  item: string
}

const Block: FC<BlockProps> = ({ item }) => {
  return (
    <>
      <svg className='h-[25px] w-[25px]'>
        <use
          href={`${sprite}#icon-${getSvgSrc(item)}`}
        />
      </svg>
      <p className='tracking-[0.02em] text-[12px]'>{item}</p>
    </>
  )
}

export default memo(Block)
