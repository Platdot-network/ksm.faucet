const mSDK = require('matrix-js-sdk');
const axios = require('axios');
const pdKeyring = require('@polkadot/keyring');
require('dotenv').config({ path: '.env' })

const bot = mSDK.createClient({
  baseUrl: 'https://matrix-client.matrix.org',
  accessToken: process.env.MATRIX_ACCESS_TOKEN,
  userId: process.env.MATRIX_USER_ID,
});

let ax = axios.create({
  baseURL: "http://localhost:5555",
});

const sendMessage = (roomId, msg) => {
  bot.sendEvent(
    roomId,
    'm.room.message',
    { 'body': msg, 'msgtype': 'm.text' },
    '',
    console.error,
  );
}

bot.on('RoomMember.membership', (_, member) => {
  if (member.membership === 'invite' && member.userId === '@hacpy:matrix.org') {
    bot.joinRoom(member.roomId).done(() => {
      console.log(`Auto-joined ${member.roomId}.`);
    });
  }
});

bot.on('Room.timeline', async (event, room) => {
  if (event.getType() !== 'm.room.message') {
    return; // Only act on messages (for now).
  }
  console.log(
    // the room name will update with m.room.name events automatically
    "(%s) %s :: %s", room.name, event.getSender(), event.getContent().body
  );
  const { content: { body }, event_id: eventId, room_id: roomId, sender } = event.event;

  let [action, arg0, arg1] = body.split(' ');

  if (action === '!balance') {
    const res = await ax.get('/balance');
    const balance = res.data;

    bot.sendHtmlMessage(roomId, `The faucet has ${balance / 10 ** 12} KSM remaining.`, `The faucet has ${balance / 10 ** 12} KSM remaining.`)
  }

  if (action === '!drip') {
    try {
      pdKeyring.decodeAddress(arg0);
    } catch (e) {
      sendMessage(roomId, `${sender} provided an incompatible address.`);
      return;
    }

    let amount = 100;
    if (sender.endsWith(':web3.foundation') && arg1) {
      amount = arg1;
    }

    const res = await ax.post('/bot-endpoint', {
      sender,
      address: arg0,
      amount,
    });

    if (res.data === 'LIMIT') {
      sendMessage(roomId, `${sender} has reached their daily quota. Only request twice per 24 hours.`);
      return;
    }

    bot.sendHtmlMessage(
      roomId,
      `Sent ${sender} ${amount} KSM. Extrinsic hash: ${res.data}.`,
    );
  }

  if (action === '!faucet') {
    sendMessage(roomId, `
Usage:
  !balance - Get the faucet's balance.
  !drip <Address> - Send 100 KSM to <Address>.
  !faucet - Prints usage information.`);
  }
});

bot.startClient(0);
