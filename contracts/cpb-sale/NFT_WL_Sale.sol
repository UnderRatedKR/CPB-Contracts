// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../openzeppelin-contracts/access/Ownable.sol";
import "../openzeppelin-contracts/token/ERC721/ERC721.sol";

contract NFT_WL_Sale is Ownable{

    event SetSaleStartTime(uint256 saleStartTime);
    event SetSaleNft(ERC721 nft);
    event SetSalePrice(uint256 price);
    event SetSaleLimit(uint256 limit);
    event SetVault(address vault);
    event SetTxLimit(uint256 txlimit);

    uint256 public saleStartTime;
    ERC721 public nft; 
    uint256 public salePrice; 
    address payable public vault; 
    uint256 public saleLimit = 500; 
    uint256 public saleCount = 0; 
    uint256 public txLimit = 10; //tx당 최대 판매량
    mapping(address => bool) public whitelist; //구매 가능자

    
    constructor (
        ERC721 _nft,        //판매할 NFT
        uint256 _salePrice, //판매가 WEI
        uint256 _saleLimit, //최대 판매 수량
        address payable _vault      //대금 전송 지갑
        ) 
    {
        require(_vault != address(0), "vault cannot be assigned with a zero address.");
        require(_salePrice != 0, "please set the sale price.");

        setSaleNft(_nft);
        setSalePrice(_salePrice);
        setSaleLimit(_saleLimit);
        setVault(_vault);
    }


    function mintKlay(uint256 _quantity) public payable {
        require(_quantity >= 1, "Invalid quantity.");
        require(_quantity <= txLimit, "Exceed tx limit.");
        require(saleCount + _quantity <= saleLimit, "Exceed sale limit.");
        require(isWhitelist(msg.sender), "Not whitelist");
        require(msg.value == salePrice * _quantity, "Wrong value");

        uint256 i = 0;
        for (i; i < _quantity; i ++) {
            nft.safeMint(msg.sender);
        }
    }

    function setSaleStartTime(uint256 _saleStartTime) public onlyOwner {
        saleStartTime = _saleStartTime;
        emit SetSaleStartTime(_saleStartTime);
    }

    function setSaleNft(ERC721 _nft) public onlyOwner {
        nft = _nft;
        emit SetSaleNft(_nft);
    }

    function setSalePrice(uint256 _salePrice) public onlyOwner {   
        salePrice = _salePrice;
        emit SetSalePrice(_salePrice);
    }

    function setSaleLimit(uint256 _saleLimit) public onlyOwner {   
        saleLimit = _saleLimit;
        emit SetSaleLimit(_saleLimit);
    }

    function setVault(address payable _vault) public onlyOwner {
        vault = _vault;
        emit SetVault(_vault);
    }

    function setTxLimit(uint256 _txLimit) public onlyOwner {
        txLimit = _txLimit;
        emit SetTxLimit(_txLimit);
    }

    function setWhitelist(address[] calldata _wallet) public onlyOwner {
        for (uint256 i = 0; i < _wallet.length; i++) {
            whitelist[_wallet[i]] = true;
        }
    }

    function isWhitelist(address _wallet) public view returns (bool) {
        return whitelist[_wallet];
    }
}