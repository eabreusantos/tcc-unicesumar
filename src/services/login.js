import { getAxiosClient } from "./client";



export async function getUserByUsernameAndPassword(username, password, type) {
    const client = getAxiosClient(true);
    return client.post("/auth", {
        username: username,
        password: password,
        type: type
    });
}