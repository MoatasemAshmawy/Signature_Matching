import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center" id="hero">
        <h1 className="text-4xl">Welcome to CopySigNo</h1>
        <h2 className="text-2xl text-wrap">Where you will find everything you need to do regarding a signature</h2>
        <div className="flex gap-5 mt-5">
            <Link to="/extraction" className="p-2 bg-zinc-900 rounded-md text-white hover:bg-slate-700 transition-colors">Extract Signature</Link>
            <Link to="/matcher"className="p-2 bg-zinc-900 rounded-md text-white hover:bg-slate-700 transition-colors">Match Signatures</Link>
        </div>
    </div>
  )
}

export default Hero