import { useEffect } from "preact/hooks";

const useIsomorphicEffect: typeof useEffect = (cb, deps) => {
	if (import.meta.env.SSR) {
		const unsubscribe = cb();

		if (unsubscribe && typeof unsubscribe === "function") {
			unsubscribe();
		}
	} else {
		useEffect(cb, deps);
	}
};

export default useIsomorphicEffect;
