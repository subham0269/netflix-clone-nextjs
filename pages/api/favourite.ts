import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import prismadb from '@/lib/prismadb'
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		if(req.method === 'POST') {
			const {currentUser} = await serverAuth(req);
			const {movieid} = req.body;

			const existingMovie = await prismadb.movie.findunique({
				where: {
					id:movieid,
				}
			})

			if(!existingMovie) {
				throw new Error('Invalid ID');
			}

			const user = await prismadb.user.update({
				where: {
					email:currentUser.email || '',
				},
				data: {
					favouriteIds: {
						push: movieid,
					}
				}
			})
			return res.status(200).json(user);
		}

		if(req.method === 'DELETE') {
			const {currentUser} = await serverAuth(req);
			const {movieid} = req.body;
			const existingMovie = await prismadb.movie.findunique ( {
				where: {
					id: movieid,
				}
			})

			if(!existingMovie) {
				throw new Error('Invalid ID');
			}


			const updateFav = without(currentUser.favouriteIds, movieid)

			const updatedUser = await prismadb.user.update({
				where: {
					email: currentUser.email || ''
				},

				data: {
					favouriteIds: updateFav
				}
			})

			return res.status(200).json(updatedUser);
		}

		return res.status(405).end()
		
	} catch (error) {
		console.log(error);
		
	}
}