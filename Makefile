all: install test start-prod

start-prod: ;@echo "Starting server in production mode....."; \
             NODE_ENV=production ./node_modules/.bin/pm2 start ./server.js

start-dev: ;@echo "Starting server in development mode....."; \
            NODE_ENV=development ./node_modules/.bin/nodemon ./server.js

test: ;@echo "Initializing tests....."; \
       ./node_modules/.bin/jshint --exclude ./node_modules . && NODE_ENV=test ./node_modules/.bin/mocha -t 100000

install: ;@echo "Installing dependencies....."; \
          npm install pm2; \
          npm install # install pm2 and the rest of the dependencies

clean: ;@echo "Cleaning node modules....."; \
        rm -rf ./node_modules

# stop production server for maintenance purposes
stop-prod: ;@echo "WARNING: Stopping all server processes....."; \
            ./node_modules/.bin/pm2 stop all

restart-prod: ;@echo "WARNING: Restarting all server processes....."; \
               ./node_modules/.bin/pm2 restart

# other tasks
rhc-deploy: ;@echo "Deploying server code to OPENSHIFT....."; \
             git checkout openshift; \
             git merge --no-ff master; \
             git push openshift HEAD:master -f; \
             git checkout master;

.PHONY: start-prod start-dev test install clean stop-prod restart-prod rhc-deploy
