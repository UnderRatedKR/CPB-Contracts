const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("cpb nft s1 test", function () {
  it("deploy", async function () {
    const provider = waffle.provider;
    const [deployer, vault, wl, wl2, not_wl] = provider.getWallets();

    //NFT 배포
    const CPB1 = await ethers.getContractFactory("CPB_S1");
    const cpb = await CPB1.deploy("https://test.com/");
    await cpb.deployed();
    //NFT 배포 끝

    //팀 보유 리저브 물량 배포
    let reserve = []
    for (let i = 0; i < 200; i ++) {
      reserve.push(deployer.address);
    }

    await cpb.safeBatchMint(reserve);
    expect(await cpb.totalSupply()).to.be.equal(200);
    //팀 보유 리저브 물량 배포 끝

    /*
    //최대발행 및 URI테스트
    await cpb.safeBatchMint(reserve);
    await cpb.safeBatchMint(reserve);
    await cpb.safeBatchMint(reserve);
    await cpb.safeBatchMint(reserve);
    await cpb.safeBatchMint(reserve);
    expect(await cpb.totalSupply()).to.be.equal(1200);
    expect(await cpb.tokenURI(1200)).to.be.equal("https://test.com/1200");
    await expect(cpb.safeMint(deployer.address)).to.be.revertedWith("exceeded max Supply.");
    //최대발행 및 URI테스트 끝
    */

    //NFT 세일 배포
    const CPB1_Sale = await ethers.getContractFactory("CPB_S1_Sale");
    const sale = await CPB1_Sale.deploy(
      cpb.address, //판매할 NFT
      "200000000000000000000",//판매가
      500, //판매수량
      vault.address, //집금지갑
      true);//화리기능사용여부
    await sale.deployed();

    //SALE 계약에 CPB 민터롤 지정
    await cpb.addMinter(sale.address);

    //화리추가
    await sale.addWhitelist([wl.address, wl2.address]);

    //민트테스트
    await sale.connect(wl).mint(2, {value : "400000000000000000000"});    
    await expect(sale.connect(wl2).mint(0, {value : "1"})).to.be.revertedWith("Invalid quantity.");
    await expect(sale.connect(wl2).mint(11, {value : "220000000000000000000"})).to.be.revertedWith("Exceed tx limit.");
    await expect(sale.connect(not_wl).mint(2, {value : "400000000000000000000"})).to.be.revertedWith("Not whitelist");


    //CPB1.removeMinter(CPB1_Sale.address);

  });
});
