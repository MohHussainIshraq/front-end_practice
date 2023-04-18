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
        }
    }))
})