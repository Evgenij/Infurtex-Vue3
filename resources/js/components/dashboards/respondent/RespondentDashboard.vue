<template>
    <v-header :navigation="navigation">
        <router-view></router-view>
    </v-header>
</template>

<script>
    import VHeader from "../../Header";
    export default {
        name: "RespondentDashboard",
        components: {
            VHeader
        },
        data:() => ({
            navigation: [
                { name: 'Тесты', to: {name: 'RespondentTests'}},
            ]
        }),
    }
</script>

<style scoped>

</style>
