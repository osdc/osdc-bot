import nltk
from crow import message
from joke import message2
from autocomplete import message3
tagged_tokens={}
sentence='what is the location of TajMahal'
count=0
city=''
location=''
flag=0
flag2=0
flag3=0
words=nltk.word_tokenize(sentence)
tagged_tokens = nltk.pos_tag(words)
for x in tagged_tokens:
    if x[1]=='MD':
        if x[0]=='can':
            print("Of course I can")
        elif x[0]=='could':
            print("Of course I would")
        elif x[0]=='may':
            print("Of course I will")
        elif x[0]=='will':
            print("Of course I will")            
        else:
            print("Yeah Of course")
    if x[1]=='DT':
            if x[0]=='a':
                print("As many as you want baby")
    if x[1]=='NNP':
           
                city=x[0]
    if x[1]=='NN':
            if x[0]=='temperature':
                flag=1
            if x[0]=='location':
                flag3=1
            if x[0]=='joke':
                flag2=1

result=''
print(city)
if flag==1:
    result=message(city)
if flag2==1:
    result=message2()
if flag3==1:
    result=message3(city)
    
print(result)
#print(tagged_tokens)
                         
