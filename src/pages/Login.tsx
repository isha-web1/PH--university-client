import { Button, Row } from 'antd';
import { FieldValues, } from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/hooks';
import { setUser, TUser } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import PHForm from '../components/form/PHForm';
import PHInput from '../components/form/PHInput';




const Login = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
  
  
  const defaultValues = {
    userId: 'A-0001',
    password: 'AdminSecurePass123',
  };
  const [login] = useLoginMutation();

  

  const onSubmit = async (data : FieldValues) => {
   const toastId = toast.loading('Logging in...');
    try{
    const userInfo = {
      id: data.userId,
      password: data.password,
    };

    const res = await login(userInfo).unwrap();
     const user = verifyToken(res.data.accessToken) as TUser;
     console.log('User:', user)
     dispatch(setUser({ user: user, token: res.data.accessToken }));
    toast.success('Login successful!',{ id: toastId, duration : 2000 } );
     navigate(`/${user.role}/dashboard`);
  }catch(err){
    toast.error('Login failed. Please check your credentials.', { id: toastId , duration: 2000 });
  }
  };

  return(
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}> 
        <PHInput type="text" name="userId" label="ID:" />
        <PHInput type="text" name="password" label="Password" />
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  )
};

export default Login;