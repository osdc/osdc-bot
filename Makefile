install:
	npm install
	pip install -r requirements.txt
	python -m nltk.downloader punkt averaged_perceptron_tagger

run:
	python server.py
	TEST=true node chatbot.js

serve:
	python server.py
	node chatbot.js

test:
	npm run-script lint
	npm run-script frontend_tests
