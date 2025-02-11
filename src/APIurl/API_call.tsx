const ApiCall = async (url: string, method: string, header: any, body: any) => {
    const response = await fetch(url, {
        method: method,
        headers: {
            ...header,
        },
        body: body,
    });
    const res = await response.json();
    return await res;
};

export { ApiCall };