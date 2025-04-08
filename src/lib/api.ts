export type FormData = {
    fullName: string
    email: string
    phoneNumber: string
    streetAddress: string
    city: string
    zipCode: string
    username: string
    password: string
    confirmPassword: string
}

export async function submitFormData(data : FormData) : Promise <{success: boolean; id: string}> {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if(Math.random() < 0.1){
        throw new Error("Network error")
    }
    console.log('form data submit', data)

    return{
        success: true,
        id:`user_${Math.random().toString(36).substring(2,9)}`
    }
}