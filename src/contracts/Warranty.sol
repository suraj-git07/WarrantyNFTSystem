// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; //using ERC721  as a base Standard(after removing the transfer and safe_transfer we can make a soulbound nft )
import "@openzeppelin/contracts/utils/Counters.sol"; // uisng counters to take a record of how much nft minted/Degree issued

contract Warranty is ERC721URIStorage {
    address public Shop_owner;

    using Counters for Counters.Counter;
    Counters.Counter public tokenId;

    // here ERC721 constructor({collection_name} ,{collection_symbol}) call first then our contract's constructor
    constructor() ERC721("WarrantyNFT", "WNFT") {
        Shop_owner = msg.sender;
    }

    // modifier that only owner can call that particular func
    modifier OwnerOnly() {
        require(msg.sender == Shop_owner);
        _;
    }

    // warranty issued to specific address fro a specific serial number item
    mapping(address => mapping(uint256 => bool)) public warrantyIssuedTo;

    mapping(uint256 => address) public tokenIdToPerson; // who one a specific token id

    mapping(uint256 => string) public tokenIdTotokenURI; // store torkenuri of each id

    mapping(uint256 => bool) public isValid; // any nft of specific id is valid or not

    mapping(uint256 => uint256) public validTill; // any nft of specific id is valid till

    //event for warrantyissue func
    event WarrantyIssue(
        address indexed _to,
        uint256 _serialID,
        uint256 _validTill,
        uint256 _tokenId,
        uint256 _time
    );

    // event for claimWarranty func
    event ClaimWarranty(
        address indexed _from,
        uint256 _tokenId,
        string _tokenURI,
        uint256 _serialID,
        uint256 _time
    );

    // owner can issue the nft  to a user for a specific product and return that issued id
    function warrantyIssue(
        address _to,
        uint256 _serialID,
        uint256 _validTill
    ) external OwnerOnly returns (uint256) {
        require(
            warrantyIssuedTo[_to][_serialID] != true,
            "warranty is issued already"
        );
        warrantyIssuedTo[_to][_serialID] = true;
        tokenId.increment(); //now not zero
        tokenIdToPerson[tokenId.current()] = _to; // setting the tokenId mapping
        validityIssue(tokenId.current(), _validTill); // issuing the validity

        emit WarrantyIssue(
            _to,
            _serialID,
            _validTill,
            tokenId.current(),
            block.timestamp
        );
        return tokenId.current();
    }

    // set the validity and and validtill( in sec) for any token Id;
    function validityIssue(uint256 _tokenId, uint256 _validTill)
        internal
        OwnerOnly
    {
        require(
            isValid[_tokenId] != true && validTill[_tokenId] == 0,
            "already valid"
        );

        isValid[_tokenId] = true;
        validTill[_tokenId] = block.timestamp + _validTill;
    }

    // user can claim his/her nft by adding the tokenID and tokenURI
    function claimWarranty(
        uint256 _tokenId,
        string memory _tokenURI,
        uint256 _serialID
    ) public returns (bool) {
        require(bytes(_tokenURI).length > 66, "enter corrent tokenURI");
        require(
            tokenIdToPerson[_tokenId] == msg.sender,
            "you are not the owner of this nft"
        );
        require(
            warrantyIssuedTo[msg.sender][_serialID] == true,
            "NO warranty is issued to you for that item"
        );
        require(validTill[_tokenId] >= block.timestamp, "validity over");

        _mint(msg.sender, _tokenId); // address , tokenId
        _setTokenURI(_tokenId, _tokenURI);
        tokenIdTotokenURI[_tokenId] = _tokenURI;

        warrantyIssuedTo[msg.sender][_serialID] = false; // not mint twice

        emit ClaimWarranty(
            msg.sender,
            _tokenId,
            _tokenURI,
            _serialID,
            block.timestamp
        );

        return true; // Id of the minted NFT
    }

    // function for checking the valid time for all  nfts and this function is called by gelato every specific interval
    function checkValid() public {
        for (uint256 i = 1; i <= tokenId.current(); i++) {
            if (validTill[i] >= block.timestamp) {} else {
                isValid[i] = false;
            }
        }
    }
}
