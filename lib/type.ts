export type RemoveKeysStartingWith<T, Prefix extends string> = {
    [K in keyof T as `${string & K}` extends `${Prefix}${string}` ? never : K]: T[K];
};

// Example usage
interface MyData {
    name: string;
    age: number;
    $meta: {
        createdAt: Date;
    };
    $other: number;
}

type MyDataKeys = keyof RemoveKeysStartingWith<MyData, '$'>;