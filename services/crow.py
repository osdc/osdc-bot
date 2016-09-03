import urllib.request
import json
def message(var):
    country=''
    humidity=''
    max_temp=0
    min_temp=0
    weather=''
    city=var
    url="http://api.openweathermap.org/data/2.5/weather?q="+city+'&APPID=5ce8ec77d11e6b31bbca4a128afd3b6d'
    con = urllib.request.urlopen(url).read()
    ht = con.decode("utf-8")
    js=json.loads(ht)
    country=js['sys']['country']
    humidity=js['main']['humidity']

    max_temp=js['main']['temp_max']
    min_temp=js['main']['temp_min']
    return city+' situated in '+country+' is experiencing rainfall of'+weather+' weather with a humidity of'+str(humidity)+' and range from '+str(max_temp)+' to '+str(min_temp)

