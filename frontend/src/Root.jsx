import { Outlet } from "react-router-dom"

const Root = () => {
  return (
    <>
    <div>NavBar</div>
    <Outlet />
    </>
  )
}

export default Root