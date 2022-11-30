import { getAxiosClient } from "./client";


export function getAll() {
    const client = getAxiosClient();
    return client.get("/users");
}

export function save(account, id) {
    const client = getAxiosClient();
    if (!id)
        return client.post("/users", account);

    return client.put("/users/" +  id, account)
}

export function remove(id) {
    const client = getAxiosClient();
    return client.delete("/users/" + id);
}