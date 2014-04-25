TESTS = test/test_*.js test/**/test_*.js

test:
	mocha $(TESTS)

dist:
	browserify browser.js -o dist/vqlog.js

.PHONY: test dist
