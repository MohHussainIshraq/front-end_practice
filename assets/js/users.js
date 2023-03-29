document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {});

    const addUserButton = document.getElementById('add_user_button');
    addUserButton.addEventListener('click', ()=>{
        document.querySelector('.add_user_model').classList.add('show');
        document.querySelector('.add_user_model_back').classList.remove('dis-none')

    })

    document.querySelector('.add_user_model_back').addEventListener('click', (e)=>{
        document.querySelector('.add_user_model').classList.remove('show')
        e.target.classList.add('dis-none')
    })
});