import { Link } from "react-router-dom";

const NotFound = () => {
    return(
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-yellow-50 bg-[url(/savannah.webp)]">
            <h1 className="text-8xl mb-8 absolute top-20">404 Page Not Found</h1>
            <div className="w-11/12 md:w-5/8 lg:w-1/2 flex flex-col bg-amber-200 text-green-700 shadow-lg rounded-lg p-8 text-2xl">
                <p className="mb-2 ">Oops, looks like you've ventured into the outback! Here's a link to login to get you back on track so you don't get eaten by lions!</p>
                <Link to='/' className="hover:underline">Login</Link>
            </div>
        </div>
    )
}

export default NotFound;