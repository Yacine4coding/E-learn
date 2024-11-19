import { Input } from "@/components/ui/input"


const Search = () => {
  return (
    <div className="absolute top-[33em] font-gilroy w-full flex items-center justify-center">
      <div className="w-[50%] rounded-xl bg-white p-[2em] shadow-md">
        <h3 className='text-black font-extrabold text-xl mb-[2em]'>What do you want to learn?</h3>
        <div className="flex justify-around gap-10">
          <Input type="email" placeholder="Find courses..."  />
          <button className="hoverTransition py-2 px-6 text-xs font-bold border-2 border-green-500 bg-green-500 text-white hover:bg-transparent hover:border-green-500 hover:text-green-500  rounded-2xl">Search</button>
        </div>
      </div>
    </div>
  )
}

export default Search