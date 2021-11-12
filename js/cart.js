
    let carts = document.querySelectorAll('.addCart');

    //arrray de objetos para armazenar dados dos produtos

    let livros = [
        {
            titulo: 'HTML & CSS',
            tag: 'HTML&CSS',
            preco: 110,
            noCart:0
        },
        {
            titulo: 'Javascript e JQuery',
            tag: 'JS&JQuery',
            preco: 120,
            noCart:0
        },
        {
            titulo: 'React',
            tag: 'react',
            preco: 65,
            noCart:0
        },
        {
            titulo: 'Inspirado',
            tag: 'inspirado',
            preco: 60,
            noCart:0
        }
    
    ]
    

    for (let i=0; i< carts.length; i ++){

    carts[i].addEventListener('click', ()=> {
        numeroCart(livros[i]);
        totaldasCompras(livros[i])

    })

}

    function carregarPagina() {
        let numeroItem = localStorage.getItem('numeroCart');
        if(numeroItem) {
  
            document.getElementById('contador').textContent = numeroItem
            
        }
    }
    function numeroCart(livro) {

        let numeroItem = localStorage.getItem('numeroCart');
       numeroItem = parseInt(numeroItem)
        //verificando se já há itens no cart
        if(numeroItem) {
            localStorage.setItem('numeroCart', numeroItem +1);
            document.getElementById('contador').textContent = numeroItem + 1
            
        }else{
            localStorage.setItem('numeroCart', 1)
            document.getElementById('contador').textContent =1 
        }
        setItems(livro)
    }

    function setItems(livro) {
        let livroCart = localStorage.getItem('livroNoCart');
        livroCart = JSON.parse(livroCart)

        if(livroCart != null){

            if(livroCart[livro.tag] == undefined) {
                livroCart = {
                        ...livroCart,
                        [livro.tag]: livro
        
                }
            }
            livroCart[livro.tag].noCart += 1
        }else{
            livro.noCart = 1
            livroCart = {
                [livro.tag]: livro
            }
        }
        


      
        localStorage.setItem('livroNoCart', JSON.stringify(livroCart))

    }

    function totaldasCompras(livro){
       let precoCart = localStorage.getItem('totalCompras')
       
        if(precoCart != null) {
            precoCart = parseFloat(precoCart)
            localStorage.setItem('totalCompras',precoCart + livro.preco)

        }else{
            localStorage.setItem('totalCompras',livro.preco);
        }
    
    }

    carregarPagina()
