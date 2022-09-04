// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "./openzeppelin-contracts/access/Ownable.sol";
import "./CPB_S1_Ahrin.sol";

contract CPB_S1_Ahrin_Sale is Ownable{

    event SetSaleStartTime(uint256 saleStartTime);
    event SetSaleEndTime(uint256 saleEndTime);
    event SetSaleNft(ERC721 nft);
    event SetSalePrice(uint256 salePrice);
    event SetSaleLimit(uint256 saleLimit);
    event SetSaleCount(uint256 saleCount);
    event SetVault(address vault);
    event SetTxLimit(uint256 txlimit);
    event SetUseWhitelist(bool useWhitelist);

    uint256 public saleStartTime;
    uint256 public saleEndTime;
    CPB_S1_Ahrin public cpb; 
    uint256 public salePrice; 
    address payable public vault; 
    uint256 public saleLimit = 500; 
    uint256 public saleCount = 0; 
    uint256 public txLimit = 10; //tx당 최대 판매량
    bool public useWhitelist;
    mapping(address => bool) public whitelist; //구매 가능자

    
    constructor (
        CPB_S1_Ahrin _cpb,             //판매할 NFT
        uint256 _salePrice,      //판매가 WEI
        uint256 _saleLimit,      //최대 판매 수량
        address payable _vault,  //대금 전송 지갑
        bool _useWhitelist,       //화리 기능 사용여부
        uint256 _saleStartTime,    //세일시작시간
        uint256 _saleEndTime    //세일종료시간
        ) 
    {
        require(_vault != address(0), "vault cannot be assigned with a zero address.");
        require(_salePrice != 0, "please set the sale price.");

        setSaleNft(_cpb);
        setSalePrice(_salePrice);
        setSaleLimit(_saleLimit);
        setVault(_vault);
        setUseWhitelist(_useWhitelist);
        setSaleStartTime(_saleStartTime);
        setSaleEndTime(_saleEndTime);
    }


    function mint(uint256 _quantity) public payable {
        require(block.timestamp > saleStartTime, "Before sale start.");
        require(block.timestamp < saleEndTime, "Sale has ended.");
        require(saleCount + _quantity <= saleLimit, "Exceed sale limit.");
        require(_quantity >= 1, "Invalid quantity.");
        require(_quantity <= txLimit, "Exceed tx limit.");
        require(msg.value == salePrice * _quantity, "Wrong value");

        if(useWhitelist){
            require(isWhitelist(msg.sender), "Not whitelist");
        }

        uint256 i = 0;
        for (i; i < _quantity; i ++) {
            cpb.safeMint(msg.sender);
        }

        saleCount = saleCount + _quantity;
    }

    function setSaleStartTime(uint256 _saleStartTime) public onlyOwner {
        saleStartTime = _saleStartTime;
        emit SetSaleStartTime(_saleStartTime);
    }

    function setSaleEndTime(uint256 _saleEndTime) public onlyOwner {
        saleEndTime = _saleEndTime;
        emit SetSaleEndTime(_saleEndTime);
    }

    function setSaleNft(CPB_S1_Ahrin _cpb) public onlyOwner {
        cpb = _cpb;
        emit SetSaleNft(_cpb);
    }

    function setSalePrice(uint256 _salePrice) public onlyOwner {   
        salePrice = _salePrice;
        emit SetSalePrice(_salePrice);
    }

    function setSaleLimit(uint256 _saleLimit) public onlyOwner {   
        saleLimit = _saleLimit;
        emit SetSaleLimit(_saleLimit);
    }

    function setSaleCount(uint256 _saleCount) public onlyOwner {
        require(_saleCount <= saleLimit, "saleCount must be less than or equal to saleLimit.");
        require(_saleCount > saleCount, "saleCount cannot be decremented.");
        saleCount = _saleCount;
        emit SetSaleCount(_saleCount);
    }

    function setVault(address payable _vault) public onlyOwner {
        vault = _vault;
        emit SetVault(_vault);
    }

    function setTxLimit(uint256 _txLimit) public onlyOwner {
        txLimit = _txLimit;
        emit SetTxLimit(_txLimit);
    }

    function setUseWhitelist(bool _useWhitelist) public onlyOwner {
        useWhitelist = _useWhitelist;
        emit SetUseWhitelist(_useWhitelist);
    }

    function addWhitelist(address[] calldata _wallet) public onlyOwner {
        for (uint256 i = 0; i < _wallet.length; i++) {
            whitelist[_wallet[i]] = true;
        }
    }

    function removeWhitelist(address[] calldata _wallet) public onlyOwner {
        for (uint256 i = 0; i < _wallet.length; i++) {
            whitelist[_wallet[i]] = false;
        }
    }

    function isWhitelist(address _wallet) public view returns (bool) {
        return whitelist[_wallet];
    }
}