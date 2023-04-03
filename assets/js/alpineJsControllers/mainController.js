document.addEventListener('alpine:init', () => {
    Alpine.data('mainData', () => (
        {
        message:'I Love Programming',
        name: ['sara', 'karim', 'ishraq'], 
        myfunc(){
            alert(this.message)
        }

    }))
})