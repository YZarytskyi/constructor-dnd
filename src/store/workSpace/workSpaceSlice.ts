import { Component } from 'types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMAGE } from 'components/Toolbar/Toolbar'

interface workSpaceInitialState {
  components: Component[]
}

const initialState: workSpaceInitialState = {
  components: [],
}

export const workSpaceSlice = createSlice({
  name: 'workSpace',
  initialState,
  reducers: {
    setComponents: (state, action: PayloadAction<Component[]>) => {
      state.components = action.payload
    },
    addComponent: (state, action: PayloadAction<Component>) => {
      state.components = [...state.components, action.payload]
    },
    removeComponent: (state, action: PayloadAction<string>) => {
      state.components = state.components.filter((component) => component.id !== action.payload)
    },
    setText: (state, { payload }: PayloadAction<{ id: string; text: string }>) => {
      const component = state.components.find((component) => component.id === payload.id)
      if (component?.type === IMAGE) {
        component.src = payload.text
        return
      }
      component!.text = payload.text
    },
    setAlt: (state, { payload }: PayloadAction<{ id: string; text: string }>) => {
      const component = state.components.find((component) => component.id === payload.id)
      component!.alt = payload.text
    },
  },
})

export const { setComponents, addComponent, removeComponent, setText, setAlt } =
  workSpaceSlice.actions

export const workSpaceReducer = workSpaceSlice.reducer
