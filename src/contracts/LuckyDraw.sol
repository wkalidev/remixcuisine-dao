// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title RemixCuisine Daily Lucky Draw
 * @notice Un contrat de loterie quotidienne avec paiement en USDC
 * @dev Utilise Chainlink VRF pour la randomisation (à implémenter)
 */
contract LuckyDraw is Ownable, ReentrancyGuard {
    IERC20 public immutable usdc;
    
    uint256 public constant ENTRY_FEE = 100000; // 0.1 USDC (6 decimals)
    uint256 public constant DAO_FEE_PERCENT = 10; // 10% pour le DAO
    
    struct Draw {
        uint256 prizePool;
        uint256 totalEntries;
        address[] participants;
        address winner;
        uint256 winAmount;
        uint256 timestamp;
        bool completed;
    }
    
    struct Winner {
        address winner;
        uint256 amount;
        uint256 timestamp;
    }
    
    // État du draw actuel
    Draw public currentDraw;
    
    // Historique des winners
    Winner[] public winners;
    
    // Mapping pour vérifier si une adresse a déjà participé aujourd'hui
    mapping(address => uint256) public lastParticipation;
    
    // Treasury du DAO
    address public daoTreasury;
    
    // Events
    event EnteredDraw(address indexed participant, uint256 amount);
    event WinnerSelected(address indexed winner, uint256 amount);
    event DrawCompleted(uint256 indexed drawId, address winner, uint256 prize);
    
    constructor(address _usdc, address _daoTreasury) Ownable(msg.sender) {
        require(_usdc != address(0), "Invalid USDC address");
        require(_daoTreasury != address(0), "Invalid treasury address");
        
        usdc = IERC20(_usdc);
        daoTreasury = _daoTreasury;
        
        // Initialize first draw
        _initializeDraw();
    }
    
    /**
     * @notice Entre dans le draw quotidien
     */
    function enterDraw() external nonReentrant {
        require(!currentDraw.completed, "Draw already completed");
        require(lastParticipation[msg.sender] < block.timestamp - 1 days, "Already participated today");
        
        // Transfer USDC from participant
        require(usdc.transferFrom(msg.sender, address(this), ENTRY_FEE), "Transfer failed");
        
        // Add to participants
        currentDraw.participants.push(msg.sender);
        currentDraw.prizePool += ENTRY_FEE;
        currentDraw.totalEntries++;
        
        lastParticipation[msg.sender] = block.timestamp;
        
        emit EnteredDraw(msg.sender, ENTRY_FEE);
    }
    
    /**
     * @notice Sélectionne un gagnant (seulement par l'owner)
     * @dev Dans une version production, utiliser Chainlink VRF pour la randomisation
     */
    function selectWinner() external onlyOwner nonReentrant {
        require(!currentDraw.completed, "Draw already completed");
        require(currentDraw.participants.length > 0, "No participants");
        
        // Simple randomization (UNSAFE for production - use Chainlink VRF)
        uint256 randomIndex = uint256(keccak256(abi.encodePacked(
            block.timestamp,
            block.prevrandao,
            currentDraw.participants.length
        ))) % currentDraw.participants.length;
        
        address winner = currentDraw.participants[randomIndex];
        
        // Calculate prizes
        uint256 daoFee = (currentDraw.prizePool * DAO_FEE_PERCENT) / 100;
        uint256 winnerPrize = currentDraw.prizePool - daoFee;
        
        // Transfer prizes
        require(usdc.transfer(winner, winnerPrize), "Winner transfer failed");
        require(usdc.transfer(daoTreasury, daoFee), "DAO transfer failed");
        
        // Update draw state
        currentDraw.winner = winner;
        currentDraw.winAmount = winnerPrize;
        currentDraw.completed = true;
        currentDraw.timestamp = block.timestamp;
        
        // Add to winners history
        winners.push(Winner({
            winner: winner,
            amount: winnerPrize,
            timestamp: block.timestamp
        }));
        
        emit WinnerSelected(winner, winnerPrize);
        emit DrawCompleted(winners.length - 1, winner, winnerPrize);
        
        // Start new draw
        _initializeDraw();
    }
    
    /**
     * @notice Initialise un nouveau draw
     */
    function _initializeDraw() internal {
        currentDraw = Draw({
            prizePool: 0,
            totalEntries: 0,
            participants: new address[](0),
            winner: address(0),
            winAmount: 0,
            timestamp: block.timestamp,
            completed: false
        });
    }
    
    /**
     * @notice Get current prize pool
     */
    function getCurrentPrizePool() external view returns (uint256) {
        return currentDraw.prizePool;
    }
    
    /**
     * @notice Get total entries for current draw
     */
    function getTotalEntries() external view returns (uint256) {
        return currentDraw.totalEntries;
    }
    
    /**
     * @notice Get winner info by index
     */
    function getWinner(uint256 index) external view returns (address, uint256, uint256) {
        require(index < winners.length, "Invalid index");
        Winner memory w = winners[index];
        return (w.winner, w.amount, w.timestamp);
    }
    
    /**
     * @notice Get total number of winners
     */
    function getTotalWinners() external view returns (uint256) {
        return winners.length;
    }
    
    /**
     * @notice Update DAO treasury address
     */
    function updateDaoTreasury(address _newTreasury) external onlyOwner {
        require(_newTreasury != address(0), "Invalid address");
        daoTreasury = _newTreasury;
    }
    
    /**
     * @notice Emergency withdraw (only owner)
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = usdc.balanceOf(address(this));
        require(usdc.transfer(owner(), balance), "Transfer failed");
    }
}
