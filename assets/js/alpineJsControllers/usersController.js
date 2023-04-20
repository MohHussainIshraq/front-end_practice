document.addEventListener('alpine:init', () => {
    Alpine.data('usersData',()=>({
        mainUsers : [],
        users: [],
        pageUsers: [],
        isLoading: false,
        showAddModal: false,
        pageCount: 1,
        itemsCount: 4,
        currentPage: 1,
        newUserInfo: {
            name:"",
            username:"",
            email: "",
        },
        getUsers(){
            this.isLoading = true
            axios.get("https://jsonplaceholder.typicode.com/users").then((res)=>{
                this.mainUsers = res.data
                this.users = res.data
                this.pagination()
            }).finally(()=>{
            this.isLoading = false
            })
        },
        pagination(){
            this.pageCount = Math.ceil(this.users.length / this.itemsCount) // 10 / 4 = 3
            let start = (this.currentPage * this.itemsCount) - this.itemsCount
            let end = this.currentPage * this.currentPage * this.itemsCount
            this.pageUsers = this.users.slice(start, end)
            console.log(this.pageUsers)
            // this.users.slice(0,3)
        },
        nextPage(){
            this.currentPage++
            if (this.currentPage > this.pageCount){
                this.currentPage = this.pageCount
            }
            this.pagination()
        },
        prevPage(){
            this.currentPage--
            if (this.currentPage < 1) this.currentPage = 1
            this.pagination()
        },
        handleChangeItemCount(e){
            this.itemsCount = e.value
            if(this.itemsCount < 1) this.itemsCount = 1
            if(this.itemsCount > this.users.length) this.itemsCount = this.users.length
            this.pagination()
        },
        handleSearch(e){
            setTimeout(()=>{
            this.users = this.mainUsers.filter(user=>(user.name.includes(e.value) || 
            user.username.includes(e.value) || user.email.includes(e.value)))
            this.currentPage = 1
            this.pagination()
            }, 100)
        },
        handleSubmitAddUserForm(){
            this.isLoading = true
            axios.post("https://jsonplaceholder.typicode.com/users", this.newUserInfo).then((res)=>{
                if (res.status == 201){
                    this.mainUsers.push(res.data)
                    this.showAddModal = false
                    this.handleResetForm()
                    this.pagination()
                    M.toast({html: 'User created successfully ... ', classes: 'rounded green'})
                }
            }).finally(()=>{
                this.isLoading = false
            })
        },
        handleResetForm(){
            this.newUserInfo = {
                name: "",
                username: "",
                email: "",
            }
        },
        handleDeleteUser(userId){
            var toastHTML = '<span>Are you sure?('+userId+')</span><button class="btn-flat toast-action"x-on:click="handleConfirmDeleteUser('+userId+')">Delete</button>';
            M.toast({html: toastHTML});
        },
        handleConfirmDeleteUser(userId){
            this.isLoading = true
            axios.delete("https://jsonplaceholder.typicode.com/users/"+userId).then((res)=>{
                if (res.status === 200) {
                    this.mainUsers = this.mainUsers.filter(user=>user.id != userId)
                    this.users = this.users.filter(user=>user.id != userId)
                    this.pagination()
                    M.toast({html: 'User deleted successfully...', classes: 'green'})
                }
            }).finally(()=>{
                this.isLoading = false
            })
        }
    }))
})