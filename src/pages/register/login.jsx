import '../../css/formulario.css';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Overlay from '../../components/overlay';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Siganos from '../../components/siganos';
import Loading from '../../components/loading';
import Void from '../../components/void';
import logUser from '../../api/log';

const Login = () => {
    const { activeState } = useSelector(({ cartReducer }) => cartReducer);
    const [isLoading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);
    const [responseStatus, setResponseStatus] = useState(null)
    const navigate = useNavigate();
    //validação de formulário
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('*E-mail inválido*').required('Campo obrigatório*'),
        senha: Yup.string().required('Campo obrigatório*'),
    });
    //======================//

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const response = await logUser(values);
            if (response.status == 200) {
                window.alert(`Olá, ${response.msg} \u{1F60A}\u2764`)
                navigate('/Madro-Store');
            } else {
                setResponseStatus(response.status)
                setResponseMessage(response.msg);
            }

        } catch (e) {
            setResponseMessage('Erro na requisição. Tente novamente.');
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
                <h1>Iniciar sessão</h1>
                <p className="subtitle">Compre mais rápido e acompanhe seus pedidos.</p>

                <Formik
                    initialValues={{
                        email: '',
                        senha: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="wrapper-form">
                            <label>E-mail</label>
                            <Field
                                type="text"
                                name="email"
                                className={`field ${errors.email && touched.email ? 'input-invalido' : 'field'}`}
                            />
                            <ErrorMessage name="email" component="div" className='error-message' />
                            {responseStatus == 404 && (
                                <div className='error-message'>{responseMessage}</div>
                            )}
                            <label>Senha</label>
                            <Field
                                type="password"
                                name="senha"
                                className={`field ${errors.senha && touched.senha ? 'input-invalido' : 'field'}`}
                            />
                            <ErrorMessage name="senha" component="div" className='error-message' />

                            {responseStatus == 401 && (
                                <div className='error-message'>{responseMessage}</div>
                            )}

                            {isLoading ?
                                <Loading /> :
                                <button type="submit" className="submit">Entrar</button>
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

export default Login;

