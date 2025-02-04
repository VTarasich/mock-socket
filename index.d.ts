// Type definitions for Mock Socket 8.X+
// Project: Mock Socket
// Definitions by: Travis Hoover <https://github.com/thoov/mock-socket>

declare module 'mock-socket' {
  // support TS under 3.5
  type _Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  class EventTarget {
    listeners: any;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions): void;
    dispatchEvent(evt: Event): boolean;
    removeEventListener(type: string, listener?: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
  }

  interface WebSocketCallbackMap {
    close: () => void;
    error: (err: Error) => void;
    message: (message: string | Blob | ArrayBuffer | ArrayBufferView) => void;
    open: () => void;
  }

  //
  // https://html.spec.whatwg.org/multipage/web-sockets.html#websocket
  //
  class WebSocket extends EventTarget {
    constructor(url?: string, protocols?: string|string[]);

    static readonly CONNECTING: 0;
    static readonly OPEN: 1;
    static readonly CLOSING: 2;
    static readonly CLOSED: 3;

    readonly url: string;

    readonly CONNECTING: 0;
    readonly OPEN: 1;
    readonly CLOSING: 2;
    readonly CLOSED: 3;
    readonly readyState: number;
    readonly bufferedAmount: number;

    onopen: (event: Event) => void;
    onerror: (event: Event) => void;
    onclose: (event: CloseEvent) => void;
    onmessage: (event: MessageEvent) => void;
    readonly extensions: string;
    readonly protocol: string;
    close(code?: number, reason?: string): void;

    binaryType: BinaryType;
    send(data: string | Blob | ArrayBuffer | ArrayBufferView): void;
  }

  interface Client extends _Omit<WebSocket, 'close'> {
    target: WebSocket;
    close(options?: CloseOptions): void;
    on<K extends keyof WebSocketCallbackMap>(type: K, callback: WebSocketCallbackMap[K]): void;
  }

  class Server extends EventTarget {
    constructor(url: string, options?: ServerOptions);

    readonly options?: ServerOptions;

    start(): void;
    stop(callback?: () => void): void;

    on(type: string, callback: (socket: Client) => void): void;
    close(options?: CloseOptions): void;
    emit(event: string, data: any, options?: EmitOptions): void;

    clients(): Client[];
    to(room: any, broadcaster: any, broadcastList?: object): ToReturnObject;
    in(any: any): ToReturnObject;
    simulate(event: string): void;

    public of(url: string): Server;
  }

  interface CloseOptions {
    code: number;
    reason: string;
    wasClean: boolean;
  }

  interface EmitOptions {
    websockets: Client[];
  }

  interface ToReturnObject {
    to: (chainedRoom: any, chainedBroadcaster: any) => ToReturnObject;
    emit(event: Event, data: any): void;
  }

  interface ServerOptions {
    verifyClient?: () => boolean;
    selectProtocol?: (protocols: string[]) => string | null;
  }
}
