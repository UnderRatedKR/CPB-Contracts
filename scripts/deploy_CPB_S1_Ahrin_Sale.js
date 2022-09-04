const { parseUnits } = require("ethers/lib/utils");
const hardhat = require("hardhat");

async function main() {
  const CPB_S1_Ahrin_Baobab = '0xD92C7dd14E646203Bfde80f1D627C2c093c60748'
  const Vault = '0xe368931C7302372787cEA9Dc5C1927E8053342f2'

  const salePrice = parseUnits("2.5", "ether")//바오밥 판매가
  const CPB1_Sale = await ethers.getContractFactory("CPB_S1_Ahrin_Sale");
  let nowtime = Math.floor(Date.now() / 1000)
  const sale = await CPB1_Sale.deploy(
    CPB_S1_Ahrin_Baobab, //판매할 NFT
    salePrice,//판매가
    500, //판매수량
    Vault, //집금지갑
    true, //화리사용여부
    1662313200, //9/5 2시 40분
    1662337800 //9/5 9시 30분
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