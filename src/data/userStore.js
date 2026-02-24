import initialUsers from './users.js'
import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useUsersStore = defineStore('usersStore', () => {
    const users = reactive([...initialUsers])

    function add(user) {
        users.push(user);
        //console.log(users)
    }

    return { users, add}

})