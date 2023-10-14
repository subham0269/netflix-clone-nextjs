import Input from '../components/Input';
import {useState,useCallback} from 'react';
import axios from 'axios';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

const Auth = () =>{
	const [email,setEmail]=useState('');
	const [name,setName]=useState('');
	const [password, setPassword]=useState('');

	const [variant,setVariant]=useState('login');

	const toggleVariant=useCallback(()=>{
		setVariant((currVar)=>currVar ==='login' ? 'register' : 'login')
	},[])

	const login = useCallback(async () => {
		try {
			await signIn('credentials', {
				email,
				password,
				callbackUrl: '/profiles'
			});
		} catch (error) {
			console.log(error);
		}
	},[email, password]);

	const register = useCallback(async()=>{
		try {
			await axios.post('/api/register', {
				email,
				name,
				password,
			});
			login();
		} catch(error){
			console.log(error);
		}
	}, [email, name, password,login]);


	return (
		<>
			<div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-center bg-fixed bg-no-repeat bg-cover">
				<div className="bg-black w-full h-full bg-opacity-50">
					<nav className="px-12 py-5">
						<Image className='w-auto h-auto' src="/images/logo.png" alt="netflix-logo" width={100} height={100} priority/>
					</nav>
					<div className="flex justify-center">
						<div className="bg-black bg-opacity-70 py-16 px-8 md:px-10 lg:px-16 self-center mt-2 w-[90%] lg:w-2/5 lg:max-w-md rounded-md w-full">
							<h2 className="text-white font-semibold text-4xl mb-8">
								{variant === 'login' ? 'Sign in' : 'Create Account'}
							</h2>
							<div className="flex flex-col gap-4">
								{variant === 'register' && (
									<Input label="Username" onChange={(e:any)=>{
										setName(e.target.value)
										}}
										id="username"
										type="username"
										value={name}
									/>
								)}
								<Input label="Email" onChange={(e:any)=>{
									setEmail(e.target.value)
									}}
									id="email"
									type="email"
									value={email}
								/>
								<Input label="Password" onChange={(e:any)=>{
									setPassword(e.target.value)
									}}
									id="password"
									type="password"
									value={password}
								/>
							</div>
							<button onClick={variant === 'login' ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
								{variant === 'login'? 'Login' : 'Sign up'}
							</button>

							{/* <div className="flex flex-row items-center gap-4 justify-center mt-8 ">
								<div onClick={() => signIn('google', {callbackUrl: '/profiles'})} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
									<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="33" height="33" viewBox="0 0 48 48">
									<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
									</svg>
								</div>
							</div> */}
							
							<p className="text-neutral-500 mt-12">
								{variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}&nbsp;
								<span onClick={toggleVariant} className="text-white hover:underline cursor-pointer">
									{variant ==='login' ? 'Create an Account' : 'Login'}
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default Auth;