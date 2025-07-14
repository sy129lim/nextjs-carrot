'use server';

export async function submitLogin(
  prevState: { errors: string[] },
  formData: FormData,
) {
  const memberId = formData.get('memberId') as string;
  const password = formData.get('password') as string;
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const errors = [];
  if (password && password.length < 6) {
    errors.push('password is too short');
  }
  if (memberId !== 'admin') {
    errors.push('wrong memberId');
  }

  return {
    errors,
  };
}
