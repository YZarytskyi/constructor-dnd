import { Content, DndContainer, Header } from './components'

function App() {
  return (
    <>
      <Header />
      <main className='flex flex-col md:flex-row text-[18px] font-[500] border-t-[1px] border-[#E4E6F1]'>
        <DndContainer />
        <Content />
      </main>
    </>
  )
}

export default App
