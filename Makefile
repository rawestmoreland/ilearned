include .env.local

dump-local-db:
	PGPASSWORD="strapi"
	echo "dumping local postgres db"
	pg_dump -Fc --no-acl --no-owner -h localhost -p 5432  -U strapi strapi > ilearned.dump

db-to-bucket:
	echo "Exporting dump to bucket"
	aws s3 cp $(PWD)/ilearned.dump s3://ilearned/db-backups/ilearned.dump --endpoint-url=https://$(ILEARNED_BUCKET_URL)

presigned-url:
	echo "Making presigned URL"
	aws s3 presign s3://ilearned/db-backups/ilearned.dump --endpoint-url=https://$(ILEARNED_BUCKET_URL)

refresh-local-db:
	heroku pg:backups:capture -a ilearned-staging
	heroku pg:backups:download -a ilearned-staging
	pg_restore --verbose --clean --no-acl --no-owner -h localhost -U strapi -d strapi latest.dump

db-to-heroku:
	$(eval PRESIGNED_URL=$(shell aws s3 presign s3://ilearned/db-backups/ilearned.dump --endpoint-url=https://$(ILEARNED_BUCKET_URL)))
	heroku pg:backups:restore '$(PRESIGNED_URL)' HEROKU_POSTGRESQL_COPPER -a ilearned-staging --confirm ilearned-staging

db-to-heroku-prod:
	$(eval PRESIGNED_URL=$(shell aws s3 presign s3://strapi-sbb/db-backups/sbb.dump --endpoint-url=https://$(ILEARNED_BUCKET_URL)))
	heroku pg:backups:restore '$(PRESIGNED_URL)' DATABASE_URL -a ilearned-prod

heroku-staging-push:
	git push heroku-staging staging:master

import-heroku-vars-stage:
	heroku config -s -a ilearned-staging > envvars.txt

import-heroku-vars-prod:
	heroku config -s -a ilearned-prod > envvars.txt

copy-vars:
	cat envvars.txt | tr '\n' ' ' | xargs heroku config:set -a ilearned-prod

refresh-stage-db:
	heroku pg:copy ilearned-prod::DATABASE_URL DATABASE_URL --app ilearned-staging --confirm ilearned-staging

refresh-test-db:
	heroku pg:copy ilearned-staging::DATABASE_URL HEROKU_POSTGRESQL_COPPER --app ilearned-staging --confirm ilearned-staging

bash-test-db:
	heroku pg:psql postgresql-lively-39609 --app ilearned-staging
