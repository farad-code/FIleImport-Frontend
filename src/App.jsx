
// import { Home } from "./component/Home/Home"
import { UploadFilePage } from "./component/page/File/UploadFilePage"
import { HomePage } from "./component/page/Home/HomePage"
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
 
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/file" element={<UploadFilePage />}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
