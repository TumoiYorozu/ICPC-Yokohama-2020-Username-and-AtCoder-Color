import os
import requests
import pandas as pd
from bs4 import BeautifulSoup
import time
import datetime
import json
import pickle

import rating_utils

valid_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_'

pickle_path = 'atcoder.pickle'

pickle_atcoder = {}
if os.path.isfile(pickle_path):
    with open(pickle_path, 'rb') as f:
        pickle_atcoder = pickle.load(f)

asia_team_names = ["GridAndGrind",
 "kamaboko",
 "Antitled",
 "202 Accepted",
 "minKOstflow",
 "KIT",
 "Heno World",
 "KUB1",
 "KUSunoki",
 "pppp",
 "incomplete",
 "Hyper Ryoma",
 "-O3",
 "TLE_WARK",
 "Positive_yellows",
 "seica is gone",
 "BiWACoder",
 "niu_mogu_mogu",
 "Highest_Minus484",
 "UT a.k.a Is",
 "KOMOREBI",
 "The atama",
 "oraCle_MaChine",
 "suzukaze_Aobayama",
 "Aobayama_dropout",
 "tonosama",
 "tSp",
 "KyopRo-jin",
 "SumimaSenDesita",
 "nowcow",
 "ATELIER 11",
 "NEET_aizu",
 "ThinkMET",
 "Cutting Tree",
 "shichifuku",
 "toxic",
 "Give us sociability",
 "MSB",
 "YUPC",
 "Royal Blue"]

def convertFromRatingToSpan(rating):
    if rating <= 0:
        return f"<span class='user-unrated'>{rating}</span>"
    elif rating < 400:
        return f"<span class='user-gray'>{rating}</span>"
    elif rating < 800:
        return f"<span class='user-brown'>{rating}</span>"
    elif rating < 1200:
        return f"<span class='user-green'>{rating}</span>"
    elif rating < 1600:
        return f"<span class='user-cyan'>{rating}</span>"
    elif rating < 2000:
        return f"<span class='user-blue'>{rating}</span>"
    elif rating < 2400:
        return f"<span class='user-yellow'>{rating}</span>"
    elif rating < 2800:
        return f"<span class='user-orange'>{rating}</span>"
    else:
        return f"<span class='user-red'>{rating}</span>"


def fetchUserPage(ulink):
    if (ulink in pickle_atcoder
        and datetime.datetime.now() - pickle_atcoder[ulink]['datetime']
            < datetime.timedelta(hours=12)):
        # print(f'pickle loaded    link: {ulink}', file=sys.stderr)
        response = pickle_atcoder[ulink]['response']
    else:
        time.sleep(0.2)
        print("ulink " + ulink)
        response = requests.get(ulink)
        if response.status_code == requests.codes.ok or response.status_code == requests.codes.not_found:
            pickle_atcoder[ulink] = {
                'response': response,
                'datetime': datetime.datetime.now()
            }

    return response


def getUserRate(username):
    if not username:
        return 0
    reqname = ''.join(c for c in username if c in valid_chars)
    if reqname == '':
        return 0

    ulink = f'https://atcoder.jp/users/{reqname}'
    response = fetchUserPage(ulink)
    if response.status_code != requests.codes.ok:
        ok = False
        if '@' in username:
            for s in username.split('@'):
                reqname = ''.join(c for c in s if c in valid_chars)
                if reqname != '':
                    ulink = f'https://atcoder.jp/users/{reqname}'
                    response = fetchUserPage(ulink)
                    if response.status_code == requests.codes.ok:
                        ok = True
                        break
        if not ok:
            return 0
    df = pd.read_html(response.text)
    if len(df) < 2:
        # unrated user
        return 0
    rating = df[1][df[1][0] == 'Rating'].iloc[0, 1]
    if '(Provisional)' in rating:
        rating = rating.replace('(Provisional)', '').replace(' ', '')
    return int(rating)


def getUserSpan(username, enableLink):
    if not username:
        return ''
    reqname = ''.join(c for c in username if c in valid_chars)
    if reqname == '':
        return username

    ulink = f'https://atcoder.jp/users/{reqname}'
    response = fetchUserPage(ulink)
    if response.status_code != requests.codes.ok:
        ok = False
        if '@' in username:
            for s in username.split('@'):
                reqname = ''.join(c for c in s if c in valid_chars)
                if reqname != '':
                    ulink = f'https://atcoder.jp/users/{reqname}'
                    response = fetchUserPage(ulink)
                    if response.status_code == requests.codes.ok:
                        ok = True
                        break
        if not ok:
            return username

    soup = BeautifulSoup(response.text, 'html.parser')
    uinfo = soup.select_one('a.username')
    icon = str(uinfo.previous_sibling.previous_sibling)
    if '//img.atcoder.jp/assets/icon/crown_' in icon:
        icon = icon.replace(
            '//img.atcoder.jp/assets/icon/crown_',
            'https://img.atcoder.jp/assets/icon/crown_'
        ) + ' '
    else:
        icon = ''
    if enableLink:
        return f"{icon}<a href='{ulink}'>{str(uinfo.span)}</a>"
    else:
        if icon.endswith(' '):
            icon = icon[:-1]
        return f'{icon}{str(uinfo.span)}'


url = 'https://jag-icpc.org/?2021%2FTeams%2FList'
df = pd.read_html(url)[1].fillna('')[5:].reset_index(drop=True)
df = df.rename(columns={'メンバー 1': 'メンバー1', 'コーチ，ココーチ': 'コーチ'})
res_df = df.copy()
user_columns = ['メンバー1', 'メンバー2', 'メンバー3', 'コーチ']
res_df['チームレート'] = ''
res_dict = {}
for i in range(len(df)):
    if(df['チーム名'][i] in asia_team_names):
    # if(True):
        for c in user_columns:
            username = df[c][i]
            res_df.loc[res_df.index[i], c] = getUserSpan(username, True)

        ratings = []
        for c in user_columns[:-1]:
            username = df[c][i]
            ratings.append(getUserRate(username))

        team_rating = int(rating_utils.aggregateRatings(ratings))
        rat = convertFromRatingToSpan(team_rating)
        res_df.loc[res_df.index[i], 'チームレート'] = rat
        spans = [rat]
        for c in user_columns:
            username = df[c][i]
            spans.append(getUserSpan(username, False).replace('"', "'"))

        res_dict[df['チーム名'][i]] = spans

res_df = res_df.reindex(
    columns=[
        'チーム名',
        '学校名',
        'チームレート',
        'メンバー1',
        'メンバー2',
        'メンバー3',
        'コーチ',
        'ひとこと等'
    ]
)

print(res_df)

print("\nCut Here!!!!\n")
for teamname in res_dict:
    if(True):
        # s = "\'{}\'\t:[\'{}\',\t\'{}\',\t\'{}\'],".format(teamname, res_df['メンバー 1'][idx], res_df['メンバー2'][idx], res_df['メンバー3'][idx])
        if (res_dict[teamname][4] == ""):
            s = "\t\"{}\"\t:[\"{}\", \"{} {} {}\"],".format(teamname, res_dict[teamname][0], res_dict[teamname][1], res_dict[teamname][2], res_dict[teamname][3])
        else:
            s = "\t\"{}\"\t:[\"{}\", \"{} {} {} ({})\"],".format(teamname, res_dict[teamname][0], res_dict[teamname][1], res_dict[teamname][2], res_dict[teamname][3], res_dict[teamname][4])
            # s = "\t\"{}\"\t:\"{}, {}, {} ({})\",".format(teamname, res_df['メンバー 1'][idx], res_df['メンバー2'][idx], res_df['メンバー3'][idx], res_df['コーチ'][idx])
        print(s)
    else:
        print(res_dict[teamname])
        pass
