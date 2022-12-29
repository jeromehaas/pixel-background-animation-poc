import { useEffect, useState, useRef } from 'react';

const Canvas = () => {

	// GET REFERENCE
	const canvasRef = useRef(null);

	// SETUP STATE
	const [dimensions, setDimensions ] = useState({ x: "0", y: "0"});
	const [context, setContext] = useState(null);

	// DEFINE OPTIONS
	const options = {
		padding: 30, 
		speed: 1500,
		size: { x: 1, y: 1 },
		colors: ['#ffffff', '#ffffff', '#a5a5a5', '#60ffcd', '#0a0a0a', '#0a0a0a', '#0a0a0a'],
		background: '#0a0a0a',
		alpha: 0.75
	};

	// GENERATE RANDOM COLOR
	const generateRandomColor = () => {
		const randomIndex = Math.ceil(Math.random() * options.colors.length) - 1;
		return options.colors[randomIndex];
	};

	// DRAW DOTS
	const draw = (verticalDots, horizontalDots) => {
		context.clearRect(0, 0, dimensions.x, dimensions.y)
		context.globalAlpha = 1;
		context.fillStyle = options.background;
		context.fillRect(0, 0, dimensions.x, dimensions.y);
		context.globalAlpha = options.alpha;
		for (let i = 0; i < horizontalDots; i++) {
			for (let j = 0; j < verticalDots; j++) {
				context.fillStyle = generateRandomColor()
				context.fillRect((j * options.padding) + 8, (i * options.padding) + 8, options.size.x, options.size.y);
			};
		};
	};

	// AFTER FIRST RENDER DEFINE CONTEXT
	useEffect(() => {
		if (canvasRef.current) {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext('2d');
			setContext(ctx);
		};
	}, []);

	// AFTERFIRST RENDER SETUP EVENTLISTENER TO OBSERVE WINDOW RESIZES
	useEffect(() => {
		const eventListener = window.addEventListener('resize', () => {
			const windowWidth = window.innerWidth;
			const windowHeight = window.innerHeight;
			setDimensions({ x: windowWidth, y: windowHeight });	
		});
		return () => window.removeEventListener('resize', eventListener);
}, []);

	// AFTER CONTEXT IS DEFINED GET DIMENSIONS
	useEffect(() => {
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;
		setDimensions({ x: windowWidth, y: windowHeight });
	}, [context]);
	
	// AFTER CONTEXT IS DEFINED AND/OR WINDOW IS RESIZED RUN INTERVAL TO DRAW DOTS
	useEffect(() => {
		if (!context) return;
		const verticalDots = (dimensions.x - 8) / options.padding;
		const horizontalDots = (dimensions.y - 8)/ options.padding;
		const interval = setInterval(() => draw(verticalDots, horizontalDots), options.speed);
		return () => clearInterval(interval);
	}, [context, dimensions]);

	return (
		<div className="canvas">
			<canvas className="canvas__art" ref={ canvasRef } width={ dimensions.x || 0 } height={ dimensions.y || 0 } /> 
		</div>
	);

};

export default Canvas;