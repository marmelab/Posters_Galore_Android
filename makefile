install:
	npm install

start:
	npm start

run:
	node node_modules/react-native/local-cli/cli.js run-android

test:
	./node_modules/.bin/jest --verbose
.PHONY: test
