# Denoflow Playground — An land for exploring 

The playground lets you write [denoflow](https://github.com/denoflow/denoflow) online in a safe and shareable way.


<p align="center"><br><img width="1216" alt="image" src="https://raw.githubusercontent.com/denoflow/playground/main/screenshot.gif"><br><br></p>


> This project forked from [peterbartha/deno-playground](https://github.com/peterbartha/deno-playground) , Thanks a lot!

## Project structure

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

```
sudo systemctl restart denoflow-playground-api
```

## License

This project is licensed under [MIT](LICENSE) license.
