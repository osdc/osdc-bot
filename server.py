from flask import(
    Flask,
    request
)
from message_chunker import message_chunk

import soldier

app = Flask(__name__)


@app.route('/deploy')
def deploy():
    screen_name = "osdc_bot"
    screen_kill_comm = "screen -S {} -X quit".format(screen_name)
    screen_start_comm = 'screen -S "{}" -d -m'.format(screen_name)
    update_local_comm = "git pull origin master"
    start_bot_comm = (
        'screen -r "{0}" -X stuff "{1}"'.format(
            screen_name, "DEPLOY=1 nodejs chatbot.js\n"))
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


@app.route('/message_parser')
def message_parser():
    command = request.args['query']
    return message_chunk(command)


def runner():
    try:
        app.run()
    except:
        print("Rerunning")
        runner()


if __name__ == "__main__":
    runner()
