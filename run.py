import requests
import pandas
from bs4 import BeautifulSoup
import time
import datetime

valid_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_'

asia_team_names = ["harahara", 
"Flip-Flop C", 
"indian_curry", 
"HiCoder", 
"tsutaj", 
"O-Jaws", 
"Antitled", 
"AtKoder", 
"Give us the chair!", 
"Heno World", 
"salada", 
"TigerSone.", 
"noborito290yen", 
"inherited nya-n", 
"XENT", 
"appeared", 
"Planet Samarn", 
"onions", 
"xjubi_chanx", 
"seica on the border", 
"niu_mogu_mogu", 
"Naphi", 
"___ KING ___", 
"QWE_QWE", 
"The atama", 
"Aobayama_dropout", 
"Aobayama_sugarstep", 
"good_yamikin", 
"Poyashi", 
"NITTC_overslept", 
"ATELIER", 
"nowcow", 
"Simulated Annealing", 
"eat_ice", 
"ThinkMET", 
"potetisensei", 
"shichifuku", 
"CEDARY", 
"UHISHIRO", 
"Chabashira"]

def getUserSpan(username):
    username = username.replace('@', '')
    if not username:
        return ''
    reqname = ''.join([c for c in username if c in valid_chars])
    if reqname == '':
        return username
    ulink = f'https://atcoder.jp/users/{reqname}'
    req = requests.get(ulink)
    if not req.status_code == requests.codes.ok:
        return username
    soup = BeautifulSoup(req.text, 'html.parser')
    uinfo = soup.select_one('a.username span')
    return f'<a href="{ulink}">{str(uinfo)}</a>'


url = 'https://jag-icpc.org/?2021%2FTeams%2FList'

df = pandas.read_html(url)[1].fillna('')[5:].reset_index(drop=True)
res_df = df.copy()
user_columns = ['メンバー 1', 'メンバー2', 'メンバー3', 'コーチ，ココーチ']



for idx,teamname in enumerate(df['チーム名']):
    # if(teamname in asia_team_names):
    if(True):
        for c in user_columns:
            username = res_df[c][idx]
            res_df[c][idx] = getUserSpan(username).replace("\"", "'")
            time.sleep(0.1)
            print(username, res_df[c][idx])

print("\nCut Here!!!!\n")
for idx,teamname in enumerate(df['チーム名']):
    if(True):
        # s = "\'{}\'\t:[\'{}\',\t\'{}\',\t\'{}\'],".format(teamname, res_df['メンバー 1'][idx], res_df['メンバー2'][idx], res_df['メンバー3'][idx])
        if (res_df['コーチ，ココーチ'][idx] == ""):
            s = "\t\"{}\"\t:\"{}, {}, {}\",".format(teamname, res_df['メンバー 1'][idx], res_df['メンバー2'][idx], res_df['メンバー3'][idx])
        else:
            s = "\t\"{}\"\t:\"{}, {}, {} ({})\",".format(teamname, res_df['メンバー 1'][idx], res_df['メンバー2'][idx], res_df['メンバー3'][idx], res_df['コーチ，ココーチ'][idx])
        print(s)
    else:
        # print(teamname)
        pass

