install:
	npm install

start:
	npm start

run:
	node node_modules/react-native/local-cli/cli.js run-android

test:
	rm -rf ./node_modules/jest-cli/.haste_cache
	./node_modules/.bin/jest --verbose
.PHONY: test
