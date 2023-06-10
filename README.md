#GIT COMMANDS

when you want to push up, these are the steps:
1. git checkout dev (locally switch to dev branch)
2. git pull origin dev (pull updates of dev down to your local system)
3. git checkout <your branch> (switch back to your branch locally)
4. git merge dev (brings dev into your branch locally)
5. Resolve conflicts or :q if there aren’t any
6. git push origin <your branch> (push merged branch up to github)
7. Create a pull request in github from <your branch> ==> dev
8. Repeat as needed
9. When you are ready to publish to master, do step 7 but from dev => master