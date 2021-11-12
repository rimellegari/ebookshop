    function mostrarCart(){
        let livroCart = localStorage.getItem('livroNoCart')

        livroCart = JSON.parse(livroCart)

        let livroContainer = document.querySelector('#livros-container')
        if(livroCart && livroContainer) {
            livroContainer.innerHTML = '';
            Object.values(livroCart).map(livro =>{
                livroContainer.innerHTML += `
                <div class='produtos'>
                    <div class ='livros'>
                    <i class="fa-light fa-circle-xmark" id="cancela"></i>
                        <div class = 'titulo'>
                        <img src='./assets/${livro.tag}.jpg'>
                        <p>${livro.titulo}</p>
                        </div>
                    </div>



                </div>

                `
            })

        }
    }

    mostrarCart()

    

