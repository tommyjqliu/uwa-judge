
// declare module "axios" {
//     /**
//      * @deprecated
//      * Use internal axios instance at lib/axios.ts instead
//      */
//     export default function axios(): void;
// }

declare module "next/router" {
    /**
     * @deprecated
     * Use next/navigation instead
     */
    export function useRouter(): void;
}

// import * as axios from "axios";
