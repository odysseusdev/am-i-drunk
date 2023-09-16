import { useEffect } from "react";
import { useViewportSize } from "@mantine/hooks";

const useScroll = (handler: () => void) => {
	const viewportSize = useViewportSize();

	useEffect(() => {
		handler();

		window.addEventListener("scroll", handler);

		return () => window.removeEventListener("scroll", handler);
	}, [handler, viewportSize]);
};

export default useScroll;
