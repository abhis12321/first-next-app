import axios from 'axios';
import { useState } from 'react';
import LoadingPage from './LoadingPage';
import ForgotPassword from './ForgotPassword';
import UserRegistration from './UserRegistration'
import { useAuth } from '../_components/AuthProvider';
import ResendVerificationLink from './ResendVerificationLink';

export default function LoginForm() {
  const [option, setOption] = useState(0);
  const [password, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [verifyOTP, setVerifyOTP] = useState(false);
  const [alert, setAlert] = useState("");
  let { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setOption(4)
    axios.put(`/api/users`, { email, password, OTP })
      .then(response => response.data)
      .then(data => {
        if (data.success) {
          if (data.User) {
            setVerifyOTP(false);
            login(data.User);
          } else {
            setVerifyOTP(true);
          }
        }
        setAlert(data.message);
        setTimeout(() => setAlert(), 8000);
      })
      .catch(error => alert('some went wrong, Try again.\n', error.message))
      .then(() => setOption(0));
  }


  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <h2 className="font-extrabold text-4xl text-center rounded-md text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-violet-600 w-fit pb-2 leading-12 drop-shadow-[0_0_1px_black]">Login Page</h2>

      <div className="w-[95%] font-semibold text-red-700 text-center drop-shadow-[0_0_2px_yellow]">{alert}</div>

      <form onSubmit={handleLogin} className='w-[98%] max-w-[500px] min-h-[280px] py-4 px-5 bg-white dark:bg-blue-900/50 shadow-[0_0_2px_black_inset] dark:shadow-[0_0_4px_white] rounded-2xl text-red-950 dark:text-white flex flex-col items-center justify-evenly' autoComplete='on'>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='bg-blue-950/10 dark:bg-red-600/15 px-2 py-[10px] rounded text-center w-[96%] max-w-[550px] outline-none focus:bg-green-600/15 ring-1 focus:ring-2 ring-violet-700 dark:ring-gray-400' placeholder='email' name='email' required />

        <input type="password" value={password} onChange={(e) => setPass(e.target.value)} className='bg-blue-950/10 dark:bg-red-600/15 px-2 py-[10px] rounded text-center w-[96%] max-w-[550px] outline-none focus:bg-green-600/15 ring-1 focus:ring-2 ring-violet-700 dark:ring-gray-400' placeholder='password' name='password' required />

        {verifyOTP && <input type="text" value={OTP} onChange={(e) => setOTP(e.target.value)} className='bg-sky-600/30 dark:bg-sky-600/15 px-2 py-[10px] rounded text-center w-[96%] max-w-[550px] outline-none focus:bg-green-600/15 ring-1 focus:ring-2 ring-sky-600 text-sky-600 font-bold' placeholder='enter OTP' name='OTP' required />}

        <div className="flex items-center justify-evenly w-[98%] max-w-[550px] text-xs xs:text-sm" >
          <div onClick={() => setOption(2)} className="text-blue-700 font-semibold underline hover:text-blue-600 hover:scale-110 cursor-pointer">Resend Verification Link</div>
          <div onClick={() => setOption(1)} className="text-blue-700 font-semibold underline hover:text-blue-600 hover:scale-110 cursor-pointer">forgot password</div>
        </div>

        <div className="w-[96%] max-w-[550px] flex justify-between text-white">
          <div onClick={e => setOption(3)} className='w-[120px] xs:w-[150px] text-center rounded-md bg-red-900/95 py-2 hover:bg-red-700 font-mono' >Register New</div>
          <button type='submit' className='w-[120px] xs:w-[150px] text-center rounded-md bg-red-900/95 py-2 hover:bg-red-700 font-mono' >Login</button>
        </div>
      </form>

      {option == 1 && <ForgotPassword setOption={setOption} />}
      {option == 2 && <ResendVerificationLink setOption={setOption} />}
      {option == 3 && <UserRegistration setOption={setOption} />}
      {option == 4 && <LoadingPage />}


    </div>
  )
}
