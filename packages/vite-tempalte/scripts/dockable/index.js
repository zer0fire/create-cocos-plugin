Editor.Panel.extend({
    style: ``,
    $: {
        mask: '#mask',
        parentElement: '#parentElement'
    },
    template: `

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            * {
                margin: 0;
                padding: 0;
            }

            html,
            body,
            iframe {
                height: 100%;
                width: 100%;
                border: none;
            }

            .full {
                height: 100%;
                width: 100%;
            }

            .absolute {
                position: absolute;
            }

            .mask {
                pointer-events: none;
                left: 0;
                top: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 24px;
                color: #008CBA;
                transition: opacity 0.3s;
                opacity: 1;
            }
        </style>
    </head>

    <body>
        <div id="parentElement" class="full"></div>
        <div id="mask" class="absolute mask full">
            启动中...
        </div>
    </body>

</html>
    `,

    ready() {

        const { packageName, index } = this.info;

        console.log(packageName, index)

        const mask = this.$mask;
        const parentElement = this.$parentElement;
        const url = Editor.url(`packages://${packageName}/dockable/entry.jpg`)
        mask.style = `background-image:url('${url}');background-size:cover;`;


        function bootsharp(error, port) {
            if (error) {
                parentElement.innerHTML = error.toString();
                parentElement.style.color = 'red';
                return;
            }
            let count = 0;
            require('electron').ipcRenderer.once('plugin-ready', () => {
                iframe.hidden = false;
                mask.style.opacity = 0;
                setTimeout(() => {
                    clearInterval(intervalId)
                }, 2000)
            });
            const intervalId = setInterval(() => {
                count += 1;
                count = count % 3;
                mask.innerHTML = '启动中' + '.'.repeat(count + 1);
            }, 400);
            mask.hidden = false;
            const iframe = document.createElement('iframe');
            // iframe.src = `http://localhost:${port}/${index}`;
            console.log(packageName, index)
            iframe.src = Editor.url(`packages://${packageName}/${index}`);
            //  `http://localhost:${port}/${index}`;
            iframe.hidden = true;
            parentElement.appendChild(iframe)
            iframe.onload = function () {
                iframe.contentWindow.Editor = Editor;
                iframe.contentWindow.require = require;
                iframe.contentWindow.cc = cc
            }
        }

        bootsharp();

        // Editor.Ipc.sendToMain(`${packageName}:__$$__getPort__$$__`, bootsharp);
    }

});