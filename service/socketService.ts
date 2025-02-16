// services/socketService.ts
import { io, Socket, ManagerOptions, SocketOptions } from "socket.io-client";

class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;

  private constructor() {}

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public connect(url: string, options: Partial<ManagerOptions & SocketOptions> = {}): Socket {
    if (!this.socket) {
      this.socket = io(url, {
        transports: ["websocket"], // prioritize WebSocket
        ...options,
      });
      this.initializeListeners();
    }
    return this.socket;
  }

  private initializeListeners(): void {
    if (!this.socket) return;
    this.socket.on("connect", () => {
      console.log("Socket connected:", this.socket?.id);
    });
    // Additional common listeners can be added here
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      console.log("Socket disconnected");
    }
  }

  public on(event: string, callback: (...args: any[]) => void): void {
    if (this.socket) this.socket.on(event, callback);
  }

  public off(event: string, callback?: (...args: any[]) => void): void {
    if (this.socket) this.socket.off(event, callback);
  }

  public emit(event: string, data?: any): void {
    if (this.socket) this.socket.emit(event, data);
  }
}

const socketService = SocketService.getInstance();
export default socketService;
