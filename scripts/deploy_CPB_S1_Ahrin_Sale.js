const { parseUnits } = require("ethers/lib/utils");
const hardhat = require("hardhat");

async function main() {
  const CPB_S1_Ahrin = '0xc2d60ac0CF0703A475cCd180F52E2c7E61dB5EC5'//메인넷 NFT계약
  const Vault = '0x790d743610686f9E0B873e72b61acFDdCffcf7FF'//team HW vault

  const salePrice = parseUnits("200", "ether")//메인넷 판매가
  const CPB1_Sale = await ethers.getContractFactory("CPB_S1_Ahrin_Sale");
  let nowtime = Math.floor(Date.now() / 1000)
  const sale = await CPB1_Sale.deploy(
    CPB_S1_Ahrin, //판매할 NFT
    salePrice,//판매가
    500, //판매수량
    Vault, //집금지갑
    true, //화리사용여부
    1662552000, // 2022년 9월 7일 수요일 오후 9:00:00 GMT+09:00
    1662638400 // 2022년 9월 8일 목요일 오후 9:00:00 GMT+09:00
    );
  await sale.deployed();
  console.log("CPB1_Sale deployed to:", sale.address);

  //배포 후 해당 계약을 CPB_S1_Ahrin 의 민터로 등록해야 한다
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });