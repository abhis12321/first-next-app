"use client"
import axios from 'axios';
import StudentCard from './StudentCard';
import { useAuth } from './AuthProvider';
import { memo, useEffect, useState } from 'react';

function UsersContainer({ users }) {
  let {user , socket} = useAuth();
  const [students, setStudents] = useState(users);
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState("0");

  useEffect(() => {
    axios.get(`/api/users/${user?._id}`)
      .then(res => res.data)
      .then(data => data.success && setStudents(data.users))
      .catch(error => console.error(error.message));
    
      socket?.emit("loadOnlineUsers", user._id);
  }, [user]);

  
  const handleFollowings = (index, data) => {
    if (!user) {
      alert("You are not logged-in! Login first to follow a user!");
    } else if (user._id === data.followedToId) {
      alert("you can not follow yourself.");
    // } else if (students[index].isFollowing) {
    //   alert("you are already following this user.");
    } else {
      // console.log({ index, data });
      axios.post('/api/users/follow', data)
        .then(result => result.data)
        .then(data => {
          students[index].isFollowing = true;
          setStudents([...students]);
          alert(data.message)
        });
    }
  }

  return (
    <>
      <div className="flex justify-evenly items-center py-5 flex-wrap gap-6 h-nav">
        {!students &&
          <div className="mx-auto h-40 w-40 rounded-full animate-spin border-t-4 border-slate-900 dark:border-white flex items-center justify-center">
            <div className="h-24 w-24 rounded-full border-r-4 border-slate-700 dark:border-white">
            </div>
          </div>
        }

        {students &&
          <>
            <div className="w-full px-1 xm:px-8 md:px-12 mx-auto flex flex-col md:flex-row gap-1 md:gap-2 items-center justify-center self-start font-serif">
              <select name="sort-by" id="" className="w-full  max-w-[340px] md:w-fit flex-1 outline-none py-2 px-3 rounded-xl text-center bg-white dark:bg-indigo-900/40 shadow-[0_0_2px_gray] dark:shadow-[0_0_2px_white] focus:shadow-[0_0_5px_gray_inset] focus:bg-violet-600/10 dark:focus:shadow-[0_0_5px_white_inset] font-semibold font-mono" placeholder='pending' value={searchBy} onChange={(e) => setSearchBy(e.target.value)} >
                <option value="0" className='bg-slate-950/30'>search by user&apos;s name</option>
                <option value="1" className='bg-slate-950/30'>search by university name</option>
              </select>
              <input type="text" className="w-full max-w-[340px]  md:w-fit flex-1 outline-none text-gray-700 dark:text-white py-[6px] px-5 rounded-xl bg-white dark:bg-indigo-900/40 shadow-[0_0_2px_black_inset] dark:shadow-[0_0_2px_white_inset] focus:shadow-[0_0_5px_gray_inset] focus:bg-violet-600/10 dark:focus:shadow-[0_0_5px_white_inset] font-semibold font-mono dark:placeholder:text-gray-400 placeholder:text-gray-500 text-center" value={search} onChange={e => setSearch((e.target.value).toLowerCase())} placeholder='type here to search...' />
            </div>
            {students?.map((student, index) => {
              return student.verify && student._id != user?._id ?
                <StudentCard key={student._id + index} student={student} index={index} handleFollowings={handleFollowings} search={search.toLowerCase()} searchBy={searchBy} />
                :
                null
            })}
          </>
        }
      </div>

    </>
  )
}

export default memo(UsersContainer);