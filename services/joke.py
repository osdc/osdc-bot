import urllib.request
import json
def message2():
    url='http://api.icndb.com/jokes/random'
    con = urllib.request.urlopen(url).read()
    ht = con.decode("utf-8")
    js=json.loads(ht)
    return js['value']['joke']


