<template>
    <div id="app">
        <header class="btn-group">
            <input type="text" class="Filename" v-model="name">
            <button class="btn" v-on:click="save(name,input)">save</button>
            <button class="btn" v-on:click="load">load</button>
        </header>
        <textarea v-model="input"></textarea>
        <div v-html="compiledMarkdown"></div>
        <files-list v-bind:items="items" v-bind:is-active="isActive" @inputChange="inputChange"/>
    </div>
</template>

<script>
    /* eslint-disable */
    import FilesList from "./components/filesList";
    import * as marked from "marked";

    export default {
        name: 'app',
        components: {FilesList},
        data: function () {
            return {
                input: '# hello',
                name: 'new_file',
                items: [],
                isActive: false
            };
        },
        methods: {
            load: function () {
                fetch('http://localhost:8000/api/load').then((res) => {
                    return res.json();
                }).then((filesArr) => {
                    this.items = filesArr;
                    this.isActive = true;
                });

            },
            save: (name,text) => {
                const body = {
                    name,
                    text
                };

                fetch('http://localhost:8000/api/save', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)

                }).then(() => {
                    alert('saved!');
                });
            },
            inputChange: function (item) {
                console.log(item.text);
                this.input = item.text;
                this.isActive = false;
            }
        },
        computed: {
            compiledMarkdown: function () {
                return marked(this.input, {sanitize: true})
            }
        }

    }
</script>

<style>
    html, body, #app {
        margin: 0;
        height: 100%;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        color: #333;
    }

    textarea, #app div {
        display: inline-block;
        width: 49%;
        height: 100%;
        vertical-align: top;
        box-sizing: border-box;
        padding: 0 20px;
        resize: none;
    }

    textarea {
        outline: none;
        background-color: #f6f6f6;
        font-size: 14px;
        font-family: 'Monaco', courier, monospace;
        padding: 20px;
    }

    code {
        color: #f66;
    }

    .btn-group {
        padding: .5rem;
        background-color: blueviolet;
    }

    .btn {
        padding: .5rem 1rem;
        border-radius: 50%;
        outline: none;
    }

    .btn-group>* {
        margin-right: 1rem;
    }
</style>
