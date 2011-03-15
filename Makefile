all: jslint

package:
	sudo npm package
        
install:
	sudo npm uninstall
	sudo npm install

uninstall:
	sudo npm uninstall

jslint:
	PYTHONPATH=tools/closure_linter/ python tools/closure_linter/closure_linter/gjslint.py --unix_mode --strict --nojsdoc -r scripts/ -r tests/ -r controllers/ -r lib/

jslint-fix:
	PYTHONPATH=tools/closure_linter/ python tools/closure_linter/closure_linter/fixjsstyle.py --strict --nojsdoc -r scripts/ -r tests/ -r controllers/ -r lib/

help: 
