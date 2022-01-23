.Phony: serve
serve:
	deno run --allow-run --allow-read=/tmp,/private/tmp --allow-write=/tmp,/private/tmp --allow-net packages/functions/main.ts