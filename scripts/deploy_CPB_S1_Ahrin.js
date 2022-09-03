const hardhat = require("hardhat");

function klaytnTxWait() {
  return new Promise(resolve => setTimeout(resolve, 5000));
}

async function main() {
  const baseURI = 'https://cpb-nft.s3.ap-northeast-2.amazonaws.com/metadata/'
  const vaultAddress = '0xe368931C7302372787cEA9Dc5C1927E8053342f2'

  const CPB = await hardhat.ethers.getContractFactory("CPB_S1_Ahrin");
  const cpb = await CPB.deploy(baseURI);

  await cpb.deployed();
  console.log("CPB_S1_Ahrin deployed to:", cpb.address);

  await klaytnTxWait();

  //팀 보유 리저브 물량 초기 민팅
  let reserve = []
  for (let i = 0; i < 200; i ++) {
    reserve.push(vaultAddress);
  }
  await cpb.safeBatchMint(reserve);
  console.log("premint succ, totalSupply : " + await cpb.totalSupply());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });