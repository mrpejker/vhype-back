//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * @title VSELF SBT collection smart contract
 * @notice This contract is intended to create & claim SBT collections.
 */
contract VSelfEvents is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event StartEvent(address userAddress, uint256 eventId);
    event StopEvent(address userAddress, uint256 eventId);
    event Checkin(address userAddress, uint256 eventId);

    /**
     * @notice Struct for NFT reward
     */
    struct Quest {
        string qrPrefixEnc;
        string rewardTitle;
        string rewardDescription;
        string rewardUri;
    }

    /**
     * @notice Struct for an action
     */
    struct EventAction {
        uint256 timestamp;
        address userAddress;
        bool actionStatus;
    }

    /**
     * @notice Struct for main event data
     */
    struct EventData {
        uint256 eventId;
        uint256 startTime;
        uint256 finishTime;
        uint256 totalUsers;
        address eventOwner;
        string eventName;
        string eventDescription;
        bool isAvailable;
    }

    /**
     * @notice Struct for an event stats
     */
    struct EventStats {
        uint256 totalActions;
        uint256 totalRewards;
        uint256 totalUsers;
        uint256 createdAt;
        uint256 stoppedAt;
        address[] participants;
    }

    /**
     * @notice Struct for a full event data
     */
    struct Event {
        EventData eventData;
        EventStats eventStats;
        Quest quest;
    }

    uint256 public eventCount;
    string public collectionName = "vSelf Events SBTs";
    string public collectionSymbol = "VSELF";

    mapping(uint256 => uint256) public _eventIdToEventIndex;
    mapping(uint256 => Quest) public _eventIdToQuest;
    mapping(uint256 => EventAction[]) public _eventIdToEventActions;
    mapping(uint256 => EventStats) public _eventIdToEventStats;
    mapping(uint256 => mapping(address => bool)) public _hasUserClaimedRewards;

    EventData[] public eventDatas;

    /**
     * @notice Constructor
     * @dev collectionName and collectionName must be set
     */
    constructor() ERC721(collectionName, collectionSymbol) {}

    /**
     * @notice Mint an NFT according to recipient address and token uri
     * @param _recipient: recipient address
     * @param _tokenURI: token uri
     * @dev Callable internally
     */
    function _mintNFT(
        address _recipient,
        string memory _tokenURI
    ) internal returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();

        _mint(_recipient, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        return newItemId;
    }

    /**
     * @dev Hook that is called before any token transfer. This includes minting and burning.
     * Overrided a standard _beforeTokenTransfer method to implement NTT.
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721) {
        require(
            from == address(0) || from == address(this) || to == address(0),
            "Non transferable"
        );
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    /**
     * @notice Start a new event
     * @param _eventName: name of the event
     * @param _eventDescription: description of the event
     * @param _startTime: the first time avaialble to claim reward
     * @param _finishTime: the end time avaialble to claim reward
     * @param _quest: the data for NFT reward
     * @dev Callable by users
     */
    function startEvent(
        string memory _eventName,
        string memory _eventDescription,
        uint256 _startTime,
        uint256 _finishTime,
        Quest memory _quest
    ) external {
        uint256 eventIndex = eventCount++;

        eventDatas.push();
        EventData storage newEventData = eventDatas[eventIndex];

        uint256 eventId = block.timestamp + block.number;

        newEventData.eventId = eventId;
        newEventData.startTime = _startTime;
        newEventData.finishTime = _finishTime;
        newEventData.totalUsers = 0;
        newEventData.eventOwner = msg.sender;
        newEventData.eventName = _eventName;
        newEventData.eventDescription = _eventDescription;
        newEventData.isAvailable = true;

        address[] memory emptyArray;

        _eventIdToEventIndex[eventId] = eventIndex;
        _eventIdToQuest[eventId] = _quest;
        _eventIdToEventStats[eventId] = EventStats({
            totalActions: 0,
            totalRewards: 0,
            totalUsers: 0,
            createdAt: block.timestamp,
            stoppedAt: block.timestamp,
            participants: emptyArray
        });

        emit StartEvent(msg.sender, eventId);
    }

    /**
     * @notice claim rewards according to eventId
     * @param _eventId: nonce of the event
     * @param _recipient: recipient address
     * @dev Callable by users
     */
    function checkin(uint56 _eventId, address _recipient) external {
        require(
            !_hasUserClaimedRewards[_eventId][_recipient],
            "Already claimed"
        );

        uint256 eventIndex = _eventIdToEventIndex[_eventId];
        EventData storage eventData = eventDatas[eventIndex];

        require(eventData.isAvailable, "Not time to claim. Already stopped.");

        require(
            eventData.finishTime > block.timestamp,
            "Not time to claim. Already finished."
        );

        eventData.totalUsers++;

        _eventIdToEventStats[_eventId].totalActions++;
        _eventIdToEventStats[_eventId].totalRewards++;
        _eventIdToEventStats[_eventId].totalUsers++;
        _eventIdToEventStats[_eventId].participants.push(_recipient);

        _eventIdToEventActions[_eventId].push(
            EventAction({
                timestamp: block.timestamp,
                userAddress: _recipient,
                actionStatus: true
            })
        );

        _mintNFT(_recipient, _eventIdToQuest[_eventId].rewardUri);
    }

    /**
     * @notice Stop a specific event according to eventId
     * @param _eventId: nonce of the event
     * @dev Callable by an event owner
     */
    function stopEvent(uint256 _eventId) external {
        uint256 eventIndex = _eventIdToEventIndex[_eventId];

        EventData storage eventData = eventDatas[eventIndex];

        require(
            msg.sender == eventData.eventOwner,
            "You are not an event owner."
        );

        eventData.isAvailable = false;
        _eventIdToEventStats[_eventId].stoppedAt = block.timestamp;

        emit StopEvent(msg.sender, _eventId);
    }

    /**
     * @notice Retrieve all ongoing event data
     * @param _fromIndex: the first index of event data to be retrieved
     * @param _limit: number of event data to be retrieved
     * @param _isAll: check whether retrieve all event data or not
     * @dev Callable by users
     */
    function getOngoingEventDatas(
        uint256 _fromIndex,
        uint256 _limit,
        bool _isAll
    ) external view returns (EventData[] memory) {
        if (_isAll) {
            return eventDatas;
        } else {
            EventData[] memory validEventDatas = new EventData[](_limit);

            for (uint i = 0; i < _limit; i++) {
                if (
                    eventDatas[_fromIndex + i].isAvailable &&
                    eventDatas[_fromIndex + i].finishTime > block.timestamp &&
                    (_fromIndex + i) < eventCount
                ) {
                    validEventDatas[i] = eventDatas[_fromIndex + i];
                }
            }

            return validEventDatas;
        }
    }

    /**
     * @notice Retrieve ongoing events
     * @param _fromIndex: the first index of events to be retrieved
     * @param _limit: number of events to be retrieved
     * @dev Callable by users
     */
    function getOngoingEvents(
        uint256 _fromIndex,
        uint256 _limit
    ) external view returns (Event[] memory) {
        Event[] memory validEvents = new Event[](_limit);

        for (uint i = 0; i < _limit; i++) {
            if (
                eventDatas[_fromIndex + i].isAvailable &&
                eventDatas[_fromIndex + i].finishTime > block.timestamp &&
                (_fromIndex + i) < eventCount
            ) {
                validEvents[i] = Event({
                    eventData: eventDatas[_fromIndex + i],
                    eventStats: _eventIdToEventStats[
                        eventDatas[_fromIndex + i].eventId
                    ],
                    quest: _eventIdToQuest[eventDatas[_fromIndex + i].eventId]
                });
            }
        }

        return validEvents;
    }

    /**
     * @notice Get an event data according to given event id
     * @param _eventId: nonce of the event
     * @dev Callable by users
     */
    function getEventData(
        uint256 _eventId
    ) external view returns (EventData memory) {
        uint256 eventIndex = _eventIdToEventIndex[_eventId];
        EventData memory eventData = eventDatas[eventIndex];

        return eventData;
    }

    /**
     * @notice Retrieve event actions according to given event id
     * @param _eventId: nonce of the event
     * @param _fromIndex: the first index of events to be retrieved
     * @param _limit: number of events to be retrieved
     * @dev Callable by users
     */
    function getEventActions(
        uint256 _eventId,
        uint256 _fromIndex,
        uint256 _limit
    ) external view returns (EventAction[] memory) {
        EventAction[] memory eventActions = new EventAction[](_limit);

        for (uint i = 0; i < _limit; i++) {
            if ((_fromIndex + i) < _eventIdToEventActions[_eventId].length) {
                eventActions[i] = _eventIdToEventActions[_eventId][
                    _fromIndex + 1
                ];
            }
        }

        return eventActions;
    }
}
