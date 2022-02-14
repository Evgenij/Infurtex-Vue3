<template>
<!--    <div class="root">-->
<!--        <list-tests :tests="tests"></list-tests>-->
<!--    </div>-->
    <div class="root">
        <h1>Tests</h1>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa nesciunt repellendus vero. Alias aliquid autem consectetur doloribus earum, ipsam iure minima obcaecati odio sed tempora tenetur unde velit voluptate voluptates?
        </p>
    </div>
</template>

<script>
    //import VHeader from "../../../components/Header";
    import ListTests from "../../../components/TestsComponents/ListTests";
    import tests from "../../../mocks/tests";
    import VHeader from "../../Header";

    export default {
        name: "moderator-tests",
        components: {VHeader, ListTests},
        data:() => ({
            navigation: [
                { name: 'Тесты', to: {name: 'ModeratorTests'}},
                { name: 'Команды', to: {name: 'ModeratorTeams'}}
            ],
            notifications: [
                {
                    count: 0
                },
                {
                    count: 2
                }
            ],
            tests: tests
        }),

    }
</script>

<style lang="scss">

</style>
