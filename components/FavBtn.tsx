import axios from "axios";
import React, {useCallback, useMemo} from "react";

import useCurrentUser from "@/hooks/useCurrentUser";

import useFavourites from "@/hooks/useFavourites";

interface FavBtnProps {
	movieID: string;
}

const FavBtn: React.FC<FavBtnProps> = ({movieID}) => {

	const {mutate: mutateFav} = useFavourites();
	const {data: currentUser, mutate} = useCurrentUser();

	const isFav = useMemo( () => {
		const list= currentUser?.favouriteIds || [];
		return list.includes(movieID)
	}, [currentUser, movieID]);


	const toggleFav = useCallback(async() => {
		let response;
		if (isFav) {
			response = await axios.delete('/api/favourite', {data: {movieID}});
		} else {
			response = await axios.post('/api/favourite', {movieID});
		}

		const updatedFavIds=response?.data?.favouriteIds;

		mutate ( {
			...currentUser,
			favouriteIds: updatedFavIds
		});

		mutateFav();

	}, [movieID, isFav, currentUser, mutate, mutateFav])


	return (
		<>
			<div className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300" onClick={toggleFav}>
				{(isFav)? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
				<path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
				</svg> : <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus text-white" viewBox="0 0 16 16">
					<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
				</svg> }
				
			</div>
		</>
	)
}

export default FavBtn;