import '../../css/formulario.css';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useSelector } from 'react-redux';
import { useState } from 'react';

import Overlay from '../../components/overlay';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Siganos from '../../components/siganos';
import Void from '../../components/void';
import Loading from '../../components/loading'
import createUser from '../../api/register';

const Cadastro = () => {
    const { activeState } = useSelector(({ cartReducer }) => cartReducer);
    const [isloaging, setLoading] = useState(false);

    //=========resposta da requisição==========//
    const showAlert = (value) => {
        window.alert(value);
    };
    //=========================================//

    //validação
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório*'),
        email: Yup.string().email('E-mail inválido').required('Campo obrigatório*'),
        telefone: Yup.string().required('Campo obrigatório*'),
        senha: Yup.string().required('Campo obrigatório*'),
        confirmarSenha: Yup.string()
            .oneOf([Yup.ref('senha'), null], '*Senha incorreta*')
            .required('Campo obrigatório*'),
    });

    // Função chamada ao enviar o formulário
    const handleSubmit = async (value) => {
        try {
            setLoading(true);
            const response = await createUser(value);
            showAlert(response.msg)
            navigate('/Madro-Store');
        } catch (e) {
            showAlert(e)
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Overlay isOpen={activeState} />
            <Header />
            <Void />
            <div className="wrapper-contact">
                <h1>Crie uma conta</h1>
                <p className="subtitle">Compre mais rápido e acompanhe seus pedidos.</p>

                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        telefone: '',
                        senha: '',
                        confirmarSenha: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="wrapper-form">
                            <label>Nome Completo</label>
                            <Field
                                type="text"
                                name="name"
                                className={`field ${errors.name && touched.name ? 'input-invalido' : 'field'}`}
                            />
                            <ErrorMessage name="name" component="div" className='error-message' />

                            <label>E-mail</label>
                            <Field
                                type="text"
                                name="email"
                                className={`field ${errors.email && touched.email ? 'input-invalido' : 'field'}`}
                            />
                            <ErrorMessage name="email" component="div" className='error-message' />

                            <label>Telefone</label>
                            <Field
                                type="text"
                                name="telefone"
                                className={`field ${errors.telefone && touched.telefone ? 'input-invalido' : 'field'}`}
                            />
                            <ErrorMessage name="telefone" component="div" className='error-message' />

                            <label>Senha</label>
                            <Field
                                type="password"
                                name="senha"
                                className={`field ${errors.senha && touched.senha ? 'input-invalido' : 'field'}`}
                            />
                            <ErrorMessage name="senha" component="div" className='error-message' />

                            <label>Confirmar senha</label>
                            <Field
                                type="password"
                                name="confirmarSenha"
                                className={`field ${errors.confirmarSenha && touched.confirmarSenha ? 'input-invalido' : 'field'}`}
                            />
                            <ErrorMessage name="confirmarSenha" component="div" className='error-message' />

                            {isloaging ?
                                <Loading /> :
                                <button type="submit" className="submit">Criar</button>
                            }
                        </Form>
                    )}
                </Formik>
            </div>
            <Void />
            <Siganos />
            <Void />
            <Footer />
        </>
    );
};

export default Cadastro;
