const hardhat = require("hardhat");

function klaytnTxWait() {
  return new Promise(resolve => setTimeout(resolve, 5000));
}

async function main() {
  //220905 mainnet deploy
  const baseURI = 'https://cpb-nft.s3.ap-northeast-2.amazonaws.com/metadata/'
  const teamAddress = '0x7dbDB1FaAbF8ff2B8D0C1fdfCD20b44B1335AaAE'//임시 팀지갑(뉴), 추후 HW이전예정

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