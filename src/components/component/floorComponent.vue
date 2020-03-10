<template>
    <div>
        <div class="floor">
            <div class="floor1">
                <div class="title">
                    {{floor_name}}
                </div>
                <div class="floor-anomaly">
                    <div class="floor_one">
                        <img :src="floorData0.image" width="100%">
                    </div>
                    <div>
                        <div class="floor_two">
                            <img :src="floorData1.image" width="100%">
                        </div>
                        <div>
                            <img :src="floorData2.image" width="100%">
                        </div>
                    </div>
                </div>
                <div class="floor-rule">
                    <div v-for="(item,index) in floorData.slice(3) " :key="index">
                        <img :src="item.image" width="100%">
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
    export default {
        name: "floorComponent",
        props: ['floorData', 'floorName'],
        data() {
            return {
                floorData0: {},
                floorData1: {},
                floorData2: {},
                floor_name: ''
            }
        },
        watch: {
            floorData: function (val) {
                console.log(val);
                this.floorData0 = this.floorData[0];
                this.floorData1 = this.floorData[1];
                this.floorData2 = this.floorData[2];
                this.floor_name = this.floorName;
            }
        }
    }
</script>

<style scoped>
    .floor .title {
        /*background-color: #fff;*/
        font-size: 14px;
        height: 1.8rem;
        line-height: 1.8rem;
        text-align: center;
        /*color: #e5017d;*/
        /*border-bottom: 1px solid #eee;*/
        /*padding: .2rem;*/
    }

    .floor .floor-anomaly {
        display: flex;
        flex-direction: row;
        background-color: #fff;
        border-bottom: 1px solid #ddd;
    }

    .floor-anomaly div {
        width: 10rem;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }

    .floor .floor-rule {
        display: flex;
        flex-direction: row;
        background-color: #fff;
        flex-wrap: wrap;
    }

    .floor .floor-rule div {
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        width: 10rem;
        background-color: #fff;
    }

    .floor .floor-rule div:nth-child(odd) {
        border-right: 1px solid #ddd;
    }

    .floor-anomaly .floor_one {
        border-right: 1px solid #ddd;
    }

    .floor-anomaly .floor_two {
        border-bottom: 1px solid #ddd;
    }
</style>
