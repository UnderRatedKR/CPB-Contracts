const hardhat = require("hardhat");

async function main() {
  const baseURI = 'https://cpb-nft.s3.ap-northeast-2.amazonaws.com/metadata/'


  const CPB = await hardhat.ethers.getContractFactory("CPB_S1_Ahrin");
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