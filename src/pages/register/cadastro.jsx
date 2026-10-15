import '../../css/formulario.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Overlay from '../../components/overlay';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Void from '../../components/void';
import Loading from '../../components/loading';
import createUser from '../../api/register';
import rosesImg from "../../assets/roses/roses5.jpg";

const Cadastro = () => {
    const { activeState } = useSelector(({ cartReducer }) => cartReducer);
    const [isLoading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório*'),
        email: Yup.string().email('*E-mail inválido*').required('Campo obrigatório*'),
        telefone: Yup.string().required('Campo obrigatório*'),
        senha: Yup.string().required('Campo obrigatório*'),
        confirmarSenha: Yup.string()
            .oneOf([Yup.ref('senha'), null], '*As senhas não coincidem*')
            .required('Campo obrigatório*'),
    });

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            setApiError(null);
            const response = await createUser(values);
            window.alert(response?.msg || 'Conta criada com sucesso!');
            navigate('/Madro-Store/login');
        } catch (e) {
            setApiError(e?.message || 'Erro ao criar conta. Tente novamente.');
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
                        <h1>Crie sua Conta</h1>
                        <p className="subtitle">Compre com mais facilidade na MADRO Store.</p>

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
                                        placeholder="Seu nome completo"
                                        className={`field ${errors.name && touched.name ? 'input-invalido' : ''}`}
                                    />
                                    <ErrorMessage name="name" component="div" className='error-message' />

                                    <label>E-mail</label>
                                    <Field
                                        type="text"
                                        name="email"
                                        placeholder="seu@email.com"
                                        className={`field ${errors.email && touched.email ? 'input-invalido' : ''}`}
                                    />
                                    <ErrorMessage name="email" component="div" className='error-message' />

                                    <label>Telefone / WhatsApp</label>
                                    <Field
                                        type="text"
                                        name="telefone"
                                        placeholder="(11) 99999-9999"
                                        className={`field ${errors.telefone && touched.telefone ? 'input-invalido' : ''}`}
                                    />
                                    <ErrorMessage name="telefone" component="div" className='error-message' />

                                    <label>Senha</label>
                                    <Field
                                        type="password"
                                        name="senha"
                                        placeholder="••••••••"
                                        className={`field ${errors.senha && touched.senha ? 'input-invalido' : ''}`}
                                    />
                                    <ErrorMessage name="senha" component="div" className='error-message' />

                                    <label>Confirmar Senha</label>
                                    <Field
                                        type="password"
                                        name="confirmarSenha"
                                        placeholder="••••••••"
                                        className={`field ${errors.confirmarSenha && touched.confirmarSenha ? 'input-invalido' : ''}`}
                                    />
                                    <ErrorMessage name="confirmarSenha" component="div" className='error-message' />

                                    {apiError && (
                                        <div className='api-error-banner'>{apiError}</div>
                                    )}

                                    {isLoading ? (
                                        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                                            <Loading />
                                        </div>
                                    ) : (
                                        <button type="submit" className="submit">Criar Conta</button>
                                    )}

                                    <div className="auth-switch-link">
                                        <span>Já possui uma conta?</span>
                                        <Link to="/Madro-Store/login">Entrar</Link>
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

export default Cadastro;