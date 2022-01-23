# Denoflow Playground — An unofficial land for exploring 

The playground lets you write denoflow online in a safe and shareable way.


<p align="center"><br><img width="1216" alt="image" src="https://user-images.githubusercontent.com/7854312/117201415-ec1ad280-adec-11eb-8af6-dad209a6010c.gif"><br><br></p>

## What is Deno? Why should you use that?

Deno is a simple, modern, and secure runtime for JavaScript and TypeScript that uses V8 and is built in Rust.

- Secure by default. No file, network, or environment access, unless explicitly enabled.
- Supports TypeScript out of the box.
- Ships only a single executable file.
- Has built-in utilities like a dependency inspector (`deno info`) and a code formatter (`deno fmt`).
- Has a set of reviewed (audited) standard modules that are guaranteed to work with Deno: [deno.land/std](https://deno.land/std)

Learn more on **[Deno's public site](https://deno.land/)**.


## Project structure

There are two packages inside the project:
- Serverless Deno back-end (built on [vercel-deno](https://github.com/TooTallNate/vercel-deno))
- [Next.js](https://nextjs.org/) front-end


```
.

└─ 📂 packages
   ├─ 📦 functions
   └─ 📦 ui
```

## Deploy

Install deno:

```bash
curl -fsSL https://deno.land/install.sh | sh
```

Clone:

```bash
git clone git@github.com:denoflow/playground.git
```

Deploy server first:

```bash
sudo vim /etc/systemd/system/denoflow-playground-api.service
```

Config:
```bash
[Unit]
Description=Denoflow playground service
Wants=network-online.target
After=network-online.target nss-lookup.target
[Service]
Type=exec
Environment="PATH=/home/green/.deno/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
User=green
ExecStart=/home/green/.deno/bin/deno run --allow-run --allow-read=/tmp --allow-write=/tmp --allow-net --allow-env /home/green/playground/packages/functions/main.ts
Restart=on-failure
SyslogIdentifier=denoflow-playground-api

[Install]
WantedBy=multi-user.target
```


```bash
sudo systemctl daemon-reload
```

```bash
sudo systemctl enable --now denoflow-playground-api.service
```


```bash
sudo systemctl status denoflow-playground-api
```

```bash
sudo journalctl -f -u denoflow-playground-api
```

## License

This project is licensed under [MIT](LICENSE) license.
