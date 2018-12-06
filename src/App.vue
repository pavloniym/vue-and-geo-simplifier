<template>
    <section>
        <section class="section hero">

            <div class="container">
                <div class="columns">
                    <div class="column">
                        <h1 class="title">Vue and Geo Simplifier</h1>
                        <h2 class="subtitle">Upload your geojson geometry and simplify it</h2>
                    </div>
                </div>

                <div class="columns">

                    <!-- Original controls -->
                    <div class="column">
                        <fields
                            title="Original"
                            can-be-upload
                            can-be-clear
                            :state="original.state"
                            :json="original.json"
                            @state="original.state = $event"
                            @input="original.json = $event"
                            @filename="original.filename = $event"
                            @clear="original.json = null">
                        </fields>
                    </div>

                    <!-- Result controls -->
                    <div class="column">
                        <fields
                            title="Result"
                            can-be-reset
                            can-be-download
                            :state="result.state"
                            :json="result.json"
                            :filename="original.filename"
                            @reset="(result.json = original.json, result.factor = 0)"
                            @state="result.state = $event">
                            <div slot="map">
                                <div class="columns m-t-sm">
                                    <div class="column is-10">
                                        <input class="slider is-fullwidth" step="0.001" min="0" max="3"
                                               v-model="result.factor" type="range">
                                    </div>
                                    <div class="column">
                                        <input class="input" type="text" v-model="result.factor">
                                    </div>
                                </div>
                            </div>
                        </fields>
                    </div>

                </div>
            </div>
        </section>

        <footer class="footer">
            <div class="container">
                <div class="columns">
                    <div class="column">
                        <div class="is-size-6">Vue and Geo Simplifier</div>
                        <div class="is-size-6">Upload your geojson geometry and simplify it</div>
                        <div class="tags p-t-md">

                            <a href="https://github.com/PavelShar/vue-and-geo-simplifier" target="_blank" class="m-r-xs">
                                <span class="tag is-dark">source</span>
                            </a>
                            <a href="https://leafletjs.com/" target="_blank" class="m-r-xs">
                                <span class="tag">leafletjs</span>
                            </a>
                            <a href="http://bulma.io" target="_blank" class="m-r-xs">
                                <span class="tag">bulma</span>
                            </a>
                            <a href="http://turfjs.org/" target="_blank" class="m-r-xs">
                                <span class="tag">turf</span>
                            </a>
                        </div>
                        <div class="is-size-6">Made for fun by
                            <a href="https://github.com/PavelShar" target="_blank">Paul Sharypov</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </section>

</template>

<script>

    import Fields from './components/forms'
    import Simplify from '@turf/simplify'

    export default {
        name: 'root',
        components: {Fields},
        data() {
            return {
                original: {
                    state: 'code',
                    json: null,
                    filename: null,
                },
                result: {
                    state: 'map',
                    json: null,
                    factor: 0,
                }
            }
        },

        methods: {

            simplify() {
                this.result.json = Simplify(this.original.json, {
                    tolerance: this.result.factor,
                });
            }

        },

        watch: {

            'original.json': {
                deep: true,
                handler(json) {
                    this.result.json = json;
                    this.result.factor = 0;
                }
            },

            'result.factor': {
                handler() {
                    if (this.result.json) {
                        this.simplify();
                    }
                }
            }
        }

    }

</script>
