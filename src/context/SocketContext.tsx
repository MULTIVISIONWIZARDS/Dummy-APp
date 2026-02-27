// import React, { createContext, useContext, useEffect, useRef } from "react";
// import io from "socket.io-client";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { SOCKET_URL } from "../constants/Constant";

// const SocketContext = createContext<any>(null);

// export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
//   const socketRef = useRef<any>(null);

//   useEffect(() => {
//     const initSocket = async () => {
//       const userId = await AsyncStorage.getItem("userId");
//       if (!userId) return;

//       socketRef.current = io(SOCKET_URL, {
//         transports: ["websocket"],
//       });

//       socketRef.current.on("connect", () => {
//         console.log("Socket connected:", socketRef.current.id);
//         socketRef.current.emit("registerUser", userId);
//       });
//     };

//     initSocket();

//     return () => {
//       socketRef.current?.disconnect();
//       socketRef.current = null;
//     };
//   }, []);

//   return (
//     <SocketContext.Provider value={socketRef}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export const useSocket = () => useContext(SocketContext);


import React, { createContext, useContext, useEffect, useRef } from "react";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SOCKET_URL } from "../constants/Constant";

const SocketContext = createContext<any>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const initSocket = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) return;

        const socket = io(SOCKET_URL, {
          transports: ["websocket"],
          timeout: 10000,
          reconnection: true,
          reconnectionAttempts: 5,
        });

        socket.on("connect", () => {
          console.log("Socket connected:", socket.id);
          socket.emit("registerUser", userId);
        });

        socket.on("connect_error", (err) => {
          console.log("Socket connection error:", err.message);
        });

        socket.on("error", (err) => {
          console.log("Socket error:", err);
        });

        if (isMounted) {
          socketRef.current = socket;
        }

      } catch (error) {
        console.log("Socket init failed:", error);
      }
    };

    initSocket();

    return () => {
      isMounted = false;
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);