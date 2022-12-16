import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

const Home: NextPage = () => {
  return (
	  <>
    <Head>
        <title>Roomss</title>
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className="bg-dark text-white font-poppins">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
            <span className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-white text-sm bg-dark-lighter rounded-full in-out duration-300 transition" role="alert">
                <span className="text-xs bg-primary rounded-full text-white px-4 py-1.5 mr-3">Under Development</span> <span className="text-sm font-medium">Coming soon 🎉</span>
            </span>
            <div className="mx-auto max-w-4xl text-5xl font-medium sm:text-7xl">
                Collaboration
                <span className="relative whitespace-nowrap text-primary">
                    <svg aria-hidden="true" viewBox="0 0 418 42" className="absolute top-2/3 left-0 h-[0.58em] w-full fill-primary opacity-50" preserveAspectRatio="none">
                        <path
                            d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"
                        ></path>
                    </svg>
                    <span className="relative">made free</span>
                </span>
                for everyone
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-lg">
                Most collaboration softwares are free, but set restrictions. With Roomss, however, gone are the days of 15GB storage limits, 40 minute calls or any other restriction. <br />
                <br />
                We offer video chats, text chats, checklists, document editing and much more.
            </p>
            <p className="mt-10 flex justify-center gap-x-6">
                <a href="/login" className="m-8 ease-in-out duration-150 transition hover:-translate-y-1 hover:bg-primary hover:scale-110 inline-flex justify-center items-center p-4 text-base font-medium text-white bg-dark-lighter rounded-lg">
                    Open Roomss
                    <svg aria-hidden="true" className="-rotate-45 ml-3 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </a>
            </p>
        </div>
    </main>
	  </>
  )}

export default Home
