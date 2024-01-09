import requests
import pandas
from bs4 import BeautifulSoup
import numpy as np

# official codes for plays via the Folgers system
PlayCodes = ['AWW', 'Ant', 'AYL', 'Err', 'Cor', 'Cym', 'Ham',
'1H4', '2H4', 'H5', '1H6', '2H6', '3H6', 'H8', 'JC', 'Jn', 'Lr',
'LLL', 'Mac', 'MM', 'MV', 'Wiv', 'MND', 'Ado', 'Oth', 'Per', 'R2',
'R3', 'Rom', 'Shr', 'Tmp', 'Tim', 'Tit', 'Tro', 'TN', 'TGV', 'TNK', 'WT']

# create table
df = pandas.DataFrame(columns=["Character", "Words", "Play"])

# actual webscraping
def webscrape(df, pc):
    # grab site and set scraper
    URL = "https://www.folgerdigitaltexts.org/" + pc + "/charText/"
    site = requests.get(URL)
    soup = BeautifulSoup(site.content, "html.parser")

    # grab table elements, extract strings
    table_entries = soup.find_all("div")
    table_entries_text = []
    for te in table_entries:
        table_entries_text.append(te.text)

    # loop through table entries, add to dataframe
    i = 2
    while(i < len(table_entries)):
        re = [table_entries_text[i+1], table_entries_text[i], pc]
        df.loc[len(df.index)] = re
        i += 2

# loop through each play getting wordcounts by character
for pc in PlayCodes:
    webscrape(df, pc)

# convert to csv
df.to_csv("statspeare.csv", index=False) 