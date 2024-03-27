export function getRoute(id: string, raw?: any[]): any[] {
    return [id, raw?.map((item) => getRoute(`${id}/${item.id}`, item.children))]
}