.Phony: serve
serve:
	deno run --allow-run --allow-read="/tmp/" --allow-write="/tmp/" --allow-net packages/functions/main.ts