# Git

## Git
* Git init
	* `ls -a`
	* `git status`
* Git status
* Git add - start tracking a file
	* Use `git add app.js` to track app.js
	* Use `git add -A` to add all the files and folders from the directory you're in including the hidden files. That is, adding everything in a project all at one time.
* Git commit - commit changes with message
	* `git commit -m "add app file"`
	* `-m` means message, that the changes commit with the message
* git reset HEAD - remove tracking a file
	* `git rest HEAD <file>`
* ignore the files
	* `touch .gitignore` - create a hidden file called .gitignore
	* inside .gitignore file, add the file name line by line that want to be ignore by Git
## Git checkout
* Git Log
	* `git log`
	* `:q` to quit
* Git Checkout
	* `git checkout master` get back to the current file working on
	* `git checkout <commit no>` checkout the older file e.g., "commit `1fbff8063f563ba27dffe79cf0ccf23ef9d2140b`".
	* `git revert --no-commit <commit no>..HEAD` and `git commit`

## Git upload
* get ssn keys: https://medium.com/@devsprout/how-to-connect-goormide-to-github-with-ssh-67a293bf3cb0
	* `ssh-keygen -t rsa -b 4096 -C "changrongnj@gmail.com"` -- enter -- enter password
	* `eval "$(ssh-agent -s)"`
	* `ssh-add ~/.ssh/id_rsa`
	* `cat ~/.ssh/id_rsa.pub`
	* select and copy the results (SSH key) to Git
* Git command line
	* `git remote add origin <url>`  set up remote
	* `git remote -v`
	* `git push -u origin master`
	