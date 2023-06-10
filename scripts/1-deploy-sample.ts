import { Address } from "locklift";
import BigNumber from "bignumber.js";

async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  const initialSupply = 1000000;
  const decimals = 18;
  const owner = new Address("0:c9026e9823ccbfba1472b893b6c1fee057779e5df0042604db5df372b64cc962");
  const { contract: curious, tx } = await locklift.factory.deployContract({
    contract: "CuriousDev",
    publicKey: signer.publicKey,
    initParams: {
      _nonce: locklift.utils.getRandomNonce(),
      _owner: owner,
    },
    constructorParams: {
      distributedTokenRoot: new Address("0:f7eb120c17f99a11b22087fefd122de1a84f4e6cd92600e1b4d021322c7bdfb6"),
      supply: new BigNumber(initialSupply).shiftedBy(decimals).toFixed(),
      sendRemainingGasTo: owner,
    },
    value: locklift.utils.toNano(2),
  });

  console.log(`Curious Dev Tokens deployed at: ${curious.address}`);
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
