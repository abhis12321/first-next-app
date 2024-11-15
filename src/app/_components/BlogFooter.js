import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faShare, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

export default function BlogFooter({ blog , option , setOption , handleLikes }) {
  return (
    <div className='w-[100%] relative flex gap-[1px] items-center justify-around'>
      <button className="absolute top-[-1rem] left-0 font-semibold text-xs text-green-700 hover:underline hover:text-green-600 active:text-violet-700" onClick={() => setOption(3)}>see all-likes</button>
      <div className={`w-1/3 py-[11px] rounded-sm hover:bg-gray-600/15 dark:hover:bg-white/10 cursor-pointer flex gap-4 items-center justify-center font-semibold group ${blog.liked ? "text-blue-600" : "text-white"}  active:text-violet-600`} onClick={handleLikes} >
        <FontAwesomeIcon size='sm' icon={faThumbsUp} className={`h-5 ${!blog.liked && "drop-shadow-[0_0_1px_black]"}`}/>
        <div className={`${!blog.liked && "text-gray-500/90"}`}>Like</div>
      </div>
      <div className={`w-1/3 py-[11px] rounded-sm text-white hover:bg-gray-600/15 dark:hover:bg-white/10 cursor-pointer flex gap-4 items-center justify-center font-semibold group ${option === 1 && "bg-gray-600/20 dark:bg-white/10"}`}onClick={() => setOption(prev => prev === 1 ? 0 : 1)} >
        <FontAwesomeIcon size='sm' icon={faComment} className={`h-5 group-hover:drop-shadow-none drop-shadow-[0_0_1px_black] group-hover:text-blue-700/80 ${option === 1 && "text-sky-700 drop-shadow-none"}`}/>
        <div className={`text-gray-500/90 group-hover:text-blue-700/90 ${option === 1 && "text-sky-700 drop-shadow-none"}`}>Comment</div>
      </div>
      <div className="w-1/3 py-[11px] rounded-sm text-white hover:bg-gray-600/15 dark:hover:bg-white/10 cursor-pointer flex gap-4 items-center justify-center font-semibold group" onClick={() => setOption(2)} >
        <FontAwesomeIcon size='sm' icon={faShare} className='h-5 group-hover:drop-shadow-none drop-shadow-[0_0_1px_black] group-hover:text-blue-700/80'/>
        <div className="text-gray-500/90 group-hover:text-blue-700/90">Share</div>
      </div>
    </div>
  )
}
