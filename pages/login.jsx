import Head from "next/head";
import Script from "next/script";
import Registerform from "../components/login/Regsiter";
import Loginform from "../components/login/Login";

export default function Login() {
	return (
		<div className="text-white">
			<Head>
				<title>Login | Roomss</title>
			</Head>
			<div className="h-screen bg-[url(/img/splash_1.png)] bg-repeat flex flex-col relative items-center justify-center mx-auto md:h-screen lg:py-0">
				<div className="p-10 lg:w-4/6 lg:h-auto w-screen h-screen backdrop-blur-xl bg-dark-low-opacity md:rounded-lg rounded-none pt-0 mt-0 xl:p-0 grid">
					<Loginform />
					<Registerform />
				</div>
			</div>
			<Script type="module" src="/js/login.js"></Script>
		</div>
	);
}