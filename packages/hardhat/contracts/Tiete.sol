//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '@chainlink/contracts/src/v0.8/ChainlinkClient.sol';
import '@chainlink/contracts/src/v0.8/ConfirmedOwner.sol';

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

contract APIConsumer is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    // variable bytes(arbitrary-length raw byte data) returned in a single oracle response
    bytes public data;
    string public fanData;

    bytes32 private jobId;
    uint256 private fee;

    /**
     * @notice Initialize the link token and target oracle
     * @dev The oracle address must be an Operator contract for multiword response
     *
     *
     * Goerli Testnet details:
     * Link Token: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Oracle: 0xCC79157eb46F5624204f47AB42b3906cAA40eaB7 (Chainlink DevRel)
     * jobId: 7da2702f37fd48e5b1b9a5715e3509b6
     *
     */
    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0xCC79157eb46F5624204f47AB42b3906cAA40eaB7);
        jobId = '7da2702f37fd48e5b1b9a5715e3509b6';
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
    }

    /** ipfs://bafybeig3ceyi5wcxlkci74ynky4edneblrmqb3777evqmtedv4efb2qgii/?filename=1.json
    https://ipfs.io/ipfs/bafybeig3ceyi5wcxlkci74ynky4edneblrmqb3777evqmtedv4efb2qgii/?filename=1.json
    https://ipfs.io/ipfs/QmZgsvrA1o1C8BGCrx6mHTqR1Ui1XqbCrtbMVrRLHtuPVD?filename=big-api-response.json
    https://supporting-fan.vercel.app/callback/?code=AQCc7o-rAsm9s_r0iDhfWS5jAGbjIfkcb1z8sTmXXyLGi_VhWfqa9JWynKVOY0UM-fP8mCEDPHtrkPfa-l8HvF4Z56fo4yW2LP9Vyl6GeIookMF1sTo_SHkpUQtD82ZmLfeKm_aVCAq9Q7iVf1dGy5sZw96gVUmfsiXHoO4UcVK2GhvLosEl6vz-o8kcJ8_861ci_wVX9-W40VTcs9awtkCajdnh_NlDhJF-E8kQAKRl0bj0EuQ3qOQ2w4pDB-Zfv7w1IF_ou2rjQXgCyuYGKlh2aWiqkyeI7A2gjGsodMgzT_0JSFYSM01tIN7cP9qMbzSuDTrEpk1sqdy941vv3JU_1l0l-u7-YevemunldW8fPgd1u4_FrHLKlofUcBeSb9RWJ9o1nMOeBS3NguRLXErWD5Sn-8N4fFE51AIgotyaKAsTFeBp4nA27c-RjjVZyk-r3KhnTHoYri9qXEijtXwgiDnBZKdBXX_ylKnwBzJN-8hIam6tVbj0MWmZmJCGgw-ZBnQEAxBrKOcbJlGj-ViTxMBiT7HEZ7ox61A_dYKP5IOKf9mRoaCIzCluu4Ifjb1Kuh9s2EGjvLGx8WWRwirw1b9fxwQfJ7-k6C6hA5qa18TmpQ5sD4iqYVzufKHPscd5EJz98rqp6yauQu0Jc4gj9vXLVoVhjRUcmfbotrUZ93fpvrlMYaCkjhurPQlsLpXMrfp9P95BAxAfpo2FWjGU_odKAYDUPPo-kFfmHT9d
     * @notice Request variable bytes from the oracle
     */

     // If donated, save wallet address as whitelist and able to mint. 
    function requestBytes(/*string memory description*/) internal {
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfillBytes.selector);
        req.add(
            'get',
            'https://ipfs.io/ipfs/bafybeig3ceyi5wcxlkci74ynky4edneblrmqb3777evqmtedv4efb2qgii/?filename=1.json' //description
        );
        req.add('path', 'attributes, trait_type, stadium');
        sendChainlinkRequest(req, fee);
    }

    event RequestFulfilled(bytes32 indexed requestId, bytes indexed data);

    /**
     * @notice Fulfillment function for variable bytes
     * @dev This is called by the oracle. recordChainlinkFulfillment must be used.
     */
    function fulfillBytes(bytes32 requestId, bytes memory bytesData) public recordChainlinkFulfillment(requestId) {
        emit RequestFulfilled(requestId, bytesData);
        data = bytesData;
        fanData = string(data);
    }

    /**
     * Allow withdraw of Link tokens from the contract
     */
    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(link.transfer(msg.sender, link.balanceOf(address(this))), 'Unable to transfer');
    }
}

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Tiete is ERC721, ERC721Enumerable, ERC721URIStorage, APIConsumer {
    using Counters for Counters.Counter;

    using Strings for uint256;

    Counters.Counter private _tokenIdCounter;

    // Mappings
    mapping(address => bool) public whitelistedAddresses; //private


    // URI of assets (JSON file) on IPFS
    string public PROVENANCE_URI = "https://ipfs.io/ipfs/QmWLGKLUFYLVs8cswQu9Ti12GSHoswPJwdNnoKRW3ScKA5";

    // Extension of Meatadata to be viewable on Opensea
    string private constant BASE_EXTENSION = ".json";

    constructor() ERC721("FanToken", "FTK") {
        _tokenIdCounter.increment(); 
    }

    receive() external payable {}

    function donationForWhitelist() public payable {
        require(msg.value > 0.1 ether, 'Donation to small');
        (bool sent, ) = address(this).call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        whitelistedAddresses[msg.sender] = true;
    }

    // Prepare User data before minting.
    // function prepareNftData(string memory description) public returns(string memory){
    //     // requestBytes(description);
    //     return fanData;
    // }

    // function ovverrides by Dev
    // Set baseURI on deployment
    function _baseURI() internal view override returns (string memory) {
        return PROVENANCE_URI; 
    }

        // Modifiers
    // modifier whitelistedDonor() {
    //     require(whitelistedAddresses[msg.sender], 'Address not whitelisted');
    //     _;
    // } 
     function mintFanNFT() public {
        require(whitelistedAddresses[msg.sender], 'Address not whitelisted');

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, PROVENANCE_URI);      
     }

    function safeMint(address to, string memory uri) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
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
        require(_exists(tokenId), "ERC721Metadata: URI query error. Token nonexistent");
        return string(abi.encodePacked(PROVENANCE_URI, tokenId.toString(), BASE_EXTENSION));
        // return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
