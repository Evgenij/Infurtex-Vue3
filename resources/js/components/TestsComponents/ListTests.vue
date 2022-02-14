<template>
    <div class="list-tests">
        <div class="sticky space-x-3 top-20 content__header flex justify-between items-center p-4 mb-5 bg-white rounded-lg">
            <a-input v-model:value="searchTest" placeholder="Поиск тестов" class="flex items-center">
                <template #prefix>
                    <i class='bx bx-search-alt'></i>
                </template>
            </a-input>
            <a-select
                v-model:value="filterProjectTest"
                show-search
                placeholder="Проект"
                style="width: 100%"
                :options="projectsOptions"
                :filter-option="filterOption"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
            ></a-select>
            <a-select
                v-model:value="filterStatusTest"
                show-search
                placeholder="Статус теста"
                style="width: 100%"
                :options="valuesSelectStatus"
                :filter-option="filterOption"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
            ></a-select>
            <a-button type="primary" class="w-fit" :size="sizeButton">
                <i class="bx bx-plus text-base left"></i>
                Создать тест
            </a-button>
        </div>
        <div ref="content" class="list-tests relative h-full">
            <div v-if="this.testsList.length > 0" class="wrapp-list">
                <transition-group
                    v-bind:css="false"
                    v-on:before-enter="beforeEnter"
                    v-on:enter="enter"
                    v-on:leave="leave"
                    name="staggered-fade">
                    <block-test v-if="loadingTests" v-for="test in testsList" :key="test.id"
                                :id="test.id"
                                :name="test.name" :status-test="test.status_test"
                                :respondents="test.respondents" :type="test.type"
                                :project-name="test.project_name"
                                :preview="test.preview">
                    </block-test>
                </transition-group>
            </div>
            <div v-else class="empty-tests text-center text-gray-500 h-full py-44">
                Тестов не найдено... Попробуйте изменить критерий поиска или
                <a href="#" class="link link-blue size-16">создать новый тест</a>
            </div>
        </div>
    </div>
</template>

<script>
    import BlockTest from "./Test";
    import {ref, computed} from 'vue'
    import {reactive} from "@vue/reactivity";

    export default {
        name: "list-tests",
        components: {BlockTest},
        props: {
            tests: {
                type: Array,
                required: true
            }
        },
        data: () => ({
            sizeButton: ref('default'),
            filterProjectTest: ref(''),
            filterStatusTest: ref('all'),
            searchTest: '',
            listTests: '',
            loadingTests: false,
            projectsOptions: [
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'tom', label: 'Tom' }
            ]
        }),
        setup(){
            // let projectsOptions = [
            //     { value: 'jack', label: 'Jack' },
            //     { value: 'lucy', label: 'Lucy' },
            //     { value: 'tom', label: 'Tom' }
            // ]
            let statusOptions = [
                { value: 'all', label: 'Любой статус',},
                { value: 0, label: 'В разработке',},
                { value: 1, label: 'Настроен',},
                { value: 2, label: 'Запущен',},
                { value: 3, label: 'Завершен',},
                { value: 4, label: 'Остановлен',},
                { value: 5, label: 'Архивирован',},
            ]
            //const valuesSelectProject = ref(projectsOptions);
            const valuesSelectStatus = ref(statusOptions);

            const handleChange = value => {
                console.log(`selected ${value}`);
            };

            const handleBlur = () => {
                console.log('blur');
            };

            const handleFocus = () => {
                console.log('focus');
            };

            const filterOption = (input, option) => {
                return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
            };

            return {
                filterOption,
                handleBlur,
                handleFocus,
                handleChange,
                //valuesSelectProject,
                valuesSelectStatus,
            };
        },
        methods: {
            // openLoading() {
            //     const loading = this.$vs.loading({
            //         target: this.$refs.content,
            //         color: 'primary',
            //         type: 'circles'
            //     })
            //     setTimeout(() => {
            //         loading.close()
            //         this.loadingTests = true
            //     }, 1000)
            // },
            beforeEnter: function (el) {
                el.style.opacity = 0
            },
            enter: function (el, done) {
                let delay = 0
                setTimeout(function () {
                    Velocity(
                        el,
                        { opacity: 1, top: 0},
                        { complete: done }
                    )
                }, delay)
            },
            leave: function (el, done) {
                let delay = 0
                setTimeout(function () {
                    Velocity(
                        el,
                        { opacity: 0, top: 20},
                        { complete: done }
                    )
                }, delay)
            },
            filterByName(query) {
                return this.tests.filter(function(item) {
                    return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
                })
            },
            filterByProject(array) {
                let query = this.filterProjectTest
                if (query === "all"){
                    return array
                } else {
                    return array.filter(function (item) {
                        return item.project_name.toLowerCase().indexOf(query.toLowerCase()) !== -1
                    })
                }
            },
            filterByStatus(array) {
                let query = this.filterStatusTest
                if (query === "all"){
                    return array
                }else {
                    return array.filter(function(item) {
                    return item.status_test.toString().toLowerCase().indexOf(query.toString().toLowerCase()) !== -1
                })}
            },
            filterTests(){
                return this.filterByStatus(
                        this.filterByProject(
                        this.filterByName(this.searchTest)
                    ))
            },
        },
        mounted: function () {
            this.valuesSelectProject.forEach((item)=>{
                console.log(item.label)
            })
            //this.openLoading();
        },
        computed:{
            testsList(){
                return this.filterTests();
            }
        }
    }
</script>

<style lang="scss" scoped>

    @import './resources/sass/variables';

    .content__header {
        @include default-shadow;
    }

    .content-is-loading{
        height: 500px;
    }

    .block-test{
        &:last-child{
            margin: 0;
        }
    }
</style>
