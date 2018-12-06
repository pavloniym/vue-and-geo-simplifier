<template>
    <div class="vgs__map">
        <l-map ref="map" v-bind="{center, zoom}">
            <l-geo-json v-if="geojson" ref="geojson" v-bind="{geojson}"/>
        </l-map>
        <slot />
    </div>
</template>

<script>

    import {LMap, LGeoJson} from 'vue2-leaflet';

    const props = {
        geojson: {
            type: Object,
            default: null
        }
    };

    export default {
        props,
        components: {LMap, LGeoJson},
        data() {
            return {
                center: [0, 0],
                zoom: 0,
            }
        },

        methods: {

            fitBounds() {
                const geojson = this.$refs.geojson || null;
                if(geojson) {
                    geojson.mapObject._map
                        .fitBounds(geojson.getBounds());
                }
            }

        },

        mounted() {
            this.$nextTick()
                .then(() => this.$refs.map.mapObject.invalidateSize())
                .then(() => this.fitBounds());
        },


        watch: {
            geojson: {
                deep: true,
                handler() {
                    this.$nextTick(() => this.fitBounds())
                }
            }
        }
    }

</script>

<style scoped lang="scss">
    .vgs__map {
        height: 300px;
        width: 100%;
        /deep/ {
            .vue2leaflet-map {
                border-radius: 4px;
            }
        }
    }
</style>
