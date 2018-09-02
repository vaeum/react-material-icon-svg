run:
	./node_modules/.bin/gulp

build:
	rm -rf lib
	rm -rf dist
	rm -rf svg
	./node_modules/.bin/gulp
	./node_modules/.bin/babel dist --out-dir ./dist

publish:
	./node_modules/.bin/np --yolo
