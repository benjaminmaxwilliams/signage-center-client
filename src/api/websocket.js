import SockJS from 'sockjs-client';
import Stomp from '@stomp/stompjs';

const stompClient = Stomp.over(() => new SockJS(process.env.REACT_APP_WEBSOCKET_HOST));
stompClient.reconnect_delay = 60000; // one minute

export default stompClient;

