#!/bin/bash

chmod 600 ./tasks/travis/aws.pem

PACKAGE="recog"

# production hosts for web servers
if [[ $TRAVIS_BRANCH != 'production' ]]
then
  echo "Deployments only applicable for production"
  exit 0
fi

# production hosts for web servers
if [[ $TRAVIS_BRANCH == 'production' ]]
then
  SERVER_HOST="54.148.233.101"
  SSH_FLAG=" -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no "
  echo "Pushing changes to $SERVER_HOST"
  rsync -azhe "ssh $SSH_FLAG -i ./tasks/travis/aws.pem" ./ ec2-user@$SERVER_HOST:~/$PACKAGE/
  echo "Restarting server..."
  ssh $SSH_FLAG -ti ./tasks/travis/aws.pem ec2-user@$SERVER_HOST "sudo touch ~/recog/tmp/restart.txt"
  echo "Complete."
  exit 0
fi
