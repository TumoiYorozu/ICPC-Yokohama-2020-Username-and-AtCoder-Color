import math


def getWinProbability(ra, rb):
    return 1 / (1 + 10 ** ((rb - ra) / 400))


def aggregateRatings(teamRatings):
    left, right = 1, 1e4
    for _ in range(100):
        r = (left + right) / 2
        rWinsProbability = 1
        for rat in teamRatings:
            rWinsProbability *= getWinProbability(r, rat)
        rating = math.log10(1 / rWinsProbability - 1) * 400 + r
        if rating > r:
            left = r
        else:
            right = r

    return (left + right) / 2
