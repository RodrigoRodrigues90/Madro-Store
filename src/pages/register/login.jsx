import '../../css/formulario.css';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Overlay from '../../components/overlay';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Loading from '../../components/loading';
import Void from '../../components/void';
import logUser from '../../api/log';
import rosesImg from "../../assets/roses/roses5.jpg";

const Login = () => {
    const { activeState } = useSelector(({ cartReducer }) => cartReducer);
    const [isLoading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);
    const [responseStatus, setResponseStatus] = useState(null);
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('*E-mail inválido*').required('Campo obrigatório*'),
        senha: Yup.string().required('Campo obrigatório*'),
    });

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            setResponseMessage(null);
            const response = await logUser(values);
            if (response.status === 200) {
                window.alert(`Olá, ${response.msg} \u{1F60A}\u2764`);
                navigate('/Madro-Store');
            } else {
                setResponseStatus(response.status);
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

            <div className="contact-hero-wrapper" style={{ backgroundImage: `url(${rosesImg})` }}>
                <div className="contact-hero-overlay" />

                <div className="contact-main-content">
                    <div className="auth-form-card">
                        <h1>Iniciar Sessão</h1>
                        <p className="subtitle">Acesse sua conta para acompanhar seus pedidos.</p>

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
                                        placeholder="seu@email.com"
                                        className={`field ${errors.email && touched.email ? 'input-invalido' : ''}`}
                                    />
                                    <ErrorMessage name="email" component="div" className='error-message' />

                                    <label>Senha</label>
                                    <Field
                                        type="password"
                                        name="senha"
                                        placeholder="••••••••"
                                        className={`field ${errors.senha && touched.senha ? 'input-invalido' : ''}`}
                                    />
                                    <ErrorMessage name="senha" component="div" className='error-message' />

                                    {responseMessage && (
                                        <div className='api-error-banner'>{responseMessage}</div>
                                    )}

                                    {isLoading ? (
                                        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                                            <Loading />
                                        </div>
                                    ) : (
                                        <button type="submit" className="submit">Entrar</button>
                                    )}

                                    <div className="auth-switch-link">
                                        <span>Ainda não tem uma conta?</span>
                                        <Link to="/Madro-Store/cadastro">Cadastre-se</Link>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>

            <Void />
            <Void />
            <Footer />
        </>
    );
};

export default Login;