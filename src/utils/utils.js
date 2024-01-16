export const togglePasswordType = (setShowPassword) => {
    const password = document.getElementById('password');
    if(password.type === 'password') {
        password.type = 'text';
        setShowPassword(true);
    } else {
        password.type = 'password';
        setShowPassword(false);
    }
}