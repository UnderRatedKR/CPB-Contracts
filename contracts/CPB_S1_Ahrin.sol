// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "./openzeppelin-contracts/token/ERC721/ERC721.sol";
import "./openzeppelin-contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./openzeppelin-contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./openzeppelin-contracts/security/Pausable.sol";
import "./openzeppelin-contracts/access/Ownable.sol";
import "./openzeppelin-contracts/access/AccessControl.sol";
import "./openzeppelin-contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract CPB_S1_Ahrin is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, AccessControl, ERC721Burnable, Ownable {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    string private _baseTokenURI;
    uint256 public maxSupply = 1200;

    constructor(string memory baseTokenURI) ERC721("(Ahrin) CelebPhotobooks Season 1", "CPB") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _baseTokenURI = baseTokenURI;
    }

    function addMinter(address _newMinter) public onlyRole(MINTER_ROLE){
        _grantRole(MINTER_ROLE, _newMinter);
    }

    function removeMinter(address _minter) public onlyRole(MINTER_ROLE){
        _revokeRole(MINTER_ROLE, _minter);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string calldata newBaseTokenURI) public onlyOwner {
        _baseTokenURI = newBaseTokenURI;
    }

    function baseURI() public view returns (string memory) {
        return _baseURI();
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public onlyOwner {
        _setTokenURI(tokenId, _tokenURI);
    }

    function exists(uint256 tokenId) public view returns (bool) {
        return _exists(tokenId);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

/*
    function safeMint(address to, uint256 tokenId, string memory uri)
        public
        onlyRole(MINTER_ROLE)
    {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }
*/
    function safeMint(address to)
        public
        onlyRole(MINTER_ROLE)
    {
        require(totalSupply() < maxSupply, "exceeded max Supply.");
        _safeMint(to, totalSupply() + 1);
    }

    function safeBatchMint(address [] calldata toList) public {
        uint256 i = 0;

        for (i; i < toList.length; i ++) {
            safeMint(toList[i]);
        }
    }
    
    function safeBatchTransfer(address [] calldata toList, uint256 [] calldata tokenIdList) public {
        require(toList.length == tokenIdList.length, "Array length is different");
        uint256 i = 0;

        for (i; i < toList.length; i ++) {
            super.transferFrom(msg.sender, toList[i], tokenIdList[i]);
        }
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
