from flask import Flask
from flask import request
import soldier
import nltk, re, pprint
app = Flask(__name__)

@app.route('/deploy')
def deploy():
    screen_name = "osdc_bot"
    screen_kill_comm = "screen -S {} -X quit".format(screen_name)
    screen_start_comm = 'screen -S "{}" -d -m'.format(screen_name)
    update_local_comm = "git pull origin master"
    start_bot_comm = 'screen -r "{0}" -X stuff "{1}"'.format(screen_name, "DEPLOY=1 nodejs chatbot.js\n")
    try:
        soldier.run(screen_kill_comm)
    except:
        pass

    print(soldier.run(update_local_comm).status_code)
    print(soldier.run(screen_start_comm).status_code)
    print(soldier.run(start_bot_comm).status_code)
    return 'Deployed'


@app.route('/howdoi')
def howdoi():
    command = soldier.run('howdoi {}'.format(request.args['query']))
    print(command.status_code)
    return '```\n{}\n```'.format(command.output)

@app.route('/general')
def general():
    command = request.args['query']
    words =nltk.word_tokenize(command)
    tagged_tokens=nltk.pos_tag(words)
    resultant=''
    for x in tagged_tokens:
        if(x[0] == 'wiki' or x[0] == 'wikipedia'):
            resultant = resultant + 'wiki'
    grammar =  r"""
                NP: {<NN|NNP|NNS>?<DT|PP\$>?<JJ>*<NN|NNS><IN>?<NN|NNP|NNS>+}
                {<VB>?<JJ>*<NNP|NN|NNS>+}
                """
    cp=nltk.RegexpParser(grammar)
    result=cp.parse(tagged_tokens)
    for subtree in result.subtrees():
        if subtree.label() == 'NP':
            for subtree2 in subtree:
                if(subtree2[1] == 'NNP'):
                    resultant = resultant + ' ' + subtree2[0];
                elif(subtree2[1] == 'NN'):
                    if(subtree2[0] == 'location'):
                     resultant = resultant + ' ' + 'locate';
                    elif(subtree2[0] == 'definition'):
                     resultant = resultant + ' ' + 'define';
                    else:
                     resultant = resultant + ' ' + subtree2[0];
                elif(subtree2[1] == 'JJ'):
                    if(subtree2[0] == 'wiki' or subtree2[0] == 'locate'):
                     resultant = resultant + ' ' + subtree2[0];
    resultant = resultant.strip()
    print(resultant);
    return resultant

def runner():
    try:
        app.run()
    except:
        print("Rerunning")
        runner()


if __name__ == "__main__":
    runner()
