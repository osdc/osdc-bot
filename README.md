# OSDC Bot

![travis status](https://travis-ci.org/osdc/osdc-bot.svg?branch=master)
[![Join the chat at https://gitter.im/osdc/Hackers](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/osdc/Hackers)

This bot lives at [https://gitter.im/osdc/Hackers](https://gitter.im/osdc/Hackers)

### Installation:

```
$ npm install
$ pip install -r requirements.txt
```

### NLTK Configuration:

```
$ python -m nltk.downloader punkt averaged_perceptron_tagger
```

### Running:

```
$ python server.py
$ TEST=true node chatbot.js # Run locally with I/O to stdin and stdout.
```

### Testing:

Run code linter: `npm run-script lint`

Run frontend tests: `npm run-script frontend_tests`
