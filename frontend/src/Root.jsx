import { Outlet, Link } from "react-router-dom"
import logo from './assets/23013696.jpg'

const Root = () => {
  return (
    <>
    <nav className="flex h-20 items-center border-b justify-between px-4 bg-white">
      <div className="flex items-center h-full">
        <Link to="/" className="h-full"><img src={logo} alt="Logo" className="h-full" /></Link>
        <h1 className="text-3xl">CopySigNo</h1>
      </div>
      <div className="flex justify-evenly w-1/2">
      <Link to="/extraction" className="p-2 bg-zinc-900 rounded-md text-white hover:bg-slate-700 transition-colors">Extract Signature</Link>
            <Link to="/matcher"className="p-2 bg-zinc-900 rounded-md text-white hover:bg-slate-700 transition-colors">Match Signatures</Link>
      </div>
    </nav>
    <div className="flex-grow mt-4">
      <Outlet />
    </div>
    </>
  )
}

export default Root