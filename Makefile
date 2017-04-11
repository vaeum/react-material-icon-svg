run:
	./node_modules/.bin/gulp

build:
	./node_modules/.bin/gulp build
	./node_modules/.bin/babel lib --out-dir ./dist
