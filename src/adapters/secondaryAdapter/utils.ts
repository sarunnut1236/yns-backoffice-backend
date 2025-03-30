export function turnToWhereClause<T>(queryParams: Partial<T>): Record<string, any> {
    return Object.entries(queryParams).reduce(
        (acc, [key, value]) => {
            if (value !== undefined) {
                acc[key] = value;
            }
            return acc;
        },
        {} as Record<string, any>
    );
}