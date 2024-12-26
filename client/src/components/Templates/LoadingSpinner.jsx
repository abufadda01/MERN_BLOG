const LoadingSpinner = () => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-white-200 relative">
			<div className="absolute inset-0 bg-whie backdrop-blur-sm z-0"></div>
			<div className="relative z-10">
				<div className="w-40 h-40 border-orange-200 border-4 rounded-full"></div>
				<div className="w-40 h-40 border-orange-500 border-t-4 animate-spin rounded-full absolute left-0 top-0"></div>
				<div className="sr-only">Loading</div>
			</div>
		</div>
	);
};

export default LoadingSpinner;
