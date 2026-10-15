import '../css/itemcart.css'
import { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Trash } from "lucide-react";
import actionTypes from '../Redux/cart/actiontype'


export default function ItemCart({ image, descricao, valor, unidades, id}) {
    const { produtos } = useSelector(({ cartReducer }) => cartReducer);
    
    const [unidades_, setUnidades] = useState(unidades)
    const [valorsomado, setvalor] = useState(0)
    const dispatch = useDispatch();
    useEffect(() => {
        setvalor(unidades_ * valor)
        dispatchUpdateAction();
    }, [valorsomado,unidades_, dispatch]);

    const adiciona = () => {
        setUnidades(unidades_ +1);
    };

    const subtrai = () => {
        if (unidades_ > 1) {
            setUnidades(unidades_ -1);
        }
    };

    const excluirItem = () => {
        dispatch({
            type: actionTypes.DELETE,
            payload:{id}
        })
    };
    const dispatchUpdateAction = () => {
        dispatch({
            type: actionTypes.UPDATE,
            payload: { id, unidades_,valorsomado:valorsomado },
        });
    };
    useEffect(() => {
        setvalor(unidades_ * valor)
        dispatchUpdateAction();
    }, [valorsomado,unidades_, dispatch]);



    return (
        <section className="main-div-itemcart">
            <div className="wrapper-content-itemcart" >
                <div className="image-produto-itemcart">
                    <img src={image} />
                </div>
                <div className="describe-produto-itemcart">
                    <h1>{descricao}</h1>
                    <div className='buttons-quantidade'>
                        <button onClick={subtrai}  >-</button>
                        <div className='qtd'> {unidades_} </div>
                        <button onClick={adiciona} >+</button>
                    </div>
                </div>
                <div className="preco-produto-itemcart">
                    <h1  style={{fontFamily:'serif'}}>R$ {valorsomado.toFixed(2).toString().replace('.', ',')}</h1>
                </div>
                <button  onClick={excluirItem} className="button-exclude-itemcart">
                    <Trash size={20} color="rgb(183, 3, 51)" />
                </button>
            </div>
        </section>
    );
};