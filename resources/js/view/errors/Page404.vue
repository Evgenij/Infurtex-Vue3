<template>
    <div class="root h-full flex flex-col items-center justify-center">
        <a-result status="404" title="404"
                  sub-title="Похоже вы заблудились, ничего страшного мы вас выведем отсюда">
        </a-result>
        <router-link :to="{name:'dashboard'}">
            <a-button type="primary">Вернуться домой</a-button>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "Page404"
    }
</script>

<style scoped>

</style>
