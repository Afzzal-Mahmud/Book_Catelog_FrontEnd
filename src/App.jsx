import { Provider } from "react-redux"
import MainLayout from "./Layout/MainLayout"
import { store } from "./Redux/store"

function App() {

  return (
    <>
    <Provider store={store}>
        <MainLayout/>
    </Provider>
    </>
  )
}

export default App
