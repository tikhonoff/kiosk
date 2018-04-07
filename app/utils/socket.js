import io from 'socket.io-client';
import { assign } from 'lodash';

const connState = {
  connected: false,
};

const state = {
  conn1: assign(connState),
  conn2: assign(connState),
};

const conn1 = io('http://10.1.1.31:3500');
const conn2 = io('http://10.1.1.32:3500');

function onConnect(conn) {
  state[conn].connected = true;
}

function onDisconnect(conn) {
  state[conn].connected = false;
}

conn1.on('connect', onConnect.bind(null, 'conn1'));
conn2.on('connect', onConnect.bind(null, 'conn2'));

conn1.on('disconnect', onDisconnect.bind(null, 'conn1'));
conn2.on('disconnect', onDisconnect.bind(null, 'conn2'));

const getActiveSocks = () => {
  const activeArray = [];
  if (state.conn1.connected) {
    activeArray.push(conn1);
  }
  if (state.conn2.connected) {
    activeArray.push(conn2);
  }
  return activeArray;
};

const emitCommand = (data) => {
  const activeSocks = getActiveSocks();
  let i = 0;
  activeSocks.forEach((sock) => {
    sock.emit('command', data);
    i += 1;
  });
  return i;
};

export {
  conn1,
  conn2,
  getActiveSocks,
  emitCommand,
};
