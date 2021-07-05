import { useContext } from "preact/hooks";
import { Socket } from "socket.io-client";
import { SocketContext, SocketContextValue } from "../contexts/socket";
import noop from "../util/noop";

const useSocket = (): SocketContextValue => {
	const value = useContext(SocketContext);

	if (value === undefined) {
		throw new Error(`useSocket() MUST be used within a <SocketProvider>`);
	}

	if (import.meta.env.SSR) {
		return {
			isConnected: false,
			socket: {
				on: noop,
				off: noop,
				once: noop,
				emit: noop,
			} as unknown as Socket,
			namespace: "/",
			setNamespace: noop,
		};
	} else {
		return value;
	}
};

export default useSocket;
