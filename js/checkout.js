    function mostrarCart(){
        let livroCart = localStorage.getItem('livroNoCart')

        livroCart = JSON.parse(livroCart)

        let livroContainer = document.querySelector('#livros-container')
        let precoCart = localStorage.getItem('totalCompras')
        if(livroCart && livroContainer) {
            livroContainer.innerHTML = '';
            Object.values(livroCart).map(livro =>{
                livroContainer.innerHTML += `
                <div class='produtos'>
                    <div class ='livros'>
            
                        <div class = 'titulo'>
                        <div><a class="cancela">X</a>
                        </div>
                            <div id="obra"><img src='./assets/${livro.tag}.jpg'>
                            <p>${livro.titulo}</p>
                            </div>

                        </div>
                        
                        <div id="preco"><b>R$ ${livro.preco},00</b>
                        </div>
                        <div id="quantidade"><b>${livro.noCart}</b>
                        </div>
                        <div id="total"><h5>R$${livro.noCart * livro.preco},00</h5>
                        </div>
                    </div>
                </div>

                `
            });

            livroContainer.innerHTML += `
            <div class="totalCompras">
                
                <p class="totalComprastitulo">
                    Total Compras:${' '}
                </p>
                <p class "totalValor">
                      R$ ${precoCart},00
                </p>


            
            `

        }
    }

    mostrarCart()

    

