import actionTypes from "./actiontype"


const initialState = {
    produtos: []
}
const allProductReducer = (state = initialState, action) => {
    if (action.type === actionTypes.GETALL) {
        const prods = action.payload.retorno.produtos.map((item) => ({
            foto: item.produto.imagem[0].link || "",
            nome: item.produto.descricao || "",
            tag: item.produto.tag || "",
            valor: parseFloat(item.produto.preco) || "",
            categoria: item.produto.categoria.descricao || "",
            descricao: item.produto.descricaoCurta || "",
            descricaoComplementar: item.produto.descricaoComplementar || ""
        }));

        return { ...state, produtos: prods };
    }
    return state;
}
export default allProductReducer;