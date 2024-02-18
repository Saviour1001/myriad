import Image from 'next/image'
import { Proposal } from 'common'
import React, { useEffect } from 'react'
import ProposalDrawer from './ProposalDrawer'

const Timeline = (props: any) => {
	const { dao } = props
	const [proposalList, setProposalList] = React.useState<Proposal[]>([])

	useEffect(() => {
		const fetchData = async () => {
			const apiResponse = await fetch(`/api/getProposals?dao=${dao}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const ProposalList = (await apiResponse.json()).data as Proposal[]
			setProposalList(ProposalList)
		}
		fetchData()
	}, [dao])

	return (
		<div className="w-full bg-white/70 p-8 rounded-lg">
			{proposalList.map((proposal, id) => (
				<div key={id} className="py-3">
					<div className="ps-2 my-2 first:mt-0">
						<h3 className="text-xs font-medium uppercase text-gray-500">{proposal.expiry?.toString()}</h3>
					</div>
					<div className="flex gap-x-3 relative group rounded-lg hover:bg-white drop-shadow-md">
						<div className="relative last:after:hidden after:absolute after:top-0 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200">
							<div className="relative z-10 w-7 h-7 flex justify-center items-center">
								<div className="w-2 h-2 rounded-full bg-white border-2 border-gray-300 group-hover:border-gray-600"></div>
							</div>
						</div>
						<div className="grow p-2">
							<h3 className="flex gap-x-1.5 font-semibold text-gray-800">{proposal.title}</h3>
							{proposal.description && (
								<p className="mt-1 text-sm text-gray-600">{proposal.description}</p>
							)}
							<button
								type="button"
								className="mt-1 -ms-1 p-1 relative z-10 inline-flex items-center gap-x-2 text-sm rounded-lg border border-transparent font-semibold text-violet-500 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:pointer-events-none"
							>
								{proposal.votes} {proposal.votes === 1 || proposal.votes === 0 ? 'Vote' : 'Votes'}
							</button>
						</div>
						<div className="inline-flex place-self-center m-3 flex-col h-fit gap-1">
							<button className="inline-flex justify-between items-center py-1 px-3 w-24 h-fit place-self-center gap-2 whitespace-nowrap border border-transparent bg-primary shadow-sm text-white hover:bg-black  disabled:opacity-50 disabled:pointer-events-none rounded-full">
								Cast
								<Image alt="farcaster logo" src="/farcaster.svg" width={20} height={20} />
							</button>
							{/* <ProposalDrawer proposal={proposal} /> */}
						</div>
						<div className="inline-flex place-self-center m-3 flex-col h-fit border border-gray-200 bg-secondary shadow-sm rounded-full p-0.5">
							<button
								type="button"
								className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<svg
									className="flex-shrink-0 h-4 w-4"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M7 10v12" />
									<path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
								</svg>
							</button>
							<button
								type="button"
								className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<svg
									className="flex-shrink-0 h-4 w-4"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M17 14V2" />
									<path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
								</svg>
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default Timeline