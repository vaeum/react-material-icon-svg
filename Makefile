default:

clean:
	rm -rf lib
	rm -rf dist
	rm -rf svg

build:
	make clean
	npm run build
	npm run transpile

publish:
	npm run pub
