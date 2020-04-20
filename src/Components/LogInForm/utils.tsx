export const validateEmail = (email: string): string => {
  if (!email) return "Email can't be empy!";
  return "";
};
export const validatePassword = (password: string): string => {
  if (!password) return "Password can't be empy!";
  else if (password.length < 4) return "Password must be at least 4 chars";
  else if (!password.match(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/))
    return "Password must contains chars and numbers";
  return "";
};
export const fetchLogin = async (
    email: string,
    password: string
): Promise<boolean | void> => {
    let loggedIn: boolean = false;
    return await fetch("http://localhost:3001/users")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((elem: { id: string; password: string; email: string }) => {
                if (elem.email === email && elem.password === password) {
                    loggedIn = true;
                }
            });
            if (loggedIn) return true;
            else return false;
        })
        .catch((error) => {
            console.log(error);
        });
};
