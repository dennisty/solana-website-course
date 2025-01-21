import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

let publicKey;

const suppliedPublicKey = process.argv[2];
const network = process.argv[3];

if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}

if (network != "devnet" && network != "mainnet-beta") {
  throw new Error("Invalid network specified! Must be devnet or mainnet-beta.");
}

try {
  publicKey = new PublicKey(suppliedPublicKey);
} catch (error) {
  throw new Error(`${suppliedPublicKey} is an invalid public key!`);
}

const connection = new Connection(
  `https://api.${network}.solana.com`,
  "confirmed"
);

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
  `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
);
