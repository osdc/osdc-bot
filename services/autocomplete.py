import urllib.request
import json
def message3(var):    
    key = 'AIzaSyC25RQflehd0mWD6mTTxWs_AcH6Gq1o4Q8'
    place = var
    url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+place+'&types=establishment&key='+key
    res=''
    con = urllib.request.urlopen(url).read()
    ht = con.decode("utf-8")
    js=json.loads(ht)
    for x in js['predictions']:
        res=res+x['description']+'\n'
        
    #print(x['description'])
#print ( js['predictions'])
    return res
