<template>
    <div>
        <div class="p-b-md is-size-5 has-text-weight-bold">{{title}}</div>
        <div class="p-b-xss tabs is-toggle is-small">
            <ul>
                <li :class="{'is-active': state === 'code'}" @click="$emit('state' , 'code')"><a>Code</a></li>
                <li :class="{'is-active': state === 'map'}" @click="$emit('state' , 'map')"><a>Map</a></li>
            </ul>
        </div>

        <div v-if="state === 'code'">
            <textarea class="textarea"
                      :value="json ? JSON.stringify(json, null, 4) : null"
                      @input="$emit('input', JSON.parse($event.target.value))">
            </textarea>

            <input type="file" ref="files" @change="addFiles" v-if="canBeUpload" v-show="false">
            <div class="m-t-sm buttons has-addons">
                <span class="button" v-if="canBeUpload" @click.prevent="$refs.files.click()">Upload</span>
                <span class="button" v-if="canBeClear" @click="$emit('clear')">Clear</span>
                <span class="button" v-if="canBeDownload" @click.prevent="saveFile">Download</span>
                <span class="button" v-if="canBeReset" @click="$emit('reset')">Reset</span>
            </div>
        </div>

        <vgs-map v-if="state === 'map'" :geojson="json">
            <slot name="map"/>
        </vgs-map>

    </div>
</template>

<script>

    import VgsMap from './map'

    const props = {
        state: {
            type: String,
            default: 'code'
        },
        title: {
            type: String,
            default: null,
        },
        canBeUpload: {
            type: Boolean,
            default: false
        },
        canBeClear: {
            type: Boolean,
            default: false
        },
        canBeDownload: {
            type: Boolean,
            default: false
        },
        canBeReset: {
            type: Boolean,
            default: false
        },
        json: {
            type: Object,
            default: null
        },
        filename: {
            type: String,
            default: null
        }
    };

    export default {
        props,
        components: {VgsMap},
        methods: {


            /**
             * Upload files
             *
             * @param e
             */
            addFiles(e) {
                const input = e.target;
                const reader = new FileReader();

                reader.onload = (f) => {
                    try {
                        const json = JSON.parse(reader.result);
                        this.$emit('input', json);
                        this.$emit('filename', input.files[0].name)
                    } catch (e) {
                        console.log(e);
                    }
                };

                reader.readAsText(input.files[0]);
            },


            /**
             * Save content to file and download it
             */
            saveFile() {

                const content = JSON.stringify(this.json, null, 4);
                const name = (this.filename ? this.filename : 'result') + '_simplified.json';
                const file = new Blob([content]);

                if (window.navigator.msSaveOrOpenBlob) // IE10+
                    window.navigator.msSaveOrOpenBlob(file, name);

                else { // Others

                    var a = document.createElement("a"),  url = URL.createObjectURL(file);
                    a.href = url;
                    a.download = name;

                    document.body.appendChild(a);
                    a.click();

                    setTimeout(function() {
                        document.body.removeChild(a);
                        window.URL.revokeObjectURL(url);
                    }, 0);

                }


            }
        }

    }
</script>

<style scoped lang="scss">

    textarea {
        white-space: pre;
        font-family: monospace;
        height: 300px;
    }

</style>
