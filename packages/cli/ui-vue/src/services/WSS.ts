import { WS_PORT, WS_PATH } from '@ronan-try/cli-const/es';

export default new WebSocket(`ws://localhost:${WS_PORT}${WS_PATH}`);
