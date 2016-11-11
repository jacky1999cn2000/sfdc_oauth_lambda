compress:
	[[ -f /etc/passwd ]] && echo "deleting existing archive" rm ./sfdc_oauth_lambda.zip || echo "file didn't exist"
	zip -r sfdc_oauth_lambda.zip .

upload:
	aws s3 cp sfdc_oauth_lambda.zip s3://jz-playground/sfdc_oauth_lambda/ --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers

run: compress upload
