const { parseUnits } = require("ethers/lib/utils");
const hardhat = require("hardhat");

async function main() {
  const CPB_S1_Ahrin_Baobab = '0xf2e4de8dc9abd2e7bb83c60a2119150ef4cc32b6'
  const Vault = '0xe368931C7302372787cEA9Dc5C1927E8053342f2'

  const salePrice = parseUnits("2.0", "ether")//바오밥 판매가
  const CPB1_Sale = await ethers.getContractFactory("CPB_S1_Ahrin_Sale");
  let nowtime = Math.floor(Date.now() / 1000)
  const sale = await CPB1_Sale.deploy(
    CPB_S1_Ahrin_Baobab, //판매할 NFT
    salePrice,//판매가
    500, //판매수량
    Vault, //집금지갑
    false, //바오밥 1차 테스트에서는 화이트리스트 사용을 하지 않는다.
    nowtime - 1000, //세일시작시간
    1662303600 //세일종료시간 9/5 00시
    );
  await sale.deployed();
  console.log("CPB1_Sale deployed to:", sale.address);

  //배포 후 해당 계약을 CPB_S1_Ahrin_Baobab의 민터로 등록해야 한다
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });