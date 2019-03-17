<template>
    <div id="app">
        <header class="btn-group">
            <button class="btn">save</button>
            <button class="btn">load</button>
        </header>
        <textarea v-model="input"></textarea>
        <div v-html="compiledMarkdown"></div>
    </div>
</template>

<script>

    export default {
        name: 'app',
        data: function () {
            return {
                input: '# hello'
            };
        },
        computed: {
            compiledMarkdown: function () {
                // eslint-disable-next-line
                return marked(this.input, {sanitize: true})
            }
        },

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
        /*position: absolute;*/
    }
    .btn{
        padding: .5rem 1rem;
        border-radius: 50%;
    }
    .btn:first-of-type{
        margin-right: 1rem;
    }
</style>
