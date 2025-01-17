"use client"
import axios from 'axios';
import Blogs from './BlogCard';
import Image from 'next/image';
import Followers from './Followers';
import Followings from './Followings';
import StarredUser from './StarredUser';
import { useAuth } from './AuthProvider';
import ProfileEdit from './LoggedInProfileEdit';
import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faRotate } from '@fortawesome/free-solid-svg-icons';
import UserSocialMediaInfo from './UserSocialMediaInfo';


export default function ProfileCard({ setStatus }) {
  const { user, setUser } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [stars, setStars] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [editable, setEditable] = useState(false);
  const [followings, setFollowings] = useState([]);
  const [connections, setConnections] = useState(0);

  const updateFollowers = useCallback(() => {
    axios.get(`/api/users/follow/${user?._id}`)
      .then(result => result.data)
      .then(data => data.success && setFollowers(data.followers));
  }, [user?._id]);

  const updateFollowings = useCallback(() => {
    axios.post(`/api/users/follow/${user?._id}`)
      .then(result => result.data)
      .then(data => data.success && setFollowings(data.followings));
  }, [user?._id]);

  const updateBlogs = useCallback(() => {
    axios.post(`/api/blogs/${user?._id}`)
      .then(result => result.data)
      .then(data => data.success && setBlogs(data.blogs));
  }, [user]);

  const handleUnFollow = (_id) => {
    axios.delete(`/api/users/follow/${_id}`, ({ data: JSON.stringify({ _id: user?._id }) }))
      .then(result => result.data)
      .then(data => data.success)
      .then(success => success && updateFollowings())
      .catch(error => alert(error.message));
  }

  const handleRemoveFollower = (_id) => {
    axios.delete(`/api/users/follow/${_id}`, ({ data: JSON.stringify({ _id: user?._id }) }))
      .then(result => result.data)
      .then(data => data.success)
      .then(success => success && updateFollowers())
      .catch(error => alert(error.message));
  }

  const handleBlogEdit = (_id, blog) => {
    axios.put(`/api/blogs/${_id}`, { blog })
      .then(res => res.data)
      .then(data => data.message)
      .then(message => alert(message))
      .then(() => updateBlogs())
      .catch(() => alert("Sorry, some error occurred!"))
  }

  const handleBlogDelete = (_id) => {
    axios.delete(`/api/blogs/${_id}`, ({ data: JSON.stringify({ _id: user?._id }) }))
      .then(res => res.data)
      .then(data => data.message)
      .then(message => alert(message))
      .then(() => updateBlogs())
      .catch(() => alert("Sorry, some error occurred!"))
  }

  const loadStars = () => {
    axios.get(`/api/users/likes/${user._id}`)
      .then(res => res.data)
      .then(data => data.likes || [])
      .then(likes => setStars(likes))
      .catch(error => console.error(error.message));
  }


  const reloadUser = useCallback(() => {
    setConnections(101);
    axios.patch(`/api/users/${user?._id}`)
      .then(res => res.data)
      .then(data => {
        if (data.success) {
          setUser(data.user);
        }
      })
      .catch(error => console.error(error.message))
      .finally(() => setConnections(0));
  }, [user?._id]);

  useEffect(() => {
    updateFollowers();
    updateFollowings();
    updateBlogs();
    loadStars();
  }, [user._id, updateBlogs, updateFollowers, updateFollowings]);

  return (
    <div className={`flex flex-col gap-4 items-center justify-center py-4 w-full relative`}>
      {
        editable && <ProfileEdit student={user} setEditable={setEditable} />
      }
      {!user ?
        <div className={`flex items-center justify-center h-nav`}>
          <div className="mx-auto h-40 w-40 rounded-full animate-spin border-t-4 border-slate-900 dark:border-white flex items-center justify-center">
            <div className="h-24 w-24 rounded-full border-r-4 border-slate-700 dark:border-white">
            </div>
          </div>
        </div>
        :

        <>
          <div className={`w-[98%] max-w-[900px] px-[2px] pt-2 pb-1 xs:p-2  md:p-4 rounded-lg flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-around bg-slate-200 dark:bg-blue-900/55 text-red-950 dark:text-white shadow-[0_0_2px_black]`}>
            <div className="w-fit flex items-center justify-center">
              <Image src={user.imgUrl} alt='profile-image' width={200} height={200} className='rounded-full h-36 w-36 sm:h-40 sm:w-40 bg-white ring-2 ring-green-700' />
            </div>

            <div className="w-full sm:w-[72%] sm:max-w-[700px] rounded-lg flex flex-col gap-3 px-1 py-2 xs:p-3 md:p-4 items-center sm:items-start justify-center bg-white dark:bg-blue-100/5 overflow-x-hidden">
              <div className="flex gap-x-2 md:gap-x-4 flex-wrap items-center justify-center">
                <h1 className="text-2xl sm:text-3xl font-bold font-serif drop-shadow-[0_0_5px_lack]">{user?.name}</h1>
                <button className="py-[3px] sm:py-1 px-3 md:px-4 text-xs sm:text-sm rounded-md bg-red-700 hover:bg-red-600 active:bg-violet-600 w-fit font-serif font-semibold text-gray-200" onClick={e => setStatus(true)}>logout</button>
                <FontAwesomeIcon size='sm' icon={faPenToSquare} className='h-[1.5rem] cursor-pointer text-blue-600 dark:drop-shadow-[0_0_2px_black] hover:scale-110 hover:text-blue-800' onClick={e => setEditable(true)} />
                <FontAwesomeIcon size='sm' icon={faRotate} className={`h-[1.3rem] cursor-pointer text-gray-500 dark:drop-shadow-[0_0_2px_black] hover:text-orange-800/80 duration-300 ${connections === 101 && "animate-spin"}`} onClick={reloadUser} />

              </div>

              <div className="flex flex-wrap gap-1 xs:gap-2 sm:gap-4 items-center justify-center sm:justify-start font-bold sm:font-semibold text-xs sm:text-sm text-white">
                <button className="flex gap-2 items-center justify-center px-3 sm:px-4 py-[5px] sm:py-[3px] bg-green-700 hover:bg-green-600 rounded-md active:bg-violet-600/30" onClick={() => setConnections(1)}>
                  <span className="">{stars?.length}</span>
                  <span className="">Star</span>
                </button>
                <button className="flex gap-2 items-center justify-center px-3 sm:px-4 py-[5px] sm:py-[3px] bg-green-700 hover:bg-green-600 rounded-md active:bg-violet-600/30" onClick={e => setConnections(2)}>
                  <span className="">{followers.length}</span>
                  <span className="">Followers</span>
                </button>
                <button className="flex gap-2 items-center justify-center px-3 sm:px-4 py-[5px] sm:py-[3px] bg-green-700 hover:bg-green-600 rounded-md active:bg-violet-600/30" onClick={e => setConnections(3)}>
                  <span className="">{followings.length}</span>
                  <span className="" >Followings</span>
                </button>
              </div>
              <UserSocialMediaInfo course={user?.course} university={user?.university} github={user?.github} instagram={user.instagram} linkedIn={user?.linkedIn} />
            </div>

          </div>

          <h2 className="font-semibold text-4xl font-mono opacity-70">Blogs</h2>
          {blogs?.length > 0 ?
            <div className="w-full flex flex-col gap-3 items-center justify-evenly">
              {
                blogs.map((blog, index) => <Blogs key={index} blog={blog} loadBlogs={updateBlogs} handleBlogDelete={() => handleBlogDelete(blog?._id)} handleBlogEdit={handleBlogEdit} />)
              }
            </div>
            :
            <div className="opacity-50">No Blogs till Now</div>
          }
        </>
      }

      {
        connections === 1 && <StarredUser setConnections={setConnections} stars={stars} />
      }

      {
        connections === 2 && <Followers setConnections={setConnections} followers={followers} handleRemoveFollower={handleRemoveFollower} />
      }
      {
        connections === 3 && <Followings setConnections={setConnections} followings={followings} handleUnFollow={handleUnFollow} />
      }

    </div>
  )
}