// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const Vue = require('vue/dist/vue.js')
const { clipboard } = require('electron')

const App = new Vue({
    el: '#app',
    data: {
        title: 'Clipboard Buddy',
        history: [],
    },
    mounted() {
      setInterval(this.checkClipboard, 500)
    },
    methods: {
        checkClipboard() {
            const text = clipboard.readText()
            if (this.history[this.history.length - 1] !== text) {
                this.history.push(text);
            }
        },
        itemClicked(item) {
            clipboard.writeText(item)
            this.history = this.history.filter(text => text !== item)
        }
    },

    computed: {
        historyReversed() {
            return this.history.slice().reverse()
        }
    }
});
