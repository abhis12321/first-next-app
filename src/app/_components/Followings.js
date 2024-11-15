import Link from 'next/link';
import Image from 'next/image';

export default function Followings({ followings, setConnections, handleUnFollow }) {
  return (
    <div className="fixed z-10 top-nav left-0 w-[100%] h-nav bg-gray-500/45 dark:bg-gray-900/90 flex items-center justify-center">
      <div className='w-[98%] mx-[2%] max-w-[400px] max-h-nav overflow-auto new-scroll flex gap-[1px] flex-col items-center justify-around bg-white dark:bg-white/10 p-2 rounded shadow-[0_0_3px_gray]'>
        <div className="flex items-center justify-between w-full px-2 pb-[6px]">
          <div className="">Followings : {followings.length}</div>
          <div className="text-xl text-red-800 dark:hover:text-white font-semibold px-[10px] py-[2px] cursor-pointer hover:ring-red-700 hover:bg-red-500/20 rounded-full ring-1 duration-500" onClick={e => setConnections(0)}>X</div>
        </div>
        {
          (followings && followings.length > 0) ?
            followings.map((user, index) =>
              <div className="flex justify-between items-center font-mono bg-gray-200 dark:bg-white/10 rounded w-full text-red-950 dark:text-white overflow-hidden" key={index}>
                <Link href={`/students/${user.followedToId._id}`} className="flex-1 font-bold py-[2px] px-3 flex items-center gap-4 hover:bg-gray-300 dark:hover:bg-white/30">
                  <Image src={user.followedToId.imgUrl} alt='' height={50} width={50} className='rounded-full h-10 w-10' />
                  <p className="">{user.followedToId.name}</p>
                </Link>
                {handleUnFollow && <button className="text-sm text-white p-3 bg-gray-900/70 hover:bg-gray-900" onClick={e => handleUnFollow(user._id)}>unfollow</button>}
              </div>
            )
            :
            <p className="text-gray-500">No followings till now</p>
        }
      </div>
    </div>
  )
}
