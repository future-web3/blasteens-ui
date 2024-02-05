export const GET_SCORE_UPDATEDS = `
    query getLatestScoreUpdatedByGameName($fromBlock: Int) {
        scoreUpdateds(
        orderBy: blockNumber,
        orderDirection: desc
    ) {
        id
        gameName
        gameId
        user
        score
        round_gameRound
        round_end
        round_claimPeriod
        gameLeaderboardInfo
        blockNumber
        }
    }`
