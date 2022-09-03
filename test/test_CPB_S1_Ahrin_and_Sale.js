const { expect } = require("chai");
const { parseUnits, FormatTypes } = require("ethers/lib/utils");
const { ethers, waffle } = require("hardhat");


describe("cpb nft s1 ahrin test", function () {

  const CPB_S1_Ahrin_BaseURI = 'https://cpb-nft.s3.ap-northeast-2.amazonaws.com/metadata/'
  const provider = waffle.provider;
  const [deployer, vault, wl, wl2, not_wl] = provider.getWallets();
  
  it("deploy CPB S1 ahrin and Sale", async function () {

     //NFT 배포
     const CPB1 = await ethers.getContractFactory("CPB_S1_Ahrin");
     const cpb = await CPB1.deploy(CPB_S1_Ahrin_BaseURI);

     
     await cpb.deployed();
 
     //팀 보유 리저브 물량 초기 민팅
     let reserve = []
     for (let i = 0; i < 200; i ++) {
       reserve.push(deployer.address);
     }
     await cpb.safeBatchMint(reserve);
 
     //정상 민팅 확인
     expect(await cpb.totalSupply()).to.be.equal(200);
 
     //최대발행 및 URI테스트
     /*
     await cpb.safeBatchMint(reserve);
     await cpb.safeBatchMint(reserve);
     await cpb.safeBatchMint(reserve);
     await cpb.safeBatchMint(reserve);
     await cpb.safeBatchMint(reserve);
     expect(await cpb.totalSupply()).to.be.equal(1200);
     expect(await cpb.tokenURI(1200)).to.be.equal(CPB_S1_Ahrin_BaseURI + "1200");
     await expect(cpb.safeMint(deployer.address)).to.be.revertedWith("exceeded max Supply.");
     */
     
    const salePrice = parseUnits("2.0", "ether")
    console.log("salePrice : " + salePrice)

    //NFT 세일 배포
    const CPB1_Sale = await ethers.getContractFactory("CPB_S1_Ahrin_Sale");
    const sale = await CPB1_Sale.deploy(
      cpb.address, //판매할 NFT
      salePrice,//판매가
      500, //판매수량
      vault.address, //집금지갑
      true);//화리기능사용여부
    await sale.deployed();

    console.log("saleCount : " + await sale.saleCount());
    console.log("wl 2 balance : " + await provider.getBalance(wl2.address));

    //SALE 계약에 CPB 민터롤 지정
    await cpb.addMinter(sale.address);

    //화리추가
    await sale.addWhitelist([wl.address, wl2.address]);

    //민트테스트
    await sale.connect(wl).mint(5, {value : salePrice.mul(5)});

    //민트 예외케이스
    await expect(sale.connect(wl2).mint(0, {value : "1"})).to.be.revertedWith("Invalid quantity.");
    await expect(sale.connect(wl2).mint(11, {value : salePrice.mul(11)})).to.be.revertedWith("Exceed tx limit.");
    await expect(sale.connect(not_wl).mint(2, {value : salePrice.mul(2)})).to.be.revertedWith("Not whitelist");

    //490개 민팅하기
    for(let i = 0; i < 49; i++){
      await sale.connect(wl2).mint(10, {value : salePrice.mul(10)})
      //console.log("saleCount / saleLimit : " + await sale.saleCount() + " / " + await sale.saleLimit());
      //console.log("wl 2 balance : " + await provider.getBalance(wl2.address));
      //console.log("cpb totalSupply : " + await cpb.totalSupply());
    }

    //애매하게 남은 수량 마저 구매
    await expect(sale.connect(wl).mint(6, {value : salePrice.mul(6)})).to.be.revertedWith("Exceed sale limit.");
    await sale.connect(wl).mint(5, {value : salePrice.mul(5)})
    await expect(sale.connect(wl).mint(1, {value : salePrice.mul(1)})).to.be.revertedWith("Exceed sale limit.");

    console.log("saleCount / saleLimit : " + await sale.saleCount() + " / " + await sale.saleLimit());
    //console.log("wl 2 balance : " + await provider.getBalance(wl2.address));
    console.log("cpb totalSupply : " + await cpb.totalSupply());

    expect(await cpb.tokenURI(1)).to.be.equal(CPB_S1_Ahrin_BaseURI + "1");
    expect(await cpb.tokenURI(700)).to.be.equal(CPB_S1_Ahrin_BaseURI + "700");

  });
});
