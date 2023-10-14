import useBillBoard from '@/hooks/useBillBoard';
import React from 'react';

const BillBoard = () => {
	const {data} = useBillBoard();
	
	return (
		<>
			<div className='relative h-[56.25vw]'>
				<video autoPlay muted loop poster={data?.thumbnailUrl} src={data?.videoUrl} className='w-full h-[56.25vw] object-cover brightness-[60%] transition duration-500'></video>
				<div className='absolute top-[30%] md:top-[40%] ml-4 md:ml-16'>
					<p className='text-white text-xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl'>{data?.title}</p>
					<p className='text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl'>{data?.description}</p>
					<div className='flex flex-row items-center mt-3 md:mt-4 gap-3'>
						<button className='bg-white bg-opacity-30 text-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-40 transition'>
							<svg viewBox="0 0 1024 1024" className='mr-2  h-[1.3rem] w-auto' fill="currentColor" >
								<path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
								<path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" />
							</svg>
							More Info
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default BillBoard;