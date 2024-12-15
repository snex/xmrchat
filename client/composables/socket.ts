import { type Socket, io } from "socket.io-client";
import type { PaymentSocketMessage } from "~/types";

interface PaymentSocketOptions<T> {
  onTipEvent?: (...args: [T]) => any;
  onPaymentEvent?: (...args: [T]) => any;
  onPageTipEvent?: (...args: [T]) => any;
}

interface TipPaymentInitParams {
  query: any;
  path: string;
}

export const usePaymentSocket = <T>(options?: PaymentSocketOptions<T>) => {
  const socket = shallowRef<Socket | undefined>();
  const config = useRuntimeConfig();
  const connectionStatus = ref<
    "CONNECTED" | "DISCONNECTED" | "RECONNECTING" | undefined
  >(undefined);

  const init = (params?: TipPaymentInitParams) => {
    // const url = `${config.public.apiBaseUrl}/v1/pages/${params.slug}/ws/tips/${params.tipId}`;
    const url = `${config.public.apiBaseUrl}/${params?.path}`;

    console.log("creating socket-io with url", url);
    console.log(params);

    socket.value = io(url, {
      auth: params?.query,
    });
    runEvents();
  };

  const runEvents = () => {
    if (!socket.value) return;
    socket.value.on("connect", handleConnect);
    socket.value.on("disconnect", handleDisconnect);

    socket.value.on("payment", handlePaymentEvent);

    socket.value.on("tip", handleTipEvent);

    socket.value.on("newTip", handlePageTipEvent);
  };

  const handleConnect = () => {
    console.log("Socket Connected");
    connectionStatus.value = "CONNECTED";
  };
  const handleDisconnect = () => {
    console.log("Socket Disconnected");
    connectionStatus.value = "DISCONNECTED";
  };

  const handlePaymentEvent = (v: any) => {
    options?.onPaymentEvent?.(v);
  };

  const handleTipEvent = (v: any) => {
    options?.onTipEvent?.(v);
  };

  const handlePageTipEvent = (v: any) => {
    options?.onPageTipEvent?.(v);
  };

  const disconnect = () => {
    socket.value?.close();
    socket.value = undefined;
  };

  const reconnect = () => {
    socket.value?.connect();
  };

  return {
    init,
    disconnect,
    connectionStatus,
    reconnect,
  };
};
