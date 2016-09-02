from flask import Flask
import soldier
app = Flask(__name__)

@app.route('/deploy')
def deploy():
    screen_name = "osdc_bot"
    screen_kill_comm = "screen -S {} -X quit".format(screen_name)
    screen_start_comm = 'screen -S "{}" -d -m'.format(screen_name)
    update_local_comm = 'screen -r "{0}" -X stuff "{1}"'.format(screen_name, "git pull origin master\n")
    start_bot_comm = 'screen -r "{0}" -X stuff "{1}"'.format(screen_name, "nodejs chatbot.js\n")
    try:
        soldier.run(screen_kill_comm)
    except:
        pass

    print(soldier.run(update_local_comm).status_code)
    print(soldier.run(screen_start_comm).status_code)
    print(soldier.run(start_bot_comm).status_code)
    return 'Deployed'

if __name__ == "__main__":
    app.run()
