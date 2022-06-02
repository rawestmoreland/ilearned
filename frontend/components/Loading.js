import PacmanLoader from 'react-spinners/PacmanLoader'

const Loading = ({ loading }) => {
	return (
		<div
			className={`${
				loading
					? 'flex items-center justify-center h-screen w-screen'
					: 'hidden'
			}`}
		>
			<PacmanLoader loading={loading} color='#FFD60A' />
		</div>
	)
}

export default Loading
