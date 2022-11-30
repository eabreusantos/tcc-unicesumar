import { getAxiosClient } from "./client";


export function getAll() {
    const client = getAxiosClient();
    return client.get("/especialidades");
}
