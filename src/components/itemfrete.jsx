import "../css/itemfrete.css"
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import actionTypes from '../Redux/cart/actiontype'

import { Truck } from "lucide-react"

export default function itemFrete({ prazo, valor, nome }) {
    const { valorFrete } = useSelector(({ cartReducer }) => cartReducer);
    const dispatch = useDispatch()
    const [checked, setChecked] = useState(false);
    const setFrete = () => {
        setChecked(true)
        if (valorFrete !== valor) {
            dispatch({
                type: actionTypes.VALORFRETE,
                payload: valor
            });
        }
    }
    useEffect(() => {
        if (checked) {
            dispatch({
                type: actionTypes.VALORFRETE,
                payload: valor
            })
        }
    }, [valor])

    return (
        <div className="itemfrete-wrapper">
            <div className="option-button-frete-wrapper">
                <input id="btn" type="radio" name="option" onClick={setFrete} />
            </div>
            <div className="option-info-frete-wrapper">
                <div className="option-label-frete">
                    <label style={{ color: "#1e020d" }}>Correios {nome}</label>
                    <span style={{ color: "#5b0728" }}>
                    <Truck size={24} />
                    chega em até {prazo} dias uteis
                    </span> 
                </div>
            </div>
            <div className="value-frete">
                <h5 style={{color: "#5b0728"}}>R${valor}</h5>
            </div>
        </div>
    )
}