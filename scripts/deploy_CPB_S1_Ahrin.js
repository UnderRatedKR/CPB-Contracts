const hardhat = require("hardhat");

function klaytnTxWait() {
  return new Promise(resolve => setTimeout(resolve, 5000));
}

async function main() {
  const baseURI = 'https://cpb-nft.s3.ap-northeast-2.amazonaws.com/metadata/'
  const teamAddress = '0x49049ff9e067300268EB4cc6D1683BAFD88AA37a'//테스트용 Kaikas 5번

  const CPB = await hardhat.ethers.getContractFactory("CPB_S1_Ahrin");
  const cpb = await CPB.deploy(baseURI);

  await cpb.deployed();
  console.log("CPB_S1_Ahrin deployed to:", cpb.address);

  //팀 보유 리저브 물량 초기 민팅
  let reserve = []
  for (let i = 0; i < 200; i ++) {
    reserve.push(teamAddress);
  }
  await cpb.safeBatchMint(reserve);

  await klaytnTxWait();
  console.log("premint succ, totalSupply : " + await cpb.totalSupply());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });