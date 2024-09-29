import { faComment, faShare, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function BlogFooter({ blog, setOption, handleLikes }) {
  return (
    <div className='w-[97%] flex items-center justify-around'>
      <div className="w-1/3 py-[11px] rounded-sm text-white hover:bg-gray-600/15 dark:hover:bg-white/10 cursor-pointer hover:scale-105 flex gap-4 items-center justify-center font-semibold group" onClick={handleLikes} >
        <FontAwesomeIcon size='sm' icon={faThumbsUp} className='h-5 group-hover:drop-shadow-none drop-shadow-[0_0_1px_black] group-hover:text-blue-700/80'/>
        <div className="text-gray-500/90 group-hover:text-blue-700/90">Like</div>
      </div>
      <div className="w-1/3 py-[11px] rounded-sm text-white hover:bg-gray-600/15 dark:hover:bg-white/10 cursor-pointer hover:scale-105 flex gap-4 items-center justify-center font-semibold group" onClick={() => setOption(1)} >
        <FontAwesomeIcon size='sm' icon={faComment} className='h-5 group-hover:drop-shadow-none drop-shadow-[0_0_1px_black] group-hover:text-blue-700/80'/>
        <div className="text-gray-500/90 group-hover:text-blue-700/90">Comment</div>
      </div>
      <div className="w-1/3 py-[11px] rounded-sm text-white hover:bg-gray-600/15 dark:hover:bg-white/10 cursor-pointer hover:scale-105 flex gap-4 items-center justify-center font-semibold group" onClick={() => setOption(2)} >
        <FontAwesomeIcon size='sm' icon={faShare} className='h-5 group-hover:drop-shadow-none drop-shadow-[0_0_1px_black] group-hover:text-blue-700/80'/>
        <div className="text-gray-500/90 group-hover:text-blue-700/90">Share</div>
      </div>
      {/* <FontAwesomeIcon size='sm' icon={faThumbsDown} className='w-1/3 h-5 py-[11px] rounded-sm text-white hover:bg-gray-600/15 dark:hover:bg-white/10 cursor-pointer hover:scale-110 hover:drop-shadow-none drop-shadow-[0_0_1px_blue] hover:text-blue-700/80 rotate-y-180' /> */}
    </div>
  )
}