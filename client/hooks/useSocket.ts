import { useContext } from "preact/hooks";
import { Socket } from "socket.io-client";
import { SocketContext, SocketContextValue } from "../contexts/socket";
import noop from "../util/noop";

type Listener = (event: string, handler: (...args: Array<any>) => void) => void;

const useSocket = (): SocketContextValue => {
	const value = useContext(SocketContext);

	if (import.meta.env.SSR) {
		return {
			isConnected: false,
			socket: {
				on: noop,
				off: noop,
				once: noop,
				emit: noop,
			} as unknown as Socket,
		};
	} else {
		return value;
	}
};

export default useSocket;