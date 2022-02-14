<template>
    <div class="min-h-full">
        <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 flex items-center">
                            <svg class="h-10 w-10 mr-2" width="168" height="147" viewBox="0 0 168 147" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M54.8923 0L63.8923 15.5885L50.3547 15.5279L50.3538 15.5263L50.3529 15.5279L50 15.5263L50.1778 15.8343L43.4615 27.5885L34.4615 12L27.5692 24.0622L36.5692 39.6506L29.6769 51.7128L20.6769 36.1244L0 72.3109L42.5 145.923L84.1769 146.11L75.1769 130.521L89.0692 130.583L98.0692 146.172L111.962 146.234L102.962 130.645L116.499 130.706L116.5 130.708L116.501 130.706L116.854 130.708L116.676 130.4L123.392 118.645L132.392 134.234L139.285 122.172L130.285 106.583L137.177 94.5211L146.177 110.11L166.854 73.923L124.354 0.310889L82.6769 0.124355L91.6769 15.7128L77.7846 15.6506L68.7846 0.0621777L54.8923 0ZM77.7846 15.6506L86.7846 31.2391L107.623 31.3324L131.623 72.9016L121.285 90.9948L130.285 106.583L123.392 118.645L114.392 103.057L107.501 115.118L93.9615 115.057L102.962 130.645L89.0692 130.583L80.0692 114.995L59.2308 114.902L35.2308 73.3324L45.5692 55.2391L36.5692 39.6506L43.4615 27.5885L52.4615 43.1769L59.3529 31.1163L72.8923 31.1769L63.8923 15.5885L77.7846 15.6506Z" fill="url(#paint0_linear_113:133)"/>
                                <defs>
                                    <linearGradient id="paint0_linear_113:133" x1="0" y1="146.234" x2="162.459" y2="-4.72943" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#2383F4"/>
                                        <stop offset="0.0001" stop-color="#248FF2"/>
                                        <stop offset="1" stop-color="#07D3CA"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                            <p class="text-white font-medium text-lg">Infurtex</p>
                        </div>
                        <div class="hidden md:block">
                            <div class="ml-10 flex items-baseline space-x-2">
                                <router-link v-for="item in navigation" :key="item.name"
                                             :to="item.to"
                                             active-class="bg-gray-700 text-white"
                                             :class="[
                                                 this.$router.name !== item.to.name
                                                 ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                                 : '',
                                                 'font-medium px-3 p-2 rounded']">
                                    {{ item.name }}</router-link>
                            </div>
                        </div>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-4 flex items-center md:ml-6">
                            <button type="button" class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span class="sr-only">View notifications</span>
                                <BellIcon class="h-6 w-6" aria-hidden="true" />
                            </button>

                            <!-- Profile dropdown -->
                            <Menu as="div" class="ml-3 relative">
                                <div>
                                    <MenuButton class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                        <span class="sr-only">Open user menu</span>
                                        <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="" />
                                    </MenuButton>
                                </div>
                                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                    <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                                            <a :href="item.href" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">{{ item.name }}</a>
                                        </MenuItem>
                                    </MenuItems>
                                </transition>
                            </Menu>
                        </div>
                    </div>
                    <div class="-mr-2 flex md:hidden">
                        <!-- Mobile menu button -->
                        <DisclosureButton class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span class="sr-only">Open main menu</span>
<!--                            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />-->
<!--                            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />-->
                        </DisclosureButton>
                    </div>
                </div>
            </div>

            <DisclosurePanel class="md:hidden">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
                </div>
                <div class="pt-4 pb-3 border-t border-gray-700">
                    <div class="flex items-center px-5">
                        <div class="flex-shrink-0">
                            <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
                        </div>
                        <div class="ml-3">
                            <div class="text-base font-medium leading-none text-white">{{ user.name }}</div>
                            <div class="text-sm font-medium leading-none text-gray-400">{{ user.email }}</div>
                        </div>
                    </div>
                    <div class="mt-3 px-2 space-y-1">
                        <DisclosureButton v-for="item in userNavigation" :key="item.name" as="a" :href="item.href" class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">{{ item.name }}</DisclosureButton>
                    </div>
                </div>
            </DisclosurePanel>
        </Disclosure>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
    import {useStore} from "vuex";
    import {computed} from 'vue'
    import store from "../store/store";

    const user = {
        name: 'Tom Cook',
        email: 'tom@example.com',
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    }
    const userNavigation = [
        { name: 'Your Profile', href: '#' },
        { name: 'Settings', href: '#' },
        { name: 'Sign out', href: '#' },
    ]

    export default {
        name: 'VHeader',
        components: {
            Disclosure,
            DisclosureButton,
            DisclosurePanel,
            Menu,
            MenuButton,
            MenuItem,
            MenuItems,
        },
        props: {
            navigation:{
                type: Array,
            }
        },
        setup() {
            const user = useStore()
            return {
                user: computed(()=> store.state.user.data),
                userNavigation,
            }
        },
    }
</script>
