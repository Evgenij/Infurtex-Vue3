<template>
    <v-header :navigation="navigation">
        <router-view></router-view>
    </v-header>
</template>

<script>
    import VHeader from "../../Header";
    import tests from "../../../mocks/tests";
    export default {
        name: "ModeratorDashboard",
        components: {VHeader},
        data:() => ({
            navigation: [
                { name: 'Тесты', to: {name: 'ModeratorTests'}},
                { name: 'Команды', to: {name: 'ModeratorTeams'}}
            ]
        }),
    }
</script>

<style scoped>

</style>
