default: install

install:
	@npm install

test: ./node_modules/.bin/watcher
	@./node_modules/.bin/watcher --directory . --all 'echo "$$file $$action"';
