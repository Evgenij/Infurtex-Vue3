<template>
    <div class="block-test relative z-0 flex rounded-lg bg-white mb-3 transform hover:-translate-y-1 cursor-pointer">
        <h3>{{name}}</h3>
        <div class="preview-wrapper flex justify-center items-center rounded-lg overflow-hidden relative">
            <vs-tooltip not-arrow right>
                <div class="type-test px-2 p-1 absolute top-1.5 left-1.5 bg-white rounded-lg">
                    <i class="bx text-base"
                       :class="{
                    'bxs-directions text-green-600': type==1,
                    'bxs-stopwatch text-slate-600': type==2,
                    'bxs-bolt-circle text-yellow-600': type==3,
                    'bxs-show text-teal-600': type==4,
                    'bxs-heart text-red-600': type==5,
                }"></i>
                </div>
                <template v-if="type==1" #tooltip>
                    <p class="text-sm flex items-center">Тест навигации</p>
                </template>
                <template v-else-if="type==2" #tooltip>
                    <p class="text-sm flex items-center">Тест 5-ти секунд</p>
                </template>
                <template v-else-if="type==3" #tooltip>
                    <p class="text-sm flex items-center">Тест 1-го нажатия</p>
                </template>
                <template v-else-if="type==4" #tooltip>
                    <p class="text-sm flex items-center">Тест общего впечатления</p>
                </template>
                <template v-else-if="type==5" #tooltip>
                    <p class="text-sm flex items-center">Тест предпочтения</p>
                </template>
            </vs-tooltip>
            <img :src="preview" :alt="preview" class="img-preview">
        </div>
        <div class="content flex justify-between items-center p-4 px-5">
            <div class="content__title flex flex-col w-full">
                <div class="name-wrapp flex items-center mb-4">
                    <input type="text" name="test-name" id="test-name" v-model="name"
                           class="test-name text-base font-medium w-full mr-2" disabled
                           ref="inputName"
                           @keydown.enter="saveName"
                    >
                    <div class="actions flex items-center transition"
                         :class="{hidden: !editingName}">
                        <vs-button class="min-w-max"
                                   success
                                   @click="saveName">
                            <i class="bx bx-check text-base mr-1"></i>
                            Сохранить
                        </vs-button>
                        <vs-button class="min-w-max"
                                   transparent
                                   dark
                                   @click="cancelSaveName">
                            Отменить
                        </vs-button>
                    </div>
                </div>
                <div class="test-project flex items-center p-2 py-1 w-max rounded-md bg-slate-100 text-slate-500">
                    <i class="bx bx-bookmark test-project__icon mr-1 text-sm"></i>
                    <div class="test-project__name text-xs font-medium">{{this.project_name}}</div>
                </div>
            </div>
            <div class="content__statistic statistic flex flex-col justify-center items-center w-1/3">
                <div class="statistic__wrapp flex flex-col">
                    <p class="text-sm text-black font-semibold">{{formattingNumber(respondents)}}</p>
                    <span class="text-xs text-slate-400">прошло тест</span>
                </div>
            </div>
            <div class="content__statistic info flex justify-end items-center w-1/2">
                <div class="info__status mr-3 font-medium text-sm p-2 px-3 pr-4 rounded-lg flex items-center"
                     :class="{
                        'text-indigo-600': this.status.code==0,
                        'bg-indigo-50': status.code==0,
                        'text-teal-600': status.code==1,
                        'bg-teal-50': status.code==1,
                        'text-yellow-600': status.code==2,
                        'bg-yellow-50': status.code==2,
                        'text-green-600': status.code==3,
                        'bg-green-50': status.code==3,
                        'text-slate-600': status.code==4,
                        'bg-slate-100': status.code==4,
                        'text-purple-600': status.code==5,
                        'bg-purple-50': status.code==5,
                    }">
                    <i v-if="status.code==0" class="bx bx-git-branch mr-1 text-lg"></i>
                    <i v-else-if="status.code==1" class="bx bx-slider-alt mr-1 text-lg"></i>
                    <i v-else-if="status.code==2" class="bx bx-meteor mr-1 text-lg"></i>
                    <i v-else-if="status.scode==3" class="bx bx-check-circle mr-1 text-lg"></i>
                    <i v-else-if="status.code==4" class="bx bx-pause-circle mr-1 text-lg"></i>
                    <i v-else class="bx bx-archive mr-1 text-lg"></i>
                    {{status.name}}
                </div>
                <div
                    class="relative info__status w-max text-slate-500 font-medium bg-slate-100 text-sm p-2 px-3 hover:bg-slate-200 cursor-pointer rounded-lg flex items-center"
                    @click="showTooltipMenu">
                    <i class="bx bx-dots-vertical-rounded text-base"></i>
                    <div
                        class="absolute transition right-0 info__menu overflow-hidden flex flex-col items-start tooltip-menu bg-white border-1 border-slate-200 rounded-lg hidden"
                        ref="tooltip" @mouseleave="hideTooltipMenu">
                        <div class="tooltip-menu__item flex items-center p-2 px-3 hover:bg-slate-50 w-full"
                             @click.stop="hideTooltipMenu">
                            <i class="bx bx-play-circle mr-2 text-lg text-slate-400"></i>Просмотреть
                        </div>
                        <div class="tooltip-menu__item flex items-center p-2 px-3 hover:bg-slate-50 w-full"
                             @click="editName" @click.stop="hideTooltipMenu">
                            <i class="bx bx-rename mr-2 text-lg text-slate-400"></i>Переименовать
                        </div>
                        <div class="tooltip-menu__item flex items-center p-2 px-3 hover:bg-slate-50 w-full"
                             @click.stop="hideTooltipMenu">
                            <i class="bx bx-edit mr-2 text-lg text-slate-400"></i>Изменить
                        </div>
                        <div class="tooltip-menu__item flex items-center p-2 px-3 hover:bg-slate-50 w-full"
                             @click="toArchive" @click.stop="hideTooltipMenu">
                            <i class="bx bx-archive mr-2 text-lg text-slate-400"></i>Архивировать
                        </div>
                        <vs-tooltip left shadow not-hover
                                    v-model="activeTooltipDelete"
                                    class="tooltip-menu__item flex items-center w-full">
                            <div
                                class="flex items-center p-2 px-3 hover:bg-red-50 hover:text-red-500 text-red-400 w-full"
                                @mousedown="deleteTest" @click="activeTooltipDelete =! activeTooltipDelete">
                                <i class="bx bx-trash mr-2 text-lg text-red-400"></i>Удалить
                            </div>
                            <template #tooltip>
                                <div class="content-tooltip p-2" @mouseenter="cancelDeleteTest"
                                     @mouseleave="hideTooltipMenu">
                                    <h4 class="center font-bold">
                                        Вы действительно хотите удалить тест?
                                    </h4>
                                    <p class="text-slate-600 my-2">
                                        Вся статистика и данные теста будут безвозвратно удалены
                                    </p>
                                    <footer class="flex">
                                        <vs-button @click="activeTooltipDelete=false" @mouseup="hideTooltipMenu" danger
                                                   block>
                                            Удалить
                                        </vs-button>
                                        <vs-button @click="activeTooltipDelete=false" @mouseup="hideTooltipMenu" flat
                                                   dark block>
                                            Отменить
                                        </vs-button>
                                    </footer>
                                </div>
                            </template>
                        </vs-tooltip>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "block-test",
        data: () => {
            return {
                oldName: '',
                status: {
                    name: '',
                    code: 0,
                },
                // 0 - В разработке
                // 1 - Настроен
                // 2 - Запущен
                // 3 - Завершен
                // 4 - Остоновлен
                // 5 - Архивирован

                // 1 - Тест навигации
                // 2 - Тест 5-ти секунд
                // 3 - Тест 1-го клика
                // 4 - Тест общего впечатления
                // 5 - Тест предпочтения
                project_name: '',
                visibleTooltipMenu: false,
                editingName: false,
                activeTooltipDelete: false,
                deletingTest: false
            }
        },
        props: {
            id: {
                type: Number,
            },
            name: {
                type: String,
            },
            statusTest: {
                type: Number,
            },
            respondents: {
                type: Number,
            },
            type: {
                type: Number,
            },
            projectName: {
                type: String,
            },
            preview: {
                type: String,
                default: '/storage/images/mocks/mock-preview.png'
            }
        },
        methods: {
            showTooltipMenu() {
                this.$refs.tooltip.classList.remove('hidden')
            },
            hideTooltipMenu() {
                if (this.deletingTest !== true) {
                    this.$refs.tooltip.classList.add('hidden')
                }
            },
            editName() {
                this.editingName = true;
                this.oldName = this.name;
                this.$refs.inputName.disabled = false;
            },
            saveName() {
                this.editingName = false;
                this.$refs.inputName.disabled = true;
            },
            cancelSaveName() {
                this.name = this.oldName;
                this.editingName = false;
                this.$refs.inputName.disabled = true;
            },
            toArchive() {
                this.status.code = 5
            },
            deleteTest() {
                this.deletingTest = true;
            },
            cancelDeleteTest() {
                this.deletingTest = false;
            },
        },
        mounted: function () {
            if (this.statusTest === 0) {
                this.status.code = 0;
                this.status.name = "В разработке"
            } else if (this.statusTest === 1) {
                this.status.code = 1;
                this.status.name = "Настроен"
            } else if (this.statusTest === 2) {
                this.status.code = 2;
                this.status.name = "Запущен"
            } else if (this.statusTest === 3) {
                this.status.code = 3;
                this.status.name = "Завершен"
            } else if (this.statusTest === 4) {
                this.status.code = 4;
                this.status.name = "Остановлен"
            } else {
                this.status.code = 5;
                this.status.name = "Архивирован"
            }

            if (this.projectName === "") {
                this.project_name = "Без проекта"
            } else {
                this.project_name = this.projectName
            }
        },
        watch: {
            'status.code': function (val) {
                if (val === 0) {
                    this.status.name = "В разработке"
                } else if (val === 1) {
                    this.status.name = "Настроен"
                } else if (val === 2) {
                    this.status.name = "Запущен"
                } else if (val === 3) {
                    this.status.name = "Завершен"
                } else if (val === 4) {
                    this.status.name = "Остановлен"
                } else {
                    this.status.name = "Архивирован"
                }
            },
            'statusTest': function (val) {
                if (val === 0) {
                    this.status.name = "В разработке"
                } else if (val === 1) {
                    this.status.name = "Настроен"
                } else if (val === 2) {
                    this.status.name = "Запущен"
                } else if (val === 3) {
                    this.status.name = "Завершен"
                } else if (val === 4) {
                    this.status.name = "Остановлен"
                } else {
                    this.status.name = "Архивирован"
                }
            },
        },
        computed: {}
    }
</script>

<style lang="scss" scoped>
    @import './resources/sass/variables';

    .block-test {
        @include default-shadow;

        &:hover {
            @include big-shadow;
            z-index: 1000;
        }
    }

    input.test-name {
        &:not(disabled) {
            border: 2px solid rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            padding: 7px 10px;
        }

        &:disabled {
            border: none;
            padding: 0px 2px;
            opacity: 1;
            background-color: transparent;
        }
    }

    .preview-wrapper {
        width: 110px;

        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }

    .tooltip-menu {
        @include default-shadow;
        z-index: 1000;
        border-width: 1px;
        top: 125%;
    }
</style>
