import HeadRPC from '../components/HeadRPC';
import LoginF from '../components/LoginForm';

export default function LoginError() {

    return (

        <div>

            <HeadRPC />

            <LoginF message="Credenciales incorrectas o verficación de email necesaria" style="card p-3 bg-danger w-50 shadow  text-white w-auto text-center " />

        </div>
    );
}