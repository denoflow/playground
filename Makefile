.Phony: serve update
serve:
	deno run --allow-run --allow-read=/tmp --allow-write=/tmp --allow-net --allow-env packages/functions/main.ts
