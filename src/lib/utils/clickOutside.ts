/** Dispatch event on click outside of node */
export const clickOutside = (node: HTMLElement, callback: () => void): { destroy: () => void } => {
	const handleClick = (event: MouseEvent) => {
		if (node && !node.contains(event.target as Node)) {
			callback();
		}
	};

	document.addEventListener('click', handleClick);

	return {
		destroy() {
			document.removeEventListener('click', handleClick);
		}
	};
};
