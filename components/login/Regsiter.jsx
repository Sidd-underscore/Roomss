import Button from "../Button"
import Link from "next/link"

const Registerform = () => {
	return (
		<div id="registerform" className="col-span-full hidden opacity-0 overflow-auto row-span-full flex flex-col relative md:w-full items-center mx-auto lg:py-0">
			<h1 className="p-8 pb-0 text-xl font-bold leading-tight tracking-tight md:text-2xl">Sign up</h1>
			<div className="md:grid md:w-5/6 md:grid-cols-2 md:gap-4 md:divide-x border-none border-0 p-6 space-y-4 md:space-y-6 sm:p-8">
				<div className="border-0 border-none">
					<form id="register_form" className="space-y-4 md:space-y-6">
						<div>
							<label htmlFor="register_name" className="block mb-2 text-sm font-medium">Name <span className="error text-red"></span> </label>
							<input
								type="username"
								name="register_name"
								id="register_name"
								autoComplete="name"
								className="bg-dark-lightest sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
								placeholder="TheRock"
							/>
						</div>
						<div>
							<label htmlFor="register_email" className="block mb-2 text-sm font-medium">Email <span className="error text-red"></span> </label>
							<input
								type="email"
								name="register_email"
								id="register_email"
								autoComplete="email"
								className="bg-dark-lightest sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
								placeholder="dwayne.johnson@eyebrow-raise.com"
							/>
						</div>
						<div>
							<label htmlFor="register_password" className="block mb-2 text-sm font-medium">Password <span className="error text-red"></span> </label>
							<input
								type="password"
								name="register_password"
								id="register_password"
								autoComplete="new-password"
								className="bg-dark-lightest sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
								placeholder="••••••••••••••••"
							/>
						</div>
						<div>
							<label htmlFor="register_confirmpassword" className="block mb-2 text-sm font-medium">Confirm Password <span className="error text-red"></span> </label>
							<input
								type="password"
								name="register_confirmpassword"
								id="register_confirmpassword"
								autoComplete="new-password"
								className="bg-dark-lightest sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
								placeholder="••••••••••••••••"
							/>
						</div>
						<Button istext="true" id="registerBtn">
							Sign up
						</Button>
					</form>
				</div>

				<span className="inline-flex md:hidden justify-center items-center w-full">
					<hr className="w-64 h-px bg-dark-lightest border-dark-lightest h-1" />
				</span>
				<div className="space-y-4 md:ml-8 md:grid md:content-center border-0 border-none">
					<Button istext="true" isfull="true" id="google-register">
						<img className="h-8 mr-5" src="/img/google.png" />
						Sign up with Google
					</Button>
					<br />
					<Button istext="true" isfull="true" id="github-register">
						<img className="h-8 mr-5" src="/img/github.png" />
						<span>Sign up with GitHub</span>
					</Button>
				</div>
			</div>
			<p className="w-full text-center m-4 text-sm font-light pb-4">Have an account? <Link href="#" id="loginBtn" className="font-medium hover:underline">Sign in</Link></p>
		</div>
	)
}

export default Registerform