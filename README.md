# Kusama Faucet 
This faucet is only used for the kusama testnet of the polkatdot project. I mainly updated some old APIs to make it work on kusama.But in fact, it can be used on all substrate-based chains.Therefore, if you want, you can also run a faucet yourself.
# Get testnet KSM
You can obtain KSM on our testnet by posting `!drip <KUSAMA_ADDRESS>` in the Matrix chatroom [#platdot-faucet:matrix.org](https://matrix.to/#/#platdot-faucet:matrix.org?via=matrix.org).
# Deploy your own faucet

Forever the first step to clone this project.Run the following command:

Clone:`git clone https://github.com/Platdot-network/ksm.faucet`

## Prepare Environment
- yarn
- Ubuntu18.04/20.04
### Install yarn

It is recommended to install Yarn through the npm package manager, which comes bundled with Node.js when you install it on your system.
Then according to the strong recommendation of npm official, we need to download Node.js and npm, preferably through nvm.
So let's download nvm first.

1.Install nvm

`wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash`

Run the above command to download nvm.
On Linux, after running the install script, if you get `nvm: command not found` or see no feedback from your terminal after you type `command -v nvm`, simply close your current terminal, open a new terminal, and try verifying again. Alternatively, you can run run the following commands for the different shells on the command line:

bash: `source ~/.bashrc`

zsh: `source ~/.zshrc`

ksh: `. ~/.profile`

These should pick up the `nvm` command.


2.Install Node.js and npm

To download, compile, and install the latest release of node, do this:

`nvm install node # "node" is an alias for the latest version`

you can at any time run the following command to get the latest supported npm version on the current node version:

`nvm install-latest-npm`

3.Install yarn

Once you have npm installed you can run the following both to install and upgrade Yarn:

`npm install --global yarn`

## Setup `.env`
To run this faucet service, you also need to configure some environment variables.
Don't worry, there are only 3 environment variables that need to be configured:

`MATRIX_USER_ID`: your Element user id, looks like `@alice:matrix.org`.

`MATRIX_ACCESS_TOKEN`: open `All settings`, enter `Help & About`, click `<click to reveal>`, copy it.

`MNEMONIC`: mnemonic phrase for your account as a faucet.

Now create a new file named `.env`, fill in the above variables like this：
```
MATRIX_USER_ID=your Element user id
MATRIX_ACCESS_TOKEN=your access token
MNEMONIC=your faucet mnemonic
```
## Run faucet service
Run the following command directly：

`yarn`

Then run two programs separately.

Run bot:

`yarn bot`

Run server:

`yarn backend`

# Reference
- [faucet-bot](https://github.com/w3f/faucet-bot)
- [nvm](https://github.com/nvm-sh/nvm)
- [yarn](https://classic.yarnpkg.com/en/docs/install#debian-stable)
