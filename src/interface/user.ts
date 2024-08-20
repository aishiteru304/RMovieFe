export interface IUserLogin {
    email: string,
    password: string
}

export interface IUserRegister extends IUserLogin {
    name: string,
    confirmPassword: string
}

export interface IUserState {
    token?: string,
    name?: string,
    image?: string,
    isAdmin?: boolean,
    liked?: number
}

export interface IChangePassword {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}

export interface IUserAccount {
    _id: string,
    name: string,
    image?: string,
    email: string
}