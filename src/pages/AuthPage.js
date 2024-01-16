import React, { useRef, useState } from 'react'
import authImage from '../images/auth.png';
import titleImage from '../images/instagram-title.png';
import { AiFillFacebook } from 'react-icons/ai';
import playStore from '../images/playstore.png';
import appStore from '../images/appstore.png';
import { validateEmail, validatePassword, validateUname, validateName, isEmailValid } from '../utils/authValidation';
import { togglePasswordType } from '../utils/utils';
import { signupUser, loginUser } from '../utils/authUser';


const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [uname, setUname] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [validUname, setValidUname] = useState(false);
    const [validName, setValidName] = useState(false);

    const validate = () => {
        if(isLogin) {
            return isEmailValid(email) && validPassword
        }
        else{
            return validEmail && validPassword && validUname && validName;
        }
    }

    const signUp = () => {
        if(validate()) {
            const user = signupUser(email,password,name,uname);
            if(user){
                alert('SignUp Successful')
                setIsLogin(true);
            }
            else{
                alert('SignUp Failed')
            }
        }
    }

    const login = () => {
        if(validate()) {
            const user = loginUser(email,password);
            console.log(user);
            if(user){
                alert('Login Successful')
            }
            else{
                alert('Invalid Credentials')
            }
        }
    }

    const toggleLogin = () => {
        setIsLogin(!isLogin);
    }

  return (
    <div className='bg-white w-screen min-h-screen flex justify-center items-center'>
        <img src={authImage} className=''/>
        
        <div className='flex flex-col gap-2'>
            <div className='border border-[#DBDBDB] p-4 flex flex-col items-center px-8'>
                <img className='w-48' src={titleImage} alt='' />
                {!isLogin && <p className='w-64 text-center text-[#737373] font-semibold'>Sign up to see photos and videos from your friends.</p>}
                {!isLogin && <button className='bg-[#4193EF] w-full hover:bg-[#3975EA] justify-center py-2 rounded-lg text-white my-2 flex items-center text-sm font-semibold gap-1'><AiFillFacebook className='w-5 h-5'/>Log in with Facebook</button>}
                {!isLogin && <div className='relative border-b border-b-[#dbdbdb] w-full mx-2 my-6'>
                    <div className='bg-white absolute -top-3 left-28 w-16 flex justify-center items-center'>
                        <p className='text-[#737373] text-sm font-semibold mt-1'>OR</p>   
                    </div>
                </div>}
                <div className='flex flex-col gap-2 mt-3'>
                    <input required value={email} onChange={(e) => validateEmail(e.target.value,setEmail,setValidEmail)} type='text' className='rounded-sm border border-[#dbdbdb] text-sm p-2 w-72 outline-none' placeholder='Username or email address' />
                    {!isLogin && <input required value={name} onChange={(e) => validateName(e.target.value,setName,setValidName)} type='text' className='rounded-sm border border-[#dbdbdb] text-sm p-2 w-72 outline-none' placeholder='Full Name' />}
                    {!isLogin && <input required value={uname} onChange={(e) => validateUname(e.target.value,setUname,setValidUname)} type='text' className='rounded-sm border border-[#dbdbdb] text-sm p-2 w-72 outline-none' placeholder='Username' />}
                    
                    <div className='relative w-72'>
                        <input required value={password} onChange={(e) => validatePassword(e.target.value,setPassword,setValidPassword)} id='password' type='password' className='w-72 border rounded-sm border-[#dbdbdb] text-sm p-2 outline-none' placeholder='Password' />
                        {password && <button onClick={() => togglePasswordType(setShowPassword)} className='absolute right-0 top-2 mx-2 hover:text-gray-400 text-sm font-semibold'>{showPassword ? 'Hide' : 'Show'}</button>}
                    </div>

                    {!isLogin && <p className='my-1 w-72 text-center text-[#737373] text-xs'>People who use our service may have uploaded your contact information to Instagram. Learn more</p>}
                    {!isLogin && <p className='my-1 w-72 text-center text-[#737373] text-xs'>By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.</p>}

                    <button onClick={isLogin ? login : signUp} disabled={validate() ? false: true} className={`${validate() ? 'bg-[#4193EF] hover:bg-[#3975EA]':'bg-[#7AB3F4]'} mt-2 text-white py-2 rounded-lg text-sm font-semibold`}>{isLogin ? 'Log in' : 'Sign up'}</button>
                </div>
                {isLogin && <div className='relative border-b border-b-[#dbdbdb] w-full mx-2 my-6'>
                    <div className='bg-white absolute -top-3 left-28 w-16 flex justify-center items-center'>
                        <p className='text-[#737373] text-sm font-semibold mt-1'>OR</p>   
                    </div>
                </div>}
                {isLogin && <button className='my-3 flex items-center text-sm font-semibold text-[#3D5081] gap-1'><AiFillFacebook className='w-5 h-5'/>Log in with Facebook</button>}
                {isLogin && <button className='text-xs text-[#143667] mt-2'>Forgotten your password?</button>}
            </div>
            <div className='border border-[#DBDBDB] p-4 flex justify-center text-sm items-center px-8 gap-1'>
                {isLogin ? "Don't have an account?" : "Have an account?"} <span onClick={toggleLogin} className='text-[#4193EF] cursor-pointer font-semibold'>{isLogin ? 'Sign up' : 'Log in'}</span>
            </div>
            <p className='text-center text-sm mt-1'>Get the app.</p>
            <div className='flex gap-2 my-1 w-full justify-center'>
                <img className='h-10' src={appStore} alt='' />
                <img className='h-10' src={playStore} alt='' />
            </div>
        </div>

    </div>
  )
}

export default AuthPage