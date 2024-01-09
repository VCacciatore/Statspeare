import requests
import pandas as pd
import numpy as np

# official codes for plays via the Folgers API System
PlayCodes = ['AWW', 'Ant', 'AYL', 'Err', 'Cor', 'Cym', 'Ham',
'1H4', '2H4', 'H5', '1H6', '2H6', '3H6', 'H8', 'JC', 'Jn', 'Lr',
'LLL', 'Mac', 'MM', 'MV', 'Wiv', 'MND', 'Ado', 'Oth', 'Per', 'R2',
'R3', 'Rom', 'Shr', 'Tmp', 'Tim', 'Tit', 'Tro', 'TN', 'TGV', 'TNK', 'WT']

# calculate a character's percentage of words in a particular play
def calcPercentages(playData):
    totalWords = playData['Words'].sum()
    wordCounts = playData['Words']
    playPercents = []
    for e in wordCounts:
        playPercents.append(e / totalWords)
    return playPercents

# read csv from scraping
df = pd.read_csv('statspeare.csv')

allPercents = []

# grab all characters in a play
for play in PlayCodes:
    playData = df[df['Play'] == play]
    allPercents = allPercents + calcPercentages(playData)

# add percentage column to dataframe
df['Percent of Words in Play'] = allPercents
df.to_csv("statspeare.csv", index=False) 





        