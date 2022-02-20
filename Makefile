.Phony: serve update restart
serve:
	deno run --allow-run --allow-read=/tmp --allow-write=/tmp --allow-net --allow-env packages/functions/main.ts
restart:
	sudo systemctl restart denoflow-playground-api
