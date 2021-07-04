import { FunctionComponent } from "preact";
import { createContext } from "preact";
import { useMemo, useState, useEffect } from "preact/hooks";
import { io, Socket } from "socket.io-client";
import noop from "../util/noop";

export interface SocketContextValue {
	socket: Socket | null;
	isConnected: boolean;
}

export const SocketContext = createContext<SocketContextValue>({
	socket: null,
	isConnected: false,
});

export const SocketProvider: FunctionComponent = ({ children }) => {
	const [isConnected, setIsConnected] = useState(false);

	const socket = useMemo(() => {
		if (import.meta.env.SSR) {
			return null;
		} else {
			return io();
		}
	}, []);

	useEffect(() => {
		const handleConnect = () => {
			setIsConnected(true);
		};

		const handleDisconnect = () => {
			setIsConnected(false);
		};

		socket.on("connect", handleConnect);
		socket.on("disconnect", handleDisconnect);

		return () => {
			socket.off("connect", handleConnect);
			socket.off("disconnect", handleDisconnect);
		};
	}, []);

	return (
		<SocketContext.Provider value={{ socket, isConnected }}>
			{children}
		</SocketContext.Provider>
	);
};
