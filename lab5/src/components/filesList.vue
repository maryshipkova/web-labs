<template>
    <section class="Files" v-bind:class="{ active: isActive }">
        <ul class="Files-List">
            <li class="Files-Item" v-for="item in items" v-bind:key="item._id" v-on:click="openFile(item)">
                {{ item.name }}
            </li>
        </ul>
    </section>
</template>

<script>
    /* eslint-disable */
    export default {
        name: "filesList",
        props: {
            items: Array,
            isActive: Boolean
        },
        methods: {
            openFile: function (item) {
                this.$emit('inputChange', item);

            }
        }
    }
</script>

<style scoped>
    .Files {
        display: none;
        position: fixed;
        width: 20rem;
        height: 30rem;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        background-color: whitesmoke;
        border: 1px solid blueviolet;
        overflow-y: scroll;
    }

    .Files.active {
        display: block;
    }

    .Files-List {
        list-style: none;
        padding-left: 0;
        margin: 0;
    }

    .Files-Item {
        padding: 1rem;
    }

    .Files-Item:hover {
        background-color: #fff;
        cursor: pointer;
    }
</style>