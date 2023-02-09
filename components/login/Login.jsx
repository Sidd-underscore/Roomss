import Button from "../Button"

const Loginform = () => {
	return (
		<div id="loginform" className="col-span-full row-span-full flex md:w-full flex-col relative items-center mx-auto lg:py-0">
			<h1 className="p-8 pb-0 text-xl font-bold leading-tight tracking-tight md:text-2xl">Sign in</h1>
			<div className="md:w-5/6 md:grid md:grid-cols-2 md:gap-4 md:divide-x border-none border-0 p-6 space-y-4 md:space-y-6 sm:p-8">
				<div className="border-0 border-none">
					<form id="login_form" className="space-y-4 md:space-y-6">
						<div>
							<label htmlFor="email" className="block mb-2 text-sm font-medium">Email <span className="error text-red"></span> </label>
							<input
								type="email"
								name="email"
								id="email"
								autoComplete="email"
								className="bg-dark-lightest sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
								placeholder="dwayne.johnson@eyebrow-raise.com"
							/>
						</div>
						<div>
							<label htmlFor="password" className="block mb-2 text-sm font-medium">Password <span className="error text-red"></span> </label>
							<input
								type="password"
								name="password"
								id="password"
								autoComplete="current-password"
								className="bg-dark-lightest sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
								placeholder="••••••••••••••••"
							/>
							<div className="text-right mt-2">
								<a href="#" className="text-sm font-medium hover:underline">Forgot password?</a>
							</div>
						</div>
						<Button isfull="true" istext="true" id="login">
							Sign in
						</Button>
					</form>
				</div>

				<span className="inline-flex md:hidden justify-center items-center w-full">
					<hr className="w-64 h-px bg-dark-lightest border-dark-lightest h-1" />
				</span>
				<div className="space-y-4 md:ml-8 md:grid md:content-center border-0 border-none">
					<Button istext="true" isfull="true" id="google-login">
						<img className="h-8 mr-5" src="/img/google.png" />
						Sign in with Google
					</Button>
					<br />
					<Button istext="true" isfull="true" id="github-login">
						<img className="h-8 mr-5" src="/img/github.png" />
						Sign in with GitHub
					</Button>
				</div>
			</div>
			<p className="w-full text-center m-4 text-sm font-light">Don’t have an account yet? <a href="#" id="registerBtn" className="font-medium hover:underline">Sign up</a></p>
		</div>
	)
}

export default Loginform