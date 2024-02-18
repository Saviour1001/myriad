import Link from 'next/link'
import { useStore } from '@store'
import toast from 'react-hot-toast'
import React, { useEffect } from 'react'

interface DAO {
	name: string
	image: string
	id: string
}

const AllDAOGrid = () => {
	const { search } = useStore()
	const [daoList, setDaoList] = React.useState<DAO[]>([])
	const { identity, reload } = useStore()

	const fetchData = async () => {
		const apiResponse = await fetch(`/api/getAllDAOs?id=${identity?.commitment?.toString()}`)
		const DAOList = (await apiResponse.json()).data as DAO[]
		setDaoList(DAOList)
	}

	useEffect(() => {
		fetchData()
	}, [])

	useEffect(() => {
		fetchData()
	}, [identity, reload])

	const joinDAO = async (id: string) => {
		await fetch('/api/joinDAO', {
			method: 'POST',
			body: JSON.stringify({
				member_id: identity?.commitment?.toString(),
				dao_id: id,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(async res => {
				const data = await res.json()
				console.log('🚀 ~ DB response: ', data)
				toast.success('Joined DAO successfully')
				fetchData()
			})
			.catch(error => {
				console.error('🚀 ~ DB error: ', error)
			})
	}

	return (
		<div className="w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
			{daoList.length > 0 &&
				daoList
					.filter(dao => dao.name.toLowerCase().includes(search.toLowerCase()))
					.map(dao => (
						<div className="bg-white shadow-lg rounded-lg overflow-hidden" key={dao.id}>
							<img className="w-full h-auto object-cover object-center" src={dao.image} alt={dao.name} />
							<div className="p-4">
								<p className="text-primary text-xl text-center font-semibold">{dao.name}</p>
								<button
									className="bg-primary hover:bg-black p-2 w-full rounded-lg mt-2 text-white"
									onClick={() => joinDAO(dao.id)}
								>
									Join
								</button>
							</div>
						</div>
					))}
		</div>
	)
}

export default AllDAOGrid