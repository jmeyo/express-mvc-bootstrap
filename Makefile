WAF=python tools/waf-light

all: help

npm-package:
	sudo npm package

npm-install:
	sudo npm install

npm-uninstall:
	sudo npm uninstall

jslint:
	PYTHONPATH=tools/closure_linter/ python tools/closure_linter/closure_linter/gjslint.py --unix_mode --strict --nojsdoc -r scripts/ 

jslint-fix:
	PYTHONPATH=tools/closure_linter/ python tools/closure_linter/closure_linter/fixjsstyle.py --strict --nojsdoc -r scripts/ 

help: 
