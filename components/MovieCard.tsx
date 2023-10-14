import React from "react";

import FavBtn from './FavBtn';

interface MovieCardProps {
	data:Record<string, any>;
}


const MovieCard: React.FC<MovieCardProps> = ({data}) => {
	return (
		<>
			<div className="group bg-zinc-900 col-span relative h-[12vw]">
				<img className="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]" src={data.thumbnailUrl} alt="Thumbnail" />
				<div className="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
					<img className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]" src={data.thumbnailUrl} alt="Thumbnail"/>
					<div className="z-10 bg-zinc-800 lg:p-4 p-2 absolute w-full transition shadow-md rounded-b-md">
						<div className="flex flex-row items-center gap-3">
							<div onClick={() => {}} className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300">
								<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-play-fill pl-[2px]" viewBox="0 0 16 16">
									<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
								</svg>
							</div>
							<FavBtn movieID={data?.id}/>
						</div>
						<p className="text-green-400 font-semibold mt-4">
							New <span className="text-white">2023</span>
						</p>
						<div className="flex flex-row empty-4 gap-2 items-center">
							<p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
						</div>
						<div className="flex flex-row empty-4 gap-2 items-center">
							<p className="text-white text-[10px] lg:text-sm">{data.genre}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
};

export default MovieCard;