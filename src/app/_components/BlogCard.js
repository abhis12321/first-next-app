import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import CopyLink from './CopyLink';
import LoginForm from './LoginForm';
import BlogFooter from './BlogFooter';
import { useAuth } from './AuthProvider';
import BlogComments from './BlogComments';
import BlogEditForm from './BlogEditForm';
import BlogLikesPage from './BlogLikesPage';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function BlogCard({ blog, loadBlogs, handleBlogDelete, handleBlogEdit }) {
  const { user } = useAuth();
  const [option, setOption] = useState();
  const [comments, setComments] = useState([]);
  const [allLikes, setAllLikes] = useState([]);

  const handleLikes = () => {
    if (!user) {
      setOption(4);
    } else {
      const payload = { blogId: blog?._id, userId: user?._id }
      axios.post("/api/blogs/likes", payload)
        .then(() => loadBlogs())
        .catch(error => console.error(error))
        .finally(() => loadLikes());
    }
  }

  const loadLikes = () => {
    axios.get(`/api/blogs/likes/${blog?._id}`)
      .then(response => response.data)
      .then(data => data.AllLikes)
      .then(AllLikes => setAllLikes(AllLikes))
      .catch(error => console.error(error.message))
  }

  const loadComments = () => {
    axios.get(`/api/blogs/comments/${blog?._id}`)
      .then(response => response.data)
      .then(data => data.comments)
      .then(comments => setComments(comments))
      .catch(error => console.error(error.message))
  }

  useEffect(() => {
    loadLikes();
    loadComments();
  }, [blog?._id]);

  const handleHamburgerClick = (e) => {
    e.preventDefault();
    setOption(prev => prev == 10 ? 0 : 10)
  }

  let blurtimeOut;
  const handleHamburgerOnBlur = (e) => {
    if (option === 10) {
      blurtimeOut = setTimeout(() => setOption(0), 200);
    }
  }

  const handleBlogEditOption = (e) => {
    clearTimeout(blurtimeOut);
    e.stopPropagation();
    setOption(11);
  }

  const handleBlogDeleteOption = (e) => {
    clearTimeout(blurtimeOut);
    handleBlogDelete(e);
    setOption(0);
  }

  return (
    <div className='relative w-[98%] max-w-[700px] min-h-20 min-w-20 bg-white dark:bg-gray-800/95 shadow-[0_0_2px_gray] hover:shadow-[0_0_5px_gray] rounded-lg py-1 px-3 xs:px-4 md:px-5 flex flex-col justify-between items-center pb-[2.1px]' id={blog?._id}>
      <div className="w-full flex justify-between items-center">
        <Link href={`/students/${blog.writerId._id}`} className="flex-1 min-h-16 p-2 flex gap-5 items-center group mb-2 overflow-x-hidden">
          <Image src={blog.writerId.imgUrl || "/img/profileImg.jpg"} alt='' height={50} width={50} className='h-12 aspect-square rounded-full shadow-[0_0_1.5px_gray]' />
          <div className="flex flex-col justify-around">
            <div className="text-gray-700/90 dark:text-blue-200 group-hover:text-blue-700/80 flex items-center gap-4 overflow-hidden">
              <div className="font-bold group-hover:underline text-nowrap">{blog.writerId.name} <span className='opacity-50'>{blog.writerId._id == user?._id && "(You)"}</span></div>
              <div className="text-gray-500/85 text-xs text-nowrap overflow-x-hidden">@{blog.writerId.university}</div>
            </div>
            <div className="text-red-950/60 dark:text-gray-500/85 text-xs">{`${(new Date(blog.time)).toDateString()} ${(new Date(blog.time)).toLocaleTimeString()}`}</div>
          </div>
        </Link>
        {
          handleBlogDelete && handleBlogEdit &&
          <div className="relative cursor-pointer">
            <button className="w-fit" onClick={handleHamburgerClick} onBlur={handleHamburgerOnBlur}>
              <FontAwesomeIcon size='sm' icon={faEllipsisVertical} className={`h-5 px-3 hover:text-blue-600 ${option === 10 && "rotate-90"} duration-300`} />
            </button>
            <div className={`absolute top-[24px] right-[1px] flex flex-col gap-[6px] items-start text-xs font-bold ${option !== 10 && "scale-0"} duration-300`}>
              <button className='text-green-700 hover:bg-green-700/20 py-[2px] px-1 rounded-lg' onClick={handleBlogEditOption}>
                <FontAwesomeIcon size='sm' icon={faPenToSquare} className='h-[18px]' />
              </button>
              <button className='text-red-700 hover:bg-red-700/20 py-[2px] px-1 rounded-lg' onClick={handleBlogDeleteOption}>
                <FontAwesomeIcon size='sm' icon={faTrashCan} className='h-[18px]' />
              </button>
            </div>
          </div>
        }
      </div>


      <div className="w-full font-mono font-extralight text-gray-700 dark:text-gray-300/85 whitespace-pre-wrap text-balance overflow-auto">
        {blog.blog}
      </div>

      <div className="w-full px-[10%] flex items-center justify-between border-b-[1.5px] border-gray-400/80 dark:border-gray-700 my-[2px]">
        <button className="font-semibold text-xs text-green-700 hover:underline hover:text-green-600 active:text-violet-700" onClick={() => setOption(3)}>Likes : {allLikes?.length}</button>
        <button className="font-semibold text-xs text-green-700 hover:underline hover:text-green-600 active:text-violet-700" onClick={() => setOption(prev => prev === 1 ? 0 : 1)}>Comments : {comments?.length}</button>
      </div>


      <BlogFooter blog={blog} option={option} setOption={setOption} handleLikes={handleLikes} />

      {
        option === 1 ?
          <BlogComments blogId={blog._id} userId={user?._id} setOption={setOption} comments={comments} loadComments={loadComments} />
          :
          option === 2 ?
            <CopyLink setCopyLink={setOption} url={`/${blog._id}`} />
            : option === 3 ?
              <BlogLikesPage setOption={setOption} allLikes={allLikes} />
              : (option === 4 && !user) ? <div className="min-h-screen w-full fixed z-10 top-0 left-0 flex items-center justify-center bg-slate-500/50 dark:bg-slate-900/90"><LoginForm /></div>
                :
                (option === 11) && <BlogEditForm handleBlogEdit={handleBlogEdit} oldBlog={blog} cancelForm={() => setOption(0)} />
      }
    </div>
  )
}
