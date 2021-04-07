const { WsProvider, ApiPromise } = require('@polkadot/api');
const pdKeyring = require('@polkadot/keyring');

class Actions {
  async create(mnemonic, url = 'wss://supercube.pro/ws') {
    const provider = new WsProvider(url);
    this.api = await ApiPromise.create({ provider });
    const keyring = new pdKeyring.Keyring({ type: 'sr25519' });
    this.account = keyring.addFromMnemonic(mnemonic);
  }

  async sendDOTs(address, amount = 100) {
    amount = amount * 10**12;
    const transfer = this.api.tx.balances.transfer(address, amount);
    const hash = await transfer.signAndSend(this.account);

    return hash.toHex();
  }

  async checkBalance() {
    let { data: { free: previousFree }, nonce: previousNonce } = await this.api.query.system.account(this.account.address)
    return previousFree
  }
}

module.exports = Actions;
