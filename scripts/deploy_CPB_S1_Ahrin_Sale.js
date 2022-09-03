const hardhat = require("hardhat");

async function main() {
  const CPB_S1_Ahrin_Baobab = '0x75657BD85d7A8a0f5E296c4f449555B384E84d60'

  const CPB_S1_Ahrin_Sale = await hardhat.ethers.getContractFactory("CPB_S1_Ahrin_Sale");
  const cpb = await CPB.deploy(baseURI);

  await cpb.deployed();

  console.log("CPB_S1_Ahrin deployed to:", cpb.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });