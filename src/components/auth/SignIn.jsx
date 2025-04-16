'use client'

import { ContainedButton } from '@/components/Buttons';
import { FormField } from '@/components/FormField';
import useAuth from '@/hooks/useAuth';
import useFormValidation, { validationRules } from '@/hooks/useFormValidation';
import styles from '@/styles/forms.module.css';
import Form from 'next/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function SignIn() {
  // Hooks
  const { 
    register, reset, 
    formState: { errors }, 
    submitWithSanitization } = useFormValidation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  // Submit the form with fetch request server action
  const onSubmit = async (sanitizedData) => { 
    try {
      setLoading(true);
      await login(sanitizedData)
      toast.success('Logged in! Redirecting...')
      router.push('/dashboard');
    } catch(err) {
      toast.error('Login failed. Please try again.')
      reset()
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className={styles.authContainer}>
        <div className={styles.authFormContainer}>
          <h3>ØBlog Dashboard</h3>

          <Form className={styles.authForm}  onSubmit={submitWithSanitization(onSubmit)}>

            <FormField type={'email'} name={'email'} label={'Email'} placeholder={'Enter your email'} 
              register={register} rules={validationRules.email} errors={errors} />
            <FormField type={'password'} name={'password'} label={'Password'}
              placeholder={'Enter your password'} register={register} 
              rules={{ required: 'Password is required' }} errors={errors} />
            
            <div className={styles.authSubmit}>
              <ContainedButton disabled={loading}>Sign In</ContainedButton>
            </div>

            <em>Dashboard view access</em>
          </Form>
        </div>
        <div className={styles.authLinksContainer}>
          <div className={styles.authLink}>Returning? <Link href={`${process.env.NEXT_PUBLIC_BASICURL}/signin`}>Sign in</Link> to read published posts</div>
          <div className={styles.authLink}>
            New Here? Sign up as a <Link href={'/signup'}>Contributor</Link> or <Link href={`${process.env.NEXT_PUBLIC_BASICURL}/signup`}> Reader</Link></div>
        </div>
      </div>
      
    </div>
  )
}
