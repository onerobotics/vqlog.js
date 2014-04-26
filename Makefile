TESTS = test/test_*.js test/**/test_*.js

test:
	mocha $(TESTS)

browser:
	browserify lib/browser.js -o examples/vqlog.js

.PHONY: test browser
