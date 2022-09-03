const hardhat = require("hardhat");

async function main() {
  const baseURI = 'https://cpb-nft.s3.ap-northeast-2.amazonaws.com/metadata/'


  const Cpb = await hardhat.ethers.getContractFactory("CelebPhotoBooksSeason1");
  const cpb = await Cpb.deploy(baseURI);

  await cpb.deployed();

  console.log("CelebPhotoBooksSeason1 deployed to:", cpb.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });